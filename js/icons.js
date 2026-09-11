// Salt & Light Tool Rental — shared line-icon set (24x24 viewBox, stroke=currentColor)
// Used for category tiles, trust strip, values, policies, and contact cards.

var ICONS = {
  drill: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M2 9h10v5H2z"/><path d="M12 10.5h4.5L20 8v6l-3.5-2.5H12"/><path d="M6 14v3"/><path d="M4 20l3-3 3 3"/></svg>',

  saw: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><circle cx="9.5" cy="9.5" r="6.2"/><path d="M9.5 3.3v.1M9.5 15.5v.1M3.3 9.5h.1M15.5 9.5h.1M5.6 5.6l.1.1M13.3 13.3l.1.1M5.6 13.4l.1-.1M13.3 5.7l.1-.1"/><path d="M14.5 13.5L21 20"/><path d="M17.2 12l4.6 4.6-2.8 2.8L14.4 14.8"/></svg>',

  nailer: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M3 13.5L13.5 3l3 3L6 16.5z"/><path d="M12 6l3 3"/><path d="M6 16.5L4 21l4.5-2"/><path d="M15 4.5l3-1.2.7.7-1.2 3"/></svg>',

  sander: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="10" width="12" height="6" rx="1.5"/><path d="M9 10V7.5A2.5 2.5 0 0111.5 5H15"/><path d="M15 3.5h4v3h-4z"/><circle cx="6.5" cy="18.5" r="1.2"/><circle cx="11.5" cy="18.5" r="1.2"/></svg>',

  demolition: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3l3 3-7.5 7.5-3-3z"/><path d="M6 11l-3.5 7L10 15"/><path d="M13.5 4.5L19 10"/></svg>',

  generator: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><rect x="2.5" y="7" width="15" height="10" rx="1.5"/><circle cx="7.5" cy="12" r="2"/><path d="M12.5 12h2.5"/><path d="M17.5 10.5H21a1 1 0 011 1v1a1 1 0 01-1 1h-3.5"/><path d="M5 17v2M10 17v2"/></svg>',

  ladder: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M7 2.5v19"/><path d="M17 2.5v19"/><path d="M7 6h10M7 10h10M7 14h10M7 18h10"/></svg>',

  pressurewasher: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><rect x="2.5" y="9" width="8" height="8" rx="1.3"/><path d="M10.5 12h3.5l4-2.5v7L14 14"/><path d="M4.5 9V6.5A1.5 1.5 0 016 5h1a1.5 1.5 0 011.5 1.5V9"/><path d="M6.5 17v2.2M8.5 17v2.2"/></svg>',

  shieldcheck: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3l7 3v5.5c0 4.5-3 7.5-7 9-4-1.5-7-4.5-7-9V6z"/><path d="M9 12l2 2 4-4.5"/></svg>',

  calendar: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="5" width="18" height="16" rx="2"/><path d="M3 10h18"/><path d="M7 3v4M17 3v4"/><path d="M8 14h2M14 14h2M8 17h2M14 17h2"/></svg>',

  mappin: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M12 21s7-6.5 7-12a7 7 0 10-14 0c0 5.5 7 12 7 12z"/><circle cx="12" cy="9" r="2.4"/></svg>',

  handshake: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M2 12l4-3.5 4 2.5 4-3 5 3.5"/><path d="M6.5 11l4 3.5a1.6 1.6 0 002.2-.2 1.5 1.5 0 00-.1-2.1"/><path d="M10.5 14.5l1.2 1a1.5 1.5 0 002.1-.2 1.5 1.5 0 00-.1-2.1"/><path d="M2 12v4.5h2.5M19 8.5H22V15h-3"/></svg>',

  compass: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"/><path d="M15.5 8.5l-2 5-5 2 2-5z"/></svg>',

  shield: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3l7 3v5.5c0 4.5-3 7.5-7 9-4-1.5-7-4.5-7-9V6z"/></svg>',

  heart: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M12 20.2s-7.5-4.6-9.5-9A5 5 0 0112 6.5 5 5 0 0121.5 11c-2 4.4-9.5 9.2-9.5 9.2z"/></svg>',

  people: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><circle cx="8.5" cy="8" r="3"/><path d="M2.5 20c0-3.3 2.7-5.5 6-5.5s6 2.2 6 5.5"/><circle cx="17" cy="8.5" r="2.4"/><path d="M15.5 14.7c2.6.3 4.5 2.3 4.5 5.3"/></svg>',

  idcard: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><rect x="2.5" y="5" width="19" height="14" rx="2"/><circle cx="8" cy="12" r="2"/><path d="M5 16.2c.4-1.6 1.6-2.4 3-2.4s2.6.8 3 2.4"/><path d="M14 9.5h5M14 12.5h5M14 15.5h3"/></svg>',

  creditcard: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><rect x="2.5" y="5.5" width="19" height="13" rx="2"/><path d="M2.5 9.5h19"/><path d="M6 14.5h5"/></svg>',

  clock: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3.5 2"/></svg>',

  ban: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"/><path d="M6 6l12 12"/></svg>',

  clipboardcheck: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><rect x="5" y="4" width="14" height="17" rx="2"/><path d="M9 4V3a1 1 0 011-1h4a1 1 0 011 1v1"/><path d="M9 12.5l2 2 4-4.5"/></svg>',

  alerttriangle: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3.5L22 20H2z"/><path d="M12 9.5v5"/><path d="M12 17.2v.1"/></svg>',

  shieldalert: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3l7 3v5.5c0 4.5-3 7.5-7 9-4-1.5-7-4.5-7-9V6z"/><path d="M12 8v4.2M12 15.2v.1"/></svg>',

  phone: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M4.5 3.5h3l1.5 4-2 1.5a12 12 0 006 6l1.5-2 4 1.5v3a1.5 1.5 0 01-1.6 1.5A17 17 0 013 5.1a1.5 1.5 0 011.5-1.6z"/></svg>',

  mail: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><rect x="2.5" y="5" width="19" height="14" rx="2"/><path d="M3 6.5l9 6.5 9-6.5"/></svg>',

  message: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M3 5.5A2 2 0 015 3.5h14a2 2 0 012 2V15a2 2 0 01-2 2H8l-5 4z"/></svg>',

  wrench: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M14.5 6.5a4 4 0 00-5.4 4.6L3 17.2l2.8 2.8 6-6.1a4 4 0 004.6-5.4l-2.7 2.7-2.6-.6-.6-2.6z"/></svg>',

  sprayer: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M9 21V11.5a2 2 0 012-2h1a2 2 0 012 2V21"/><path d="M7 21h9"/><rect x="9" y="6" width="5" height="3.5" rx="1"/><path d="M13 6V4a1 1 0 011-1h1"/><path d="M17.5 8.5c1.6.5 2.5 1.8 2.5 3.3M17.5 5.7c2.6.6 4.5 2.8 4.5 6.1"/></svg>',

  planer: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><rect x="2.5" y="6" width="19" height="7" rx="1.5"/><path d="M6 13v2M18 13v2M2.5 9.5h19"/><path d="M9 6V4.5M15 6V4.5"/></svg>'
};
