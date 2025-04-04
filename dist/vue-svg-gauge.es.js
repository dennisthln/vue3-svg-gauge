import { createElementBlock as h, openBlock as f, createCommentVNode as w, createElementVNode as d, Fragment as $, renderList as M, renderSlot as rt, getCurrentInstance as at } from "vue";
var S = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {};
function Y(e) {
  return e && e.__esModule && Object.prototype.hasOwnProperty.call(e, "default") ? e.default : e;
}
var J = { exports: {} };
(function(e, n) {
  var i = function() {
    this._tweens = {}, this._tweensAddedDuringUpdate = {};
  };
  i.prototype = {
    getAll: function() {
      return Object.keys(this._tweens).map((function(t) {
        return this._tweens[t];
      }).bind(this));
    },
    removeAll: function() {
      this._tweens = {};
    },
    add: function(t) {
      this._tweens[t.getId()] = t, this._tweensAddedDuringUpdate[t.getId()] = t;
    },
    remove: function(t) {
      delete this._tweens[t.getId()], delete this._tweensAddedDuringUpdate[t.getId()];
    },
    update: function(t, r) {
      var a = Object.keys(this._tweens);
      if (a.length === 0)
        return !1;
      for (t = t !== void 0 ? t : s.now(); a.length > 0; ) {
        this._tweensAddedDuringUpdate = {};
        for (var o = 0; o < a.length; o++) {
          var u = this._tweens[a[o]];
          u && u.update(t) === !1 && (u._isPlaying = !1, r || delete this._tweens[a[o]]);
        }
        a = Object.keys(this._tweensAddedDuringUpdate);
      }
      return !0;
    }
  };
  var s = new i();
  s.Group = i, s._nextId = 0, s.nextId = function() {
    return s._nextId++;
  }, typeof window > "u" && typeof process < "u" && process.hrtime ? s.now = function() {
    var t = process.hrtime();
    return t[0] * 1e3 + t[1] / 1e6;
  } : typeof window < "u" && window.performance !== void 0 && window.performance.now !== void 0 ? s.now = window.performance.now.bind(window.performance) : Date.now !== void 0 ? s.now = Date.now : s.now = function() {
    return (/* @__PURE__ */ new Date()).getTime();
  }, s.Tween = function(t, r) {
    this._object = t, this._valuesStart = {}, this._valuesEnd = {}, this._valuesStartRepeat = {}, this._duration = 1e3, this._repeat = 0, this._repeatDelayTime = void 0, this._yoyo = !1, this._isPlaying = !1, this._reversed = !1, this._delayTime = 0, this._startTime = null, this._easingFunction = s.Easing.Linear.None, this._interpolationFunction = s.Interpolation.Linear, this._chainedTweens = [], this._onStartCallback = null, this._onStartCallbackFired = !1, this._onUpdateCallback = null, this._onCompleteCallback = null, this._onStopCallback = null, this._group = r || s, this._id = s.nextId();
  }, s.Tween.prototype = {
    getId: function() {
      return this._id;
    },
    isPlaying: function() {
      return this._isPlaying;
    },
    to: function(r, a) {
      return this._valuesEnd = r, a !== void 0 && (this._duration = a), this;
    },
    start: function(r) {
      this._group.add(this), this._isPlaying = !0, this._onStartCallbackFired = !1, this._startTime = r !== void 0 ? typeof r == "string" ? s.now() + parseFloat(r) : r : s.now(), this._startTime += this._delayTime;
      for (var a in this._valuesEnd) {
        if (this._valuesEnd[a] instanceof Array) {
          if (this._valuesEnd[a].length === 0)
            continue;
          this._valuesEnd[a] = [this._object[a]].concat(this._valuesEnd[a]);
        }
        this._object[a] !== void 0 && (this._valuesStart[a] = this._object[a], this._valuesStart[a] instanceof Array || (this._valuesStart[a] *= 1), this._valuesStartRepeat[a] = this._valuesStart[a] || 0);
      }
      return this;
    },
    stop: function() {
      return this._isPlaying ? (this._group.remove(this), this._isPlaying = !1, this._onStopCallback !== null && this._onStopCallback(this._object), this.stopChainedTweens(), this) : this;
    },
    end: function() {
      return this.update(this._startTime + this._duration), this;
    },
    stopChainedTweens: function() {
      for (var r = 0, a = this._chainedTweens.length; r < a; r++)
        this._chainedTweens[r].stop();
    },
    group: function(t) {
      return this._group = t, this;
    },
    delay: function(r) {
      return this._delayTime = r, this;
    },
    repeat: function(r) {
      return this._repeat = r, this;
    },
    repeatDelay: function(r) {
      return this._repeatDelayTime = r, this;
    },
    yoyo: function(r) {
      return this._yoyo = r, this;
    },
    easing: function(r) {
      return this._easingFunction = r, this;
    },
    interpolation: function(r) {
      return this._interpolationFunction = r, this;
    },
    chain: function() {
      return this._chainedTweens = arguments, this;
    },
    onStart: function(r) {
      return this._onStartCallback = r, this;
    },
    onUpdate: function(r) {
      return this._onUpdateCallback = r, this;
    },
    onComplete: function(r) {
      return this._onCompleteCallback = r, this;
    },
    onStop: function(r) {
      return this._onStopCallback = r, this;
    },
    update: function(r) {
      var a, o, u;
      if (r < this._startTime)
        return !0;
      this._onStartCallbackFired === !1 && (this._onStartCallback !== null && this._onStartCallback(this._object), this._onStartCallbackFired = !0), o = (r - this._startTime) / this._duration, o = this._duration === 0 || o > 1 ? 1 : o, u = this._easingFunction(o);
      for (a in this._valuesEnd)
        if (this._valuesStart[a] !== void 0) {
          var l = this._valuesStart[a] || 0, c = this._valuesEnd[a];
          c instanceof Array ? this._object[a] = this._interpolationFunction(c, u) : (typeof c == "string" && (c.charAt(0) === "+" || c.charAt(0) === "-" ? c = l + parseFloat(c) : c = parseFloat(c)), typeof c == "number" && (this._object[a] = l + (c - l) * u));
        }
      if (this._onUpdateCallback !== null && this._onUpdateCallback(this._object), o === 1)
        if (this._repeat > 0) {
          isFinite(this._repeat) && this._repeat--;
          for (a in this._valuesStartRepeat) {
            if (typeof this._valuesEnd[a] == "string" && (this._valuesStartRepeat[a] = this._valuesStartRepeat[a] + parseFloat(this._valuesEnd[a])), this._yoyo) {
              var C = this._valuesStartRepeat[a];
              this._valuesStartRepeat[a] = this._valuesEnd[a], this._valuesEnd[a] = C;
            }
            this._valuesStart[a] = this._valuesStartRepeat[a];
          }
          return this._yoyo && (this._reversed = !this._reversed), this._repeatDelayTime !== void 0 ? this._startTime = r + this._repeatDelayTime : this._startTime = r + this._delayTime, !0;
        } else {
          this._onCompleteCallback !== null && this._onCompleteCallback(this._object);
          for (var b = 0, nt = this._chainedTweens.length; b < nt; b++)
            this._chainedTweens[b].start(this._startTime + this._duration);
          return !1;
        }
      return !0;
    }
  }, s.Easing = {
    Linear: {
      None: function(t) {
        return t;
      }
    },
    Quadratic: {
      In: function(t) {
        return t * t;
      },
      Out: function(t) {
        return t * (2 - t);
      },
      InOut: function(t) {
        return (t *= 2) < 1 ? 0.5 * t * t : -0.5 * (--t * (t - 2) - 1);
      }
    },
    Cubic: {
      In: function(t) {
        return t * t * t;
      },
      Out: function(t) {
        return --t * t * t + 1;
      },
      InOut: function(t) {
        return (t *= 2) < 1 ? 0.5 * t * t * t : 0.5 * ((t -= 2) * t * t + 2);
      }
    },
    Quartic: {
      In: function(t) {
        return t * t * t * t;
      },
      Out: function(t) {
        return 1 - --t * t * t * t;
      },
      InOut: function(t) {
        return (t *= 2) < 1 ? 0.5 * t * t * t * t : -0.5 * ((t -= 2) * t * t * t - 2);
      }
    },
    Quintic: {
      In: function(t) {
        return t * t * t * t * t;
      },
      Out: function(t) {
        return --t * t * t * t * t + 1;
      },
      InOut: function(t) {
        return (t *= 2) < 1 ? 0.5 * t * t * t * t * t : 0.5 * ((t -= 2) * t * t * t * t + 2);
      }
    },
    Sinusoidal: {
      In: function(t) {
        return 1 - Math.cos(t * Math.PI / 2);
      },
      Out: function(t) {
        return Math.sin(t * Math.PI / 2);
      },
      InOut: function(t) {
        return 0.5 * (1 - Math.cos(Math.PI * t));
      }
    },
    Exponential: {
      In: function(t) {
        return t === 0 ? 0 : Math.pow(1024, t - 1);
      },
      Out: function(t) {
        return t === 1 ? 1 : 1 - Math.pow(2, -10 * t);
      },
      InOut: function(t) {
        return t === 0 ? 0 : t === 1 ? 1 : (t *= 2) < 1 ? 0.5 * Math.pow(1024, t - 1) : 0.5 * (-Math.pow(2, -10 * (t - 1)) + 2);
      }
    },
    Circular: {
      In: function(t) {
        return 1 - Math.sqrt(1 - t * t);
      },
      Out: function(t) {
        return Math.sqrt(1 - --t * t);
      },
      InOut: function(t) {
        return (t *= 2) < 1 ? -0.5 * (Math.sqrt(1 - t * t) - 1) : 0.5 * (Math.sqrt(1 - (t -= 2) * t) + 1);
      }
    },
    Elastic: {
      In: function(t) {
        return t === 0 ? 0 : t === 1 ? 1 : -Math.pow(2, 10 * (t - 1)) * Math.sin((t - 1.1) * 5 * Math.PI);
      },
      Out: function(t) {
        return t === 0 ? 0 : t === 1 ? 1 : Math.pow(2, -10 * t) * Math.sin((t - 0.1) * 5 * Math.PI) + 1;
      },
      InOut: function(t) {
        return t === 0 ? 0 : t === 1 ? 1 : (t *= 2, t < 1 ? -0.5 * Math.pow(2, 10 * (t - 1)) * Math.sin((t - 1.1) * 5 * Math.PI) : 0.5 * Math.pow(2, -10 * (t - 1)) * Math.sin((t - 1.1) * 5 * Math.PI) + 1);
      }
    },
    Back: {
      In: function(t) {
        var r = 1.70158;
        return t * t * ((r + 1) * t - r);
      },
      Out: function(t) {
        var r = 1.70158;
        return --t * t * ((r + 1) * t + r) + 1;
      },
      InOut: function(t) {
        var r = 2.5949095;
        return (t *= 2) < 1 ? 0.5 * (t * t * ((r + 1) * t - r)) : 0.5 * ((t -= 2) * t * ((r + 1) * t + r) + 2);
      }
    },
    Bounce: {
      In: function(t) {
        return 1 - s.Easing.Bounce.Out(1 - t);
      },
      Out: function(t) {
        return t < 1 / 2.75 ? 7.5625 * t * t : t < 2 / 2.75 ? 7.5625 * (t -= 1.5 / 2.75) * t + 0.75 : t < 2.5 / 2.75 ? 7.5625 * (t -= 2.25 / 2.75) * t + 0.9375 : 7.5625 * (t -= 2.625 / 2.75) * t + 0.984375;
      },
      InOut: function(t) {
        return t < 0.5 ? s.Easing.Bounce.In(t * 2) * 0.5 : s.Easing.Bounce.Out(t * 2 - 1) * 0.5 + 0.5;
      }
    }
  }, s.Interpolation = {
    Linear: function(t, r) {
      var a = t.length - 1, o = a * r, u = Math.floor(o), l = s.Interpolation.Utils.Linear;
      return r < 0 ? l(t[0], t[1], o) : r > 1 ? l(t[a], t[a - 1], a - o) : l(t[u], t[u + 1 > a ? a : u + 1], o - u);
    },
    Bezier: function(t, r) {
      for (var a = 0, o = t.length - 1, u = Math.pow, l = s.Interpolation.Utils.Bernstein, c = 0; c <= o; c++)
        a += u(1 - r, o - c) * u(r, c) * t[c] * l(o, c);
      return a;
    },
    CatmullRom: function(t, r) {
      var a = t.length - 1, o = a * r, u = Math.floor(o), l = s.Interpolation.Utils.CatmullRom;
      return t[0] === t[a] ? (r < 0 && (u = Math.floor(o = a * (1 + r))), l(t[(u - 1 + a) % a], t[u], t[(u + 1) % a], t[(u + 2) % a], o - u)) : r < 0 ? t[0] - (l(t[0], t[0], t[1], t[1], -o) - t[0]) : r > 1 ? t[a] - (l(t[a], t[a], t[a - 1], t[a - 1], o - a) - t[a]) : l(t[u ? u - 1 : 0], t[u], t[a < u + 1 ? a : u + 1], t[a < u + 2 ? a : u + 2], o - u);
    },
    Utils: {
      Linear: function(t, r, a) {
        return (r - t) * a + t;
      },
      Bernstein: function(t, r) {
        var a = s.Interpolation.Utils.Factorial;
        return a(t) / a(r) / a(t - r);
      },
      Factorial: /* @__PURE__ */ function() {
        var t = [1];
        return function(r) {
          var a = 1;
          if (t[r])
            return t[r];
          for (var o = r; o > 1; o--)
            a *= o;
          return t[r] = a, a;
        };
      }(),
      CatmullRom: function(t, r, a, o, u) {
        var l = (a - t) * 0.5, c = (o - r) * 0.5, C = u * u, b = u * C;
        return (2 * r - 2 * a + l + c) * b + (-3 * r + 3 * a - 2 * l - c) * C + l * u + r;
      }
    }
  }, function(t) {
    e.exports = s;
  }();
})(J);
var it = J.exports;
const x = /* @__PURE__ */ Y(it);
var st = Array.isArray, P = st, ot = typeof S == "object" && S && S.Object === Object && S, ut = ot, lt = ut, ct = typeof self == "object" && self && self.Object === Object && self, ht = lt || ct || Function("return this")(), j = ht, ft = j, dt = ft.Symbol, N = dt, U = N, Q = Object.prototype, _t = Q.hasOwnProperty, pt = Q.toString, m = U ? U.toStringTag : void 0;
function gt(e) {
  var n = _t.call(e, m), i = e[m];
  try {
    e[m] = void 0;
    var s = !0;
  } catch {
  }
  var t = pt.call(e);
  return s && (n ? e[m] = i : delete e[m]), t;
}
var vt = gt, yt = Object.prototype, bt = yt.toString;
function mt(e) {
  return bt.call(e);
}
var Ct = mt, z = N, wt = vt, St = Ct, Tt = "[object Null]", It = "[object Undefined]", H = z ? z.toStringTag : void 0;
function Et(e) {
  return e == null ? e === void 0 ? It : Tt : H && H in Object(e) ? wt(e) : St(e);
}
var W = Et;
function Ot(e) {
  return e != null && typeof e == "object";
}
var $t = Ot, Mt = W, xt = $t, At = "[object Symbol]";
function Dt(e) {
  return typeof e == "symbol" || xt(e) && Mt(e) == At;
}
var R = Dt, Pt = P, jt = R, Nt = /\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\\]|\\.)*?\1)\]/, Rt = /^\w*$/;
function Gt(e, n) {
  if (Pt(e))
    return !1;
  var i = typeof e;
  return i == "number" || i == "symbol" || i == "boolean" || e == null || jt(e) ? !0 : Rt.test(e) || !Nt.test(e) || n != null && e in Object(n);
}
var Ft = Gt;
function Ut(e) {
  var n = typeof e;
  return e != null && (n == "object" || n == "function");
}
var Z = Ut, zt = W, Ht = Z, Lt = "[object AsyncFunction]", Bt = "[object Function]", Vt = "[object GeneratorFunction]", Kt = "[object Proxy]";
function qt(e) {
  if (!Ht(e))
    return !1;
  var n = zt(e);
  return n == Bt || n == Vt || n == Lt || n == Kt;
}
var Xt = qt, Yt = j, Jt = Yt["__core-js_shared__"], Qt = Jt, A = Qt, L = function() {
  var e = /[^.]+$/.exec(A && A.keys && A.keys.IE_PROTO || "");
  return e ? "Symbol(src)_1." + e : "";
}();
function Wt(e) {
  return !!L && L in e;
}
var Zt = Wt, kt = Function.prototype, te = kt.toString;
function ee(e) {
  if (e != null) {
    try {
      return te.call(e);
    } catch {
    }
    try {
      return e + "";
    } catch {
    }
  }
  return "";
}
var ne = ee, re = Xt, ae = Zt, ie = Z, se = ne, oe = /[\\^$.*+?()[\]{}|]/g, ue = /^\[object .+?Constructor\]$/, le = Function.prototype, ce = Object.prototype, he = le.toString, fe = ce.hasOwnProperty, de = RegExp(
  "^" + he.call(fe).replace(oe, "\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, "$1.*?") + "$"
);
function _e(e) {
  if (!ie(e) || ae(e))
    return !1;
  var n = re(e) ? de : ue;
  return n.test(se(e));
}
var pe = _e;
function ge(e, n) {
  return e == null ? void 0 : e[n];
}
var ve = ge, ye = pe, be = ve;
function me(e, n) {
  var i = be(e, n);
  return ye(i) ? i : void 0;
}
var k = me, Ce = k, we = Ce(Object, "create"), I = we, B = I;
function Se() {
  this.__data__ = B ? B(null) : {}, this.size = 0;
}
var Te = Se;
function Ie(e) {
  var n = this.has(e) && delete this.__data__[e];
  return this.size -= n ? 1 : 0, n;
}
var Ee = Ie, Oe = I, $e = "__lodash_hash_undefined__", Me = Object.prototype, xe = Me.hasOwnProperty;
function Ae(e) {
  var n = this.__data__;
  if (Oe) {
    var i = n[e];
    return i === $e ? void 0 : i;
  }
  return xe.call(n, e) ? n[e] : void 0;
}
var De = Ae, Pe = I, je = Object.prototype, Ne = je.hasOwnProperty;
function Re(e) {
  var n = this.__data__;
  return Pe ? n[e] !== void 0 : Ne.call(n, e);
}
var Ge = Re, Fe = I, Ue = "__lodash_hash_undefined__";
function ze(e, n) {
  var i = this.__data__;
  return this.size += this.has(e) ? 0 : 1, i[e] = Fe && n === void 0 ? Ue : n, this;
}
var He = ze, Le = Te, Be = Ee, Ve = De, Ke = Ge, qe = He;
function g(e) {
  var n = -1, i = e == null ? 0 : e.length;
  for (this.clear(); ++n < i; ) {
    var s = e[n];
    this.set(s[0], s[1]);
  }
}
g.prototype.clear = Le;
g.prototype.delete = Be;
g.prototype.get = Ve;
g.prototype.has = Ke;
g.prototype.set = qe;
var Xe = g;
function Ye() {
  this.__data__ = [], this.size = 0;
}
var Je = Ye;
function Qe(e, n) {
  return e === n || e !== e && n !== n;
}
var We = Qe, Ze = We;
function ke(e, n) {
  for (var i = e.length; i--; )
    if (Ze(e[i][0], n))
      return i;
  return -1;
}
var E = ke, tn = E, en = Array.prototype, nn = en.splice;
function rn(e) {
  var n = this.__data__, i = tn(n, e);
  if (i < 0)
    return !1;
  var s = n.length - 1;
  return i == s ? n.pop() : nn.call(n, i, 1), --this.size, !0;
}
var an = rn, sn = E;
function on(e) {
  var n = this.__data__, i = sn(n, e);
  return i < 0 ? void 0 : n[i][1];
}
var un = on, ln = E;
function cn(e) {
  return ln(this.__data__, e) > -1;
}
var hn = cn, fn = E;
function dn(e, n) {
  var i = this.__data__, s = fn(i, e);
  return s < 0 ? (++this.size, i.push([e, n])) : i[s][1] = n, this;
}
var _n = dn, pn = Je, gn = an, vn = un, yn = hn, bn = _n;
function v(e) {
  var n = -1, i = e == null ? 0 : e.length;
  for (this.clear(); ++n < i; ) {
    var s = e[n];
    this.set(s[0], s[1]);
  }
}
v.prototype.clear = pn;
v.prototype.delete = gn;
v.prototype.get = vn;
v.prototype.has = yn;
v.prototype.set = bn;
var mn = v, Cn = k, wn = j, Sn = Cn(wn, "Map"), Tn = Sn, V = Xe, In = mn, En = Tn;
function On() {
  this.size = 0, this.__data__ = {
    hash: new V(),
    map: new (En || In)(),
    string: new V()
  };
}
var $n = On;
function Mn(e) {
  var n = typeof e;
  return n == "string" || n == "number" || n == "symbol" || n == "boolean" ? e !== "__proto__" : e === null;
}
var xn = Mn, An = xn;
function Dn(e, n) {
  var i = e.__data__;
  return An(n) ? i[typeof n == "string" ? "string" : "hash"] : i.map;
}
var O = Dn, Pn = O;
function jn(e) {
  var n = Pn(this, e).delete(e);
  return this.size -= n ? 1 : 0, n;
}
var Nn = jn, Rn = O;
function Gn(e) {
  return Rn(this, e).get(e);
}
var Fn = Gn, Un = O;
function zn(e) {
  return Un(this, e).has(e);
}
var Hn = zn, Ln = O;
function Bn(e, n) {
  var i = Ln(this, e), s = i.size;
  return i.set(e, n), this.size += i.size == s ? 0 : 1, this;
}
var Vn = Bn, Kn = $n, qn = Nn, Xn = Fn, Yn = Hn, Jn = Vn;
function y(e) {
  var n = -1, i = e == null ? 0 : e.length;
  for (this.clear(); ++n < i; ) {
    var s = e[n];
    this.set(s[0], s[1]);
  }
}
y.prototype.clear = Kn;
y.prototype.delete = qn;
y.prototype.get = Xn;
y.prototype.has = Yn;
y.prototype.set = Jn;
var Qn = y, tt = Qn, Wn = "Expected a function";
function G(e, n) {
  if (typeof e != "function" || n != null && typeof n != "function")
    throw new TypeError(Wn);
  var i = function() {
    var s = arguments, t = n ? n.apply(this, s) : s[0], r = i.cache;
    if (r.has(t))
      return r.get(t);
    var a = e.apply(this, s);
    return i.cache = r.set(t, a) || r, a;
  };
  return i.cache = new (G.Cache || tt)(), i;
}
G.Cache = tt;
var Zn = G, kn = Zn, tr = 500;
function er(e) {
  var n = kn(e, function(s) {
    return i.size === tr && i.clear(), s;
  }), i = n.cache;
  return n;
}
var nr = er, rr = nr, ar = /[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|$))/g, ir = /\\(\\)?/g, sr = rr(function(e) {
  var n = [];
  return e.charCodeAt(0) === 46 && n.push(""), e.replace(ar, function(i, s, t, r) {
    n.push(t ? r.replace(ir, "$1") : s || i);
  }), n;
}), or = sr;
function ur(e, n) {
  for (var i = -1, s = e == null ? 0 : e.length, t = Array(s); ++i < s; )
    t[i] = n(e[i], i, e);
  return t;
}
var lr = ur, K = N, cr = lr, hr = P, fr = R, q = K ? K.prototype : void 0, X = q ? q.toString : void 0;
function et(e) {
  if (typeof e == "string")
    return e;
  if (hr(e))
    return cr(e, et) + "";
  if (fr(e))
    return X ? X.call(e) : "";
  var n = e + "";
  return n == "0" && 1 / e == -1 / 0 ? "-0" : n;
}
var dr = et, _r = dr;
function pr(e) {
  return e == null ? "" : _r(e);
}
var gr = pr, vr = P, yr = Ft, br = or, mr = gr;
function Cr(e, n) {
  return vr(e) ? e : yr(e, n) ? [e] : br(mr(e));
}
var wr = Cr, Sr = R;
function Tr(e) {
  if (typeof e == "string" || Sr(e))
    return e;
  var n = e + "";
  return n == "0" && 1 / e == -1 / 0 ? "-0" : n;
}
var Ir = Tr, Er = wr, Or = Ir;
function $r(e, n) {
  n = Er(n, e);
  for (var i = 0, s = n.length; e != null && i < s; )
    e = e[Or(n[i++])];
  return i && i == s ? e : void 0;
}
var Mr = $r, xr = Mr;
function Ar(e, n, i) {
  var s = e == null ? void 0 : xr(e, n);
  return s === void 0 ? i : s;
}
var Dr = Ar;
const Pr = /* @__PURE__ */ Y(Dr), jr = (e, n) => {
  const i = e.__vccOpts || e;
  for (const [s, t] of n)
    i[s] = t;
  return i;
}, _ = 100, F = 100, T = 100;
function p(e, n) {
  const i = (n - 90) * Math.PI / 180;
  return {
    x: F + e * Math.cos(i),
    y: T + e * Math.sin(i)
  };
}
function D(e, n, i) {
  const s = p(e, i), t = p(e, n), r = i - n <= 180 ? "0" : "1";
  return [
    "M",
    s.x,
    s.y,
    "A",
    e,
    e,
    0,
    r,
    0,
    t.x,
    t.y,
    "L",
    F,
    T
  ].join(" ");
}
const Nr = {
  name: "Gauge",
  setup() {
    const { uid: e } = at();
    return {
      uid: e
    };
  },
  props: {
    /**
     * Gauge value
     */
    value: {
      type: Number,
      default: 70
    },
    /**
     * Gauge min value
     */
    min: {
      type: Number,
      default: 0
    },
    /**
     * Gauge max value
     */
    max: {
      type: Number,
      default: 100
    },
    /**
     * Must be between -360 and 360
     * startAngle MUST be inferior to endAngle
     */
    startAngle: {
      type: Number,
      default: -90,
      validator: (e) => ((e < -360 || e > 360) && console.warn('GaugeChart - props "startAngle" must be between -360 and 360'), !0)
    },
    /**
     * Must be between -360 and 360
     * startAngle MUST be inferior to endAngle
     */
    endAngle: {
      type: Number,
      default: 90,
      validator: (e) => ((e < -360 || e > 360) && console.warn('GaugeChart - props "endAngle" must be between -360 and 360'), !0)
    },
    /**
     * Size of the inner radius between 0 and RADIUS
     * The closer to RADIUS, the thinner the gauge will be
     */
    innerRadius: {
      type: Number,
      default: 60,
      validator: (e) => ((e < 0 || e > 100) && console.warn(`GaugeChart - props "innerRadius" must be between 0 and ${_}`), !0)
    },
    /**
     * Separator step, will display a separator each min + (n * separatorStep)
     * Won't display any separator if 0 or null
     */
    separatorStep: {
      type: Number,
      default: 10,
      validator: (e) => (e !== null && e < 0 && console.warn('GaugeChart - props "separatorStep" must be null or >= 0'), !0)
    },
    /**
     * Separator Thickness, unit is in degree
     */
    separatorThickness: {
      type: Number,
      default: 4
    },
    /**
     * Gauge color. Can be :
     * - a simple color if passed as a 'string'
     * - a gradient if is an array of objects :
     * { offset: percentage where the color starts, color: color to display }
     */
    gaugeColor: {
      type: [Array, String],
      default: () => [
        { offset: 0, color: "#347AB0" },
        { offset: 100, color: "#8CDFAD" }
      ]
    },
    /**
     * Color of the base of the gauge
     */
    baseColor: {
      type: String,
      default: "#DDDDDD"
    },
    /**
     * Animation easing option
     * You can check the Tween.js doc here :
     * https://github.com/tweenjs/tween.js/blob/master/docs/user_guide.md
     *
     * There are a few existing function gourped by equation they represent:
     * Linear, Quadratic, Cubic, Quartic, Quintic, Sinusoidal, Exponential,
     * Circular, Elastic, Back and Bounce
     *
     * And then by the easing type: In, Out and InOut.
     * The syntaxe is : equation.easingType
     */
    easing: {
      type: String,
      default: "Circular.Out"
    },
    /**
     * Scale interval
     * Won't display any scall if 0 or `null`
     */
    scaleInterval: {
      type: Number,
      default: 5,
      validator: (e) => (e !== null && e < 0 && console.warn('GaugeChart - props "scaleInterval" must be null or >= 0'), !0)
    },
    /**
     * Transition duration in ms
     */
    transitionDuration: {
      type: Number,
      default: 1500
    }
  },
  data() {
    return {
      X_CENTER: F,
      Y_CENTER: T,
      RADIUS: _,
      /**
       * Tweened value for the animation of the gauge
       * Starts at `min`
       * @type {Number}
       */
      tweenedValue: this.min
    };
  },
  computed: {
    /**
     * Height of the viewbox calculated by getting
     * - the lower y between the center and the start and end angle
     * - (RADIUS * 2) if one of the angle is bigger than 180°
     * @type {Number}
     */
    height() {
      const { endAngle: e, startAngle: n } = this, { y: i } = p(_, n), { y: s } = p(_, e);
      return Math.abs(e) <= 180 && Math.abs(n) <= 180 ? Math.max(T, i, s) : _ * 2;
    },
    /**
     * d property of the path of the base gauge (the colored one)
     * @type {String}
     */
    basePath() {
      const { startAngle: e, endAngle: n } = this;
      return D(_, e, n);
    },
    /**
     * d property of the gauge according to the value.
     * This gauge will hide a part of the base gauge
     * @type {String}
     */
    gaugePath() {
      const { endAngle: e, getAngle: n, tweenedValue: i } = this;
      return D(_, n(i), e);
    },
    /**
     * Total angle of the gauge
     * @type {Number}
     */
    totalAngle() {
      const { startAngle: e, endAngle: n } = this;
      return Math.abs(n - e);
    },
    /**
     * True if the gauge is a full circle
     * @type {Boolean}
     */
    isCircle() {
      return Math.abs(this.totalAngle) === 360;
    },
    /**
     * True if the gaugeColor is an array
     * Result in displaying a gradient instead of a simple color
     * @type {Boolean}
     */
    hasGradient() {
      return Array.isArray(this.gaugeColor);
    },
    /**
     * Array of the path of each separator
     */
    separatorPaths() {
      const {
        separatorStep: e,
        getAngle: n,
        min: i,
        max: s,
        separatorThickness: t,
        isCircle: r
      } = this;
      if (e > 0) {
        const a = [];
        let o = r ? i : i + e;
        for (o; o < s; o += e) {
          const u = n(o), l = t / 2;
          a.push(D(_ + 2, u - l, u + l));
        }
        return a;
      }
      return null;
    },
    /**
     * Array of line configuration for each scale
     */
    scaleLines() {
      const {
        scaleInterval: e,
        isCircle: n,
        min: i,
        max: s,
        getAngle: t,
        innerRadius: r
      } = this;
      if (e > 0) {
        const a = [];
        let o = n ? i + e : i;
        for (o; o < s + e; o += e) {
          const u = t(o), l = p(r - 4, u), c = p(r - 8, u);
          a.push({
            xS: l.x,
            yS: l.y,
            xE: c.x,
            yE: c.y
          });
        }
        return a;
      }
      return null;
    }
  },
  watch: {
    /**
     * Watch the value and tween it to make an animation
     * If value < min, used value will be min
     * If value > max, used value will be max
     */
    value: {
      immediate: !0,
      handler(e) {
        const { easing: n, tweenedValue: i, min: s, max: t, transitionDuration: r } = this;
        let a = e;
        e < s && (a = s), e > t && (a = t);
        function o() {
          x.update() && requestAnimationFrame(o);
        }
        new x.Tween({ tweeningValue: i }).to({ tweeningValue: a }, r).easing(Pr(x.Easing, n)).onUpdate((u) => {
          this.tweenedValue = u.tweeningValue;
        }).start(), o();
      }
    }
  },
  methods: {
    /**
     * Get an angle for a value
     * @param   {Number} value
     * @returns {Number} angle - in degree
     */
    getAngle(e) {
      const { min: n, max: i, startAngle: s, totalAngle: t } = this, r = i - n || 1;
      return e * t / r + s;
    }
  }
}, Rr = { class: "gauge" }, Gr = ["viewBox"], Fr = ["id"], Ur = /* @__PURE__ */ d("feFlood", { "flood-color": "#c7c6c6" }, null, -1), zr = /* @__PURE__ */ d("feComposite", {
  in2: "SourceAlpha",
  operator: "out"
}, null, -1), Hr = /* @__PURE__ */ d("feGaussianBlur", {
  stdDeviation: "2",
  result: "blur"
}, null, -1), Lr = /* @__PURE__ */ d("feComposite", {
  operator: "atop",
  in2: "SourceGraphic"
}, null, -1), Br = [
  Ur,
  zr,
  Hr,
  Lr
], Vr = ["id"], Kr = ["offset", "stop-color"], qr = ["id"], Xr = ["r", "cx", "cy"], Yr = ["r", "cx", "cy"], Jr = ["d"], Qr = ["mask"], Wr = ["r", "cx", "cy", "fill"], Zr = ["d", "fill"], kr = ["r", "cx", "cy", "fill"], ta = ["d", "fill", "filter"], ea = ["x1", "y1", "x2", "y2", "stroke"], na = ["height"];
function ra(e, n, i, s, t, r) {
  return f(), h("div", Rr, [
    r.height ? (f(), h("svg", {
      key: 0,
      viewBox: `0 0 ${t.RADIUS * 2} ${r.height}`,
      height: "100%",
      width: "100%",
      xmlns: "http://www.w3.org/2000/svg"
    }, [
      d("defs", null, [
        d("filter", {
          id: `innershadow-${s.uid}`
        }, Br, 8, Fr),
        r.hasGradient ? (f(), h("linearGradient", {
          key: 0,
          id: `gaugeGradient-${s.uid}`
        }, [
          (f(!0), h($, null, M(i.gaugeColor, (a, o) => (f(), h("stop", {
            key: `${a.color}-${o}`,
            offset: `${a.offset}%`,
            "stop-color": a.color
          }, null, 8, Kr))), 128))
        ], 8, Vr)) : w("", !0),
        d("mask", {
          id: `innerCircle-${s.uid}`
        }, [
          d("circle", {
            r: t.RADIUS - 0.5,
            cx: t.X_CENTER,
            cy: t.Y_CENTER,
            fill: "white"
          }, null, 8, Xr),
          d("circle", {
            r: i.innerRadius,
            cx: t.X_CENTER,
            cy: t.Y_CENTER,
            fill: "black"
          }, null, 8, Yr),
          r.separatorPaths ? (f(!0), h($, { key: 0 }, M(r.separatorPaths, (a, o) => (f(), h("path", {
            key: o,
            d: a,
            fill: "black"
          }, null, 8, Jr))), 128)) : w("", !0)
        ], 8, qr)
      ]),
      d("g", {
        mask: `url(#innerCircle-${s.uid})`
      }, [
        r.isCircle ? (f(), h("circle", {
          key: 0,
          r: t.RADIUS,
          cx: t.X_CENTER,
          cy: t.Y_CENTER,
          fill: r.hasGradient ? `url(#gaugeGradient-${s.uid})` : i.gaugeColor
        }, null, 8, Wr)) : (f(), h("path", {
          key: 1,
          d: r.basePath,
          fill: r.hasGradient ? `url(#gaugeGradient-${s.uid})` : i.gaugeColor
        }, null, 8, Zr)),
        i.value === i.min && r.isCircle ? (f(), h("circle", {
          key: 2,
          r: t.RADIUS,
          cx: t.X_CENTER,
          cy: t.Y_CENTER,
          fill: i.baseColor
        }, null, 8, kr)) : (f(), h("path", {
          key: 3,
          d: r.gaugePath,
          fill: i.baseColor,
          filter: `url(#innershadow-${s.uid})`
        }, null, 8, ta))
      ], 8, Qr),
      r.scaleLines ? (f(!0), h($, { key: 0 }, M(r.scaleLines, (a, o) => (f(), h("line", {
        key: `${a.xE}-${o}`,
        x1: a.xS,
        y1: a.yS,
        x2: a.xE,
        y2: a.yE,
        "stroke-width": "1",
        stroke: i.baseColor
      }, null, 8, ea))), 128)) : w("", !0),
      (f(), h("foreignObject", {
        x: "0",
        y: "0",
        width: "100%",
        height: r.height
      }, [
        rt(e.$slots, "default")
      ], 8, na))
    ], 8, Gr)) : w("", !0)
  ]);
}
const ia = /* @__PURE__ */ jr(Nr, [["render", ra]]);
export {
  ia as default
};
