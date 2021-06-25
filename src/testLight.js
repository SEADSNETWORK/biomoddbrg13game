const dmx =  new (require("./artnet.js").default)();


dmx.setAll(dmx.colEnum.static)
// dmx.setRg(dmx.groups.sector2);
dmx.setColor(4, {red: true, green: true, blue:false});
