import axios, { Axios } from "axios";
import * as cheerio from 'cheerio';



export class PlayerSettingService {
       private _AXIOS: Axios;
       constructor() {
              this._AXIOS = axios.create({
                     baseURL: process.env.PRO_SETTINGS_BASE_URL,
                     timeout: 15000,
                     headers: {
                            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
                     }
              });
       };

       async getPlayerSettings(playerName: string) {
              try {
                     const URL = `/players/${playerName}/`;
                     const searchResponse = await this._AXIOS.get(URL);


                     if (searchResponse.status === 404) {
                            throw new Error(`Sorry, I couldn't find a player page for '${playerName}'. Please check the spelling.`)
                     };
                     const $ = cheerio.load(searchResponse.data);

                     const pageTitle = $('h1.entry-title').first();
                     const fullPlayerName = pageTitle.text().trim() || playerName;

                     const allSettings: Record<string, Record<string, string>> = {};
                     const playerInfo: Record<string, string> = {};
                     const socialLinks: Record<string, string> = {};
                     let avatarUrl: string | undefined;


                     const bioSection = $('#bio');
                     if (bioSection.length) {
                            // Extract player info table
                            const dataTable = bioSection.find('table.data');
                            if (dataTable.length) {
                                   dataTable.find('tr').each((_, row) => {
                                          const th = $(row).find('th');
                                          const td = $(row).find('td');
                                          if (th.length && td.length) {
                                                 playerInfo[th.text().trim()] = td.text().trim();
                                          }
                                   });
                            }

                            // Extract social links
                            const socialList = bioSection.find('div.social');
                            if (socialList.length) {
                                   socialList.find('li').each((_, item) => {
                                          const link = $(item).find('a');
                                          if (link.length && link.attr('href')) {
                                                 const platform = $(item).attr('class')?.split(' ')[0] || 'link';
                                                 socialLinks[platform] = link.attr('href')!;
                                          }
                                   });
                            }

                            // Extract avatar
                            const avatarImg = bioSection.find('section.avatar img.wp-post-image');
                            if (avatarImg.length && avatarImg.attr('src')) {
                                   avatarUrl = avatarImg.attr('src');
                                   console.log(`Found avatar URL: ${avatarUrl}`);
                            }
                     }

                     // Extract settings sections
                     const settingSections = $('section.section--child').add('div.pro-settings-block');

                     settingSections.each((_, section) => {
                            const sectionEl = $(section);
                            const titleElement = sectionEl.find('h2, h3, h4').first();
                            if (!titleElement.length) return;

                            const categoryTitle = titleElement.text().trim();
                            allSettings[categoryTitle] = {};

                            const table = sectionEl.find('table.settings, table.pro-settings-table');
                            if (!table.length) return;

                            table.find('tr').each((_, row) => {
                                   const th = $(row).find('th');
                                   const td = $(row).find('td');
                                   if (th.length && td.length) {
                                          const settingName = th.text().trim();
                                          const settingValue = td.text().trim().replace(/\s+/g, ' ');
                                          if (settingValue.toLowerCase() !== 'unknown') {
                                                 allSettings[categoryTitle][settingName] = settingValue;
                                          }
                                   }
                            });
                     });

                     // Build the message parts
                     const messageParts = [`**${fullPlayerName}**\n`];

                     if (Object.keys(playerInfo).length) {
                            messageParts.push('\n👤 **Player Info**');
                            if (playerInfo.Name) messageParts.push(`  - \`Real Name\`: ${playerInfo.Name}`);
                            if (playerInfo.Team) messageParts.push(`  - \`Team\`: ${playerInfo.Team}`);
                            if (playerInfo.Country) messageParts.push(`  - \`Country\`: ${playerInfo.Country}`);
                     }

                     if (Object.keys(socialLinks).length) {
                            messageParts.push('\n🔗 **Socials**');
                            const linksText = Object.entries(socialLinks)
                                   .map(([platform, url]) => `[${platform}](${url})`)
                                   .join(' | ');
                            messageParts.push(`  ${linksText}`);
                     }

                     const categoryIcons: Record<string, string> = {
                            "Mouse": "🖱️", "Monitor": "🖥️", "Video": "📺",
                            "Keyboard": "⌨️", "Headset": "🎧", "PC": "💻",
                            "Common": "🕹️", "Combat": "🔫", "Item": "🎒",
                            "UI": "🎨"
                     };

                     for (const [category, settings] of Object.entries(allSettings)) {
                            if (Object.keys(settings).length) {
                                   const icon = Object.entries(categoryIcons).find(([key]) =>
                                          category.includes(key))?.[1] || "⚙️";
                                   messageParts.push(`\n${icon} **${category}**`);
                                   for (const [name, value] of Object.entries(settings)) {
                                          messageParts.push(`  - \`${name}\`: ${value}`);
                                   }
                            }
                     }

                     return {
                            caption: messageParts.join('\n'),
                            photoUrl: avatarUrl
                     };
              } catch (e: any) {
                     console.log("Error: Pubg Setting Service:", e);
                     throw new Error(`Error: ${e.message}`)
              }
       }

}