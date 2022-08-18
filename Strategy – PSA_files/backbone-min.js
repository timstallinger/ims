(function (r) {
  var n =
    (typeof self == "object" && self.self === self && self) ||
    (typeof global == "object" && global.global === global && global);
  if (typeof define === "function" && define.amd) {
    define(["underscore", "jquery", "exports"], function (t, e, i) {
      n.Backbone = r(n, i, t, e);
    });
  } else if (typeof exports !== "undefined") {
    var t = require("underscore"),
      e;
    try {
      e = require("jquery");
    } catch (t) {}
    r(n, exports, t, e);
  } else {
    n.Backbone = r(n, {}, n._, n.jQuery || n.Zepto || n.ender || n.$);
  }
})(function (t, h, x, e) {
  var i = t.Backbone;
  var a = Array.prototype.slice;
  h.VERSION = "1.4.1";
  h.$ = e;
  h.noConflict = function () {
    t.Backbone = i;
    return this;
  };
  h.emulateHTTP = false;
  h.emulateJSON = false;
  var r = (h.Events = {});
  var o = /\s+/;
  var l;
  var u = function (t, e, i, r, n) {
    var s = 0,
      a;
    if (i && typeof i === "object") {
      if (r !== void 0 && "context" in n && n.context === void 0) n.context = r;
      for (a = x.keys(i); s < a.length; s++) {
        e = u(t, e, a[s], i[a[s]], n);
      }
    } else if (i && o.test(i)) {
      for (a = i.split(o); s < a.length; s++) {
        e = t(e, a[s], r, n);
      }
    } else {
      e = t(e, i, r, n);
    }
    return e;
  };
  r.on = function (t, e, i) {
    this._events = u(n, this._events || {}, t, e, {
      context: i,
      ctx: this,
      listening: l,
    });
    if (l) {
      var r = this._listeners || (this._listeners = {});
      r[l.id] = l;
      l.interop = false;
    }
    return this;
  };
  r.listenTo = function (t, e, i) {
    if (!t) return this;
    var r = t._listenId || (t._listenId = x.uniqueId("l"));
    var n = this._listeningTo || (this._listeningTo = {});
    var s = (l = n[r]);
    if (!s) {
      this._listenId || (this._listenId = x.uniqueId("l"));
      s = l = n[r] = new p(this, t);
    }
    var a = c(t, e, i, this);
    l = void 0;
    if (a) throw a;
    if (s.interop) s.on(e, i);
    return this;
  };
  var n = function (t, e, i, r) {
    if (i) {
      var n = t[e] || (t[e] = []);
      var s = r.context,
        a = r.ctx,
        o = r.listening;
      if (o) o.count++;
      n.push({ callback: i, context: s, ctx: s || a, listening: o });
    }
    return t;
  };
  var c = function (t, e, i, r) {
    try {
      t.on(e, i, r);
    } catch (t) {
      return t;
    }
  };
  r.off = function (t, e, i) {
    if (!this._events) return this;
    this._events = u(s, this._events, t, e, {
      context: i,
      listeners: this._listeners,
    });
    return this;
  };
  r.stopListening = function (t, e, i) {
    var r = this._listeningTo;
    if (!r) return this;
    var n = t ? [t._listenId] : x.keys(r);
    for (var s = 0; s < n.length; s++) {
      var a = r[n[s]];
      if (!a) break;
      a.obj.off(e, i, this);
      if (a.interop) a.off(e, i);
    }
    if (x.isEmpty(r)) this._listeningTo = void 0;
    return this;
  };
  var s = function (t, e, i, r) {
    if (!t) return;
    var n = r.context,
      s = r.listeners;
    var a = 0,
      o;
    if (!e && !n && !i) {
      for (o = x.keys(s); a < o.length; a++) {
        s[o[a]].cleanup();
      }
      return;
    }
    o = e ? [e] : x.keys(t);
    for (; a < o.length; a++) {
      e = o[a];
      var h = t[e];
      if (!h) break;
      var l = [];
      for (var u = 0; u < h.length; u++) {
        var c = h[u];
        if (
          (i && i !== c.callback && i !== c.callback._callback) ||
          (n && n !== c.context)
        ) {
          l.push(c);
        } else {
          var f = c.listening;
          if (f) f.off(e, i);
        }
      }
      if (l.length) {
        t[e] = l;
      } else {
        delete t[e];
      }
    }
    return t;
  };
  r.once = function (t, e, i) {
    var r = u(f, {}, t, e, this.off.bind(this));
    if (typeof t === "string" && i == null) e = void 0;
    return this.on(r, e, i);
  };
  r.listenToOnce = function (t, e, i) {
    var r = u(f, {}, e, i, this.stopListening.bind(this, t));
    return this.listenTo(t, r);
  };
  var f = function (t, e, i, r) {
    if (i) {
      var n = (t[e] = x.once(function () {
        r(e, n);
        i.apply(this, arguments);
      }));
      n._callback = i;
    }
    return t;
  };
  r.trigger = function (t) {
    if (!this._events) return this;
    var e = Math.max(0, arguments.length - 1);
    var i = Array(e);
    for (var r = 0; r < e; r++) i[r] = arguments[r + 1];
    u(d, this._events, t, void 0, i);
    return this;
  };
  var d = function (t, e, i, r) {
    if (t) {
      var n = t[e];
      var s = t.all;
      if (n && s) s = s.slice();
      if (n) v(n, r);
      if (s) v(s, [e].concat(r));
    }
    return t;
  };
  var v = function (t, e) {
    var i,
      r = -1,
      n = t.length,
      s = e[0],
      a = e[1],
      o = e[2];
    switch (e.length) {
      case 0:
        while (++r < n) (i = t[r]).callback.call(i.ctx);
        return;
      case 1:
        while (++r < n) (i = t[r]).callback.call(i.ctx, s);
        return;
      case 2:
        while (++r < n) (i = t[r]).callback.call(i.ctx, s, a);
        return;
      case 3:
        while (++r < n) (i = t[r]).callback.call(i.ctx, s, a, o);
        return;
      default:
        while (++r < n) (i = t[r]).callback.apply(i.ctx, e);
        return;
    }
  };
  var p = function (t, e) {
    this.id = t._listenId;
    this.listener = t;
    this.obj = e;
    this.interop = true;
    this.count = 0;
    this._events = void 0;
  };
  p.prototype.on = r.on;
  p.prototype.off = function (t, e) {
    var i;
    if (this.interop) {
      this._events = u(s, this._events, t, e, {
        context: void 0,
        listeners: void 0,
      });
      i = !this._events;
    } else {
      this.count--;
      i = this.count === 0;
    }
    if (i) this.cleanup();
  };
  p.prototype.cleanup = function () {
    delete this.listener._listeningTo[this.obj._listenId];
    if (!this.interop) delete this.obj._listeners[this.id];
  };
  r.bind = r.on;
  r.unbind = r.off;
  x.extend(h, r);
  var g = (h.Model = function (t, e) {
    var i = t || {};
    e || (e = {});
    this.preinitialize.apply(this, arguments);
    this.cid = x.uniqueId(this.cidPrefix);
    this.attributes = {};
    if (e.collection) this.collection = e.collection;
    if (e.parse) i = this.parse(i, e) || {};
    var r = x.result(this, "defaults");
    i = x.defaults(x.extend({}, r, i), r);
    this.set(i, e);
    this.changed = {};
    this.initialize.apply(this, arguments);
  });
  x.extend(g.prototype, r, {
    changed: null,
    validationError: null,
    idAttribute: "id",
    cidPrefix: "c",
    preinitialize: function () {},
    initialize: function () {},
    toJSON: function (t) {
      return x.clone(this.attributes);
    },
    sync: function () {
      return h.sync.apply(this, arguments);
    },
    get: function (t) {
      return this.attributes[t];
    },
    escape: function (t) {
      return x.escape(this.get(t));
    },
    has: function (t) {
      return this.get(t) != null;
    },
    matches: function (t) {
      return !!x.iteratee(t, this)(this.attributes);
    },
    set: function (t, e, i) {
      if (t == null) return this;
      var r;
      if (typeof t === "object") {
        r = t;
        i = e;
      } else {
        (r = {})[t] = e;
      }
      i || (i = {});
      if (!this._validate(r, i)) return false;
      var n = i.unset;
      var s = i.silent;
      var a = [];
      var o = this._changing;
      this._changing = true;
      if (!o) {
        this._previousAttributes = x.clone(this.attributes);
        this.changed = {};
      }
      var h = this.attributes;
      var l = this.changed;
      var u = this._previousAttributes;
      for (var c in r) {
        e = r[c];
        if (!x.isEqual(h[c], e)) a.push(c);
        if (!x.isEqual(u[c], e)) {
          l[c] = e;
        } else {
          delete l[c];
        }
        n ? delete h[c] : (h[c] = e);
      }
      if (this.idAttribute in r) {
        var f = this.id;
        this.id = this.get(this.idAttribute);
        this.trigger("changeId", this, f, i);
      }
      if (!s) {
        if (a.length) this._pending = i;
        for (var d = 0; d < a.length; d++) {
          this.trigger("change:" + a[d], this, h[a[d]], i);
        }
      }
      if (o) return this;
      if (!s) {
        while (this._pending) {
          i = this._pending;
          this._pending = false;
          this.trigger("change", this, i);
        }
      }
      this._pending = false;
      this._changing = false;
      return this;
    },
    unset: function (t, e) {
      return this.set(t, void 0, x.extend({}, e, { unset: true }));
    },
    clear: function (t) {
      var e = {};
      for (var i in this.attributes) e[i] = void 0;
      return this.set(e, x.extend({}, t, { unset: true }));
    },
    hasChanged: function (t) {
      if (t == null) return !x.isEmpty(this.changed);
      return x.has(this.changed, t);
    },
    changedAttributes: function (t) {
      if (!t) return this.hasChanged() ? x.clone(this.changed) : false;
      var e = this._changing ? this._previousAttributes : this.attributes;
      var i = {};
      var r;
      for (var n in t) {
        var s = t[n];
        if (x.isEqual(e[n], s)) continue;
        i[n] = s;
        r = true;
      }
      return r ? i : false;
    },
    previous: function (t) {
      if (t == null || !this._previousAttributes) return null;
      return this._previousAttributes[t];
    },
    previousAttributes: function () {
      return x.clone(this._previousAttributes);
    },
    fetch: function (i) {
      i = x.extend({ parse: true }, i);
      var r = this;
      var n = i.success;
      i.success = function (t) {
        var e = i.parse ? r.parse(t, i) : t;
        if (!r.set(e, i)) return false;
        if (n) n.call(i.context, r, t, i);
        r.trigger("sync", r, t, i);
      };
      G(this, i);
      return this.sync("read", this, i);
    },
    save: function (t, e, i) {
      var r;
      if (t == null || typeof t === "object") {
        r = t;
        i = e;
      } else {
        (r = {})[t] = e;
      }
      i = x.extend({ validate: true, parse: true }, i);
      var n = i.wait;
      if (r && !n) {
        if (!this.set(r, i)) return false;
      } else if (!this._validate(r, i)) {
        return false;
      }
      var s = this;
      var a = i.success;
      var o = this.attributes;
      i.success = function (t) {
        s.attributes = o;
        var e = i.parse ? s.parse(t, i) : t;
        if (n) e = x.extend({}, r, e);
        if (e && !s.set(e, i)) return false;
        if (a) a.call(i.context, s, t, i);
        s.trigger("sync", s, t, i);
      };
      G(this, i);
      if (r && n) this.attributes = x.extend({}, o, r);
      var h = this.isNew() ? "create" : i.patch ? "patch" : "update";
      if (h === "patch" && !i.attrs) i.attrs = r;
      var l = this.sync(h, this, i);
      this.attributes = o;
      return l;
    },
    destroy: function (e) {
      e = e ? x.clone(e) : {};
      var i = this;
      var r = e.success;
      var n = e.wait;
      var s = function () {
        i.stopListening();
        i.trigger("destroy", i, i.collection, e);
      };
      e.success = function (t) {
        if (n) s();
        if (r) r.call(e.context, i, t, e);
        if (!i.isNew()) i.trigger("sync", i, t, e);
      };
      var t = false;
      if (this.isNew()) {
        x.defer(e.success);
      } else {
        G(this, e);
        t = this.sync("delete", this, e);
      }
      if (!n) s();
      return t;
    },
    url: function () {
      var t =
        x.result(this, "urlRoot") || x.result(this.collection, "url") || V();
      if (this.isNew()) return t;
      var e = this.get(this.idAttribute);
      return t.replace(/[^\/]$/, "$&/") + encodeURIComponent(e);
    },
    parse: function (t, e) {
      return t;
    },
    clone: function () {
      return new this.constructor(this.attributes);
    },
    isNew: function () {
      return !this.has(this.idAttribute);
    },
    isValid: function (t) {
      return this._validate({}, x.extend({}, t, { validate: true }));
    },
    _validate: function (t, e) {
      if (!e.validate || !this.validate) return true;
      t = x.extend({}, this.attributes, t);
      var i = (this.validationError = this.validate(t, e) || null);
      if (!i) return true;
      this.trigger("invalid", this, i, x.extend(e, { validationError: i }));
      return false;
    },
  });
  var m = (h.Collection = function (t, e) {
    e || (e = {});
    this.preinitialize.apply(this, arguments);
    if (e.model) this.model = e.model;
    if (e.comparator !== void 0) this.comparator = e.comparator;
    this._reset();
    this.initialize.apply(this, arguments);
    if (t) this.reset(t, x.extend({ silent: true }, e));
  });
  var w = { add: true, remove: true, merge: true };
  var _ = { add: true, remove: false };
  var E = function (t, e, i) {
    i = Math.min(Math.max(i, 0), t.length);
    var r = Array(t.length - i);
    var n = e.length;
    var s;
    for (s = 0; s < r.length; s++) r[s] = t[s + i];
    for (s = 0; s < n; s++) t[s + i] = e[s];
    for (s = 0; s < r.length; s++) t[s + n + i] = r[s];
  };
  x.extend(m.prototype, r, {
    model: g,
    preinitialize: function () {},
    initialize: function () {},
    toJSON: function (e) {
      return this.map(function (t) {
        return t.toJSON(e);
      });
    },
    sync: function () {
      return h.sync.apply(this, arguments);
    },
    add: function (t, e) {
      return this.set(t, x.extend({ merge: false }, e, _));
    },
    remove: function (t, e) {
      e = x.extend({}, e);
      var i = !x.isArray(t);
      t = i ? [t] : t.slice();
      var r = this._removeModels(t, e);
      if (!e.silent && r.length) {
        e.changes = { added: [], merged: [], removed: r };
        this.trigger("update", this, e);
      }
      return i ? r[0] : r;
    },
    set: function (t, e) {
      if (t == null) return;
      e = x.extend({}, w, e);
      if (e.parse && !this._isModel(t)) {
        t = this.parse(t, e) || [];
      }
      var i = !x.isArray(t);
      t = i ? [t] : t.slice();
      var r = e.at;
      if (r != null) r = +r;
      if (r > this.length) r = this.length;
      if (r < 0) r += this.length + 1;
      var n = [];
      var s = [];
      var a = [];
      var o = [];
      var h = {};
      var l = e.add;
      var u = e.merge;
      var c = e.remove;
      var f = false;
      var d = this.comparator && r == null && e.sort !== false;
      var v = x.isString(this.comparator) ? this.comparator : null;
      var p, g;
      for (g = 0; g < t.length; g++) {
        p = t[g];
        var m = this.get(p);
        if (m) {
          if (u && p !== m) {
            var _ = this._isModel(p) ? p.attributes : p;
            if (e.parse) _ = m.parse(_, e);
            m.set(_, e);
            a.push(m);
            if (d && !f) f = m.hasChanged(v);
          }
          if (!h[m.cid]) {
            h[m.cid] = true;
            n.push(m);
          }
          t[g] = m;
        } else if (l) {
          p = t[g] = this._prepareModel(p, e);
          if (p) {
            s.push(p);
            this._addReference(p, e);
            h[p.cid] = true;
            n.push(p);
          }
        }
      }
      if (c) {
        for (g = 0; g < this.length; g++) {
          p = this.models[g];
          if (!h[p.cid]) o.push(p);
        }
        if (o.length) this._removeModels(o, e);
      }
      var y = false;
      var b = !d && l && c;
      if (n.length && b) {
        y =
          this.length !== n.length ||
          x.some(this.models, function (t, e) {
            return t !== n[e];
          });
        this.models.length = 0;
        E(this.models, n, 0);
        this.length = this.models.length;
      } else if (s.length) {
        if (d) f = true;
        E(this.models, s, r == null ? this.length : r);
        this.length = this.models.length;
      }
      if (f) this.sort({ silent: true });
      if (!e.silent) {
        for (g = 0; g < s.length; g++) {
          if (r != null) e.index = r + g;
          p = s[g];
          p.trigger("add", p, this, e);
        }
        if (f || y) this.trigger("sort", this, e);
        if (s.length || o.length || a.length) {
          e.changes = { added: s, removed: o, merged: a };
          this.trigger("update", this, e);
        }
      }
      return i ? t[0] : t;
    },
    reset: function (t, e) {
      e = e ? x.clone(e) : {};
      for (var i = 0; i < this.models.length; i++) {
        this._removeReference(this.models[i], e);
      }
      e.previousModels = this.models;
      this._reset();
      t = this.add(t, x.extend({ silent: true }, e));
      if (!e.silent) this.trigger("reset", this, e);
      return t;
    },
    push: function (t, e) {
      return this.add(t, x.extend({ at: this.length }, e));
    },
    pop: function (t) {
      var e = this.at(this.length - 1);
      return this.remove(e, t);
    },
    unshift: function (t, e) {
      return this.add(t, x.extend({ at: 0 }, e));
    },
    shift: function (t) {
      var e = this.at(0);
      return this.remove(e, t);
    },
    slice: function () {
      return a.apply(this.models, arguments);
    },
    get: function (t) {
      if (t == null) return void 0;
      return (
        this._byId[t] ||
        this._byId[
          this.modelId(this._isModel(t) ? t.attributes : t, t.idAttribute)
        ] ||
        (t.cid && this._byId[t.cid])
      );
    },
    has: function (t) {
      return this.get(t) != null;
    },
    at: function (t) {
      if (t < 0) t += this.length;
      return this.models[t];
    },
    where: function (t, e) {
      return this[e ? "find" : "filter"](t);
    },
    findWhere: function (t) {
      return this.where(t, true);
    },
    sort: function (t) {
      var e = this.comparator;
      if (!e) throw new Error("Cannot sort a set without a comparator");
      t || (t = {});
      var i = e.length;
      if (x.isFunction(e)) e = e.bind(this);
      if (i === 1 || x.isString(e)) {
        this.models = this.sortBy(e);
      } else {
        this.models.sort(e);
      }
      if (!t.silent) this.trigger("sort", this, t);
      return this;
    },
    pluck: function (t) {
      return this.map(t + "");
    },
    fetch: function (i) {
      i = x.extend({ parse: true }, i);
      var r = i.success;
      var n = this;
      i.success = function (t) {
        var e = i.reset ? "reset" : "set";
        n[e](t, i);
        if (r) r.call(i.context, n, t, i);
        n.trigger("sync", n, t, i);
      };
      G(this, i);
      return this.sync("read", this, i);
    },
    create: function (t, e) {
      e = e ? x.clone(e) : {};
      var r = e.wait;
      t = this._prepareModel(t, e);
      if (!t) return false;
      if (!r) this.add(t, e);
      var n = this;
      var s = e.success;
      e.success = function (t, e, i) {
        if (r) n.add(t, i);
        if (s) s.call(i.context, t, e, i);
      };
      t.save(null, e);
      return t;
    },
    parse: function (t, e) {
      return t;
    },
    clone: function () {
      return new this.constructor(this.models, {
        model: this.model,
        comparator: this.comparator,
      });
    },
    modelId: function (t, e) {
      return t[e || this.model.prototype.idAttribute || "id"];
    },
    values: function () {
      return new b(this, I);
    },
    keys: function () {
      return new b(this, k);
    },
    entries: function () {
      return new b(this, S);
    },
    _reset: function () {
      this.length = 0;
      this.models = [];
      this._byId = {};
    },
    _prepareModel: function (t, e) {
      if (this._isModel(t)) {
        if (!t.collection) t.collection = this;
        return t;
      }
      e = e ? x.clone(e) : {};
      e.collection = this;
      var i;
      if (this.model.prototype) {
        i = new this.model(t, e);
      } else {
        i = this.model(t, e);
      }
      if (!i.validationError) return i;
      this.trigger("invalid", this, i.validationError, e);
      return false;
    },
    _removeModels: function (t, e) {
      var i = [];
      for (var r = 0; r < t.length; r++) {
        var n = this.get(t[r]);
        if (!n) continue;
        var s = this.indexOf(n);
        this.models.splice(s, 1);
        this.length--;
        delete this._byId[n.cid];
        var a = this.modelId(n.attributes, n.idAttribute);
        if (a != null) delete this._byId[a];
        if (!e.silent) {
          e.index = s;
          n.trigger("remove", n, this, e);
        }
        i.push(n);
        this._removeReference(n, e);
      }
      return i;
    },
    _isModel: function (t) {
      return t instanceof g;
    },
    _addReference: function (t, e) {
      this._byId[t.cid] = t;
      var i = this.modelId(t.attributes, t.idAttribute);
      if (i != null) this._byId[i] = t;
      t.on("all", this._onModelEvent, this);
    },
    _removeReference: function (t, e) {
      delete this._byId[t.cid];
      var i = this.modelId(t.attributes, t.idAttribute);
      if (i != null) delete this._byId[i];
      if (this === t.collection) delete t.collection;
      t.off("all", this._onModelEvent, this);
    },
    _onModelEvent: function (t, e, i, r) {
      if (e) {
        if ((t === "add" || t === "remove") && i !== this) return;
        if (t === "destroy") this.remove(e, r);
        if (t === "changeId") {
          var n = this.modelId(e.previousAttributes(), e.idAttribute);
          var s = this.modelId(e.attributes, e.idAttribute);
          if (n != null) delete this._byId[n];
          if (s != null) this._byId[s] = e;
        }
      }
      this.trigger.apply(this, arguments);
    },
  });
  var y = typeof Symbol === "function" && Symbol.iterator;
  if (y) {
    m.prototype[y] = m.prototype.values;
  }
  var b = function (t, e) {
    this._collection = t;
    this._kind = e;
    this._index = 0;
  };
  var I = 1;
  var k = 2;
  var S = 3;
  if (y) {
    b.prototype[y] = function () {
      return this;
    };
  }
  b.prototype.next = function () {
    if (this._collection) {
      if (this._index < this._collection.length) {
        var t = this._collection.at(this._index);
        this._index++;
        var e;
        if (this._kind === I) {
          e = t;
        } else {
          var i = this._collection.modelId(t.attributes, t.idAttribute);
          if (this._kind === k) {
            e = i;
          } else {
            e = [i, t];
          }
        }
        return { value: e, done: false };
      }
      this._collection = void 0;
    }
    return { value: void 0, done: true };
  };
  var A = (h.View = function (t) {
    this.cid = x.uniqueId("view");
    this.preinitialize.apply(this, arguments);
    x.extend(this, x.pick(t, P));
    this._ensureElement();
    this.initialize.apply(this, arguments);
  });
  var T = /^(\S+)\s*(.*)$/;
  var P = [
    "model",
    "collection",
    "el",
    "id",
    "attributes",
    "className",
    "tagName",
    "events",
  ];
  x.extend(A.prototype, r, {
    tagName: "div",
    $: function (t) {
      return this.$el.find(t);
    },
    preinitialize: function () {},
    initialize: function () {},
    render: function () {
      return this;
    },
    remove: function () {
      this._removeElement();
      this.stopListening();
      return this;
    },
    _removeElement: function () {
      this.$el.remove();
    },
    setElement: function (t) {
      this.undelegateEvents();
      this._setElement(t);
      this.delegateEvents();
      return this;
    },
    _setElement: function (t) {
      this.$el = t instanceof h.$ ? t : h.$(t);
      this.el = this.$el[0];
    },
    delegateEvents: function (t) {
      t || (t = x.result(this, "events"));
      if (!t) return this;
      this.undelegateEvents();
      for (var e in t) {
        var i = t[e];
        if (!x.isFunction(i)) i = this[i];
        if (!i) continue;
        var r = e.match(T);
        this.delegate(r[1], r[2], i.bind(this));
      }
      return this;
    },
    delegate: function (t, e, i) {
      this.$el.on(t + ".delegateEvents" + this.cid, e, i);
      return this;
    },
    undelegateEvents: function () {
      if (this.$el) this.$el.off(".delegateEvents" + this.cid);
      return this;
    },
    undelegate: function (t, e, i) {
      this.$el.off(t + ".delegateEvents" + this.cid, e, i);
      return this;
    },
    _createElement: function (t) {
      return document.createElement(t);
    },
    _ensureElement: function () {
      if (!this.el) {
        var t = x.extend({}, x.result(this, "attributes"));
        if (this.id) t.id = x.result(this, "id");
        if (this.className) t["class"] = x.result(this, "className");
        this.setElement(this._createElement(x.result(this, "tagName")));
        this._setAttributes(t);
      } else {
        this.setElement(x.result(this, "el"));
      }
    },
    _setAttributes: function (t) {
      this.$el.attr(t);
    },
  });
  var H = function (r, t, n, s) {
    switch (t) {
      case 1:
        return function () {
          return r[n](this[s]);
        };
      case 2:
        return function (t) {
          return r[n](this[s], t);
        };
      case 3:
        return function (t, e) {
          return r[n](this[s], C(t, this), e);
        };
      case 4:
        return function (t, e, i) {
          return r[n](this[s], C(t, this), e, i);
        };
      default:
        return function () {
          var t = a.call(arguments);
          t.unshift(this[s]);
          return r[n].apply(r, t);
        };
    }
  };
  var $ = function (i, r, t, n) {
    x.each(t, function (t, e) {
      if (r[e]) i.prototype[e] = H(r, t, e, n);
    });
  };
  var C = function (e, t) {
    if (x.isFunction(e)) return e;
    if (x.isObject(e) && !t._isModel(e)) return R(e);
    if (x.isString(e))
      return function (t) {
        return t.get(e);
      };
    return e;
  };
  var R = function (t) {
    var e = x.matches(t);
    return function (t) {
      return e(t.attributes);
    };
  };
  var M = {
    forEach: 3,
    each: 3,
    map: 3,
    collect: 3,
    reduce: 0,
    foldl: 0,
    inject: 0,
    reduceRight: 0,
    foldr: 0,
    find: 3,
    detect: 3,
    filter: 3,
    select: 3,
    reject: 3,
    every: 3,
    all: 3,
    some: 3,
    any: 3,
    include: 3,
    includes: 3,
    contains: 3,
    invoke: 0,
    max: 3,
    min: 3,
    toArray: 1,
    size: 1,
    first: 3,
    head: 3,
    take: 3,
    initial: 3,
    rest: 3,
    tail: 3,
    drop: 3,
    last: 3,
    without: 0,
    difference: 0,
    indexOf: 3,
    shuffle: 1,
    lastIndexOf: 3,
    isEmpty: 1,
    chain: 1,
    sample: 3,
    partition: 3,
    groupBy: 3,
    countBy: 3,
    sortBy: 3,
    indexBy: 3,
    findIndex: 3,
    findLastIndex: 3,
  };
  var N = {
    keys: 1,
    values: 1,
    pairs: 1,
    invert: 1,
    pick: 0,
    omit: 0,
    chain: 1,
    isEmpty: 1,
  };
  x.each(
    [
      [m, M, "models"],
      [g, N, "attributes"],
    ],
    function (t) {
      var i = t[0],
        e = t[1],
        r = t[2];
      i.mixin = function (t) {
        var e = x.reduce(
          x.functions(t),
          function (t, e) {
            t[e] = 0;
            return t;
          },
          {}
        );
        $(i, t, e, r);
      };
      $(i, x, e, r);
    }
  );
  h.sync = function (t, e, r) {
    var i = j[t];
    x.defaults(r || (r = {}), {
      emulateHTTP: h.emulateHTTP,
      emulateJSON: h.emulateJSON,
    });
    var n = { type: i, dataType: "json" };
    if (!r.url) {
      n.url = x.result(e, "url") || V();
    }
    if (
      r.data == null &&
      e &&
      (t === "create" || t === "update" || t === "patch")
    ) {
      n.contentType = "application/json";
      n.data = JSON.stringify(r.attrs || e.toJSON(r));
    }
    if (r.emulateJSON) {
      n.contentType = "application/x-www-form-urlencoded";
      n.data = n.data ? { model: n.data } : {};
    }
    if (r.emulateHTTP && (i === "PUT" || i === "DELETE" || i === "PATCH")) {
      n.type = "POST";
      if (r.emulateJSON) n.data._method = i;
      var s = r.beforeSend;
      r.beforeSend = function (t) {
        t.setRequestHeader("X-HTTP-Method-Override", i);
        if (s) return s.apply(this, arguments);
      };
    }
    if (n.type !== "GET" && !r.emulateJSON) {
      n.processData = false;
    }
    var a = r.error;
    r.error = function (t, e, i) {
      r.textStatus = e;
      r.errorThrown = i;
      if (a) a.call(r.context, t, e, i);
    };
    var o = (r.xhr = h.ajax(x.extend(n, r)));
    e.trigger("request", e, o, r);
    return o;
  };
  var j = {
    create: "POST",
    update: "PUT",
    patch: "PATCH",
    delete: "DELETE",
    read: "GET",
  };
  h.ajax = function () {
    return h.$.ajax.apply(h.$, arguments);
  };
  var O = (h.Router = function (t) {
    t || (t = {});
    this.preinitialize.apply(this, arguments);
    if (t.routes) this.routes = t.routes;
    this._bindRoutes();
    this.initialize.apply(this, arguments);
  });
  var U = /\((.*?)\)/g;
  var z = /(\(\?)?:\w+/g;
  var q = /\*\w+/g;
  var F = /[\-{}\[\]+?.,\\\^$|#\s]/g;
  x.extend(O.prototype, r, {
    preinitialize: function () {},
    initialize: function () {},
    route: function (i, r, n) {
      if (!x.isRegExp(i)) i = this._routeToRegExp(i);
      if (x.isFunction(r)) {
        n = r;
        r = "";
      }
      if (!n) n = this[r];
      var s = this;
      h.history.route(i, function (t) {
        var e = s._extractParameters(i, t);
        if (s.execute(n, e, r) !== false) {
          s.trigger.apply(s, ["route:" + r].concat(e));
          s.trigger("route", r, e);
          h.history.trigger("route", s, r, e);
        }
      });
      return this;
    },
    execute: function (t, e, i) {
      if (t) t.apply(this, e);
    },
    navigate: function (t, e) {
      h.history.navigate(t, e);
      return this;
    },
    _bindRoutes: function () {
      if (!this.routes) return;
      this.routes = x.result(this, "routes");
      var t,
        e = x.keys(this.routes);
      while ((t = e.pop()) != null) {
        this.route(t, this.routes[t]);
      }
    },
    _routeToRegExp: function (t) {
      t = t
        .replace(F, "\\$&")
        .replace(U, "(?:$1)?")
        .replace(z, function (t, e) {
          return e ? t : "([^/?]+)";
        })
        .replace(q, "([^?]*?)");
      return new RegExp("^" + t + "(?:\\?([\\s\\S]*))?$");
    },
    _extractParameters: function (t, e) {
      var i = t.exec(e).slice(1);
      return x.map(i, function (t, e) {
        if (e === i.length - 1) return t || null;
        return t ? decodeURIComponent(t) : null;
      });
    },
  });
  var B = (h.History = function () {
    this.handlers = [];
    this.checkUrl = this.checkUrl.bind(this);
    if (typeof window !== "undefined") {
      this.location = window.location;
      this.history = window.history;
    }
  });
  var J = /^[#\/]|\s+$/g;
  var L = /^\/+|\/+$/g;
  var W = /#.*$/;
  B.started = false;
  x.extend(B.prototype, r, {
    interval: 50,
    atRoot: function () {
      var t = this.location.pathname.replace(/[^\/]$/, "$&/");
      return t === this.root && !this.getSearch();
    },
    matchRoot: function () {
      var t = this.decodeFragment(this.location.pathname);
      var e = t.slice(0, this.root.length - 1) + "/";
      return e === this.root;
    },
    decodeFragment: function (t) {
      return decodeURI(t.replace(/%25/g, "%2525"));
    },
    getSearch: function () {
      var t = this.location.href.replace(/#.*/, "").match(/\?.+/);
      return t ? t[0] : "";
    },
    getHash: function (t) {
      var e = (t || this).location.href.match(/#(.*)$/);
      return e ? e[1] : "";
    },
    getPath: function () {
      var t = this.decodeFragment(
        this.location.pathname + this.getSearch()
      ).slice(this.root.length - 1);
      return t.charAt(0) === "/" ? t.slice(1) : t;
    },
    getFragment: function (t) {
      if (t == null) {
        if (this._usePushState || !this._wantsHashChange) {
          t = this.getPath();
        } else {
          t = this.getHash();
        }
      }
      return t.replace(J, "");
    },
    start: function (t) {
      if (B.started)
        throw new Error("Backbone.history has already been started");
      B.started = true;
      this.options = x.extend({ root: "/" }, this.options, t);
      this.root = this.options.root;
      this._wantsHashChange = this.options.hashChange !== false;
      this._hasHashChange =
        "onhashchange" in window &&
        (document.documentMode === void 0 || document.documentMode > 7);
      this._useHashChange = this._wantsHashChange && this._hasHashChange;
      this._wantsPushState = !!this.options.pushState;
      this._hasPushState = !!(this.history && this.history.pushState);
      this._usePushState = this._wantsPushState && this._hasPushState;
      this.fragment = this.getFragment();
      this.root = ("/" + this.root + "/").replace(L, "/");
      if (this._wantsHashChange && this._wantsPushState) {
        if (!this._hasPushState && !this.atRoot()) {
          var e = this.root.slice(0, -1) || "/";
          this.location.replace(e + "#" + this.getPath());
          return true;
        } else if (this._hasPushState && this.atRoot()) {
          this.navigate(this.getHash(), { replace: true });
        }
      }
      if (
        !this._hasHashChange &&
        this._wantsHashChange &&
        !this._usePushState
      ) {
        this.iframe = document.createElement("iframe");
        this.iframe.src = "javascript:0";
        this.iframe.style.display = "none";
        this.iframe.tabIndex = -1;
        var i = document.body;
        var r = i.insertBefore(this.iframe, i.firstChild).contentWindow;
        r.document.open();
        r.document.close();
        r.location.hash = "#" + this.fragment;
      }
      var n =
        window.addEventListener ||
        function (t, e) {
          return attachEvent("on" + t, e);
        };
      if (this._usePushState) {
        n("popstate", this.checkUrl, false);
      } else if (this._useHashChange && !this.iframe) {
        n("hashchange", this.checkUrl, false);
      } else if (this._wantsHashChange) {
        this._checkUrlInterval = setInterval(this.checkUrl, this.interval);
      }
      if (!this.options.silent) return this.loadUrl();
    },
    stop: function () {
      var t =
        window.removeEventListener ||
        function (t, e) {
          return detachEvent("on" + t, e);
        };
      if (this._usePushState) {
        t("popstate", this.checkUrl, false);
      } else if (this._useHashChange && !this.iframe) {
        t("hashchange", this.checkUrl, false);
      }
      if (this.iframe) {
        document.body.removeChild(this.iframe);
        this.iframe = null;
      }
      if (this._checkUrlInterval) clearInterval(this._checkUrlInterval);
      B.started = false;
    },
    route: function (t, e) {
      this.handlers.unshift({ route: t, callback: e });
    },
    checkUrl: function (t) {
      var e = this.getFragment();
      if (e === this.fragment && this.iframe) {
        e = this.getHash(this.iframe.contentWindow);
      }
      if (e === this.fragment) return false;
      if (this.iframe) this.navigate(e);
      this.loadUrl();
    },
    loadUrl: function (e) {
      if (!this.matchRoot()) return false;
      e = this.fragment = this.getFragment(e);
      return x.some(this.handlers, function (t) {
        if (t.route.test(e)) {
          t.callback(e);
          return true;
        }
      });
    },
    navigate: function (t, e) {
      if (!B.started) return false;
      if (!e || e === true) e = { trigger: !!e };
      t = this.getFragment(t || "");
      var i = this.root;
      if (t === "" || t.charAt(0) === "?") {
        i = i.slice(0, -1) || "/";
      }
      var r = i + t;
      t = t.replace(W, "");
      var n = this.decodeFragment(t);
      if (this.fragment === n) return;
      this.fragment = n;
      if (this._usePushState) {
        this.history[e.replace ? "replaceState" : "pushState"](
          {},
          document.title,
          r
        );
      } else if (this._wantsHashChange) {
        this._updateHash(this.location, t, e.replace);
        if (this.iframe && t !== this.getHash(this.iframe.contentWindow)) {
          var s = this.iframe.contentWindow;
          if (!e.replace) {
            s.document.open();
            s.document.close();
          }
          this._updateHash(s.location, t, e.replace);
        }
      } else {
        return this.location.assign(r);
      }
      if (e.trigger) return this.loadUrl(t);
    },
    _updateHash: function (t, e, i) {
      if (i) {
        var r = t.href.replace(/(javascript:|#).*$/, "");
        t.replace(r + "#" + e);
      } else {
        t.hash = "#" + e;
      }
    },
  });
  h.history = new B();
  var D = function (t, e) {
    var i = this;
    var r;
    if (t && x.has(t, "constructor")) {
      r = t.constructor;
    } else {
      r = function () {
        return i.apply(this, arguments);
      };
    }
    x.extend(r, i, e);
    r.prototype = x.create(i.prototype, t);
    r.prototype.constructor = r;
    r.__super__ = i.prototype;
    return r;
  };
  g.extend = m.extend = O.extend = A.extend = B.extend = D;
  var V = function () {
    throw new Error('A "url" property or function must be specified');
  };
  var G = function (e, i) {
    var r = i.error;
    i.error = function (t) {
      if (r) r.call(i.context, e, t, i);
      e.trigger("error", e, t, i);
    };
  };
  return h;
});
//# sourceMappingURL=backbone-min.js.map
