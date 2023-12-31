var e, o, n = [(e, o, n) => {
    function t(e, o) {
        const n = Object.keys(e),
            t = Object.keys(o);
        if (n.length !== t.length) return !1;
        for (const s of n)
            if (e[s] !== o[s]) return !1;
        return !0
    }

    function s(e, o) {
        for (const n of e)
            if (t(n, o)) return n;
        return null
    }

    function i(e, o) {
        for (const n of e)
            if (t(n, o)) return !0;
        return !1
    }

    function r(e, o) {
        const n = new Set(e);
        return s(e, o) || n.add(o), n
    }

    function a(e, o) {
        const n = new Set(e),
            t = s(e, o);
        return t && n.delete(t), n
    }
    n.d(o, {
        a: () => c
    });
    class c {
        constructor(e) {
            this.consentsGroupVendorRecords = e
        }
        copy(e) {
            return new c(e)
        }
        hasConsentsGroupVendor(e) {
            return i(this.consentsGroupVendorRecords, e)
        }
        hasConsentsGroupSelected(e, o) {
            return o.every((o => i(this.consentsGroupVendorRecords, {
                [e]: o.id
            })))
        }
        toggleConsentsGroup(e, o) {
            const n = e.reduce(((e, n) => o ? a(e, n) : r(e, n)), new Set(this.consentsGroupVendorRecords));
            return this.copy(n)
        }
        toggleConsentsGroupVendor(e) {
            const o = i(this.consentsGroupVendorRecords, e) ? a(this.consentsGroupVendorRecords, e) : r(this.consentsGroupVendorRecords, e);
            return this.copy(o)
        }
    }
}, (e, o, n) => {
    n.d(o, {
        a: () => t
    });
    class t {
        constructor(e) {
            this.toCookieConfiguration = e => {
                const o = this.consentsGroupModelToVendors(e),
                    n = Object.values(o).every((e => !0 === e));
                return {
                    versionMajor: this.appConfiguration.versionMajor,
                    versionMinor: this.appConfiguration.versionMinor,
                    modified: (new Date).toISOString(),
                    consentsGroups: this.consentsGroupsModelToConsentsGroups(e),
                    vendors: o,
                    allVendorsAccepted: n
                }
            }, this.consentsGroupsModelToConsentsGroups = e => this.appConfiguration.consentsGroups.filter((e => e.hasVendors())).reduce(((o, n) => Object.assign(Object.assign({}, o), {}, {
                [n.id]: n.vendors.reduce(((o, t) => Object.assign(Object.assign({}, o), {}, {
                    [t.id]: e.hasConsentsGroupVendor({
                        [n.id]: t.id
                    })
                })), {})
            })), {}), this.consentsGroupModelToVendors = e => this.appConfiguration.vendors.reduce(((o, n) => Object.assign(Object.assign({}, o), {}, {
                [n.id]: n.consentsGroups.every((o => e.hasConsentsGroupVendor({
                    [o]: n.id
                })))
            })), {}), this.appConfiguration = e
        }
    }
}, , (e, o, n) => {
    n.d(o, {
        a: () => s,
        b: () => t
    });
    const t = "SHEET",
        s = "INLINE"
}, (e, o, n) => {
    n.d(o, {
        a: () => s,
        b: () => t
    });
    const t = "HOME",
        s = "CONSENTS_GROUPS"
}, (e, o, n) => {
    n.d(o, {
        a: () => l,
        b: () => d
    });
    var t = n(1),
        s = n(0);
    const i = ["modified"];

    function r(e, o) {
        const n = new t.a(o).toCookieConfiguration(e),
            {
                modified: s
            } = n;
        return ((e, o) => {
            if (null == e) return {};
            var n, t, s = ((e, o) => {
                if (null == e) return {};
                var n, t, s = {},
                    i = Object.keys(e);
                for (t = 0; t < i.length; t++) n = i[t], o.indexOf(n) >= 0 || (s[n] = e[n]);
                return s
            })(e, o);
            if (Object.getOwnPropertySymbols) {
                var i = Object.getOwnPropertySymbols(e);
                for (t = 0; t < i.length; t++) n = i[t], o.indexOf(n) >= 0 || {}.propertyIsEnumerable.call(e, n) && (s[n] = e[n])
            }
            return s
        })(n, i)
    }
    class a {
        constructor(e, o) {
            this.contextNode = void 0, this.appConfiguration = void 0, this.contextNode = e, this.appConfiguration = o
        }
        boxViewed() {
            window.opbox.analytics.sendEvent({
                contextNode: this.contextNode,
                action: "boxView"
            })
        }
        languageChanged(e) {
            window.opbox.analytics.sendBoxInteractionEvent({
                contextNode: this.contextNode,
                label: "languageChange",
                value: e
            })
        }
        cancelClicked() {
            this.clicked("cancelButton")
        }
        manageButtonClicked() {
            this.clicked("manageButton")
        }
        checkboxChecked() {
            this.clicked("checkboxChecked")
        }
        groupCheckboxChecked() {
            this.clicked("groupCheckboxChecked")
        }
        toggleVendorListVisibilityClicked() {
            this.clicked("toggleVendorListVisibility")
        }
        acceptAllClicked() {
            this.clicked("closeRODO", "acceptAll", {
                newConsents: r(new s.a(this.appConfiguration.getAllConsentsGroupsRecords()), this.appConfiguration)
            })
        }
        rejectAllClicked() {
            this.clicked("closeRODO", "rejectAll", {
                newConsents: r(new s.a(this.appConfiguration.getRequiredConsentsGroupsRecords()), this.appConfiguration)
            })
        }
        acceptManagedClicked(e) {
            this.clicked("closeRODO", "acceptManaged", {
                newConsents: r(e, this.appConfiguration)
            })
        }
        acceptInlineClicked(e, o) {
            this.clicked("closeRODO", "acceptInline", {
                oldConsents: r(e, this.appConfiguration),
                newConsents: r(o, this.appConfiguration)
            })
        }
        clicked(e, o, n) {
            const t = {
                contextNode: this.contextNode,
                label: e,
                value: o,
                customParams: n
            };
            window.opbox.analytics.sendClickEvent(t)
        }
    }
    let c;

    function d(e, o) {
        return c = new a(e, o), c
    }

    function l() {
        if (!c) throw Error("Analytics not initialized. First invoke initAnalytics()");
        return c
    }
}],
t = {};

function s(e) {
var o = t[e];
if (void 0 !== o) return o.exports;
var i = t[e] = {
    exports: {}
};
return n[e](i, i.exports, s), i.exports
}
s.m = n, s.d = (e, o) => {
for (var n in o) s.o(o, n) && !s.o(e, n) && Object.defineProperty(e, n, {
    enumerable: !0,
    get: o[n]
})
}, s.f = {}, s.e = e => Promise.all(Object.keys(s.f).reduce(((o, n) => (s.f[n](e, o), o)), [])), s.u = e => "app.es6-pl-PL_" + s.h().slice(0, 8) + ".js", s.h = () => "cf151055", s.o = (e, o) => ({}.hasOwnProperty.call(e, o)), e = {}, o = "@allegro/opbox-gdpr-consents-plugin:", s.l = (n, t, i, r) => {
if (e[n]) e[n].push(t);
else {
    var a, c;
    if (void 0 !== i)
        for (var d = document.getElementsByTagName("script"), l = 0; l < d.length; l++) {
            var u = d[l];
            if (u.getAttribute("src") == n || u.getAttribute("data-webpack") == o + i) {
                a = u;
                break
            }
        }
    a || (c = !0, (a = document.createElement("script")).type = "module", a.charset = "utf-8", a.timeout = 120, s.nc && a.setAttribute("nonce", s.nc), a.setAttribute("data-webpack", o + i), a.src = n, 0 !== a.src.indexOf(window.location.origin + "/") && (a.crossOrigin = "anonymous")), e[n] = [t];
    var p = (o, t) => {
            a.onerror = a.onload = null, clearTimeout(h);
            var s = e[n];
            if (delete e[n], a.parentNode && a.parentNode.removeChild(a), s && s.forEach((e => e(t))), o) return o(t)
        },
        h = setTimeout(p.bind(null, void 0, {
            type: "timeout",
            target: a
        }), 12e4);
    a.onerror = p.bind(null, a.onerror), a.onload = p.bind(null, a.onload), c && document.head.appendChild(a)
}
}, s.p = "https://assets.allegrostatic.com/sc-17421/", (() => {
var e = {
    826: 0
};
s.f.j = (o, n) => {
    var t = s.o(e, o) ? e[o] : void 0;
    if (0 !== t)
        if (t) n.push(t[2]);
        else {
            var i = new Promise(((n, s) => t = e[o] = [n, s]));
            n.push(t[2] = i);
            var r = s.p + s.u(o),
                a = Error();
            s.l(r, (n => {
                if (s.o(e, o) && (0 !== (t = e[o]) && (e[o] = void 0), t)) {
                    var i = n && ("load" === n.type ? "missing" : n.type),
                        r = n && n.target && n.target.src;
                    a.message = "Loading chunk " + o + " failed.\n(" + i + ": " + r + ")", a.name = "ChunkLoadError", a.type = i, a.request = r, t[1](a)
                }
            }), "chunk-" + o, o)
        }
};
var o = (o, n) => {
        var t, i, [r, a, c] = n,
            d = 0;
        if (r.some((o => 0 !== e[o]))) {
            for (t in a) s.o(a, t) && (s.m[t] = a[t]);
            c && c(s)
        }
        for (o && o(n); d < r.length; d++) i = r[d], s.o(e, i) && e[i] && e[i][0](), e[i] = 0
    },
    n = self.webpackJsonp_54974 = self.webpackJsonp_54974 || [];
n.forEach(o.bind(null, 0)), n.push = o.bind(null, n.push.bind(n))
})(), (() => {
const e = "rodo";
var o = s(3),
    n = s(4);
const t = {
    layout: o.b,
    initialView: n.b,
    pageCached: !1,
    route: "/",
    requestUrl: "/",
    isRwd: !0,
    isEsiPage: !1,
    i18n: {
        marketplaceId: null,
        supportedLanguages: [{
            label: "polski",
            value: "pl-PL"
        }, {
            label: "English",
            value: "en-US"
        }]
    }
};
var i = s(5),
    r = s(1),
    a = s(0);
const c = "rodoConsents";
class d {
    constructor(e) {
        this.saveCallback = void 0, this.errorCallback = void 0, this.configurationMapper = void 0, this.onSave = e => {
            this.saveCallback = e
        }, this.onError = e => {
            this.errorCallback = e
        }, this.getUserConsentsGroupsModelFromCookieConfiguration = e => e ? e.toUserConsentsGroupsModel() : new a.a(this.appConfiguration.getRequiredConsentsGroupsRecords()), this.getCookieConfigurationFromOneCookie = () => window.opbox.preferences.get(c), this.emitGdprConsentsSavedEvent = () => {
            const e = new CustomEvent("gdprConsentsSaved");
            document.dispatchEvent(e)
        }, this.saveConsents = e => {
            const o = this.configurationMapper.toCookieConfiguration(e);
            this.saveGDPRCookie(this.isGdprPermissionGiven(o)), this.savePreference(o).then((() => {
                var e;
                return null == (e = this.saveCallback) ? void 0 : e.call(this)
            })).then((() => this.emitGdprConsentsSavedEvent())).catch((e => {
                var o;
                return null == (o = this.errorCallback) ? void 0 : o.call(this, e)
            }))
        }, this.isGdprPermissionGiven = e => {
            if (null == e || !e.vendors) return !1;
            const {
                facebook: o,
                googleAdvertisingProducts: n,
                googleAnalytics: t
            } = e.vendors;
            return o && n && t
        }, this.savePreference = e => {
            const o = d.decorateWithGoogleVendor(e);
            return window.opbox.preferences.set(c, o)
        }, this.appConfiguration = e, this.configurationMapper = new r.a(e)
    }
    saveGDPRCookie(e) {
        ! function(e, o) {
            const n = function() {
                    const e = {};
                    for (let o = 0; o < arguments.length; o++) {
                        const n = arguments[o];
                        for (const o in n) e[o] = n[o]
                    }
                    return e
                }(arguments[2]),
                t = Object.keys(n).map((e => {
                    const o = n[e];
                    return !0 === o ? ";" + e : `;${"maxAge" === e ? "max-age" : e}=${("" + o).split(";")[0]}`
                })).join("");
            document.cookie = `${encodeURIComponent(e)}=${encodeURIComponent(o)}${t}`
        }("gdpr_permission_given", e ? "1" : "0", {
            maxAge: 31536e3,
            path: "/",
            domain: "" + window.location.hostname
        })
    }
}
d.decorateWithGoogleVendor = e => {
    const {
        vendors: o
    } = e;
    return Object.assign(Object.assign({}, e), {}, {
        vendors: Object.assign(Object.assign({}, o), {}, {
            google: !!(null == o ? void 0 : o.googleAdvertisingProducts) && !!(null == o ? void 0 : o.googleAnalytics)
        })
    })
};
const l = JSON.parse('{"versionMinor":"4.2.0","versionMajor":4,"consentsGroups":[{"id":"functional","name":"Functional use of cookies","required":false},{"id":"analytical","name":"Analytical use of cookies","required":false},{"id":"marketing","name":"Marketing use of cookies","required":false},{"id":"essential","name":"Use of essential cookies","required":true}],"vendors":[{"id":"medallia","name":"Medallia","consentsGroups":["functional"]},{"id":"batiaInfotech","name":"Batia Infotech","consentsGroups":["functional"]},{"id":"googleAnalytics","name":"Google Analytics","consentsGroups":["analytical"]},{"id":"gemius","name":"Gemius","consentsGroups":["analytical"]},{"id":"googleAdvertisingProducts","name":"Google Advertising Products","partnerList":"googleAdvertisingProducts_partner_list_link","consentsGroups":["marketing"]},{"id":"facebook","name":"Meta","consentsGroups":["marketing"]},{"id":"adform","name":"Adform","partnerList":"adform_partner_list_link","consentsGroups":["marketing"]},{"id":"tikTok","name":"TikTok","consentsGroups":["marketing"]},{"id":"allegroAdsNetwork","name":"Allegro Ads Network","partnerList":"allegroAdsNetwork_partner_list_link","consentsGroups":["marketing"]},{"id":"allegro","name":"Allegro","consentsGroups":["functional","analytical","marketing"]}]}');
class u {
    constructor(e) {
        var o;
        this.id = void 0, this.name = void 0, this.partnerList = void 0, this.consentsGroups = void 0, this.id = e.id, this.name = e.name, this.partnerList = null != (o = e.partnerList) ? o : null, this.consentsGroups = e.consentsGroups
    }
}
class p {
    constructor(e, o) {
        this.id = void 0, this.name = void 0, this.required = void 0, this.vendors = void 0, this.toConsentsGroupVendorRecords = () => this.vendors.map((e => ({
            [this.id]: e.id
        }))), this.hasVendors = () => this.vendors.length > 0, this.getConsentsGroupsVendorsFromAllVendors = e => e.filter((e => e.consentsGroups.includes(this.id))), this.id = e.id, this.name = e.name, this.required = e.required, this.vendors = this.getConsentsGroupsVendorsFromAllVendors(o)
    }
}
class h {
    constructor() {
        this.versionMinor = void 0, this.versionMajor = void 0, this.vendors = void 0, this.consentsGroups = void 0, this.getAllConsentsGroupsRecords = () => new Set(this.consentsGroups.flatMap((e => e.toConsentsGroupVendorRecords()))), this.getRequiredConsentsGroupsRecords = () => new Set(this.consentsGroups.filter((e => e.required && e.hasVendors())).flatMap((e => e.toConsentsGroupVendorRecords()))), this.vendors = l.vendors.map((e => new u(e))), this.versionMinor = l.versionMinor, this.versionMajor = l.versionMajor, this.consentsGroups = l.consentsGroups.map((e => new p(e, this.vendors)))
    }
}
class g {
    constructor(e) {
        this.modified = void 0, this.versionMinor = void 0, this.versionMajor = void 0, this.acceptedConsentsGroups = void 0, this.toUserConsentsGroupsModel = () => new a.a(new Set(this.acceptedConsentsGroups)), this.getAcceptedConsentsGroups = e => Object.entries(null != e ? e : []).flatMap((([e, o]) => Object.entries(o).filter((([, e]) => !0 === e)).map((([o]) => ({
            [e]: o
        })))));
        const {
            consentsGroups: o,
            modified: n,
            versionMajor: t,
            versionMinor: s
        } = e;
        this.modified = null != n ? n : null, this.versionMinor = null != s ? s : null, this.versionMajor = null != t ? t : null, this.acceptedConsentsGroups = this.getAcceptedConsentsGroups(o)
    }
}
const v = e => null != e,
    f = (e, o) => {
        const {
            versionMajor: n
        } = o;
        return v(e) && v(n) && e > n
    },
    C = (({
        pluginName: e,
        clientImplementationVersion: o
    }) => {
        try {
            return JSON.parse(window.document.querySelector(`script[data-serialize-plugin-name="${e}"][data-civ="${o}"]`).textContent)
        } catch (n) {
            return window.opbox.reportError(Error(`Missing serialized props of plugin "${e}", with civ "${o}"`)), {}
        }
    })({
        pluginName: e,
        clientImplementationVersion: "bc2"
    });
C && window.opbox.plugin.register({
    name: e
}, new class {
    constructor(e) {
        this.modalWrapper = void 0, this.props = void 0, this.appConfiguration = void 0, this.cookieConfiguration = void 0, this.consentManager = void 0, this.apiRenderInline = (e, o) => {
            this.props = Object.assign(Object.assign({}, this.props), o), this.modalWrapper = e, this.renderModal()
        }, this.handleConsentManagerSave = () => {
            const {
                successRedirectUrl: e,
                layout: n
            } = this.props;
            var t;
            if (e) null == (t = document.defaultView) || t.location.assign(e);
            else if (n === o.a) {
                var s, i;
                const e = (null == (s = document.defaultView) ? void 0 : s.document.referrer) || "https://allegro.pl";
                null == (i = document.defaultView) || i.location.assign(e)
            }
        }, this.handleConsentManagerError = e => {
            const {
                errorRedirectUrl: o
            } = this.props;
            var n, t;
            o && (null == (n = document.defaultView) || n.opbox.reportError(e), null == (t = document.defaultView) || t.location.assign(o))
        }, this.handleSave = e => {
            this.consentManager.saveConsents(e)
        }, this.updateConfigurationModel = e => {
            this.cookieConfiguration = f(this.props.versionMajor, e) ? new g(e) : null
        }, this.props = e, this.modalWrapper = document.getElementById("opbox-gdpr-consents-modal"), this.appConfiguration = new h, this.cookieConfiguration = e.cookieConfiguration ? new g(e.cookieConfiguration) : null, this.consentManager = new d(this.appConfiguration), this.consentManager.onSave(this.handleConsentManagerSave), this.consentManager.onError(this.handleConsentManagerError), this.modalWrapper && (e.pageCached || e.isEsiPage ? this.renderModalFromOneCookie() : requestAnimationFrame((() => {
            this.renderModal(!0)
        })))
    }
    getPublicApi() {
        return {
            renderInline: this.apiRenderInline
        }
    }
    async renderModal(e = !1) {
        const {
            initializeApp: o
        } = await s.e(143).then(s.bind(s, 6)), {
            layout: n,
            initialView: t,
            manageConsentsUrl: r
        } = this.props, a = this.consentManager.getUserConsentsGroupsModelFromCookieConfiguration(this.cookieConfiguration);
        o(this.modalWrapper, e, {
            allConsentsGroups: this.appConfiguration.consentsGroups,
            userConsentsGroups: a,
            layout: n,
            isRwd: window.innerWidth < 544,
            initialView: t,
            onSave: this.handleSave,
            manageConsentsUrl: r,
            i18nPreferences: this.props.i18nPreferences
        }), (0, i.b)(this.modalWrapper, this.appConfiguration).boxViewed()
    }
    renderModalFromOneCookie() {
        this.consentManager.getCookieConfigurationFromOneCookie().then((e => {
            ((e, o) => !(o && 0 !== Object.keys(o).length) || f(e, o))(this.props.versionMajor, e) && (this.updateConfigurationModel(e), this.renderModal())
        })).catch((e => window.opbox.reportError(e)))
    }
}((e => {
    const {
        cookieConfiguration: o
    } = e, n = (e => !!(null == e ? void 0 : e.versionMajor) && !!(null == e ? void 0 : e.consentsGroups))(o) ? o : void 0;
    return Object.assign(Object.assign(Object.assign({}, t), e), {}, {
        cookieConfiguration: n,
        i18nPreferences: e.i18n || t.i18n
    })
})(C)).getPublicApi())
})();
//# sourceMappingURL=index.es6-pl-PL_cf151055.js.map