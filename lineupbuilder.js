/**
 * Created by Swami on 12/19/15.
 */
/*! @source http://purl.eligrey.com/github/FileSaver.js/blob/master/FileSaver.js */ ;
var saveAs = saveAs || typeof navigator !== "undefined" && navigator.msSaveOrOpenBlob && navigator.msSaveOrOpenBlob.bind(navigator) || function(l) {
        if (typeof navigator !== "undefined" && /MSIE [1-9]\./.test(navigator.userAgent)) {
            return
        }
        var m = l.document,
            i = function() {
                return l.URL || l.webkitURL || l
            },
            p = m.createElementNS("http://www.w3.org/1999/xhtml", "a"),
            d = "download" in p,
            q = function(s) {
                var r = m.createEvent("MouseEvents");
                r.initMouseEvent("click", true, false, l, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
                s.dispatchEvent(r)
            },
            g = l.webkitRequestFileSystem,
            n = l.requestFileSystem || g || l.mozRequestFileSystem,
            e = function(r) {
                (l.setImmediate || l.setTimeout)(function() {
                    throw r
                }, 0)
            },
            k = "application/octet-stream",
            h = 0,
            c = 500,
            o = function(s) {
                var r = function() {
                    if (typeof s === "string") {
                        i().revokeObjectURL(s)
                    } else {
                        s.remove()
                    }
                };
                if (l.chrome) {
                    r()
                } else {
                    setTimeout(r, c)
                }
            },
            j = function(s, r, v) {
                r = [].concat(r);
                var u = r.length;
                while (u--) {
                    var w = s["on" + r[u]];
                    if (typeof w === "function") {
                        try {
                            w.call(s, v || s)
                        } catch (t) {
                            e(t)
                        }
                    }
                }
            },
            b = function(r, s) {
                var t = this,
                    z = r.type,
                    C = false,
                    v, u, y = function() {
                        j(t, "writestart progress write writeend".split(" "))
                    },
                    B = function() {
                        if (C || !v) {
                            v = i().createObjectURL(r)
                        }
                        if (u) {
                            u.location.href = v
                        } else {
                            var D = l.open(v, "_blank");
                            if (D == undefined && typeof safari !== "undefined") {
                                l.location.href = v
                            }
                        }
                        t.readyState = t.DONE;
                        y();
                        o(v)
                    },
                    x = function(D) {
                        return function() {
                            if (t.readyState !== t.DONE) {
                                return D.apply(this, arguments)
                            }
                        }
                    },
                    w = {
                        create: true,
                        exclusive: false
                    },
                    A;
                t.readyState = t.INIT;
                if (!s) {
                    s = "download"
                }
                if (d) {
                    v = i().createObjectURL(r);
                    p.href = v;
                    p.download = s;
                    q(p);
                    t.readyState = t.DONE;
                    y();
                    o(v);
                    return
                }
                if (l.chrome && z && z !== k) {
                    A = r.slice || r.webkitSlice;
                    r = A.call(r, 0, r.size, k);
                    C = true
                }
                if (g && s !== "download") {
                    s += ".download"
                }
                if (z === k || g) {
                    u = l
                }
                if (!n) {
                    B();
                    return
                }
                h += r.size;
                n(l.TEMPORARY, h, x(function(D) {
                    D.root.getDirectory("saved", w, x(function(E) {
                        var F = function() {
                            E.getFile(s, w, x(function(G) {
                                G.createWriter(x(function(H) {
                                    H.onwriteend = function(I) {
                                        u.location.href = G.toURL();
                                        t.readyState = t.DONE;
                                        j(t, "writeend", I);
                                        o(G)
                                    };
                                    H.onerror = function() {
                                        var I = H.error;
                                        if (I.code !== I.ABORT_ERR) {
                                            B()
                                        }
                                    };
                                    "writestart progress write abort".split(" ").forEach(function(I) {
                                        H["on" + I] = t["on" + I]
                                    });
                                    H.write(r);
                                    t.abort = function() {
                                        H.abort();
                                        t.readyState = t.DONE
                                    };
                                    t.readyState = t.WRITING
                                }), B)
                            }), B)
                        };
                        E.getFile(s, {
                            create: false
                        }, x(function(G) {
                            G.remove();
                            F()
                        }), x(function(G) {
                            if (G.code === G.NOT_FOUND_ERR) {
                                F()
                            } else {
                                B()
                            }
                        }))
                    }), B)
                }), B)
            },
            a = b.prototype,
            f = function(r, s) {
                return new b(r, s)
            };
        a.abort = function() {
            var r = this;
            r.readyState = r.DONE;
            j(r, "abort")
        };
        a.readyState = a.INIT = 0;
        a.WRITING = 1;
        a.DONE = 2;
        a.error = a.onwritestart = a.onprogress = a.onwrite = a.onabort = a.onerror = a.onwriteend = null;
        return f
    }(typeof self !== "undefined" && self || typeof window !== "undefined" && window || this.content);
if (typeof module !== "undefined" && module.exports) {
    module.exports.saveAs = saveAs
} else {
    if (typeof define !== "undefined" && define !== null && define.amd != null) {
        define([], function() {
            return saveAs
        })
    }
};
/*!
 Papa Parse
 v4.0.7
 https://github.com/mholt/PapaParse
 */
;
! function(N) {
    function M(p, o) {
        var n = y ? o : C(o),
            l = n.worker && Papa.WORKERS_SUPPORTED && z;
        if (l) {
            var i = F();
            i.userStep = n.step, i.userChunk = n.chunk, i.userComplete = n.complete, i.userError = n.error, n.step = A(n.step), n.chunk = A(n.chunk), n.complete = A(n.complete), n.error = A(n.error), delete n.worker, i.postMessage({
                input: p,
                config: n,
                workerId: i.id
            })
        } else {
            if ("string" == typeof p) {
                if (!n.download) {
                    var f = new I(n),
                        e = f.parse(p);
                    return e
                }
                var d = new K(n);
                d.stream(p)
            } else {
                if (N.File && p instanceof File || p instanceof Object) {
                    if (n.step || n.chunk) {
                        var d = new J(n);
                        d.stream(p)
                    } else {
                        var f = new I(n);
                        if (y) {
                            var a = new FileReaderSync,
                                t = a.readAsText(p, n.encoding);
                            return f.parse(t)
                        }
                        a = new FileReader, a.onload = function(g) {
                            var c = new I(n);
                            c.parse(g.target.result)
                        }, a.onerror = function() {
                            A(n.error) && n.error(a.error, p)
                        }, a.readAsText(p, n.encoding)
                    }
                }
            }
        }
    }

    function L(t, s) {
        function r() {
            "object" == typeof s && ("string" == typeof s.delimiter && 1 == s.delimiter.length && -1 == N.Papa.BAD_DELIMITERS.indexOf(s.delimiter) && (l = s.delimiter), ("boolean" == typeof s.quotes || s.quotes instanceof Array) && (m = s.quotes), "string" == typeof s.newline && (a = s.newline))
        }

        function q(e) {
            if ("object" != typeof e) {
                return []
            }
            var d = [];
            for (var f in e) {
                d.push(f)
            }
            return d
        }

        function p(U, T) {
            var S = "";
            "string" == typeof U && (U = JSON.parse(U)), "string" == typeof T && (T = JSON.parse(T));
            var R = U instanceof Array && U.length > 0,
                Q = !(T[0] instanceof Array);
            if (R) {
                for (var P = 0; P < U.length; P++) {
                    P > 0 && (S += l), S += o(U[P], P)
                }
                T.length > 0 && (S += a)
            }
            for (var O = 0; O < T.length; O++) {
                for (var k = R ? U.length : T[O].length, j = 0; k > j; j++) {
                    j > 0 && (S += l);
                    var g = R && Q ? U[j] : j;
                    S += o(T[O][g], j)
                }
                O < T.length - 1 && (S += a)
            }
            return S
        }

        function o(e, g) {
            if ("undefined" == typeof e || null === e) {
                return ""
            }
            e = e.toString().replace(/"/g, '""');
            var f = "boolean" == typeof m && m || m instanceof Array && m[g] || n(e, N.Papa.BAD_DELIMITERS) || e.indexOf(l) > -1 || " " == e.charAt(0) || " " == e.charAt(e.length - 1);
            return f ? '"' + e + '"' : e
        }

        function n(e, d) {
            for (var f = 0; f < d.length; f++) {
                if (e.indexOf(d[f]) > -1) {
                    return !0
                }
            }
            return !1
        }
        var m = !1,
            l = ",",
            a = "\r\n";
        if (r(), "string" == typeof t && (t = JSON.parse(t)), t instanceof Array) {
            if (!t.length || t[0] instanceof Array) {
                return p(null, t)
            }
            if ("object" == typeof t[0]) {
                return p(q(t[0]), t)
            }
        } else {
            if ("object" == typeof t) {
                return "string" == typeof t.data && (t.data = JSON.parse(t.data)), t.data instanceof Array && (t.fields || (t.fields = t.data[0] instanceof Array ? t.fields : q(t.data[0])), t.data[0] instanceof Array || "object" == typeof t.data[0] || (t.data = [t.data])), p(t.fields || [], t.data || [])
            }
        }
        throw "exception: Unable to serialize unrecognized input"
    }

    function K(aa) {
        function Z() {
            if (R) {
                return void Y()
            }
            if (U = new XMLHttpRequest, y || (U.onload = Y, U.onerror = X), U.open("GET", T, !y), aa.step || aa.chunk) {
                var b = p + O.chunkSize - 1;
                n && b > n && (b = n), U.setRequestHeader("Range", "bytes=" + p + "-" + b)
            }
            try {
                U.send()
            } catch (d) {
                X(d.message)
            }
            y && 0 == U.status ? X() : p += O.chunkSize
        }

        function Y() {
            if (4 == U.readyState) {
                if (U.status < 200 || U.status >= 400) {
                    return void X()
                }
                if (f += a + U.responseText, a = "", R = !aa.step && !aa.chunk || p > W(U), !R) {
                    var g = f.lastIndexOf("\r");
                    if (-1 == g && (g = f.lastIndexOf("\n")), -1 == g) {
                        return void S()
                    }
                    a = f.substring(g + 1), f = f.substring(0, g)
                }
                var e = P.parse(f);
                f = "", e && e.data && (m += e.data.length);
                var b = R || O.preview && m >= O.preview;
                y ? N.postMessage({
                    results: e,
                    workerId: Papa.WORKER_ID,
                    finished: b
                }) : A(aa.chunk) && (aa.chunk(e, P), e = void 0), A(Q) && b && Q(e), b || e && e.meta.paused || S()
            }
        }

        function X(e) {
            var b = U.statusText || e;
            A(aa.error) ? aa.error(b) : y && aa.error && N.postMessage({
                workerId: Papa.WORKER_ID,
                error: b,
                finished: !1
            })
        }

        function W(d) {
            var c = d.getResponseHeader("Content-Range");
            return parseInt(c.substr(c.lastIndexOf("/") + 1))
        }

        function V(b) {
            O = B(b), Q = O.complete, O.complete = void 0, O.chunkSize = parseInt(O.chunkSize), P = new I(O), P.streamer = this
        }
        aa = aa || {}, aa.chunkSize || (aa.chunkSize = Papa.RemoteChunkSize);
        var U, T, S, R, Q, P, O, p = 0,
            n = 0,
            m = 0,
            f = "",
            a = "";
        V(aa), this.resume = function() {
            paused = !1, S()
        }, this.finished = function() {
            return R
        }, this.pause = function() {
            paused = !0
        }, this.abort = function() {
            R = !0, A(Q) && Q({
                data: [],
                errors: [],
                meta: {
                    aborted: !0
                }
            })
        }, this.stream = function(b) {
            T = b, (S = y ? function() {
                Z(), Y()
            } : function() {
                Z()
            })()
        }
    }

    function J(ac) {
        function ab() {
            T || Q.preview && !(n < Q.preview) || aa()
        }

        function aa() {
            var b = Math.min(P + Q.chunkSize, W.size),
                d = U.readAsText(V.call(W, P, b), ac.encoding);
            a || Z({
                target: {
                    result: d
                }
            })
        }

        function Z(i) {
            if (P += Q.chunkSize, O += p + i.target.result, p = "", T = P >= W.size, !T) {
                var h = O.lastIndexOf("\r");
                if (-1 == h && (h = O.lastIndexOf("\n")), -1 == h) {
                    return void ab()
                }
                p = O.substring(h + 1), O = O.substring(0, h)
            }
            var c = R.parse(O);
            O = "", c && c.data && (n += c.data.length);
            var b = T || Q.preview && n >= Q.preview;
            if (y) {
                N.postMessage({
                    results: c,
                    workerId: Papa.WORKER_ID,
                    finished: b
                })
            } else {
                if (A(ac.chunk)) {
                    if (ac.chunk(c, f, W), m) {
                        return
                    }
                    c = void 0
                }
            }
            A(S) && b && S(c), b || c && c.meta.paused || ab()
        }

        function Y() {
            A(ac.error) ? ac.error(U.error, W) : y && ac.error && N.postMessage({
                workerId: Papa.WORKER_ID,
                error: U.error,
                file: W,
                finished: !1
            })
        }

        function X(b) {
            Q = B(b), S = Q.complete, Q.complete = void 0, Q.chunkSize = parseInt(Q.chunkSize), R = new I(Q), R.streamer = this
        }
        ac = ac || {}, ac.chunkSize || (ac.chunkSize = Papa.LocalChunkSize);
        var W, V, U, ab, V, T, S, R, Q, P = 0,
            O = "",
            p = "",
            n = 0,
            m = !1,
            f = this;
        X(ac);
        var a = "undefined" != typeof FileReader;
        this.stream = function(b) {
            W = b, V = W.slice || W.webkitSlice || W.mozSlice, a ? (U = new FileReader, U.onload = Z, U.onerror = Y) : U = new FileReaderSync, ab()
        }, this.finished = function() {
            return T
        }, this.pause = function() {
            m = !0
        }, this.resume = function() {
            m = !1, ab()
        }, this.abort = function() {
            T = !0, A(S) && S({
                data: [],
                errors: [],
                meta: {
                    aborted: !0
                }
            })
        }
    }

    function I(ad) {
        function ac() {
            if (m && S && (V("Delimiter", "UndetectableDelimiter", "Unable to auto-detect delimiting character; defaulted to '" + Papa.DefaultDelimiter + "'"), S = !1), ad.skipEmptyLines) {
                for (var a = 0; a < m.data.length; a++) {
                    1 == m.data[a].length && "" == m.data[a][0] && m.data.splice(a--, 1)
                }
            }
            return ab() && aa(), Z()
        }

        function ab() {
            return ad.header && 0 == n.length
        }

        function aa() {
            if (m) {
                for (var d = 0; ab() && d < m.data.length; d++) {
                    for (var c = 0; c < m.data[d].length; c++) {
                        n.push(m.data[d][c])
                    }
                }
                m.data.splice(0, 1)
            }
        }

        function Z() {
            if (!m || !ad.header && !ad.dynamicTyping) {
                return m
            }
            for (var a = 0; a < m.data.length; a++) {
                for (var i = {}, h = 0; h < m.data[a].length; h++) {
                    if (ad.dynamicTyping) {
                        var f = m.data[a][h];
                        m.data[a][h] = "true" == f ? !0 : "false" == f ? !1 : W(f)
                    }
                    ad.header && (h >= n.length ? (i.__parsed_extra || (i.__parsed_extra = []), i.__parsed_extra.push(m.data[a][h])) : i[n[h]] = m.data[a][h])
                }
                ad.header && (m.data[a] = i, h > n.length ? V("FieldMismatch", "TooManyFields", "Too many fields: expected " + n.length + " fields but parsed " + h, a) : h < n.length && V("FieldMismatch", "TooFewFields", "Too few fields: expected " + n.length + " fields but parsed " + h, a))
            }
            return ad.header && m.meta && (m.meta.fields = n), m
        }

        function Y(ai) {
            for (var ah, ag, af, ae = [",", "	", "|", ";", Papa.RECORD_SEP, Papa.UNIT_SEP], t = 0; t < ae.length; t++) {
                var s = ae[t],
                    r = 0,
                    q = 0;
                af = void 0;
                for (var p = new H({
                    delimiter: s,
                    preview: 10
                }).parse(ai), o = 0; o < p.data.length; o++) {
                    var a = p.data[o].length;
                    q += a, "undefined" != typeof af ? a > 1 && (r += Math.abs(a - af), af = a) : af = a
                }
                q /= p.data.length, ("undefined" == typeof ag || ag > r) && q > 1.99 && (ag = r, ah = s)
            }
            return ad.delimiter = ah, {
                successful: !!ah,
                bestDelimiter: ah
            }
        }

        function X(f) {
            f = f.substr(0, 1048576);
            var e = f.split("\r");
            if (1 == e.length) {
                return "\n"
            }
            for (var i = 0, h = 0; h < e.length; h++) {
                "\n" == e[h][0] && i++
            }
            return i >= e.length / 2 ? "\r\n" : "\r"
        }

        function W(d) {
            var c = R.test(d);
            return c ? parseFloat(d) : d
        }

        function V(f, e, i, h) {
            m.errors.push({
                type: f,
                code: e,
                message: i,
                row: h
            })
        }
        var U, T, S, R = /^\s*-?(\d*\.?\d+|\d+\.?\d*)(e[-+]?\d+)?\s*$/i,
            Q = this,
            P = 0,
            O = !1,
            n = [],
            m = {
                data: [],
                errors: [],
                meta: {}
            };
        if (A(ad.step)) {
            var g = ad.step;
            ad.step = function(a) {
                if (m = a, ab()) {
                    ac()
                } else {
                    if (ac(), 0 == m.data.length) {
                        return
                    }
                    P += a.data.length, ad.preview && P > ad.preview ? T.abort() : g(m, Q)
                }
            }
        }
        this.parse = function(f) {
            if (ad.newline || (ad.newline = X(f)), S = !1, !ad.delimiter) {
                var b = Y(f);
                b.successful ? ad.delimiter = b.bestDelimiter : (S = !0, ad.delimiter = Papa.DefaultDelimiter), m.meta.delimiter = ad.delimiter
            }
            var a = B(ad);
            return ad.preview && ad.header && a.preview++, U = f, T = new H(a), m = T.parse(U), ac(), !A(ad.complete) || O || Q.streamer && !Q.streamer.finished() || ad.complete(m), O ? {
                meta: {
                    paused: !0
                }
            } : m || {
                meta: {
                    paused: !1
                }
            }
        }, this.pause = function() {
            O = !0, T.abort(), U = U.substr(T.getCharIndex())
        }, this.resume = function() {
            O = !1, T = new H(ad), T.parse(U), O || (Q.streamer && !Q.streamer.finished() ? Q.streamer.resume() : A(ad.complete) && ad.complete(m))
        }, this.abort = function() {
            T.abort(), A(ad.complete) && ad.complete(m), U = ""
        }
    }

    function H(r) {
        r = r || {};
        var q = r.delimiter,
            p = r.newline,
            o = r.comments,
            n = r.step,
            m = r.preview,
            l = r.fastMode;
        if (("string" != typeof q || 1 != q.length || Papa.BAD_DELIMITERS.indexOf(q) > -1) && (q = ","), o === q) {
            throw "Comment character same as delimiter"
        }
        o === !0 ? o = "#" : ("string" != typeof o || Papa.BAD_DELIMITERS.indexOf(o) > -1) && (o = !1), "\n" != p && "\r" != p && "\r\n" != p && (p = "\n");
        var k = 0,
            j = !1;
        this.parse = function(X) {
            function W() {
                return g.push(X.substr(k)), i.push(g), k = S, O && T(), U()
            }

            function V(a) {
                i.push(g), g = [], k = a, c = X.indexOf(p, k)
            }

            function U(s) {
                return {
                    data: i,
                    errors: h,
                    meta: {
                        delimiter: q,
                        linebreak: p,
                        aborted: j,
                        truncated: !!s
                    }
                }
            }

            function T() {
                n(U()), i = [], h = []
            }
            if ("string" != typeof X) {
                throw "Input must be a string"
            }
            var S = X.length,
                R = q.length,
                Q = p.length,
                P = o.length,
                O = "function" == typeof n;
            k = 0;
            var i = [],
                h = [],
                g = [];
            if (!X) {
                return U()
            }
            if (l) {
                for (var f = X.split(p), e = 0; e < f.length; e++) {
                    if (!o || f[e].substr(0, P) != o) {
                        if (O) {
                            if (i = [f[e].split(q)], T(), j) {
                                return U()
                            }
                        } else {
                            i.push(f[e].split(q))
                        }
                        if (m && e >= m) {
                            return i = i.slice(0, m), U(!0)
                        }
                    }
                }
                return U()
            }
            for (var d = X.indexOf(q, k), c = X.indexOf(p, k);;) {
                if ('"' != X[k]) {
                    if (o && 0 === g.length && X.substr(k, P) === o) {
                        if (-1 == c) {
                            return U()
                        }
                        k = c + Q, c = X.indexOf(p, k), d = X.indexOf(q, k)
                    } else {
                        if (-1 !== d && (c > d || -1 === c)) {
                            g.push(X.substring(k, d)), k = d + R, d = X.indexOf(q, k)
                        } else {
                            if (-1 === c) {
                                break
                            }
                            if (g.push(X.substring(k, c)), V(c + Q), O && (T(), j)) {
                                return U()
                            }
                            if (m && i.length >= m) {
                                return U(!0)
                            }
                        }
                    }
                } else {
                    var b = k;
                    for (k++;;) {
                        var b = X.indexOf('"', b + 1);
                        if (-1 === b) {
                            return h.push({
                                type: "Quotes",
                                code: "MissingQuotes",
                                message: "Quoted field unterminated",
                                row: i.length,
                                index: k
                            }), W()
                        }
                        if (b === S - 1) {
                            return g.push(X.substring(k, b).replace(/""/g, '"')), i.push(g), O && T(), U()
                        }
                        if ('"' != X[b + 1]) {
                            if (X[b + 1] == q) {
                                g.push(X.substring(k, b).replace(/""/g, '"')), k = b + 1 + R, d = X.indexOf(q, k), c = X.indexOf(p, k);
                                break
                            }
                            if (X.substr(b + 1, Q) === p) {
                                if (g.push(X.substring(k, b).replace(/""/g, '"')), V(b + 1 + Q), d = X.indexOf(q, k), O && (T(), j)) {
                                    return U()
                                }
                                if (m && i.length >= m) {
                                    return U(!0)
                                }
                                break
                            }
                        } else {
                            b++
                        }
                    }
                }
            }
            return W()
        }, this.abort = function() {
            j = !0
        }, this.getCharIndex = function() {
            return k
        }
    }

    function G() {
        var b = "worker" + String(Math.random()).substr(2);
        return document.write('<script id="' + b + '"><\/script>'), document.getElementById(b).previousSibling.src
    }

    function F() {
        if (!Papa.WORKERS_SUPPORTED) {
            return !1
        }
        var a = new N.Worker(z);
        return a.onmessage = E, a.id = w++, x[a.id] = a, a
    }

    function E(f) {
        var e = f.data,
            h = x[e.workerId];
        if (e.error) {
            h.userError(e.error, e.file)
        } else {
            if (e.results && e.results.data) {
                if (A(h.userStep)) {
                    for (var g = 0; g < e.results.data.length; g++) {
                        h.userStep({
                            data: [e.results.data[g]],
                            errors: e.results.errors,
                            meta: e.results.meta
                        })
                    }
                    delete e.results
                } else {
                    A(h.userChunk) && (h.userChunk(e.results, e.file), delete e.results)
                }
            }
        }
        e.finished && (A(x[e.workerId].userComplete) && x[e.workerId].userComplete(e.results), x[e.workerId].terminate(), delete x[e.workerId])
    }

    function D(a) {
        var f = a.data;
        if ("undefined" == typeof Papa.WORKER_ID && f && (Papa.WORKER_ID = f.workerId), "string" == typeof f.input) {
            N.postMessage({
                workerId: Papa.WORKER_ID,
                results: Papa.parse(f.input, f.config),
                finished: !0
            })
        } else {
            if (N.File && f.input instanceof File || f.input instanceof Object) {
                var e = Papa.parse(f.input, f.config);
                e && N.postMessage({
                    workerId: Papa.WORKER_ID,
                    results: e,
                    finished: !0
                })
            }
        }
    }

    function C(d) {
        "object" != typeof d && (d = {});
        var c = B(d);
        return ("string" != typeof c.delimiter || 1 != c.delimiter.length || Papa.BAD_DELIMITERS.indexOf(c.delimiter) > -1) && (c.delimiter = v.delimiter), "\n" != c.newline && "\r" != c.newline && "\r\n" != c.newline && (c.newline = v.newline), "boolean" != typeof c.header && (c.header = v.header), "boolean" != typeof c.dynamicTyping && (c.dynamicTyping = v.dynamicTyping), "number" != typeof c.preview && (c.preview = v.preview), "function" != typeof c.step && (c.step = v.step), "function" != typeof c.complete && (c.complete = v.complete), "function" != typeof c.error && (c.error = v.error), "string" != typeof c.encoding && (c.encoding = v.encoding), "boolean" != typeof c.worker && (c.worker = v.worker), "boolean" != typeof c.download && (c.download = v.download), "boolean" != typeof c.skipEmptyLines && (c.skipEmptyLines = v.skipEmptyLines), "boolean" != typeof c.fastMode && (c.fastMode = v.fastMode), c
    }

    function B(e) {
        if ("object" != typeof e) {
            return e
        }
        var d = e instanceof Array ? [] : {};
        for (var f in e) {
            d[f] = B(e[f])
        }
        return d
    }

    function A(b) {
        return "function" == typeof b
    }
    var z, y = !N.document,
        x = {},
        w = 0,
        v = {
            delimiter: "",
            newline: "",
            header: !1,
            dynamicTyping: !1,
            preview: 0,
            step: void 0,
            encoding: "",
            worker: !1,
            comments: !1,
            complete: void 0,
            error: void 0,
            download: !1,
            chunk: void 0,
            skipEmptyLines: !1,
            fastMode: !1
        };
    if (N.Papa = {}, N.Papa.parse = M, N.Papa.unparse = L, N.Papa.RECORD_SEP = String.fromCharCode(30), N.Papa.UNIT_SEP = String.fromCharCode(31), N.Papa.BYTE_ORDER_MARK = "", N.Papa.BAD_DELIMITERS = ["\r", "\n", '"', N.Papa.BYTE_ORDER_MARK], N.Papa.WORKERS_SUPPORTED = !!N.Worker, N.Papa.LocalChunkSize = 10485760, N.Papa.RemoteChunkSize = 5242880, N.Papa.DefaultDelimiter = ",", N.Papa.Parser = H, N.Papa.ParserHandle = I, N.Papa.NetworkStreamer = K, N.Papa.FileStreamer = J, N.jQuery) {
        var u = N.jQuery;
        u.fn.parse = function(a) {
            function l() {
                if (0 == h.length) {
                    return void(A(a.complete) && a.complete())
                }
                var b = h[0];
                if (A(a.before)) {
                    var e = a.before(b.file, b.inputElem);
                    if ("object" == typeof e) {
                        if ("abort" == e.action) {
                            return void k("AbortError", b.file, b.inputElem, e.reason)
                        }
                        if ("skip" == e.action) {
                            return void j()
                        }
                        "object" == typeof e.config && (b.instanceConfig = u.extend(b.instanceConfig, e.config))
                    } else {
                        if ("skip" == e) {
                            return void j()
                        }
                    }
                }
                var d = b.instanceConfig.complete;
                b.instanceConfig.complete = function(c) {
                    A(d) && d(c, b.file, b.inputElem), j()
                }, Papa.parse(b.file, b.instanceConfig)
            }

            function k(b, m, g, f) {
                A(a.error) && a.error({
                    name: b
                }, m, g, f)
            }

            function j() {
                h.splice(0, 1), l()
            }
            var i = a.config || {},
                h = [];
            return this.each(function() {
                var d = "INPUT" == u(this).prop("tagName").toUpperCase() && "file" == u(this).attr("type").toLowerCase() && N.FileReader;
                if (!d || !this.files || 0 == this.files.length) {
                    return !0
                }
                for (var e = 0; e < this.files.length; e++) {
                    h.push({
                        file: this.files[e],
                        inputElem: this,
                        instanceConfig: u.extend({}, i)
                    })
                }
            }), l(), this
        }
    }
    y ? N.onmessage = D : Papa.WORKERS_SUPPORTED && (z = G())
}(this);
(function() {
    var i = typeof module !== "undefined" && module.exports;
    var j = !(typeof window !== "undefined" && this === window);
    var d = d || function(k) {
            setTimeout(k, 0)
        };
    var e = j ? require(__dirname + "/Worker.js") : self.Worker;
    var h = typeof self !== "undefined" ? (self.URL ? self.URL : self.webkitURL) : null;
    var a = (j || self.Worker) ? true : false;

    function g(m, l) {
        if (!l) {
            l = {}
        }
        for (var k in m) {
            if (l[k] === undefined) {
                l[k] = m[k]
            }
        }
        return l
    }

    function f() {
        this._callbacks = [];
        this._errCallbacks = [];
        this._resolved = 0;
        this._result = null
    }
    f.prototype.resolve = function(m, l) {
        if (!m) {
            this._resolved = 1;
            this._result = l;
            for (var k = 0; k < this._callbacks.length; ++k) {
                this._callbacks[k](l)
            }
        } else {
            this._resolved = 2;
            this._result = m;
            for (var n = 0; n < this._errCallbacks.length; ++n) {
                this._errCallbacks[n](m)
            }
        }
        this._callbacks = [];
        this._errCallbacks = []
    };
    f.prototype.then = function(k, l) {
        if (this._resolved === 1) {
            if (k) {
                k(this._result)
            }
            return
        } else {
            if (this._resolved === 2) {
                if (l) {
                    l(this._result)
                }
                return
            }
        }
        if (k) {
            this._callbacks[this._callbacks.length] = k
        }
        if (l) {
            this._errCallbacks[this._errCallbacks.length] = l
        }
        return this
    };
    var c = {
        evalPath: j ? __dirname + "/eval.js" : null,
        maxWorkers: j ? require("os").cpus().length : (navigator.hardwareConcurrency || 4),
        synchronous: true,
        env: {},
        envNamespace: "env"
    };

    function b(l, k) {
        this.data = l;
        this.options = g(c, k);
        this.operation = new f();
        this.operation.resolve(null, this.data);
        this.requiredScripts = [];
        this.requiredFunctions = []
    }
    b.isSupported = function() {
        return a
    };
    b.prototype.getWorkerSource = function(k, o) {
        var p = this;
        var l = "";
        var m = 0;
        if (!j && this.requiredScripts.length !== 0) {
            l += 'importScripts("' + this.requiredScripts.join('","') + '");\r\n'
        }
        for (m = 0; m < this.requiredFunctions.length; ++m) {
            if (this.requiredFunctions[m].name) {
                l += "var " + this.requiredFunctions[m].name + " = " + this.requiredFunctions[m].fn.toString() + ";"
            } else {
                l += this.requiredFunctions[m].fn.toString()
            }
        }
        o = JSON.stringify(o || {});
        var n = this.options.envNamespace;
        if (j) {
            return l + 'process.on("message", function(e) {global.' + n + " = " + o + ";process.send(JSON.stringify((" + k.toString() + ")(JSON.parse(e).data)))})"
        } else {
            return l + "self.onmessage = function(e) {var global = {}; global." + n + " = " + o + ";self.postMessage((" + k.toString() + ")(e.data))}"
        }
    };
    b.prototype.require = function() {
        var k = Array.prototype.slice.call(arguments, 0),
            m;
        for (var l = 0; l < k.length; l++) {
            m = k[l];
            if (typeof m === "string") {
                this.requiredScripts.push(m)
            } else {
                if (typeof m === "function") {
                    this.requiredFunctions.push({
                        fn: m
                    })
                } else {
                    if (typeof m === "object") {
                        this.requiredFunctions.push(m)
                    }
                }
            }
        }
        return this
    };
    b.prototype._spawnWorker = function(k, n) {
        var o;
        var q = this.getWorkerSource(k, n);
        if (j) {
            o = new e(this.options.evalPath);
            o.postMessage(q)
        } else {
            if (e === undefined) {
                return undefined
            }
            try {
                if (this.requiredScripts.length !== 0) {
                    if (this.options.evalPath !== null) {
                        o = new e(this.options.evalPath);
                        o.postMessage(q)
                    } else {
                        throw new Error("Can't use required scripts without eval.js!")
                    }
                } else {
                    if (!h) {
                        throw new Error("Can't create a blob URL in this browser!")
                    } else {
                        var l = new Blob([q], {
                            type: "text/javascript"
                        });
                        var m = h.createObjectURL(l);
                        o = new e(m)
                    }
                }
            } catch (p) {
                if (this.options.evalPath !== null) {
                    o = new e(this.options.evalPath);
                    o.postMessage(q)
                } else {
                    throw p
                }
            }
        }
        return o
    };
    b.prototype.spawn = function(k, m) {
        var n = this;
        var l = new f();
        m = g(this.options.env, m || {});
        this.operation.then(function() {
            var o = n._spawnWorker(k, m);
            if (o !== undefined) {
                o.onmessage = function(p) {
                    o.terminate();
                    n.data = p.data;
                    l.resolve(null, n.data)
                };
                o.onerror = function(p) {
                    o.terminate();
                    l.resolve(p, null)
                };
                o.postMessage(n.data)
            } else {
                if (n.options.synchronous) {
                    d(function() {
                        try {
                            n.data = k(n.data);
                            l.resolve(null, n.data)
                        } catch (p) {
                            l.resolve(p, null)
                        }
                    })
                } else {
                    throw new Error("Workers do not exist and synchronous operation not allowed!")
                }
            }
        });
        this.operation = l;
        return this
    };
    b.prototype._spawnMapWorker = function(m, k, l, n, p) {
        var o = this;
        if (!p) {
            p = o._spawnWorker(k, n)
        }
        if (p !== undefined) {
            p.onmessage = function(q) {
                o.data[m] = q.data;
                l(null, p)
            };
            p.onerror = function(q) {
                p.terminate();
                l(q)
            };
            p.postMessage(o.data[m])
        } else {
            if (o.options.synchronous) {
                d(function() {
                    o.data[m] = k(o.data[m]);
                    l()
                })
            } else {
                throw new Error("Workers do not exist and synchronous operation not allowed!")
            }
        }
    };
    b.prototype.map = function(k, o) {
        o = g(this.options.env, o || {});
        if (!this.data.length) {
            return this.spawn(k, o)
        }
        var p = this;
        var q = 0;
        var n = 0;

        function l(r, s) {
            if (r) {
                m.resolve(r, null)
            } else {
                if (++n === p.data.length) {
                    m.resolve(null, p.data);
                    if (s) {
                        s.terminate()
                    }
                } else {
                    if (q < p.data.length) {
                        p._spawnMapWorker(q++, k, l, o, s)
                    } else {
                        if (s) {
                            s.terminate()
                        }
                    }
                }
            }
        }
        var m = new f();
        this.operation.then(function() {
            for (; q - n < p.options.maxWorkers && q < p.data.length; ++q) {
                p._spawnMapWorker(q, k, l, o)
            }
        }, function(r) {
            m.resolve(r, null)
        });
        this.operation = m;
        return this
    };
    b.prototype._spawnReduceWorker = function(p, k, l, m, o) {
        var n = this;
        if (!o) {
            o = n._spawnWorker(k, m)
        }
        if (o !== undefined) {
            o.onmessage = function(q) {
                n.data[n.data.length] = q.data;
                l(null, o)
            };
            o.onerror = function(q) {
                o.terminate();
                l(q, null)
            };
            o.postMessage(p)
        } else {
            if (n.options.synchronous) {
                d(function() {
                    n.data[n.data.length] = k(p);
                    l()
                })
            } else {
                throw new Error("Workers do not exist and synchronous operation not allowed!")
            }
        }
    };
    b.prototype.reduce = function(k, o) {
        o = g(this.options.env, o || {});
        if (!this.data.length) {
            throw new Error("Can't reduce non-array data")
        }
        var n = 0;
        var p = this;

        function l(q, r) {
            --n;
            if (q) {
                m.resolve(q, null)
            } else {
                if (p.data.length === 1 && n === 0) {
                    p.data = p.data[0];
                    m.resolve(null, p.data);
                    if (r) {
                        r.terminate()
                    }
                } else {
                    if (p.data.length > 1) {
                        ++n;
                        p._spawnReduceWorker([p.data[0], p.data[1]], k, l, o, r);
                        p.data.splice(0, 2)
                    } else {
                        if (r) {
                            r.terminate()
                        }
                    }
                }
            }
        }
        var m = new f();
        this.operation.then(function() {
            if (p.data.length === 1) {
                m.resolve(null, p.data[0])
            } else {
                for (var q = 0; q < p.options.maxWorkers && q < Math.floor(p.data.length / 2); ++q) {
                    ++n;
                    p._spawnReduceWorker([p.data[q * 2], p.data[q * 2 + 1]], k, l, o)
                }
                p.data.splice(0, q * 2)
            }
        });
        this.operation = m;
        return this
    };
    b.prototype.then = function(k, n) {
        var m = this;
        var l = new f();
        n = typeof n === "function" ? n : function() {};
        this.operation.then(function() {
            var p;
            try {
                if (k) {
                    p = k(m.data);
                    if (p !== undefined) {
                        m.data = p
                    }
                }
                l.resolve(null, m.data)
            } catch (o) {
                if (n) {
                    p = n(o);
                    if (p !== undefined) {
                        m.data = p
                    }
                    l.resolve(null, m.data)
                } else {
                    l.resolve(null, o)
                }
            }
        }, function(o) {
            if (n) {
                var p = n(o);
                if (p !== undefined) {
                    m.data = p
                }
                l.resolve(null, m.data)
            } else {
                l.resolve(null, o)
            }
        });
        this.operation = l;
        return this
    };
    if (i) {
        module.exports = b
    } else {
        self.Parallel = b
    }
})();
var LineupBuilder = window.LineupBuilder = {
    Models: {},
    Collections: {},
    Views: {
        lineupTableRows: [],
        projection: [],
        savedLineups: [],
        savedLineupsParent: {},
        groupLineups: {
            1: [],
            2: [],
            3: [],
            4: [],
            5: [],
            6: [],
            7: [],
            8: [],
            9: [],
            10: []
        }
    },
    Routers: {},
    Site: "",
    Sport: "",
    Storage: {},
    LineupGroups: {
        1: {},
        2: {},
        3: {}
    },
    init: function(b, e) {
        _.extend(this, LineupBuilder.marketplace);
        _.extend(this, LineupBuilderStorage);
        _.extend(this, LBSliders);
        this.initErrorTracking();
        this.user = b;
        this.response = e;
        this.Site = $("#backbone-container").data("site");
        this.Sport = $("#backbone-container").data("sport");
        this.salaryCap = $("#backbone-container").data("salary-cap");
        this.Storage = this.getStorage();
        this.Correlations = Correlations;
        new LineupBuilderRouter({
            user: b
        });
        Backbone.history.start();
        $behaviors.addTabBehavior(".builder-selection .tabs li a[data-target]", ".builder-pools table.builder-players thead, .builder-pools table.builder-players tbody", function(f) {
            LineupBuilder.Collections.projections.trigger("filter")
        });
        $behaviors.addTabBehavior(".builder-lineups .builder-tabs li a", ".builder-generated, .builder-favorites, .builder-upload, .builder-player-pool");
        var d = new GameFilters();
        this.addResetBehavior();
        this.initCsvDownload();
        this.initCsvParser();
        this.initSliders();
        this.ExpertPlatform.initSaveLineups();
        this.initClearData();
        this.initCSVExport();
        this.initOpponentSettings();
        this.Correlations.initRules(this.Sport);
        this.initGenerateButton();
        this.initDeleteGroupLink();
        this.initCheckboxSettings();
        var c = $("#vendor-user-id").val();
        var a = LineupBuilder.ExpertPlatform.getLoadedProductId(LineupBuilder.Site, LineupBuilder.Sport);
        if (c) {
            LineupBuilder.ExpertPlatform.getVendorProduct({
                siteId: $("#site-id").val(),
                sportId: $("#sport-id").val(),
                vendorUserId: $("#vendor-user-id").val()
            }, function(f) {
                if (!f.id) {
                    LineupBuilder.ExpertPlatform.displayLoadedPackage({
                        showMessage: true
                    });
                    if (false === a) {
                        $("#save-lineups").show();
                        $("#product-form-data").show()
                    }
                } else {
                    if (f.id != a && false !== a) {
                        LineupBuilder.ExpertPlatform.displayLoadedPackage({
                            showMessage: true
                        })
                    } else {
                        $("#save-lineups").show();
                        $("#product-form-data").show();
                        if (false !== a) {
                            LineupBuilder.ExpertPlatform.displayLoadedPackage({
                                showMessage: false
                            })
                        } else {
                            LineupBuilder.ExpertPlatform.setLoadedPackage(f, function() {
                                LineupBuilder.ExpertPlatform.displayLoadedPackage({
                                    showMessage: false
                                })
                            })
                        }
                    }
                }
            })
        } else {
            LineupBuilder.ExpertPlatform.displayLoadedPackage({
                showMessage: true
            })
        }
    },
    initErrorTracking: function() {
        if (!window.trackJs) {
            return
        }["View", "Model", "Collection", "Router"].forEach(function(a) {
            var b = Backbone[a];
            Backbone[a] = b.extend({
                constructor: function() {
                    if (undefined === this._trackJs) {
                        this._trackJs = true
                    }
                    if (this._trackJs) {
                        window.trackJs.watchAll(this, "model", "comparator", "constructor")
                    }
                    return b.prototype.constructor.apply(this, arguments)
                }
            })
        })
    },
    getOptions: function() {
        var c = $("#min-salary-slider").data("value");
        var a = c / this.salaryCap;
        var b = LineupBuilder.getStorageOptions().flex || {};
        var d = LineupBuilder.getFlexSettings();
        b[LineupBuilder.Site] = d;
        return {
            correlations: Correlations.readRules("ids"),
            outputCount: $("#output-count-slider").data("value"),
            minSalary: a,
            variability: $("#variability-slider").data("value"),
            flex: b,
            lateFlex: $('input[name="late-flex"]').is(":checked"),
            maxExposure: $("#max-exposure-slider").data("value"),
            noOffVsDef: $('input[name="opponent-settings"]').is(":checked")
        }
    },
    getFlexSettings: function() {
        var a = {};
        $(".blk.slider.flex").each(function() {
            var c = $(this).data("label");
            var b = $(this).data("position");
            if (!a[c]) {
                a[c] = []
            }
            a[c].push({
                position: b,
                value: $(this).data("value")
            })
        });
        _.each(a, function(c, b) {
            a[b] = _.sortBy(c, function(d) {
                return d.value
            })
        });
        return a
    },
    initCheckboxSettings: function() {
        $('input[type="checkbox"].settings').each(function() {
            var a = $(this).data("setting");
            var b = LineupBuilder.getStorageOptions()[a];
            if (undefined !== b) {
                $(this).prop("checked", b)
            }
        });
        $('input[type="checkbox"].settings').on("change", function(a) {
            LineupBuilder.setStorageOptions(LineupBuilder.getOptions())
        })
    },
    addResetBehavior: function() {
        $(".reset-excluded").on("click", function(a) {
            a.preventDefault();
            if (confirm("Please confirm that you want to reset all of your excluded players.")) {
                LineupBuilder.resetExcludedPlayers()
            }
        });
        $(".reset-locked").on("click", function(a) {
            a.preventDefault();
            if (confirm("Please confirm that you want to reset all of your locked players.")) {
                LineupBuilder.Collections.projections.trigger("resetLocked")
            }
        });
        $(".reset-favorites").on("click", function(a) {
            a.preventDefault();
            if (confirm("Please confirm that you want to reset all of your favorite players.")) {
                LineupBuilder.Collections.projections.trigger("resetFavs")
            }
        });
        $(".reset-projections").on("click", function(a) {
            a.preventDefault();
            LineupBuilder.resetProjections()
        })
    },
    isNewGameSlate: function(c, a, b) {
        return LineupBuilder.Storage[c][a] != b
    },
    sortTable: function(b, f, a) {
        $("tr.note").remove();
        var g = $(b).find("tr").toArray().sort(e($(f).index()));
        if (f && !a) {
            f.asc = !f.asc
        }
        LineupBuilder.currentSortedHeader = f;
        if (f && f.asc) {
            g = g.reverse()
        }
        for (var d = 0; d < g.length; d++) {
            $(b).append(g[d])
        }

        function e(h) {
            return function(k, i) {
                var l = c(k, h),
                    j = c(i, h);
                return $.isNumeric(l) && $.isNumeric(j) ? l - j : l.localeCompare(j)
            }
        }

        function c(j, h) {
            var i = $(j).children("td").eq(h);
            if (i.data("sort") != undefined) {
                return i.data("sort")
            }
            return i.html()
        }
        $behaviors.reHighlightTable("tbody.projections-container", "#e2e2e2", "#f2f2f2")
    },
    renderTemplate: function(a, e, d) {
        var c = $(a).html();
        var b = Handlebars.compile(c);
        $(e).html(b(d))
    },
    resetExcludedPlayers: function() {
        _.each(LineupBuilder.Views.projection, function(b, c, a) {
            b.model.includePlayer(false)
        });
        _.each(LineupBuilder.Views.games, function(b, c, a) {
            b.model.set("exclude_home", false);
            b.model.set("exclude_away", false);
            b.render()
        });
        RGFilters.toggleFilter($(".lst.teams .game span"), "on", false);
        LineupBuilder.resetStorage("excluded");
        LineupBuilder.resetStorage("excludedGames");
        LineupBuilder.sortTable("tbody.projections-container", LineupBuilder.currentSortedHeader, true)
    },
    resetProjections: function() {
        $("#spinner").show();
        _.each(this.Storage[this.Sport].players, function(b, a) {
            LineupBuilder.deleteStoredFpts(b, a)
        });
        _.each(this.getPlayerPool(), function(a) {
            a.trigger("restoreFpts")
        });
        $("div.builder-upload-table table > tbody").empty();
        this.save();
        localStorage.removeItem(LineupBuilder.Keys.packages);
        $("#spinner").hide()
    },
    findViewByProjectionId: function(b, c) {
        var a = _.filter(b, function(d) {
            return d.model.get("id") == c
        });
        return a
    },
    deleteStoredFpts: function(b, a) {
        if (!b.fpts[this.Site] || !LineupBuilder.response.players[a]) {
            return false
        }
        delete b.fpts[LineupBuilder.Site]
    },
    initCSVExport: function() {
        $('a[data-action="faves-export-csv"]').on("click", function(a) {
            a.preventDefault();
            LineupBuilder.exportSaved()
        })
    },
    exportSaved: function() {
        var c = [];
        _.each(LineupBuilder.Collections.savedLineups.models, function(d) {
            var e = [];
            _.each(d.get("positions"), function(f, g) {
                e.push(f.player.first_name + " " + f.player.last_name)
            });
            c.push(e)
        });
        var a = Papa.unparse(c);
        var b = new Blob([a], {
            type: "text/csv;charset=utf-8"
        });
        saveAs(b, "saved_lineups.csv")
    },
    exportGenerated: function(d) {
        var e = [];
        var c = LineupBuilder.LineupGroups[d];
        _.each(c.models, function(f) {
            var g = [];
            _.each(f.get("positions"), function(h, i) {
                g.push(h.player.first_name + " " + h.player.last_name)
            });
            e.push(g)
        });
        var a = Papa.unparse(e);
        var b = new Blob([a], {
            type: "text/csv;charset=utf-8"
        });
        saveAs(b, "generated_lineups.csv")
    },
    getOpponentSettings: {
        mlb: {
            name: "No batters vs. pitchers",
            def: ["SP", "P"]
        },
        nhl: {
            name: "No offense vs. goalie",
            def: ["G"]
        },
        nfl: {
            name: "No offense vs. defense",
            def: ["D", "DEF", "DST"]
        }
    },
    initOpponentSettings: function() {
        var a = this.getOpponentSettings[this.Sport];
        if (a) {
            $(".blk.opponent-settings").show();
            $(".blk.opponent-settings label").text(a.name)
        }
    },
    readOpponentSetting: function() {
        var a = this.getOpponentSettings[this.Sport];
        if (a && $('input[name="opponent-settings"]').is(":checked")) {
            return a.def
        }
        return undefined
    },
    initGenerateButton: function() {
        $("a.btn.generate").on("click", function(d) {
            d.preventDefault();
            var c = $(this).data("action");
            var b = 0;
            var a = new Lineups([], {
                playerPool: LineupBuilder.Collections.projections
            });
            _.each(LineupBuilder.LineupGroups, function(f, e) {
                if (0 == b && $.isEmptyObject(f)) {
                    LineupBuilder.LineupGroups[e] = a;
                    a.groupId = b = e
                }
            });
            if (0 == b) {
                alert("Please delete an existing Group first before regenerating a new one.")
            } else {
                lineupsView = new GeneratedLineupsView({
                    collection: a,
                    user: LineupBuilder.user,
                    groupId: b
                });
                lineupsView.generateOptimal(c)
            }
        })
    },
    initDeleteGroupLink: function() {
        $("span[class=delete-generated]").on("click", function(b) {
            b.preventDefault();
            var a = $(this).data("groupid");
            if (undefined != a) {
                LineupBuilder.LineupGroups[a] = {};
                $("#builder-generated" + a).remove();
                $('[data-target="#builder-generated' + a + '"]').remove();
                $('[data-target=".builder-player-pool"]').click();
                LineupBuilder.removeLocal("lineupGroup", a)
            }
        })
    },
    getPlayerPool: function() {
        var a = [];
        a = a.concat(LineupBuilder.Collections.projections.models);
        return a
    }
};
var Correlations = {
    nfl: {
        sameTeam: {
            1: {
                title: "No QB/RB/K From Same Team",
                positions: ["QB", "RB", "K"]
            },
            2: {
                title: "No RB/WR/TE/K From Same Team",
                positions: ["RB", "WR", "TE", "K"]
            }
        }
    },
    initRules: function(b) {
        var a = LineupBuilder.getStorageOptions().correlations;
        _.each(this[b], function(c, d) {
            _.each(c, function(g, e) {
                var f = a && _.contains(a[d], Number(e)) ? "checked" : "";
                $(".blk.correlations").show().append('<input name="correlation" type="checkbox" data-category="' + d + '" data-id="' + e + '" ' + f + " /><label> " + g.title + "</label><br/>")
            })
        });
        $('input[name="correlation"]').on("click", function(c) {
            LineupBuilder.setStorageOptions(LineupBuilder.getOptions())
        })
    },
    readRules: function(a) {
        var c = {};
        var b = $('input[name="correlation"]:checked');
        _.each(b, function(f) {
            var d = $(f).data("category");
            var g = $(f).data("id");
            var e = a === "ids" ? g : Correlations[LineupBuilder.Sport][d][g].positions;
            if (!c[d]) {
                c[d] = []
            }
            c[d].push(e)
        });
        return c
    }
};
LineupBuilder.Generator = function generator(a, d) {
    var b = {};
    var c = this;
    this.Pool = function(e) {
        this.players = e;
        this.getEligible = function(f, i, j, g) {
            var h = _.filter(this.players, function(l) {
                var k = i ? l[i] : (!l.locked && !l.liked);
                return _.intersection(l.pos, f).length > 0 && k && !_.contains(j, l.team.name)
            });
            return h
        };
        this.remove = function(f) {
            var g = _.filter(this.players, function(h) {
                return h != f
            });
            this.players = g;
            return this
        }
    };
    this.Lineup = function(e, f) {
        this.salaryCap = a.env.salaryCap;
        this.pool = e;
        this.slots = [];
        this.isUnique = function(g) {
            this.key = this.getKey();
            return g.indexOf(this.key) === -1
        };
        this.getKey = function() {
            var j = this.slots;
            for (var h in j) {
                if (j[h].player === undefined) {
                    return false
                }
            }
            var k = _.map(j, function(i) {
                return i.player.first_name + " " + i.player.last_name
            });
            var g = _.sortBy(k, function(i) {
                return i
            });
            return this.getHash(g.join())
        };
        this.getHash = function(h) {
            var l = 0,
                j, k, g;
            if (h.length == 0) {
                return l
            }
            for (j = 0, g = h.length; j < g; j++) {
                k = h.charCodeAt(j);
                l = ((l << 5) - l) + k;
                l |= 0
            }
            return l
        };
        this.players = function() {
            var g = _.map(this.slots, function(h) {
                return {
                    player: h.player,
                    posName: h.posName,
                    posOpts: h.positions
                }
            });
            return g
        };
        _.each(a.env.lineup.positions, function(g) {
            this.slots.push(new c.Slot(g, this))
        }, this);
        this.getSalary = function(g) {
            var h = 0;
            if (undefined == g) {
                g = this.slots
            }
            _.each(g, function(k, j) {
                if (_.size(k.player) > 0) {
                    h += k.player.salary
                }
            });
            return h
        };
        this.getProjPts = function(g) {
            var h = 0;
            if (undefined == g) {
                g = this.slots
            }
            _.each(g, function(k, j) {
                if (_.size(k.player) > 0) {
                    h += k.player.fpts
                }
            });
            return h.toFixed(2)
        }, this.getReplaceableSlots = function() {
            return _.filter(this.slots, function(g) {
                return !_.size(g.player) || (!g.player.locked && !g.player.liked)
            })
        };
        this.getNonLockedSlots = function() {
            return _.filter(this.slots, function(g) {
                return !_.size(g.player) || (!g.player.locked)
            })
        };
        this.slotsAvailableForPlayer = function(k) {
            var l = 0;
            for (var h in this.slots) {
                for (var g in k.pos) {
                    if (this.slots[h].positions.indexOf(k.pos[g]) > -1) {
                        l++
                    }
                }
            }
            return l
        };
        this.getTotalMinimumSalary = function(g) {
            var h = 0;
            _.each(g, function(k) {
                var i = this.pool.getEligible(k.positions, undefined, [], []);
                var j = _.map(i, function(l) {
                    return l.salary
                });
                h += _.min(j)
            }, this);
            return h
        };
        this.hasCapSpace = function() {
            var h = this.getReplaceableSlots();
            if (h.length > 0) {
                var g = this.salaryCap - this.getSalary(_.difference(this.slots, h));
                var i = this.getTotalMinimumSalary(h);
                return i < g
            }
            return false
        };
        this.containsPlayer = function(h) {
            var g = _.filter(this.slots, function(i) {
                return i.player.id == h.id
            });
            return g.length > 0
        };
        this.hasEmptySlots = function() {
            for (var g in this.slots) {
                if (!_.size(this.slots[g].player)) {
                    return true
                }
            }
            return false
        };
        this.getTeams = function(h) {
            var g = h || [];
            var i = _.map(this.slots, function(j) {
                if (_.size(j.player) > 0 && _.intersection(j.player.pos, g).length === 0) {
                    return j.player.team.name
                }
            });
            return _.compact(i)
        }, this.getGames = function() {
            var g = _.map(this.slots, function(h) {
                if (_.size(h.player) > 0) {
                    return h.player.team.scheduleId
                }
            });
            return g
        };
        this.getCorrelatedSlotTeams = function(g) {
            var h = [];
            this.slots.forEach(function(i) {
                if (i.player && _.intersection(i.player.pos, g).length > 0) {
                    h.push(i.player.team.name)
                }
            });
            return h
        };
        this.isVaried = function() {
            var k = _.countBy(this.getTeams(), function(m) {
                return m
            });
            var j = _.values(k);
            var h = _.uniq(this.getTeams()).length;
            var i = _.uniq(this.getTeams(["P", "SP"])).length;
            var g = _.uniq(this.getTeams(["G"])).length;
            var l = _.uniq(this.getGames()).length;
            switch (a.env.site) {
                case "fanduel":
                    return _.max(j) <= 4 && h >= 3;
                case "draftkings":
                    switch (a.env.sport) {
                        case "mlb":
                            return i > 2;
                        case "nhl":
                            return g > 2;
                        default:
                            return h >= 2 && l >= 2
                    }
                case "draftday":
                    return l >= 2;
                case "fantasyfeud":
                    return _.max(j) <= 4;
                case "starsdraft":
                    return l >= 2;
                default:
                    return true
            }
            return true
        };
        this.fill = function() {
            this.totalRetries = 0;
            _.each(this.getReplaceableSlots(), function(h) {
                h.replace({
                    favs: true
                })
            });
            while (this.getSalary() < a.env.minSalary || this.getSalary() > this.salaryCap || !this.isUnique(f)) {
                this.totalRetries++;
                var g = this.getNonLockedSlots();
                if (!this.replaceRandomSlot(g)) {
                    return false
                }
            }
            return this
        };
        this.replaceRandomSlot = function(h) {
            if (h.length == 0) {
                return false
            }
            var g = Math.ceil(Math.random() * h.length);
            var j = h[g - 1];
            j.replace();
            if (j.player === undefined) {
                return false
            }
            return true
        };
        this.checkOpponent = function(j) {
            if (!j) {
                return true
            }
            var g = _.filter(this.slots, function(l) {
                return _.contains(j, l.posName)
            });
            var h = _.filter(this.slots, function(l) {
                return !_.contains(j, l.posName)
            });
            var i = _.map(g, function(l) {
                return l.player ? l.player.team_hash : "NA"
            });
            var k = _.map(h, function(l) {
                return l.player ? l.player.opp_hash : "NA"
            });
            return _.intersection(i, k).length === 0
        }
    };
    this.Slot = function(e, f) {
        this.posName = e.posName;
        this.positions = e.posOpts;
        this.player = {};
        this.lineup = f;
        this.pool = this.lineup.pool;
        this.replace = function(r) {
            var p = this.positions;
            var j = this.lineup;
            var k = [];
            var n = [];
            var i = [];
            if (this.player && this.player.locked) {
                return false
            }
            if (this.player && this.player.liked && this.lineup.hasCapSpace()) {
                return false
            }
            if (a.env.flex && a.env.flex[this.posName]) {
                var l = Math.random() * 100;
                var h = 0;
                var q = false;
                _.each(a.env.flex[this.posName], function(s) {
                    h += s.value;
                    if (l <= h && !q) {
                        p = [s.position];
                        q = true
                    }
                })
            }
            _.each(a.env.correlations.sameTeam, function(s) {
                if (_.intersection(p, s).length > 0) {
                    k = k.concat(j.getCorrelatedSlotTeams(s))
                }
            });
            var g = this.pool.getEligible(p, "locked", k, n);
            var o = this.pool.getEligible(p, undefined, k, n);
            if (r && r.favs || o.length === 0) {
                i = this.pool.getEligible(p, "liked", k, n).sort(function(t, s) {
                    if (t.liked === s.liked) {
                        return 0
                    }
                    return t.liked < s.liked ? 1 : -1
                })
            }
            var m = this.getRandomPlayer(g, i, o);
            if (m) {
                return this.replacePlayer(m)
            }
            this.player = undefined;
            return false
        };
        this.replacePlayer = function(g) {
            this.player = g;
            this.pool.remove(this.player);
            return true
        };
        this.getRandomPlayer = function(g, j, h) {
            if (g.length > 0) {
                return this.getRandomLockedPlayer(g)
            }
            if (j.length > 0) {
                var i = this.getRandomLikedPlayer(j);
                if (i) {
                    return i
                }
            }
            return this.getRandomEligiblePlayer(h)
        };
        this.getRandomLockedPlayer = function(g) {
            return g[_.random(0, g.length - 1)]
        };
        this.getRandomLikedPlayer = function(j) {
            var k = this.lineup;
            var l = 0;
            _.each(j, function(i) {
                l += (i.liked / k.slotsAvailableForPlayer(i))
            });
            if (l < 1) {
                l = 1
            }
            var m = Math.random() * l;
            var p = 0;
            for (var h in j) {
                var n = j[h];
                var g = b.exposures && b.exposures[n.player_id] ? b.exposures[n.player_id].count : 0;
                var o = a.env.outputCount - b.lineupKeys.length;
                var q = n.liked * a.env.outputCount - g;
                var r = g ? q / o : n.liked;
                p += Math.pow(r, 1 / (k.slotsAvailableForPlayer(n)));
                if (m <= p) {
                    return n
                }
            }
            return false
        };
        this.getRandomEligiblePlayer = function(h) {
            var g = a.env.variability ? (a.env.variability / 100) : 0;
            var i = Math.random();
            if (i <= g) {
                return h[Math.floor(i * h.length)]
            } else {
                return h[0]
            }
        };
        return false
    }, this.run = function(j, k, f) {
        var g = {
            projPts: 0
        };
        var i = 0;
        b.lineupKeys = k;
        b.exposures = f;
        try {
            while (i < a.env.iterations) {
                var h = new this.Pool(j);
                var m = new this.Lineup(h, k);
                if (m.fill && m.fill() && !m.hasEmptySlots() && m.checkOpponent(a.env.opponentSetting) && m.isVaried() && m.getProjPts() > g.projPts) {
                    g = {
                        date: (new Date).getTime(),
                        key: m.key,
                        salary: m.getSalary(),
                        projPts: m.getProjPts(),
                        positions: m.players(),
                        valid: true
                    };
                    break
                }
                i++
            }
        } catch (l) {
            console.log(l.toString());
            return {
                projPts: 0,
                error: l.toString()
            }
        }
        setTimeout(function() {
            d.trigger("churn", g)
        }, 10)
    };
    return this
};
LineupBuilder.ExpertPlatform = {
    displayLoadedPackage: function(c) {
        var b = localStorage.getItem(LineupBuilderStorage.Keys.packages);
        if (b) {
            var b = JSON.parse(b);
            var a = $(".builder").attr("data-site");
            var e = $(".builder").attr("data-sport");
            if ("object" === typeof b) {
                if ("object" === typeof b[a] && undefined !== typeof b[a][e]) {
                    var d = b[a][e];
                    $.getJSON("/products/" + d, function(f) {
                        var g = f.product;
                        $("h1").append(" - " + g.name);
                        if (c.showMessage) {
                            $(".loaded").show()
                        }
                        $(".package-name").html(g.name);
                        $('textarea[name="product[description]"]').html(g.description);
                        $('input[name="product[price]"]').val(g.price);
                        $('input[name="product[max_purchases]"]').val(g.max_purchases)
                    })
                }
            }
        }
    },
    getLoadedProductId: function(c, b) {
        var a = localStorage.getItem(LineupBuilderStorage.Keys.packages);
        if (!a) {
            return false
        }
        a = JSON.parse(a);
        if (c) {
            if ("object" !== typeof a[c]) {
                return false
            }
        }
        if (c && b) {
            if (undefined !== typeof a[c][b]) {
                return a[c][b]
            }
        }
    },
    getVendorProduct: function(a, b) {
        $.ajax({
            data: {
                site_id: a.siteId,
                sport_id: a.sportId,
                vendor_user_id: a.vendorUserId
            },
            statusCode: {
                200: function(c) {
                    b(c.data)
                }
            },
            url: "/products/search.json"
        })
    },
    initLoadedPackages: function(b, c) {
        var a = localStorage.getItem(LineupBuilderStorage.Keys.packages);
        if (a) {
            a = JSON.parse(a)
        }
        if (!a || "object" !== typeof a) {
            a = {}
        }
        if ("object" !== typeof a[b.site]) {
            a[b.site] = {}
        }
        if ("undefined" === typeof a[b.site][b.sport]) {
            a[b.site][b.sport] = ""
        }
        localStorage.setItem(LineupBuilderStorage.Keys.packages, JSON.stringify(a));
        return c(a)
    },
    loadPackageViaProductId: function(a) {
        $.ajax({
            data: {
                site_id: $("#site-id").val(),
                sport_id: $("#sport-id").val()
            },
            dataType: "json",
            statusCode: {
                200: function(b) {
                    LineupBuilder.ExpertPlatform.loadPackage({
                        site: $(".loading").attr("data-site"),
                        sport: $(".loading").attr("data-sport")
                    }, b, function() {
                        window.location = $("#url-success").val()
                    })
                },
                404: function() {
                    $("h1").html("An error occurred when attempting to load your package.")
                }
            },
            type: "GET",
            url: "/products/" + a
        })
    },
    loadPackageViaTransactionId: function(a) {
        $.ajax({
            data: {
                site_id: $("#site-id").val(),
                sport_id: $("#sport-id").val()
            },
            dataType: "json",
            statusCode: {
                200: function(b) {
                    LineupBuilder.ExpertPlatform.loadPackage({
                        site: $(".loading").attr("data-site"),
                        sport: $(".loading").attr("data-sport")
                    }, b, function() {
                        window.location = $("#url-success").val()
                    })
                },
                404: function() {
                    $("h1").html("An error occurred when attempting to load your package.")
                }
            },
            type: "POST",
            url: "/market-place/verify/" + a
        })
    },
    loadPackage: function(e, f, l) {
        var a = e.site;
        var d = e.sport;
        var j = JSON.parse(f.lineup.data);
        var c = JSON.parse(localStorage.getItem(LineupBuilderStorage.Keys.builderData));
        if (!c) {
            console.log("No lineup data found for user; creating now...");
            localStorage.removeItem(LineupBuilderStorage.Keys.builderData);
            c = LineupBuilderStorage.getStorage()
        }
        for (playerId in j.players) {
            console.log("Updating lineup row for player " + playerId + "...");
            if ($.isEmptyObject(c[d].players) || "object" !== typeof c[d].players[playerId]) {
                console.log("No player entry found. Creating one now...");
                c[d].players[playerId] = {
                    fpts: {},
                    method: {},
                    note: null
                }
            }
            c[d].players[playerId].note = (j.players[playerId].note);
            c[d].players[playerId].fpts[a] = (j.players[playerId].fpts[a]);
            if ("object" !== typeof c[d].players[playerId].method) {
                c[d].players[playerId].method = {}
            }
            c[d].players[playerId].method[a] = "vendor"
        }
        var h = ["excluded", "excludedGames", "liked", "lineups", "locked"];
        for (var g in h) {
            var b = h[g];
            c[d][b][a] = j[b][a]
        }
        c[d].date = j.date;
        console.log("Loaded the following lineups:");
        console.log(j);
        console.log("User data:");
        console.log(c);
        c = JSON.stringify(c);
        localStorage.setItem(LineupBuilderStorage.Keys.builderData, c);
        var k = localStorage.getItem(LineupBuilderStorage.Keys.packages);
        if (k) {
            k = JSON.parse(k)
        }
        if (!k || "object" !== typeof k) {
            k = {}
        }
        if ("object" !== typeof k[a]) {
            k[a] = {}
        }
        if ("object" !== typeof k[a][d]) {
            k[a][d] = {}
        }
        k[a][d] = f.product.id;
        console.log("Loaded packages:");
        console.log(k);
        localStorage.setItem(LineupBuilderStorage.Keys.packages, JSON.stringify(k));
        return l()
    },
    setLoadedPackage: function(b, e) {
        var a = LineupBuilder.Site;
        var d = LineupBuilder.Sport;
        var c = localStorage.getItem(LineupBuilderStorage.Keys.packages);
        if (c) {
            c = JSON.parse(c)
        }
        if (!c || "object" !== typeof c) {
            c = {}
        }
        if ("object" !== typeof c[a]) {
            c[a] = {}
        }
        if ("object" !== typeof c[a][d]) {
            c[a][d] = ""
        }
        c[a][d] = b.id;
        localStorage.setItem(LineupBuilderStorage.Keys.packages, JSON.stringify(c));
        return e()
    },
    initSaveLineups: function() {
        $("#save-lineups").on("click", function(g) {
            g.preventDefault();
            var b = $("#backbone-container").data("site");
            var h = $("#backbone-container").data("sport");
            var f = JSON.parse(localStorage.getItem(LineupBuilderStorage.Keys.builderData))[h];
            var a = ["fpts", "method"];
            for (playerId in f.players) {
                for (var c in a) {
                    var d = a[c];
                    for (siteSlug in f.players[playerId][d]) {
                        if (b !== siteSlug) {
                            delete f.players[playerId][d][siteSlug]
                        }
                    }
                }
            }
            var a = ["excluded", "excludedGames", "liked", "lineups", "locked"];
            for (var c in a) {
                var d = a[c];
                for (siteSlug in f[d]) {
                    if (b !== siteSlug) {
                        delete f[d][siteSlug]
                    }
                }
            }
            f = JSON.stringify(f);
            $("#user-lineup-data").val(f);
            $("#save-lineups-form").submit()
        })
    },
    hasLoadedPackage: function() {
        var a = localStorage.getItem(LineupBuilderStorage.Keys.packages);
        return a
    }
};
_.extend(LineupBuilder, {
    initCsvParser: function() {
        $("#csv-upload").on("submit", function(a) {
            a.preventDefault();
            if (!$("input#csv-file").val()) {
                return false
            }
            $("input#csv-file").parse({
                config: {
                    header: true,
                    complete: function(b) {
                        $("#upload-progress").show();
                        LineupBuilder.updateProjectionsFromCsv(b.data, b.meta.fields)
                    }
                }
            })
        })
    },
    displayProjectionUploadError: function(c) {
        var b = "The following error(s) occurred when reading your CSV. Please contact support@rotogrinders.com it the problem continues.\n";
        var a = _.map(c, function(d) {
            return "- " + d.code
        }).join("\n");
        alert(b + a)
    },
    updateProjectionsFromCsv: function(e, a) {
        var f = a[0];
        var d = a[1];

        function c(g) {
            var h = _.filter(LineupBuilder.getPlayerPool(), function(i) {
                return g == i.fullName()
            });
            if (!h) {
                return undefined
            }
            return h[0]
        }

        function b(h) {
            $("#upload-progress").progressbar({
                value: h,
                max: e.length
            });
            if (h >= e.length) {
                LineupBuilder.Views.projectionStatus.render();
                $(".progress-label").text("Upload Complete!");
                return false
            }
            var l = e[h];
            var g = $.trim(l[f]);
            var k = Number(l[d]);
            $(".progress-label").text("Uploading: " + g);
            if (!isNaN(k) && g.length > 0) {
                var j = c(g);
                var i = {
                    name: g,
                    status: "uploaded",
                    statusColor: "green",
                    oldFpts: "N/A",
                    newFpts: k
                };
                if (!j) {
                    i.status = "not matched";
                    i.statusColor = "red";
                    LineupBuilder.Views.projectionStatus.errors.push(i)
                } else {
                    i.oldFpts = j.get("rg_fpts");
                    j.updateFpts(k, "upload");
                    LineupBuilder.Views.projectionStatus.rows[j.get("id")] = i
                }
            }
            setTimeout(function() {
                b(h + 1)
            }, 100)
        }
        b(0)
    },
    initCsvDownload: function() {
        $(".download-csv").on("click", function(d) {
            d.preventDefault();
            var c = _.map(LineupBuilder.getPlayerPool(), function(e) {
                return {
                    name: e.get("first_name") + " " + e.get("last_name"),
                    fpts: e.get("fpts")
                }
            });
            var a = Papa.unparse(c);
            var b = new Blob([a], {
                type: "text/csv;charset=utf-8"
            });
            saveAs(b, "projections.csv")
        })
    }
});
var LBSliders = {
    initSliders: function() {
        this.initOutputCountSlider();
        this.initMinSalarySlider();
        this.initVariabilitySlider();
        this.initFlexSliders();
        this.initMaxExposureSlider()
    },
    initOutputCountSlider: function() {
        var a = LineupBuilder.getStorageOptions();
        var b = a && a.outputCount ? a.outputCount : 50;
        $("#output-count-range").slider({
            range: "min",
            min: 1,
            max: 100,
            value: b,
            step: 1,
            create: function(c, d) {
                $("#output-count-slider span.label").html("Number of Lineups to Produce: <strong>" + b + "</strong>");
                $("#output-count-slider").data("value", b)
            },
            slide: function(c, d) {
                $("#output-count-slider span.label").html("Number of Lineups to Produce: <strong>" + d.value + "</strong>");
                $("#output-count-slider").data("value", d.value)
            },
            stop: function(c, d) {
                LineupBuilder.setStorageOptions(LineupBuilder.getOptions())
            }
        })
    },
    initVariabilitySlider: function() {
        var a = LineupBuilder.getStorageOptions();
        var b = a && a.variability ? a.variability : 0;
        $("#variability-range").slider({
            range: "min",
            min: 0,
            max: 100,
            value: b,
            step: 1,
            create: function(c, d) {
                $("#variability-slider span.label").html("Variability: <strong>" + b + "%</strong>");
                $("#variability-slider").data("value", b)
            },
            slide: function(c, d) {
                $("#variability-slider span.label").html("Variability: <strong>" + d.value + "%</strong>");
                $("#variability-slider").data("value", d.value)
            },
            stop: function(c, d) {
                LineupBuilder.setStorageOptions(LineupBuilder.getOptions())
            }
        })
    },
    initMaxExposureSlider: function() {
        var a = LineupBuilder.getStorageOptions();
        var b = a && a.maxExposure ? a.maxExposure : 100;
        $("#max-exposure-range").slider({
            range: "min",
            min: 0,
            max: 100,
            value: b,
            step: 1,
            create: function(c, d) {
                $("#max-exposure-slider span.label").html("Max Exposure: <strong>" + b + "%</strong>");
                $("#max-exposure-slider").data("value", b)
            },
            slide: function(c, d) {
                $("#max-exposure-slider span.label").html("Max Exposure: <strong>" + d.value + "%</strong>");
                $("#max-exposure-slider").data("value", d.value)
            },
            stop: function(c, d) {
                LineupBuilder.setStorageOptions(LineupBuilder.getOptions())
            }
        })
    },
    initMinSalarySlider: function() {
        var a = LineupBuilder.getStorageOptions();
        var b = a && a.minSalary ? this.salaryCap * a.minSalary : this.salaryCap * 0.98;
        $("#min-salary-range").slider({
            range: "min",
            min: this.salaryCap * 0.5,
            max: this.salaryCap,
            value: b,
            step: Math.pow(10, Math.max((this.salaryCap * 0.9).toString().length - 3, 0)),
            create: function(c, d) {
                $("#min-salary-slider span.label").html("Minimum Salary: <strong>$" + b + "</strong>");
                $("#min-salary-slider").data("value", b)
            },
            slide: function(c, d) {
                $("#min-salary-slider span.label").html("Minimum Salary: <strong>$" + d.value + "</strong>");
                $("#min-salary-slider").data("value", d.value)
            },
            stop: function(c, d) {
                LineupBuilder.setStorageOptions(LineupBuilder.getOptions())
            }
        })
    },
    initFlexSliders: function() {
        var a = LineupBuilder.getStorageOptions();
        $(".blk.slider.flex").each(function() {
            var f = $(this);
            var c = f.data("label");
            var b = f.data("position");
            var d;
            if (a && a.flex && a.flex[LineupBuilder.Site]) {
                d = _.filter(a.flex[LineupBuilder.Site][c], function(g) {
                    return g.position === b
                })[0]
            }
            var e = d ? d.value : Math.floor(100 / LineupBuilder.getFlexSliderQty(c));
            f.find(".sliderrange.flex").slider({
                range: "min",
                min: 0,
                max: 100,
                value: e,
                step: 1,
                create: function(g, h) {
                    f.find("span.label").html(b + " Exposure: <strong>" + e.toFixed(0) + "%</strong>");
                    f.data("value", e)
                },
                slide: function(g, h) {
                    var i = f.data("value");
                    f.data("value", h.value);
                    if (LineupBuilder.getFlexSliderTotal(c) > 100) {
                        f.data("value", i);
                        return false
                    }
                    f.find("span.label").html(b + " Exposure: <strong>" + h.value.toFixed(0) + "%</strong>")
                },
                stop: function(g, h) {
                    LineupBuilder.setStorageOptions(LineupBuilder.getOptions())
                }
            })
        })
    },
    resetFlexSlider: function(b, a) {
        b.slider("value", a)
    },
    getFlexSliderQty: function(a) {
        return $('.blk.slider.flex[data-label="' + a + '"]').length
    },
    getFlexSliderTotal: function(a) {
        return _.reduce($('.blk.slider.flex[data-label="' + a + '"]'), function(b, c) {
            return b + $(c).data("value")
        }, 0)
    },
    getAccuracySetting: function(b) {
        var a = "Normal";
        if (b <= 10) {
            a = "High Speed"
        } else {
            if (b <= 30) {
                a = "Good Speed"
            } else {
                if (b <= 50) {
                    a = "Accurate"
                } else {
                    if (b <= 80) {
                        a = "More Accurate"
                    } else {
                        if (b <= 100) {
                            a = "High Accuracy"
                        }
                    }
                }
            }
        }
        return a
    }
};
var ThreadPool = function(b, e) {
    var a = this;
    this.workerQty = b.workerQty;
    this.workers = [];
    this.errors = [];
    this.parallel = b.parallel;
    var d = b.global;
    this.results = [];
    for (var c = 0; c < this.workerQty; c++) {
        var f = this.parallel._spawnWorker(function(k) {
            underscore();
            var g = {
                projPts: 0
            };
            var j = generator(global, k);
            var i = 0;
            try {
                while (i < global.env.iterations) {
                    var h = new j.Pool(k.pool);
                    var m = new j.Lineup(h);
                    if (m.fill && m.fill() && !m.hasEmptySlots() && m.getSalary() > global.env.minSalary && m.checkOpponent(global.env.opponentSetting) && m.isVaried() && m.getProjPts() > g.projPts) {
                        g = {
                            date: (new Date).getTime(),
                            key: m.key,
                            salary: m.getSalary(),
                            projPts: m.getProjPts(),
                            positions: m.players(),
                            valid: true
                        };
                        break
                    }
                    i++
                }
            } catch (l) {
                return {
                    projPts: 0,
                    error: l.toString()
                }
            }
            return g
        }, d.env);
        f.onmessage = function(g) {
            a.results.push(g.data);
            if (a.results.length === a.workers.length) {
                a.sendResults()
            }
        };
        a.workers.push(f)
    }
    this.process = function(h, i, g) {
        a.workers.forEach(function(j) {
            j.postMessage({
                pool: h,
                exposures: g,
                lineupKeys: i
            })
        })
    };
    this.sendResults = function() {
        var g = {
            projPts: 0
        };
        a.results.forEach(function(h) {
            if (h.error) {
                a.errors.push(h.error)
            }
            if (h && h.projPts > g.projPts) {
                g = h
            }
        });
        a.results = [];
        e(g)
    };
    this.terminateWorkers = function() {
        this.workers.forEach(function(g) {
            g.terminate()
        })
    };
    this.sendErrors = function() {
        if (this.errors.length === 0) {
            return false
        }
        console.log(_.uniq(this.errors));
        trackJs.track("Generator Error")
    }
};
LineupBuilder.Optimizer = function LBOptimizer(h, g, f, a, d) {
    var i = this;
    var c = {
        projPts: 0
    };
    var e = [];
    var b = 0;
    var j = f.map(function(k) {
        return k.posOpts.toString()
    });
    j = _.groupBy(_.flatten(j), function(k) {
        return k
    });
    this.getEligiblePlayers = function(q, p) {
        var m = [];
        var o = j[q.toString()].length;
        var k = _.filter(g, function(r) {
            return r.locked && _.intersection(q, r.pos).length > 0
        });
        var n = _.filter(g, function(r) {
            return _.intersection(q, r.pos).length > 0
        });
        if (k.length > 0) {
            var l = k[0];
            g = _.without(g, l);
            return [l]
        }
        m = m.concat(this.getTopSorted(p, o, n, "point_per_dollar"));
        m = m.concat(this.getTopSorted(p, o, n, "fpts"));
        this.sortAscending(m, "fpts");
        console.log(m);
        return m
    };
    this.getTopSorted = function(n, m, l, k) {
        this.sortAscending(l, k);
        if (n === 0) {
            return l.splice(h, d)
        } else {
            return l.splice(0, 4 + d * (m - 1))
        }
    };
    this.sortAscending = function(l, k) {
        l.sort(function(o, m) {
            var p = Number(o[k]),
                n = Number(m[k]);
            if (p === n) {
                return 0
            }
            return p > n ? -1 : 1
        })
    };
    this.overSalCap = function(m, l) {
        var k = l;
        _.each(e, function(o, n) {
            if (m.length <= n) {
                k += _.min(o, function(p) {
                    return p.salary
                }).salary
            }
        });
        return k > a
    };
    this.cantBeatMax = function(l, k) {
        return c.projPts >= i.calculateUpperBound(l, k)
    };
    this.calculateUpperBound = function(m, k) {
        var l = k;
        _.each(e, function(o, n) {
            if (m.length <= n) {
                l += o[0].fpts
            }
        });
        return l
    };
    this.evaluateLineup = function(m, l, k) {
        if (l > c.projPts) {
            c.projPts = Number(l.toFixed(2));
            c.positions = _.map(m, function(o, n) {
                return {
                    player: o,
                    posName: f[n].posName,
                    posOpts: f[n].posOpts
                }
            });
            c.salary = k;
            c.date = (new Date).getTime();
            console.log(c);
            console.log(new Date());
            console.log(b)
        }
    };
    this.hasDuplicatePlayer = function(l) {
        var k = _.map(l, function(m) {
            return m.id
        });
        return _.uniq(k).length !== l.length
    };
    this.duplicatePath = function(q, m) {
        var k;
        var p = f[q.length - 1];
        var n = f[q.length - 2];
        if (!p || !n) {
            return false
        }
        if (p.posOpts.toString() == n.posOpts.toString()) {
            k = true
        }
        var l = e[q.length - 1].indexOf(m);
        var o = e[q.length - 2].indexOf(q[q.length - 2]);
        return !m.locked && k && l <= o
    };
    this.evaluateNode = function(l, n, m, k) {
        _.each(e[l], function(q) {
            b++;
            var p = Number((m + q.fpts).toFixed(2));
            var o = k + q.salary;
            var r = new Array();
            r = n.concat(q);
            if (i.overSalCap(r, o) || i.cantBeatMax(r, p) || i.hasDuplicatePlayer(r) || i.isNotVaried(r) || i.duplicatePath(r, q)) {
                return
            }
            if (r.length < f.length) {
                i.evaluateNode(l + 1, r, p, o)
            } else {
                i.evaluateLineup(r, p, o);
                return true
            }
        })
    };
    this.getTeams = function(l) {
        var k = _.map(l, function(m) {
            return m.team.name
        });
        return _.compact(k)
    };
    this.getGames = function(l) {
        var k = _.map(l, function(m) {
            return m.team.scheduleId
        });
        return k
    };
    this.isNotVaried = function(n) {
        if (n.length <= 4) {
            return false
        }
        var m;
        var l = _.countBy(this.getTeams(n), function(o) {
            return o
        });
        var k = _.values(l);
        if (n.length === f.length) {
            m = _.uniq(this.getGames(n)).length
        }
        return _.max(k) > 4 || m && m === 1
    };
    this.run = function() {
        _.each(f, function(l, k) {
            e.push(i.getEligiblePlayers(l.posOpts, k))
        });
        i.evaluateNode(0, [], 0, 0);
        console.log(b);
        return c
    }
};
var LineupBuilderRouter = Backbone.Router.extend({
    initialize: function(a) {
        this.permissions = a.permissions;
        this.user = a.user;
        this.collection = new Projections([], {
            user: this.user
        });
        LineupBuilder.Views.projectionStatus = new ProjectionStatus({})
    },
    routes: {
        "": "home"
    },
    home: function() {
        this.collection.on("reset", function() {
            LineupBuilder.Collections.projections = this;
            view = new ProjectionListView({
                collection: this
            });
            LineupBuilder.Views.projections = view;
            lineups = new Lineups([], {
                playerPool: this
            });
            LineupBuilder.Collections.savedLineups = new SavedLineups([], {}).parse();
            LineupBuilder.Views.savedLineupsParent = new SavedLineupsView({
                collection: LineupBuilder.Collections.savedLineups,
                user: LineupBuilder.user
            });
            LineupBuilder.Views.savedLineupsParent.render();
            LineupBuilder.Views.projectionStatus.render();
            LineupBuilder.Collections.groupCollection = [];
            LineupBuilder.Views.groupViewsParent = [];
            _.each(LineupBuilder.Storage[LineupBuilder.Sport].lineups[LineupBuilder.Site].group, function(a, b) {
                var c = Number(b);
                if (a.length > 0) {
                    var e = LineupBuilder.LineupGroups[c] = new Lineups([], {
                        playerPool: LineupBuilder.Collections.projections
                    });
                    e.groupId = c;
                    _.each(a, function(f) {
                        if (!f || !f.key) {
                            return
                        }
                        var g = new Lineup(f, {
                            collection: e,
                            skipFlexSwap: true
                        });
                        e.push(g)
                    });
                    if (e.length === 0) {
                        LineupBuilder.LineupGroups[c] = {};
                        return
                    }
                    var d = new GeneratedLineupsView({
                        collection: e,
                        user: LineupBuilder.user,
                        groupId: c
                    });
                    d.showGeneratedLineups(true)
                }
            });
            view.render();
            $("#spinner").hide()
        });
        this.collection.parse(LineupBuilder.response)
    }
});
var Lineup = Backbone.Model.extend({
    initialize: function(b, c) {
        var a = this;
        if (c && !c.skipFlexSwap && $('input[name="late-flex"]').is(":checked")) {
            this.putLatePlayersInFlex()
        }
    },
    getKey: function() {
        var c = this.get("positions");
        for (var b in c) {
            if (c[b].player === undefined) {
                return false
            }
        }
        var d = _.map(c, function(e) {
            return e.player.first_name + " " + e.player.last_name
        });
        var a = _.sortBy(d, function(e) {
            return e
        });
        return this.getHash(a.join())
    },
    getHash: function(b) {
        var e = 0,
            c, d, a;
        if (b.length == 0) {
            return e
        }
        for (c = 0, a = b.length; c < a; c++) {
            d = b.charCodeAt(c);
            e = ((e << 5) - e) + d;
            e |= 0
        }
        return e
    },
    getProjPts: function(a) {
        var b = 0;
        if (undefined == a) {
            a = this.get("positions")
        }
        _.each(a, function(d, c) {
            if (_.size(d.player) > 0) {
                b += d.player.fpts
            }
        });
        this.set("projPts", Number(b.toFixed(2)));
        return this.get("projPts")
    },
    isValid: function() {
        return _.filter(this.get("positions"), function(a) {
                return _.size(a.player) == 0
            }).length == 0
    },
    getSalary: function(a) {
        var b = 0;
        if (undefined == a) {
            a = this.get("positions")
        }
        _.each(a, function(d, c) {
            if (_.size(d.player) > 0) {
                b += d.player.salary
            }
        });
        return b
    },
    swapPlayer: function(a, b) {
        this.get("positions")[a].player = b.toJSON();
        this.set("key", this.getKey());
        this.set("salary", this.getSalary());
        this.getProjPts();
        this.updateStorage()
    },
    updateStorage: function() {
        if (this.collection instanceof SavedLineups == false) {
            LineupBuilder.storeLocal("lineupGroup", this.collection.groupId, this.collection)
        } else {
            LineupBuilder.Storage[LineupBuilder.Sport].lineups[LineupBuilder.Site].favorites = this.collection.toJSON();
            LineupBuilder.save()
        }
    },
    getEligibleSwapSlots: function(b, a) {
        var c = _.filter(this.get("positions"), function(d) {
            return d.posOpts.length === 1 && _.contains(b, d.posOpts[0]) && _.contains(a, d.posOpts[0])
        });
        return c
    },
    putLatePlayersInFlex: function() {
        var a = this.get("positions");
        _.each(a, function(d) {
            if (d.posOpts.length > 1) {
                var b = d.player ? d.player.pos : "NA";
                var c = this.getEligibleSwapSlots(d.posOpts, b);
                _.each(c, function(e) {
                    if (e.player.start_time > d.player.start_time) {
                        var f = _.clone(e.player);
                        e.player = d.player;
                        d.player = f
                    }
                })
            }
        }, this)
    }
});
var Projection = Backbone.Model.extend({
    initialize: function(b, c) {
        var a = this;
        if (!c.data) {
            return true
        }
        var d = c.data;
        this.set("first_name", d.player.data.first_name);
        this.set("last_name", d.player.data.last_name);
        this.set("fpts", Number(d.stats.fpts[this.get("siteId")]));
        this.set("rg_fpts", Number(d.stats.fpts[this.get("siteId")]));
        this.set("has_loaded_package", LineupBuilder.ExpertPlatform.hasLoadedPackage());
        this.set("id", d.id);
        this.set("isMlb", this.checkMlb(d.player.data.sport_id));
        this.set("league_id", d.player.data.sport_id);
        this.set("locked", false);
        this.set("player_id", d.player_id);
        this.set("player_slug", d.player.data.slug);
        this.set("salary", Number(this.setSalary(d).data.salary));
        this.set("start_time", Date.parse(d.schedule.data.date));
        this.set("pos", this.setPositions(d));
        this.set("team", this.setTeam(d));
        this.set("team_hash", this.setTeam(d).name);
        this.set("opp_hash", this.setTeam(d).opp);
        this.setOrder(d);
        this.setTruncatedName();
        this.setFormattedSalary();
        this.setPointPerDollar();
        $("#salary-slider, #fpts-slider, #value-slider").on("slidestop", function(f) {
            a.applyFilter()
        });
        this.on("restoreFpts", function() {
            a.set("fpts", a.get("rg_fpts"));
            a.setPointPerDollar()
        })
    },
    applyFilter: function() {
        var i = this.get("salary");
        var d = this.get("fpts");
        var g = this.get("point_per_dollar");
        var b = true;
        var f = true;
        var c = $("#amount").data("min") * 1000;
        var h = $("#amount").data("max") * 1000;
        if ($("#fpts-amount").length > 0) {
            var k = $("#fpts-amount").data("min");
            var a = $("#fpts-amount").data("max");
            var b = RGFilters.inRange(d, k, a)
        }
        if ($("#value-amount").length > 0) {
            var e = $("#value-amount").data("min");
            var j = $("#value-amount").data("max");
            var f = RGFilters.inRange(g, e, j)
        }
        if (!RGFilters.inRange(i, c, h) || !b || !f) {
            this.excludePlayer()
        }
        if (RGFilters.inRange(i, c, h) && b && f) {
            this.includePlayer(false)
        }
        return this
    },
    excludePlayer: function(a) {
        this.set("excluded", true);
        LineupBuilder.storeLocal("excluded", this.get("id"), "x", a);
        return true
    },
    includePlayer: function(a, b) {
        this.set("excluded", false);
        LineupBuilder.removeLocal("excluded", this.get("id"), b);
        if (false != a) {
            LineupBuilder.sortTable("tbody.projections-container", LineupBuilder.currentSortedHeader, true)
        }
        return true
    },
    likePlayer: function(a) {
        this.set("liked", a);
        this.unlockPlayer();
        LineupBuilder.storeLocal("liked", this.id, a);
        return this
    },
    unlikePlayer: function() {
        this.set("liked", false);
        LineupBuilder.removeLocal("liked", this.id);
        return this
    },
    lockPlayer: function() {
        this.set("locked", true);
        this.unlikePlayer();
        LineupBuilder.storeLocal("locked", this.id, "locked");
        return this
    },
    unlockPlayer: function() {
        this.set("locked", false);
        LineupBuilder.removeLocal("locked", this.id);
        return this
    },
    fullName: function() {
        var a = this.get("first_name") + " " + this.get("last_name");
        return a
    },
    setPointPerDollar: function() {
        var b = this.get("fpts");
        var d = this.get("salary");
        var c = LineupBuilder.Site === "yahoo" ? 1 : 1000;
        this.set("point_per_dollar", 0);
        if (d > 0) {
            var a = b / (d / c);
            var e = a.toFixed(1);
            this.set("point_per_dollar", e)
        }
        return this.get("point_per_dollar")
    },
    setFormattedSalary: function() {
        this.set("formatted_salary", statsHelper.formatSalary(this.get("salary")));
        return this.get("formatted_salary")
    },
    setTruncatedName: function() {
        this.set("truncated_name", this.fullName());
        if (this.fullName().length > 20) {
            this.set("truncated_name", this.fullName().substring(0, 19) + "...")
        }
        return this.get("truncated_name")
    },
    updateFpts: function(a, c) {
        var b = this.get("id");
        this.set("fpts", a);
        LineupBuilder.saveUserEdits(b, {
            fpts: a,
            method: c
        });
        this.setPointPerDollar();
        return this
    },
    updateNote: function(a) {
        var b = this.get("id");
        this.set("note", a);
        LineupBuilder.saveUserEdits(b, {
            note: a
        });
        return this
    },
    checkMlb: function(a) {
        if (parseInt(a) != 2) {
            return false
        }
        return true
    },
    setTeam: function(e) {
        var l = e;
        var c = LineupBuilder.response.schedules;
        var j = l.schedule_id;
        var f = c.collection[j];
        var d = l.player.data.team_id;
        var i = f.data.team_home;
        var h = f.data.team_away;
        if (Number(d) == Number(i.data.id)) {
            var g = "home";
            var a = "vs";
            var k = i.data.hashtag;
            var b = h.data.hashtag
        } else {
            var g = "away";
            var a = "@";
            var k = h.data.hashtag;
            var b = i.data.hashtag
        }
        return {
            id: d,
            loc: g,
            locSymbol: a,
            name: k,
            opp: b,
            scheduleId: j
        }
    },
    setSalary: function(b) {
        var c = b.schedule.data.salaries.collection;
        var a = _.filter(c, function(d) {
            return d.data.site_id == $("#site-id").val()
        })[0];
        if (c == undefined || a === undefined) {
            return {
                data: {
                    position: "N/A",
                    salary: "0"
                }
            }
        }
        return a
    },
    setPositions: function(b) {
        if (this.setSalary(b).data.position == null) {
            return undefined
        }
        var a = this.setSalary(b).data.position;
        a = a.replace(/\,/gi, "/");
        return a.split("/")
    },
    setOrder: function(f) {
        var d = f;
        var c = LineupBuilder.response.schedules;
        var e = d.schedule_id;
        var h = c.collection[e];
        var g = this.get("team").loc;
        var b = {};
        if (undefined !== h) {
            if (undefined === h.data["team_" + g].data.lineups) {
                this.set("order", "N/C");
                return "N/C"
            } else {
                b = h.data["team_" + g].data.lineups.collection
            }
        }
        var a = this.parseOrder(b);
        this.set("order", a);
        return a
    },
    parseOrder: function(c) {
        var a = "N/C";
        var d = this.get("player_id");
        var b = _.map(c, function(f) {
            return f.data.status
        });
        var e = _.contains(b, "B");
        _.each(c, function(h, g, f) {
            if (h.data.player_id == d && !e) {
                if (h.data.order == null) {
                    a = "C"
                } else {
                    a = h.data.order
                }
            }
        });
        return a
    }
});
var Lineups = Backbone.Collection.extend({
    initialize: function(b, a) {
        this.playerPool = a.playerPool;
        this.lockedPlayers = this.playerPool.filter(function(c) {
            return c.attributes.locked
        });
        this.likedPlayers = this.playerPool.filter(function(c) {
            return c.attributes.liked
        });
        this.currentLineup
    },
    cullNonOptimal: function(b, c) {
        var d = _.flatten(_.map(c, function(e) {
            return e.posOpts
        }));
        var a = _.countBy(d, function(e) {
            return e
        });
        _.each(a, function(h, e) {
            var f = b.filter(function(i) {
                return !i.get("locked") && _.contains(i.get("pos"), e)
            });
            var g = _.groupBy(f, function(i) {
                return i.get("salary")
            });
            _.each(g, function(k) {
                var i = _.sortBy(k, function(l) {
                    return -l.get("fpts")
                });
                var j = i.splice(h, i.length - h);
                b.remove(j)
            })
        })
    },
    preparePool: function(b, c) {
        var a = b.filter(function(d) {
            return d.get("excluded")
        });
        b.remove(a);
        this.cullNonOptimal(b, c);
        b.comparator = function(d) {
            return -d.get("fpts")
        };
        b.sort("fpts");
        return b.toJSON()
    },
    optimize: function() {
        var b = this;
        var d = this.posToJSON(this.playerPool.sitePos);
        var a = this.preparePool(this.playerPool.clone(), d);
        var f = 2;
        var c = {
            chunkSize: f,
            pool: a,
            slots: d,
            salaryCap: LineupBuilder.salaryCap
        };
        var e = new Parallel([0 * f, 1 * f, 2 * f, 3 * f], {
            env: c
        });
        $("#progressbar").show();
        $(".progress-label").text("Finding optimal...");
        e.require(underscore);
        e.require(LineupBuilder.Optimizer);
        e.map(function(i) {
            underscore();
            var g = new LBOptimizer(i, global.env.pool, global.env.slots, global.env.salaryCap, global.env.chunkSize);
            var h = g.run();
            return h
        }).then(function(h) {
            var g;
            _.each(h, function(i) {
                console.log(i);
                if (!g || i.projPts > g.projPts) {
                    g = i
                }
            });
            if (!g.positions) {
                alert("A valid optimal lineup could not be found. Make sure you have enough eligible players at each position in the player pool.")
            } else {
                b.push(new Lineup(g, {
                    collection: this,
                    skipFlexSwap: false
                }))
            }
            $(".progress-label").empty();
            b.trigger("finished")
        })
    },
    makeLineup: function() {
        var d = this;
        var e = this.posToJSON(this.playerPool.sitePos);
        var c = this.playerPool.clone();
        var a = LineupBuilder.getOptions().outputCount;
        var b = c.filter(function(g) {
            return g.get("excluded")
        });
        c.remove(b);
        c.comparator = function(g) {
            return -g.get("fpts")
        };
        c.sort("fpts");
        var f = {
            correlations: {
                sameTeam: LineupBuilder.Correlations.readRules().sameTeam
            },
            flex: LineupBuilder.getOptions().flex[LineupBuilder.Site],
            iterations: 200,
            lineup: {
                positions: e,
                valid: true
            },
            maxExposure: LineupBuilder.getOptions().maxExposure,
            minSalary: LineupBuilder.getOptions().minSalary * LineupBuilder.salaryCap,
            opponentSetting: LineupBuilder.readOpponentSetting(),
            outputCount: a,
            salaryCap: LineupBuilder.salaryCap,
            site: LineupBuilder.Site,
            sport: LineupBuilder.Sport,
            variability: LineupBuilder.getOptions().variability
        };
        $("#progressbar").progressbar({
            value: false
        });
        this.on("churn", function(g) {
            if (!g.positions || d.length >= f.outputCount) {
                if (d.length < a) {
                    alert(d.length + " of " + a + " lineups were produced. This may result in higher than desired player exposures.\n\nTry including more players in your pool, increasing your max exposure setting, giving favorite players higher exposure, decreasing your variability setting, or lowering your minimum salary setting.")
                }
                d.trigger("finished")
            } else {
                d.push(new Lineup(g, {
                    collection: this,
                    skipFlexSwap: false
                }));
                $("#progressbar").progressbar({
                    value: d.length > 0 ? d.length : false,
                    max: f.outputCount
                });
                var h = d.getCulledPool(c, f.maxExposure, a);
                new LineupBuilder.Generator({
                    env: f
                }, d).run(h.toJSON(), d.getKeys(), d.getPlayerExposures(a))
            }
        });
        new LineupBuilder.Generator({
            env: f
        }, d).run(c.toJSON(), [])
    },
    getKeys: function() {
        var a = _.map(this.models, function(b) {
            return b.get("key")
        });
        return a
    },
    getCulledPool: function(c, b, f) {
        var e = this.getPlayerExposures(f);

        function d(g) {
            return g.liked && g.exposure + (100 / f) > (Number(g.liked) * 100)
        }

        function a(g) {
            return !g.liked && g.exposure + (100 / f) > b
        }
        _.each(e, function(h, g) {
            if (h.locked) {
                return
            }
            if (a(h) || d(h)) {
                var i = c.findWhere({
                    player_id: g.toString()
                });
                if (i) {
                    c.remove(i)
                }
            }
        });
        return c
    },
    getPlayerExposures: function(c) {
        var a = {};
        var b = this;
        this.each(function(d) {
            _.each(d.get("positions"), function(f, e, g) {
                if (f.player && !(f.player.player_id in a)) {
                    a[f.player.player_id] = {
                        name: f.player.first_name + " " + f.player.last_name,
                        pos: f.player.pos.join(),
                        team: f.player.team_hash,
                        liked: f.player.liked,
                        locked: f.player.locked,
                        count: 1,
                        exposure: parseInt(100 * (1 / c)),
                        salary: f.player.salary,
                        formattedSalary: statsHelper.formatSalary(f.player.salary),
                        projPoints: f.player.fpts
                    }
                } else {
                    if (f.player) {
                        a[f.player.player_id].count++;
                        a[f.player.player_id].exposure = parseInt(100 * (a[f.player.player_id].count / c))
                    }
                }
            })
        });
        return a
    },
    posToJSON: function(b) {
        var a = _.map(b, function(c) {
            return {
                posName: c.positions.length === 1 ? c.positions[0] : c.key,
                posOpts: c.positions
            }
        });
        return a
    }
});
var Projections = Backbone.Collection.extend({
    initialize: function(b, a) {
        this.siteId = $("#backbone-container").data("site-id");
        this.siteSlug = LineupBuilder.Site;
        this.sportSlug = LineupBuilder.Sport;
        this.sitePos = [];
        this.sportId;
        this._meta = {};
        this.url = "/lineup-builder/" + this.siteSlug + "/" + this.sportSlug + "/projections.json";
        
        if ("object" === typeof a) {
            this.user = a.user
        }
    },
    meta: function(b, a) {
        if (a === undefined) {
            return this._meta[b]
        } else {
            this._meta[b] = a
        }
    },
    model: Projection,
    parse: function(b) {
        LineupBuilder.setStorageDate(b.date, b.week);
        keys = Object.keys(b.players);
        for (var c = 0; c < keys.length; c++) {
            j = keys[c];
            obj = b.players[j].data;
            if (null === obj.schedule.data.salaries) {
                continue
            }
            var f = new Projection({
                siteId: this.siteId
            }, {
                collection: this,
                data: obj
            });
            for (var j in this.user) {
                f.set(j, this.user[j])
            }
            if (f.get("pos") != undefined) {
                this.push(f)
            }
            if (!LineupBuilder.Storage[LineupBuilder.Sport].players) {
                LineupBuilder.Storage[LineupBuilder.Sport].players = {}
            }
            var h = LineupBuilder.Storage[LineupBuilder.Sport].players[f.id];
            if (h && h.fpts[LineupBuilder.Site]) {
                var d = f.get("rg_fpts");
                var k = h.fpts[LineupBuilder.Site];
                var a = h.method[LineupBuilder.Site];
                var e = a == "edited" ? "blue" : "green";
                f.set("fpts", k);
                f.setPointPerDollar();
                LineupBuilder.Views.projectionStatus.rows[f.get("id")] = {
                    name: f.fullName(),
                    status: a,
                    statusColor: e,
                    oldFpts: d,
                    newFpts: k
                }
            }
            if (h && h.note) {
                var g = h.note;
                f.set("note", g)
            }
        }
        this.sitePos = this.getSiteAttr(b.positions);
        this.meta("positions", _.uniq(this.sitePos));
        this.salaries = this.pluck("salary");
        this.restoreSettings();
        this.trigger("reset");
        return this.models
    },
    restoreSettings: function() {
        var c = LineupBuilder.Site;
        var f = LineupBuilder.Sport;
        var e = LineupBuilder.Storage[f].liked;
        var a = LineupBuilder.Storage[f].locked;
        var b = LineupBuilder.Storage[f].excluded;
        var d = this;
        _.each(e, function(i, h) {
            var g = d.findWhere({
                id: parseInt(h)
            });
            if (g != undefined) {
                g.set("liked", e[h])
            }
        });
        _.each(a, function(i, h) {
            var g = d.findWhere({
                id: parseInt(h)
            });
            if (g != undefined) {
                g.set("locked", a[h])
            }
        });
        _.each(b, function(i, h) {
            var g = d.findWhere({
                id: parseInt(h)
            });
            if (g != undefined) {
                g.set("excluded", true)
            }
        })
    },
    getSiteAttr: function(a) {
        _.each(a, function(b) {
            if (!_.isArray(b.positions)) {
                b.positions = [b.positions]
            }
        });
        return a
    }
});
var Replacements = Backbone.Collection.extend({
    model: Projection,
    initialize: function(c, b) {
        var a = this;
        a.slot = b.slot;
        a.slotIndex = b.slotIndex;
        a.lineup = b.lineup;
        a.setRemainingSalary();
        a.comparator = function(d) {
            return -d.get("salary")
        }
    },
    loadReplacements: function() {
        var a = this;
        var b = _.map(a.lineup.get("positions"), function(c) {
            return c.player.id
        });
        LineupBuilder.Collections.projections.each(function(c) {
            if (_.intersection(c.get("pos"), a.slot.posOpts).length > 0 && !_.contains(b, c.get("id")) && c.get("salary") <= (a.slot.player.salary + a.remainingSalary)) {
                var d = new Projection(c.attributes, {
                    collection: a
                });
                a.add(d)
            }
        });
        a.trigger("reload")
    },
    reload: function() {
        this.reset();
        this.setRemainingSalary();
        this.loadReplacements();
        this.trigger("reload")
    },
    setRemainingSalary: function() {
        var a = this;
        a.remainingSalary = Number(LineupBuilder.salaryCap) - Number(a.lineup.get("salary"))
    }
});
var SavedLineups = Backbone.Collection.extend({
    parse: function() {
        var c = LineupBuilder.Sport;
        var b = LineupBuilder.Site;
        var a = LineupBuilder.Storage[c]["lineups"][b]["favorites"];
        _.each(a, function(d) {
            var e = new Lineup(d, {
                collection: this
            });
            this.push(e)
        }, this);
        return this
    },
    model: Lineup
});
var LineupsView = Backbone.View.extend({
    render: function() {
        this.state.length = 0;
        $(this.cardUl).empty();
        $(this.bodyEl).empty();
        if (this.collection.length > 0) {
            this.currentLineup = this.collection.at(0);
            this.currentLineupIndex = 0;
            this.collection.each(this.renderLineupTableRow);
            this.renderLineupCard(this.currentLineup);
            $(this.bodyEl + " tr").eq(this.currentLineupIndex).addClass("current");
            this.updateIndex(this.collection.length, this.currentLineupIndex + 1)
        }
    },
    renderLineupCard: function(b) {
        var a = new LineupCardView({
            model: b,
            collection: this.collection,
            parentView: this
        });
        a.render();
        $(this.el).find(".lst.builder-cards").html(a.el)
    },
    renderLineupTableRow: function(b) {
        var a = new LineupTableRow({
            model: b,
            collection: this.collection,
            parentView: this
        });
        this.state.push(a);
        a.render();
        $(this.bodyEl).append(a.el)
    },
    renderExposureTable: function(a) {
        var b = {};
        var a = this.exposureTable;
        var d = this.collection;
        d.each(function(e) {
            _.each(e.get("positions"), function(g, f, h) {
                if (g.player && !(g.player.player_id in b)) {
                    b[g.player.player_id] = {
                        name: g.player.first_name + " " + g.player.last_name,
                        pos: g.player.pos.join(),
                        team: g.player.team_hash,
                        liked: g.player.liked,
                        locked: g.player.locked,
                        count: 1,
                        exposure: parseInt(100 * (1 / d.length)),
                        salary: g.player.salary,
                        formattedSalary: statsHelper.formatSalary(g.player.salary),
                        projPoints: g.player.fpts
                    }
                } else {
                    if (g.player) {
                        b[g.player.player_id].count++;
                        b[g.player.player_id].exposure = parseInt(100 * (b[g.player.player_id].count / d.length))
                    }
                }
            })
        });
        $(a).empty();
        for (index in b) {
            var c = new PlayerExposureTableRow({
                parentView: this
            });
            c.render(b[index]);
            $(a).append(c.el)
        }
        LineupBuilder.sortTable(a, $(a).closest("table").find("thead > tr > th.exposure"), false);
        $(a).closest("table").find("thead > tr > th").on("click", function() {
            LineupBuilder.sortTable(a, this, false)
        })
    },
    navigateLineups: function(b) {
        var a = this.currentLineupIndex;
        this.currentLineupIndex += b;
        if (this.rowIsHidden()) {
            this.findNextVisibleRow(b)
        }
        var c = this.collection.at(this.currentLineupIndex);
        if (c) {
            this.currentLineup = c;
            this.renderLineupCard(c);
            this.updateIndex();
            return false
        }
        this.currentLineupIndex = a
    },
    findNextVisibleRow: function(e) {
        var f = this.bodyEl + " tr:visible";
        var b = $(this.bodyEl + " tr").eq(this.currentLineupIndex - e);
        var c = b.index(f);
        var a = $(f)[c + e];
        var d = $(a).index(this.bodyEl + " tr");
        if (d == -1) {
            this.currentLineupIndex -= e;
            return false
        }
        this.currentLineupIndex = d
    },
    rowIsHidden: function() {
        if ($(this.bodyEl + " tr").eq(this.currentLineupIndex).is(":hidden")) {
            return true
        }
        return false
    },
    showPrev: function(a) {
        a.preventDefault();
        if (this.currentLineupIndex > 0) {
            this.navigateLineups(-1)
        }
    },
    showNext: function(a) {
        a.preventDefault();
        this.navigateLineups(1)
    },
    updateIndex: function(a, b) {
        if (!a) {
            a = this.collection.length
        }
        $(this.bodyEl + " tr").removeClass("current");
        $(this.bodyEl + " tr").eq(this.currentLineupIndex).addClass("current");
        if (!b) {
            var b = $(this.bodyEl + " tr.current").index(this.bodyEl + " tr:visible") + 1
        }
        $(this.indexEl).html(b + " of " + a)
    }
});
var LineupCardView = Backbone.View.extend({
    initialize: function(b) {
        var a = this;
        this.parentView = b.parentView;
        this.model.on("change", function(c) {
            a.render();
            a.parentView.renderExposureTable()
        })
    },
    events: {
        "click span[data-role=save-lineup]": "saveLineup",
        "click span[data-role=unsave-lineup]": "unsaveLineup",
        "click a.edit": "loadReplaceOptions"
    },
    tagName: "li",
    render: function() {
        var d = this.model;
        var c = false;
        if (LineupBuilder.Sport == "mlb") {
            c = true
        }
        var b = {
            index: this.parentView.currentLineupIndex + 1,
            isMlb: c,
            positions: [],
            salary: statsHelper.formatSalary(d.get("salary")),
            saved: d.get("saved"),
            projPts: d.get("projPts")
        };
        for (var a in this.parentView.user) {
            b[a] = this.parentView.user[a]
        }
        _.each(d.get("positions"), function(f, e, g) {
            b.positions.push(f);
            _.each(["excluded", "liked", "locked"], function(h) {
                if (f.player && f.player.id in LineupBuilder.Storage[LineupBuilder.Sport][h]) {
                    f.player[h] = LineupBuilder.Storage[LineupBuilder.Sport][h][f.player.id]
                } else {
                    if (f.player) {
                        f.player[h] = false
                    }
                }
            })
        });
        LineupBuilder.renderTemplate("#lineup-template", this.el, b)
    },
    saveLineup: function(b) {
        var c = this.model;
        c.set("saved", true);
        var a = c.clone();
        LineupBuilder.Collections.savedLineups.add(a);
        LineupBuilder.storeLocal("lineups", "favorites", a);
        LineupBuilder.Views.savedLineupsParent.render();
        LineupBuilder.Views.savedLineupsParent.renderExposureTable();
        this.render(c);
        if ($(".blk.builder-favorites:hidden")) {
            $('[data-target=".blk.builder-favorites"]').show();
            $('[data-target=".blk.builder-favorites"]').removeClass("on")
        }
    },
    unsaveLineup: function(a) {
        a.preventDefault();
        var b = this.model;
        LineupBuilder.unsaveLineup(b);
        if (this.parentView.cardUl == ".builder-generated ul.builder-cards") {
            b.set("saved", false);
            this.parentView.updateIndex()
        } else {
            _.each(LineupBuilder.LineupGroups, function(d, c) {
                if (!$.isEmptyObject(d)) {
                    var e = d.findWhere({
                        key: b.get("key")
                    });
                    if (e) {
                        e.set("saved", false)
                    }
                }
            })
        }
        if (LineupBuilder.Collections.savedLineups.length > 0) {
            LineupBuilder.Views.savedLineupsParent.render();
            LineupBuilder.Views.savedLineupsParent.renderExposureTable()
        } else {
            $("tbody#favorite-lineups").empty();
            $(".blk.builder-favorites").hide();
            $('[data-target=".blk.builder-favorites"]').hide()
        }
    },
    loadReplaceOptions: function(f) {
        f.preventDefault();
        var c = $(f.target).closest("tr").data("position-index");
        var g = this.model.get("positions")[c];
        var d = new Replacements([], {
            lineup: this.model,
            slotIndex: c,
            slot: g,
            salary: this.model.get("salary")
        });
        d.loadReplacements();
        var a = this.parentView.el;
        if (_.isObject(a)) {
            a = ".blk.builder-favorites"
        }
        var b = new ReplacementsView({
            collection: d,
            containerId: a
        });
        b.render()
    }
});
var LineupTableRow = Backbone.View.extend({
    initialize: function(a) {
        this.parentView = a.parentView;
        this.listenTo(this.model, "change", this.render);
        this.listenTo(this.parentView, "search", this.search)
    },
    tagName: "tr",
    events: {
        "click a.players": "changeLineupCard"
    },
    changeLineupCard: function(b) {
        b.preventDefault();
        var a = this.model.collection;
        var c = this.model;
        this.parentView.currentLineup = c;
        this.parentView.currentLineupIndex = a.indexOf(c);
        this.parentView.renderLineupCard(c);
        this.parentView.updateIndex()
    },
    search: function(a) {
        if (a.length < 3) {
            $(this.el).show();
            return
        }
        var b = new RegExp(a, "ig");
        var c = _.map(this.model.get("positions"), function(e) {
            var d = e.player.first_name + " " + e.player.last_name;
            return d.match(b)
        });
        c = _.compact(c);
        if (c.length > 0) {
            $(this.el).show()
        } else {
            $(this.el).hide()
        }
    },
    render: function() {
        var a = this;
        var c = a.model.toJSON();
        c.salary = statsHelper.formatSalary(a.model.get("salary"));
        for (var b in this.parentView.user) {
            c[b] = this.parentView.user[b]
        }
        LineupBuilder.renderTemplate("#lineup-list-item-template", this.el, c)
    }
});
var PlayerExposureTableRow = Backbone.View.extend({
    initialize: function(a) {
        this.parentView = a.parentView
    },
    tagName: "tr",
    render: function(a) {
        LineupBuilder.renderTemplate("#player-exposure-list-item-template", this.el, a)
    }
});
var GeneratedLineupsView = LineupsView.extend({
    indexEl: "span.generated.index",
    state: [],
    initialize: function(b) {
        this.groupId = b.groupId;
        var a = this;
        this.state = LineupBuilder.Views.lineupTableRows;
        _.bindAll(this, "renderLineupTableRow");
        a.user = b.user;
        this.bodyEl = "tbody#generated-lineups" + this.groupId;
        this.el = "#builder-generated" + this.groupId;
        this.exposureTable = this.el + " #player-exposure";
        this.cardUl = this.el + " ul.builder-cards";
        this.indexEl = this.el + " span.generated.index";
        for (var c in b.user) {
            a[c] = b.user[c]
        }
        $("a#update-optimal").on("click", function(d) {
            d.preventDefault();
            a.updateOptimal(d)
        });
        this.collection.on("finished", function() {
            $("#progressbar").progressbar("destroy");
            a.showGeneratedLineups()
        })
    },
    events: {
        "click a#generate-optimal": "generateOptimal",
        "click a#update-optimal": "updateOptimal",
        "click a.exclude": "excludePlayer",
        "click a.include": "includePlayer",
        "click a.like": "likePlayer",
        "click a.unlike": "unlikePlayer",
        "click a.lock": "lockPlayer",
        "click a.unlock": "unlockPlayer",
        "click a.edit": "editPlayer"
    },
    searchLineups: function(b) {
        var a = this;
        this.trigger("search", b);
        this.currentLineupIndex = 0;
        this.navigateLineups(1);
        this.updateIndex()
    },
    excludePlayer: function(a) {
        a.preventDefault();
        this.toggleAction(a, LineupBuilder.Views.projection, "excludePlayer")
    },
    includePlayer: function(a) {
        a.preventDefault();
        this.toggleAction(a, LineupBuilder.Views.excluded, "includePlayer")
    },
    toggleAction: function(d, a, f) {
        var b = $(d.currentTarget).closest("tr").data("player-id");
        matchedViews = _.filter(a, function(e) {
            return e.model.id == b
        });
        if (matchedViews.length > 0) {
            var c = matchedViews[0];
            c[f](d);
            this.renderLineupCard(this.currentLineup)
        }
    },
    likePlayer: function(a) {
        a.preventDefault();
        this.toggleAction(a, LineupBuilder.Views.projection, "likePlayer")
    },
    unlikePlayer: function(a) {
        a.preventDefault();
        this.toggleAction(a, LineupBuilder.Views.projection, "unlikePlayer")
    },
    lockPlayer: function(a) {
        a.preventDefault();
        this.toggleAction(a, LineupBuilder.Views.projection, "lockPlayer")
    },
    unlockPlayer: function(a) {
        a.preventDefault();
        this.toggleAction(a, LineupBuilder.Views.projection, "unlockPlayer")
    },
    generateOptimal: function(a) {
        this.collection.reset();
        $("input[name=lineup-search]").val("");
        $("#progressbar").progressbar({
            value: false
        });
        if (a === "generate-optimal") {
            this.collection.optimize()
        } else {
            this.collection.makeLineup()
        }
    },
    showGeneratedLineups: function(a) {
        var b = this;
        $("#spinner").hide();
        if (this.collection.length == 0) {
            LineupBuilder.LineupGroups[b.groupId] = {};
            return false
        }
        this.groupEl = "#builder-generated" + this.groupId;
        $("#builder-generated").clone().attr("id", "builder-generated" + this.groupId).appendTo(".builder-lineups");
        $("#builder-generated" + this.groupId).find("#generated-lineups").attr("id", "generated-lineups" + this.groupId);
        this.collection.comparator = function(d) {
            return -d.get("projPts")
        };
        this.collection.sort();
        var c = this.collection.at(0);
        $(this.el).find(".options").show();
        this.currentLineup = c;
        this.currentLineupIndex = 0;
        this.render();
        this.renderExposureTable();
        this.showSection();
        $(this.groupEl + " input[name=lineup-search]").keyup(function() {
            b.searchLineups($(this).val())
        });
        $(this.groupEl + " .builder-cards.gen a.next").on("click", function(d) {
            d.preventDefault();
            b.showNext(d)
        });
        $(this.groupEl + " .builder-cards.gen a.prev").on("click", function(d) {
            d.preventDefault();
            b.showPrev(d)
        });
        $(this.groupEl + ' a[data-action="generated-export-csv"]').html("Export Group " + this.groupId + " to CSV");
        $(this.groupEl + ' a[data-action="generated-export-csv"]').on("click", function(d) {
            d.preventDefault();
            LineupBuilder.exportGenerated(b.groupId)
        });
        if (!a) {
            LineupBuilder.storeLocal("lineupGroup", this.groupId, this.collection)
        }
    },
    showSection: function() {
        $(".builder-tabs > li:last-child").before('<li><a class="group-tabs" data-target="' + this.groupEl + '" href="#remove-group" style="white-space:nowrap; display:none;"><span style="display:inline; margin-right:10px;">Group ' + this.groupId + '</span><span class="delete-generated" style="display:inline; font-size:.7em;">x</span></a></li>');
        $(".builder-lineups .builder-tabs a").removeClass("on");
        $(".builder-favorites, .builder-player-pool, .builder-upload, .blk.builder-generated").hide();
        $(this.groupEl).show();
        $('[data-target="' + this.groupEl + '"]').show();
        $('a[data-target="' + this.groupEl + '"]').addClass("on");
        $behaviors.addTabBehavior(".builder-lineups .builder-tabs li a", ".builder-generated, .builder-favorites, .builder-upload, .builder-player-pool");
        $('[data-target="' + this.groupEl + '"]').find(".delete-generated").data("groupid", this.groupId);
        LineupBuilder.initDeleteGroupLink()
    },
    updateOptimal: function(a) {
        a.preventDefault();
        var b = this.currentLineup;
        $("input[name=message]").val(JSON.stringify(b));
        $("form#update-optimal-form").submit()
    }
});
var SavedLineupsView = LineupsView.extend({
    el: ".blk.builder-favorites",
    bodyEl: "tbody#favorite-lineups",
    cardUl: ".builder-favorites ul.builder-cards",
    indexEl: "span.saved.index",
    state: [],
    events: {
        "click a.next": "showNext",
        "click a.prev": "showPrev"
    },
    initialize: function(a) {
        this.state = LineupBuilder.Views.savedLineups;
        this.el = ".blk.builder-favorites";
        this.exposureTable = this.el + " #favorited-exposure";
        _.bindAll(this, "renderLineupTableRow");
        this.user = a.user;
        if (this.collection.models.length > 0) {
            this.renderExposureTable("#favorited-exposure", this.collection);
            $(".blk.builder-player-pool").hide();
            $(".blk.builder-favorites").show();
            $('a[data-target=".builder-player-pool"]').removeClass("on");
            $('a[data-target=".blk.builder-favorites"]').show().addClass("on")
        }
    }
});
var ProjectionListView = Backbone.View.extend({
    el: "tbody.projections-container",
    initialize: function() {
        var a = this;
        _.bindAll(this, "renderProjection");
        _.extend(this, RGFilters);
        this.addPositions();
        this.initSalarySlider();
        this.initFptsSlider();
        this.initValueSlider();
        $("thead.projections-container [data-sort]").on("click", {
            tbody: this.el
        }, function(b) {
            LineupBuilder.sortTable(b.data.tbody, this)
        });
        $('input[name="player-search"]').on("keypress", function(c) {
            var b = c.keyCode || c.which;
            if (b == 13) {
                c.preventDefault();
                return false
            }
        });
        $('input[name="player-search"]').on("keyup", function(b) {
            b.preventDefault();
            $('li[data-role="pos-filter"]').removeClass("on");
            a.collection.trigger("filter")
        })
    },
    applyFilters: function() {
        $("tr.note").remove();
        this.collection.trigger("filter");
        $behaviors.reHighlightTable("tbody.projections-container", "#e2e2e2", "#f2f2f2");
        LineupBuilder.sortTable("tbody.projections-container", LineupBuilder.currentSortedHeader, true)
    },
    renderProjection: function(a) {
        var b = new ProjectionView({
            model: a,
            parentView: this
        });
        LineupBuilder.Views.projection.push(b);
        b.render();
        $(this.el).append(b.el)
    },
    render: function() {
        $(this.el).empty();
        LineupBuilder.Views.projection.length = 0;
        $("#position-links").empty();
        this.collection.each(this.renderProjection)
    },
    addPositions: function() {
        var a = this;
        $("li[data-role=pos-filter]").on("click", function(b) {
            b.preventDefault();
            RGFilters.toggleFilter($(this));
            LineupBuilder.Views.projections.applyFilters()
        });
        $("li.remove").on("click", function(b) {
            b.preventDefault();
            $(this).closest(".lst.filters").find("li").removeClass("on");
            LineupBuilder.Views.projections.applyFilters()
        })
    },
    initSalarySlider: function() {
        this.salaries = _.map(this.collection.salaries, function(a) {
            return a / 1000
        });
        this.initSlider("salaries", "#amount", "#salary-range", 0.1, function(b, a) {
            return "$" + b.toFixed(1) + "K - $" + a.toFixed(1) + "K"
        })
    },
    initFptsSlider: function() {
        this.fpts = this.collection.pluck("fpts");
        this.initSlider("fpts", "#fpts-amount", "#fpts-range", 0.01, function(b, a) {
            return b.toFixed(2) + " - " + a.toFixed(2)
        })
    },
    initValueSlider: function() {
        this.ptDollar = this.collection.pluck("point_per_dollar");
        this.initSlider("ptDollar", "#value-amount", "#value-range", 1, function(b, a) {
            return b.toFixed(2) + " - " + a.toFixed(2)
        })
    }
});
var ProjectionView = Backbone.View.extend({
    initialize: function(b) {
        var a = this;
        a.parentView = b.parentView;
        this.listenTo(this.model.collection, "resetLocked", function() {
            if (a.model.get("locked")) {
                a.model.unlockPlayer()
            }
        });
        this.listenTo(this.model.collection, "resetFavs", function() {
            if (a.model.get("liked")) {
                a.model.unlikePlayer()
            }
        });
        this.listenTo(this.model.collection, "filter", function() {
            a.applyFilters()
        });
        this.listenTo(this.model, "change", function() {
            a.render();
            a.applyFilters()
        })
    },
    attributes: function() {
        return {
            "data-pos": this.model.get("pos"),
            "data-team": this.model.get("team").name,
            "data-salary": statsHelper.formatSalary(this.model.get("salary"))
        }
    },
    tagName: "tr",
    events: {
        "click a.exclude": "excludePlayer",
        "click a.include": "includePlayer",
        "click a.lock": "lockPlayer",
        "click a.unlock": "unlockPlayer",
        "click a.like": "likePlayer",
        "click a.unlike": "unlikePlayer",
        "focusout .fpts": "updateFpts",
        "focusout .note-field": "updateNote",
        "click .note-icon": "toggleNote",
        "click .player-popup": "showProfile"
    },
    applyFilters: function() {
        if (this.passesPositionFilter() && this.passesStateFilter() && this.passesSearchFilter()) {
            $(this.el).show()
        } else {
            $(this.el).hide()
        }
    },
    passesPositionFilter: function() {
        var c = $("[data-role=pos-filter].on");
        if (c.length == 0) {
            return true
        }
        var a = _.map(c, function(d) {
            return $(d).data("filter")
        });
        var b = $(this.el).data("pos").replace(/\,/gi, "/").split("/");
        return _.intersection(a, b).length > 0
    },
    passesStateFilter: function() {
        var a = $(".builder-selection .lst.tabs li a.on").eq(0).text();
        if (a === "All" && !this.model.get("excluded") || a === "Locked" && this.model.get("locked") || a === "Favs" && this.model.get("liked") || a === "Excluded" && this.model.get("excluded")) {
            return true
        }
        return false
    },
    passesSearchFilter: function(a) {
        var a = $('input[name="player-search"]').val();
        var b = new RegExp(a, "ig");
        return a === "" || this.model.get("first_name").match(b) || this.model.get("last_name").match(b)
    },
    toggleNote: function(d) {
        d.preventDefault();
        var c = $(d.target);
        var a = 'tr.note[data-projection-id="' + this.model.id + '"]';
        var b = this.model.get("note") != undefined ? this.model.get("note") : "";
        if ($(a).length > 0) {
            $(a).remove();
            return false
        }
        if (LineupBuilder.getLoadedProductId()) {
            $(this.el).after('<tr class="note" data-projection-id="' + this.model.id + '"><td colspan="12"><p>' + b + "</p></td></tr>")
        } else {
            $(this.el).after('<tr class="note" data-projection-id="' + this.model.id + '"><td colspan="12"><textarea class="note-field">' + b + "</textarea></td></tr>");
            $(a).find(".note-field").on("focusout", {
                view: this
            }, function(f) {
                f.data.view.updateNote(f, f.data.view)
            })
        }
    },
    updateFpts: function(f) {
        f.preventDefault();
        var g = $(f.target).data("projection-id");
        var c = $(f.target).val();
        var d = $("input[data-projection-id=" + g + "]");
        var a = parseFloat(c);
        var b = this.model.get("rg_fpts");
        if (a.toFixed(2) != b.toFixed(2)) {
            this.model.updateFpts(a, "edited");
            d.parent().next("td").html(this.model.get("point_per_dollar"));
            d.parent().next("td").data("sort", this.model.get("point_per_dollar"));
            d.parent().data("sort", a);
            LineupBuilder.Views.projectionStatus.rows[this.model.get("id")] = {
                name: this.model.fullName(),
                oldFpts: b,
                newFpts: this.model.get("fpts"),
                status: "edited",
                statusColor: "blue"
            };
            LineupBuilder.Views.projectionStatus.render()
        }
    },
    updateNote: function(c, a) {
        c.preventDefault();
        var d = $(c.target).val();
        var b = $(a.el).find(".note-icon");
        if (d) {
            b.addClass("populated")
        } else {
            b.removeClass("populated")
        }
        a.model.updateNote(d);
        LineupBuilder.Views.projectionStatus.rows[a.model.get("id")] = {
            note: d
        };
        LineupBuilder.Views.projectionStatus.render()
    },
    excludePlayer: function(a) {
        a.preventDefault();
        this.model.excludePlayer()
    },
    includePlayer: function(a) {
        a.preventDefault();
        this.model.includePlayer()
    },
    lockPlayer: function(a) {
        a.preventDefault();
        this.model.lockPlayer()
    },
    unlockPlayer: function(a) {
        a.preventDefault();
        this.model.unlockPlayer()
    },
    likePlayer: function(c) {
        c.preventDefault();
        var a = this.model;
        var b = $(c.target).closest("td").find("div.exposure");
        b.show();
        b.find("li").on("click", function() {
            var d = $(this).attr("data-value");
            if (!d) {
                a.unlikePlayer()
            } else {
                a.likePlayer(d)
            }
            b.hide()
        })
    },
    unlikePlayer: function(a) {
        a.preventDefault();
        this.model.unlikePlayer()
    },
    showProfile: function(a) {
        a.preventDefault();
        $behaviors.modalInit($(a.target).attr("href"), {}, $behaviors.playerPopup.getProfile)
    },
    render: function() {
        LineupBuilder.renderTemplate("#player-template", this.el, this.model.toJSON())
    }
});
var ProjectionStatus = Backbone.View.extend({
    initialize: function() {
        this.rows = {};
        this.errors = []
    },
    el: "#proj-upload-status",
    render: function() {
        var b = _.toArray(this.rows);
        $("#proj-upload-status").empty();
        $(".blk.builder-upload-form").addClass("uploaded");
        var c = $("#upload-status-template").html();
        var a = Handlebars.compile(c);
        $(this.el).html(a({
            rows: b.concat(this.errors)
        }));
        this.errors.length = 0;
        $(".blk.builder-upload-table").show()
    }
});
var ReplacementsView = Backbone.View.extend({
    initialize: function(b) {
        var a = this;
        _.bindAll(this, "renderReplacementTableRow");
        this.containerId = b.containerId;
        this.el = b.containerId + " .blk.replacements-list";
        this.collection.on("reload", function(c) {
            a.render()
        });
        $(this.el).find("a.close").on("click", function(c) {
            c.preventDefault();
            a.trigger("cleanUp");
            $(a.el).hide();
            $(a.containerId + " .blk.builder-cards-list").show();
            a.remove()
        })
    },
    render: function() {
        $(this.el).show();
        $(this.el).find("table tbody").empty();
        $(this.containerId).find(".blk.builder-cards-list").hide();
        this.collection.each(this.renderReplacementTableRow)
    },
    renderReplacementTableRow: function(a) {
        var b = new ReplacementTableRow({
            model: a,
            collection: this.collection
        });
        b.render();
        b.listenTo(this, "cleanUp", b.remove);
        $(this.el).find("table tbody").append(b.el)
    }
});
var ReplacementTableRow = Backbone.View.extend({
    initialize: function() {
        var a = this;
        this.collection.on("reload", function() {
            a.remove();
            a.unbind()
        });
        $('input[name="replacement-search"]').keyup(function() {
            a.checkPlayer($(this).val())
        })
    },
    tagName: "tr",
    events: {
        "click span.add a": "replacePlayer"
    },
    checkPlayer: function(b) {
        var c = new RegExp(b, "ig");
        var a = this.model.fullName();
        if (!a.match(c)) {
            $(this.el).hide()
        } else {
            $(this.el).show()
        }
    },
    replacePlayer: function(b) {
        b.preventDefault();
        var a = this.model;
        this.collection.lineup.swapPlayer(this.collection.slotIndex, a);
        this.collection.reload()
    },
    render: function() {
        var a = this;
        LineupBuilder.renderTemplate("#replacement-table-row", this.el, this.model.toJSON())
    }
});
var GameFilters = function() {
    excludePlayers = function(c, b) {
        _.each(LineupBuilder.Views.projection, function(e, f, d) {
            if (_.contains(c, e.model.get("team").id.toString())) {
                e.model.excludePlayer(true)
            }
        });
        if (!b) {
            _.each(c, function(d) {
                LineupBuilder.storeLocal("excludedGames", d, 1, true)
            })
        }
        LineupBuilder.save()
    };
    includePlayers = function(c, d, b) {
        _.each(LineupBuilder.Views.projection, function(f, g, e) {
            if (_.contains(c, f.model.get("team").id.toString())) {
                f.model.includePlayer(false, true)
            }
        });
        if (d != false) {
            LineupBuilder.sortTable("tbody.projections-container", LineupBuilder.currentSortedHeader, true)
        }
        if (!b) {
            _.each(c, function(e) {
                LineupBuilder.removeLocal("excludedGames", e, true)
            })
        }
        LineupBuilder.save()
    };
    $(".lst.teams .game span").on("click", function(b) {
        b.preventDefault();
        RGFilters.toggleFilter($(this), undefined, true)
    });
    $(".lst.teams .game time").on("click", function(c) {
        c.preventDefault();
        var b = $(this).siblings("span");
        _.each(b, function(d) {
            RGFilters.toggleFilter($(d), undefined, true)
        })
    });
    $(".lst.teams .label.games").off().on("click", function(f) {
        f.preventDefault();
        var c = $(this);
        var d;
        var b = _.map($(".lst.teams .game span"), function(e) {
            return $(e).data("team-id").toString()
        });
        if (c.hasClass("off")) {
            c.removeClass("off");
            d = "on";
            includePlayers(b)
        } else {
            c.addClass("off");
            d = "off";
            excludePlayers(b)
        }
        _.each($(".lst.teams .game span"), function(e) {
            RGFilters.toggleFilter($(e), d, false)
        })
    });
    $(".lst.teams .game span").on("filterOn", function(b) {
        includePlayers([$(this).data("team-id").toString()], false, false)
    });
    $(".lst.teams .game span").on("filterOff", function(b) {
        excludePlayers([$(this).data("team-id").toString()], false)
    });
    $("select.slate-name").on("change", function(c) {
        var b = $(".slate-name").val();
        filterSlate(b)
    });
    filterSlate = function(e, b) {
        var h = $(".slate-data").val();
        if (h) {
            h = JSON.parse(h)
        }
        var g = h[e];
        var c = [];
        _.each(g, function(i) {
            c.push(i.teamAwayId.toString());
            c.push(i.teamHomeId.toString())
        });
        var f = [];
        var d = [];
        $(".lst.teams .game span").each(function() {
            var i = $(this).data("team-id").toString();
            if (_.contains(c, i) || c.length === 0) {
                f.push(i);
                RGFilters.toggleFilter($(this), "on", false)
            } else {
                d.push(i);
                RGFilters.toggleFilter($(this), "off", false)
            }
        });
        excludePlayers(d, b);
        includePlayers(f, undefined, b);
        rememberSlate(e);
        LineupBuilder.save()
    };
    rememberSlate = function(b) {
        LineupBuilder.Storage[LineupBuilder.Sport].slate = b
    };
    var a = LineupBuilder.Storage[LineupBuilder.Sport].slate;
    if (a) {
        filterSlate(a, true);
        $('select[data-role="slate-filter"] option[value="' + a + '"]').attr("selected", true)
    }
    _.each(LineupBuilder.Storage[LineupBuilder.Sport].excludedGames, function(b, d) {
        var c = $('.lst.teams .game span[data-team-id="' + d + '"]').eq(0);
        RGFilters.toggleFilter($(c), "off", false)
    });
    _.each($(".lst.teams li.game.started"), function(b) {
        _.each($(b).find("span"), function(c) {
            RGFilters.toggleFilter($(c), "off", true)
        })
    })
};