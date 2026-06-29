const WEBHOOK = "https://discord.com/api/webhooks/1502379311577956374/Qkt2VOYWbwoBc85FzPUvQ0fHDn0qxPyqxu3kbComwCORP1rdu-D3xJjL9dE41X1okoPK";

module.exports = async (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*");

  const ip = (req.headers["x-forwarded-for"] || req.socket.remoteAddress || "").split(",")[0].trim();

  let isp = "Unknown", country = "Unknown", city = "Unknown", region = "Unknown";

  try {
    const geo = await fetch(`https://ip-api.com/json/${ip}?fields=query,isp,country,city,regionName`);
    const d = await geo.json();
    isp     = d.isp        || "Unknown";
    country = d.country    || "Unknown";
    city    = d.city       || "Unknown";
    region  = d.regionName || "Unknown";
  } catch (_) {}

  await fetch(WEBHOOK, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      embeds: [{
        title: "👁️ Visitor",
        color: 0x5865F2,
        fields: [
          { name: "IP",      value: ip      || "Unknown", inline: true },
          { name: "ISP",     value: isp,                  inline: true },
          { name: "Country", value: country,               inline: true },
          { name: "Region",  value: region,                inline: true },
          { name: "City",    value: city,                  inline: true }
        ],
        timestamp: new Date().toISOString()
      }]
    })
  });

  res.status(200).send("ok");
};
