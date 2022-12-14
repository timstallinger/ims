!(function (i) {
  "use strict";
  function o(e, t) {
    (this.$element = i(e)),
      (this.options = i.extend({}, o.DEFAULTS, t)),
      (this.isLoading = !1);
  }
  function n(n) {
    return this.each(function () {
      var e = i(this),
        t = e.data("bs.button");
      t || e.data("bs.button", (t = new o(this, "object" == typeof n && n))),
        "toggle" == n ? t.toggle() : n && t.setState(n);
    });
  }
  (o.VERSION = "3.4.1"),
    (o.DEFAULTS = { loadingText: "loading..." }),
    (o.prototype.setState = function (e) {
      var t = "disabled",
        n = this.$element,
        o = n.is("input") ? "val" : "html",
        s = n.data();
      (e += "Text"),
        null == s.resetText && n.data("resetText", n[o]()),
        setTimeout(
          i.proxy(function () {
            n[o]((null == s[e] ? this.options : s)[e]),
              "loadingText" == e
                ? ((this.isLoading = !0), n.addClass(t).attr(t, t).prop(t, !0))
                : this.isLoading &&
                  ((this.isLoading = !1),
                  n.removeClass(t).removeAttr(t).prop(t, !1));
          }, this),
          0
        );
    }),
    (o.prototype.toggle = function () {
      var e,
        t = !0,
        n = this.$element.closest('[data-toggle="buttons"]');
      n.length
        ? ("radio" == (e = this.$element.find("input")).prop("type")
            ? (e.prop("checked") && (t = !1),
              n.find(".active").removeClass("active"),
              this.$element.addClass("active"))
            : "checkbox" == e.prop("type") &&
              (e.prop("checked") !== this.$element.hasClass("active") &&
                (t = !1),
              this.$element.toggleClass("active")),
          e.prop("checked", this.$element.hasClass("active")),
          t && e.trigger("change"))
        : (this.$element.attr(
            "aria-pressed",
            !this.$element.hasClass("active")
          ),
          this.$element.toggleClass("active"));
    });
  var e = i.fn.button;
  (i.fn.button = n),
    (i.fn.button.Constructor = o),
    (i.fn.button.noConflict = function () {
      return (i.fn.button = e), this;
    }),
    i(document)
      .on("click.bs.button.data-api", '[data-toggle^="button"]', function (e) {
        var t = i(e.target).closest(".btn");
        n.call(t, "toggle"),
          i(e.target).is('input[type="radio"], input[type="checkbox"]') ||
            (e.preventDefault(),
            (t.is("input,button")
              ? t
              : t.find("input:visible,button:visible").first()
            ).trigger("focus"));
      })
      .on(
        "focus.bs.button.data-api blur.bs.button.data-api",
        '[data-toggle^="button"]',
        function (e) {
          i(e.target)
            .closest(".btn")
            .toggleClass("focus", /^focus(in)?$/.test(e.type));
        }
      );
})(jQuery),
  (function (e) {
    "use strict";
    "function" == typeof define && define.amd
      ? define(["jquery"], e)
      : "object" == typeof exports && "function" == typeof require
      ? e(require("jquery"))
      : e(jQuery);
  })(function (d) {
    "use strict";
    var n = {
        escapeRegExChars: function (e) {
          return e.replace(/[|\\{}()[\]^$+*?.]/g, "\\$&");
        },
        createNode: function (e) {
          var t = document.createElement("div");
          return (
            (t.className = e),
            (t.style.position = "absolute"),
            (t.style.display = "none"),
            t
          );
        },
      },
      o = 27,
      s = 9,
      i = 13,
      a = 38,
      l = 39,
      u = 40,
      e = d.noop;
    function r(e, t) {
      var n = this;
      (n.element = e),
        (n.el = d(e)),
        (n.suggestions = []),
        (n.badQueries = []),
        (n.selectedIndex = -1),
        (n.currentValue = n.element.value),
        (n.timeoutId = null),
        (n.cachedResponse = {}),
        (n.onChangeTimeout = null),
        (n.onChange = null),
        (n.isLocal = !1),
        (n.suggestionsContainer = null),
        (n.noSuggestionsContainer = null),
        (n.options = d.extend(!0, {}, r.defaults, t)),
        (n.classes = {
          selected: "autocomplete-selected",
          suggestion: "autocomplete-suggestion",
        }),
        (n.hint = null),
        (n.hintValue = ""),
        (n.selection = null),
        n.initialize(),
        n.setOptions(t);
    }
    (r.utils = n),
      ((d.Autocomplete = r).defaults = {
        ajaxSettings: {},
        autoSelectFirst: !1,
        appendTo: "body",
        serviceUrl: null,
        lookup: null,
        onSelect: null,
        width: "auto",
        minChars: 1,
        maxHeight: 300,
        deferRequestBy: 0,
        params: {},
        formatResult: function (e, t) {
          if (!t) return e.value;
          t = "(" + n.escapeRegExChars(t) + ")";
          return e.value
            .replace(new RegExp(t, "gi"), "<strong>$1</strong>")
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")
            .replace(/"/g, "&quot;")
            .replace(/&lt;(\/?strong)&gt;/g, "<$1>");
        },
        formatGroup: function (e, t) {
          return '<div class="autocomplete-group">' + t + "</div>";
        },
        delimiter: null,
        zIndex: 9999,
        type: "GET",
        noCache: !1,
        onSearchStart: e,
        onSearchComplete: e,
        onSearchError: e,
        preserveInput: !1,
        containerClass: "autocomplete-suggestions",
        tabDisabled: !1,
        dataType: "text",
        currentRequest: null,
        triggerSelectOnValidInput: !0,
        preventBadQueries: !0,
        lookupFilter: function (e, t, n) {
          return -1 !== e.value.toLowerCase().indexOf(n);
        },
        paramName: "query",
        transformResult: function (e) {
          return "string" == typeof e ? d.parseJSON(e) : e;
        },
        showNoSuggestionNotice: !1,
        noSuggestionNotice: "No results",
        orientation: "bottom",
        forceFixPosition: !1,
      }),
      (r.prototype = {
        initialize: function () {
          var e,
            t = this,
            n = "." + t.classes.suggestion,
            o = t.classes.selected,
            s = t.options;
          t.element.setAttribute("autocomplete", "off"),
            (t.noSuggestionsContainer = d(
              '<div class="autocomplete-no-suggestion"></div>'
            )
              .html(this.options.noSuggestionNotice)
              .get(0)),
            (t.suggestionsContainer = r.utils.createNode(s.containerClass)),
            (e = d(t.suggestionsContainer)).appendTo(s.appendTo || "body"),
            "auto" !== s.width && e.css("width", s.width),
            e.on("mouseover.autocomplete", n, function () {
              t.activate(d(this).data("index"));
            }),
            e.on("mouseout.autocomplete", function () {
              (t.selectedIndex = -1), e.children("." + o).removeClass(o);
            }),
            e.on("click.autocomplete", n, function () {
              t.select(d(this).data("index"));
            }),
            e.on("click.autocomplete", function () {
              clearTimeout(t.blurTimeoutId);
            }),
            (t.fixPositionCapture = function () {
              t.visible && t.fixPosition();
            }),
            d(window).on("resize.autocomplete", t.fixPositionCapture),
            t.el.on("keydown.autocomplete", function (e) {
              t.onKeyPress(e);
            }),
            t.el.on("keyup.autocomplete", function (e) {
              t.onKeyUp(e);
            }),
            t.el.on("blur.autocomplete", function () {
              t.onBlur();
            }),
            t.el.on("focus.autocomplete", function () {
              t.onFocus();
            }),
            t.el.on("change.autocomplete", function (e) {
              t.onKeyUp(e);
            }),
            t.el.on("input.autocomplete", function (e) {
              t.onKeyUp(e);
            });
        },
        onFocus: function () {
          var e = this;
          e.disabled ||
            (e.fixPosition(),
            e.el.val().length >= e.options.minChars && e.onValueChange());
        },
        onBlur: function () {
          var e = this,
            t = e.options,
            n = e.el.val(),
            o = e.getQuery(n);
          e.blurTimeoutId = setTimeout(function () {
            e.hide(),
              e.selection &&
                e.currentValue !== o &&
                (t.onInvalidateSelection || d.noop).call(e.element);
          }, 200);
        },
        abortAjax: function () {
          this.currentRequest &&
            (this.currentRequest.abort(), (this.currentRequest = null));
        },
        setOptions: function (e) {
          var t = this,
            e = d.extend({}, t.options, e);
          (t.isLocal = Array.isArray(e.lookup)),
            t.isLocal && (e.lookup = t.verifySuggestionsFormat(e.lookup)),
            (e.orientation = t.validateOrientation(e.orientation, "bottom")),
            d(t.suggestionsContainer).css({
              "max-height": e.maxHeight + "px",
              width: e.width + "px",
              "z-index": e.zIndex,
            }),
            (this.options = e);
        },
        clearCache: function () {
          (this.cachedResponse = {}), (this.badQueries = []);
        },
        clear: function () {
          this.clearCache(), (this.currentValue = ""), (this.suggestions = []);
        },
        disable: function () {
          (this.disabled = !0),
            clearTimeout(this.onChangeTimeout),
            this.abortAjax();
        },
        enable: function () {
          this.disabled = !1;
        },
        fixPosition: function () {
          var e,
            t,
            n,
            o,
            s,
            i,
            a,
            l,
            u = this,
            r = d(u.suggestionsContainer),
            c = r.parent().get(0);
          (c !== document.body && !u.options.forceFixPosition) ||
            ((i = u.options.orientation),
            (a = r.outerHeight()),
            (l = u.el.outerHeight()),
            (e = { top: (s = u.el.offset()).top, left: s.left }),
            "auto" === i &&
              ((t = d(window).height()),
              (o = -(n = d(window).scrollTop()) + s.top - a),
              (s = n + t - (s.top + l + a)),
              (i = Math.max(o, s) === o ? "top" : "bottom")),
            (e.top += "top" === i ? -a : l),
            c !== document.body &&
              ((a = r.css("opacity")),
              u.visible || r.css("opacity", 0).show(),
              (l = r.offsetParent().offset()),
              (e.top -= l.top),
              (e.top += c.scrollTop),
              (e.left -= l.left),
              u.visible || r.css("opacity", a).hide()),
            "auto" === u.options.width && (e.width = u.el.outerWidth() + "px"),
            r.css(e));
        },
        isCursorAtEnd: function () {
          var e = this.el.val().length,
            t = this.element.selectionStart;
          return "number" == typeof t
            ? t === e
            : !document.selection ||
                ((t = document.selection.createRange()).moveStart(
                  "character",
                  -e
                ),
                e === t.text.length);
        },
        onKeyPress: function (e) {
          var t = this;
          if (t.disabled || t.visible || e.which !== u || !t.currentValue) {
            if (!t.disabled && t.visible) {
              switch (e.which) {
                case o:
                  t.el.val(t.currentValue), t.hide();
                  break;
                case l:
                  if (t.hint && t.options.onHint && t.isCursorAtEnd()) {
                    t.selectHint();
                    break;
                  }
                  return;
                case s:
                  if (t.hint && t.options.onHint) return void t.selectHint();
                  if (-1 === t.selectedIndex) return void t.hide();
                  if ((t.select(t.selectedIndex), !1 === t.options.tabDisabled))
                    return;
                  break;
                case i:
                  if (-1 === t.selectedIndex) return void t.hide();
                  t.select(t.selectedIndex);
                  break;
                case a:
                  t.moveUp();
                  break;
                case u:
                  t.moveDown();
                  break;
                default:
                  return;
              }
              e.stopImmediatePropagation(), e.preventDefault();
            }
          } else t.suggest();
        },
        onKeyUp: function (e) {
          var t = this;
          if (!t.disabled) {
            switch (e.which) {
              case a:
              case u:
                return;
            }
            clearTimeout(t.onChangeTimeout),
              t.currentValue !== t.el.val() &&
                (t.findBestHint(),
                0 < t.options.deferRequestBy
                  ? (t.onChangeTimeout = setTimeout(function () {
                      t.onValueChange();
                    }, t.options.deferRequestBy))
                  : t.onValueChange());
          }
        },
        onValueChange: function () {
          var e, t, n, o;
          this.ignoreValueChange
            ? (this.ignoreValueChange = !1)
            : ((t = (e = this).options),
              (n = e.el.val()),
              (o = e.getQuery(n)),
              e.selection &&
                e.currentValue !== o &&
                ((e.selection = null),
                (t.onInvalidateSelection || d.noop).call(e.element)),
              clearTimeout(e.onChangeTimeout),
              (e.currentValue = n),
              (e.selectedIndex = -1),
              t.triggerSelectOnValidInput && e.isExactMatch(o)
                ? e.select(0)
                : o.length < t.minChars
                ? e.hide()
                : e.getSuggestions(o));
        },
        isExactMatch: function (e) {
          var t = this.suggestions;
          return 1 === t.length && t[0].value.toLowerCase() === e.toLowerCase();
        },
        getQuery: function (e) {
          var t = this.options.delimiter;
          return t ? ((t = e.split(t)), d.trim(t[t.length - 1])) : e;
        },
        getSuggestionsLocal: function (t) {
          var e = this.options,
            n = t.toLowerCase(),
            o = e.lookupFilter,
            s = parseInt(e.lookupLimit, 10),
            e = {
              suggestions: d.grep(e.lookup, function (e) {
                return o(e, t, n);
              }),
            };
          return (
            s &&
              e.suggestions.length > s &&
              (e.suggestions = e.suggestions.slice(0, s)),
            e
          );
        },
        getSuggestions: function (o) {
          var e,
            t,
            n,
            s = this,
            i = s.options,
            a = i.serviceUrl;
          (i.params[i.paramName] = o),
            !1 !== i.onSearchStart.call(s.element, i.params) &&
              ((n = i.ignoreParams ? null : i.params),
              d.isFunction(i.lookup)
                ? i.lookup(o, function (e) {
                    (s.suggestions = e.suggestions),
                      s.suggest(),
                      i.onSearchComplete.call(s.element, o, e.suggestions);
                  })
                : (e = s.isLocal
                    ? s.getSuggestionsLocal(o)
                    : (d.isFunction(a) && (a = a.call(s.element, o)),
                      (t = a + "?" + d.param(n || {})),
                      s.cachedResponse[t])) && Array.isArray(e.suggestions)
                ? ((s.suggestions = e.suggestions),
                  s.suggest(),
                  i.onSearchComplete.call(s.element, o, e.suggestions))
                : s.isBadQuery(o)
                ? i.onSearchComplete.call(s.element, o, [])
                : (s.abortAjax(),
                  (n = { url: a, data: n, type: i.type, dataType: i.dataType }),
                  d.extend(n, i.ajaxSettings),
                  (s.currentRequest = d
                    .ajax(n)
                    .done(function (e) {
                      (s.currentRequest = null),
                        (e = i.transformResult(e, o)),
                        s.processResponse(e, o, t),
                        i.onSearchComplete.call(s.element, o, e.suggestions);
                    })
                    .fail(function (e, t, n) {
                      i.onSearchError.call(s.element, o, e, t, n);
                    }))));
        },
        isBadQuery: function (e) {
          if (!this.options.preventBadQueries) return !1;
          for (var t = this.badQueries, n = t.length; n--; )
            if (0 === e.indexOf(t[n])) return !0;
          return !1;
        },
        hide: function () {
          var e = this,
            t = d(e.suggestionsContainer);
          d.isFunction(e.options.onHide) &&
            e.visible &&
            e.options.onHide.call(e.element, t),
            (e.visible = !1),
            (e.selectedIndex = -1),
            clearTimeout(e.onChangeTimeout),
            d(e.suggestionsContainer).hide(),
            e.signalHint(null);
        },
        suggest: function () {
          var e, s, i, a, l, u, t, n, o, r, c, g;
          this.suggestions.length
            ? ((s = (e = this).options),
              (i = s.groupBy),
              (a = s.formatResult),
              (l = e.getQuery(e.currentValue)),
              (u = e.classes.suggestion),
              (t = e.classes.selected),
              (n = d(e.suggestionsContainer)),
              (o = d(e.noSuggestionsContainer)),
              (r = s.beforeRender),
              (c = ""),
              s.triggerSelectOnValidInput && e.isExactMatch(l)
                ? e.select(0)
                : (d.each(e.suggestions, function (e, t) {
                    var n, o;
                    i &&
                      (c +=
                        ((o = (n = t).data[i]),
                        g === o ? "" : ((g = o), s.formatGroup(n, g)))),
                      (c +=
                        '<div class="' +
                        u +
                        '" data-index="' +
                        e +
                        '">' +
                        a(t, l, e) +
                        "</div>");
                  }),
                  this.adjustContainerWidth(),
                  o.detach(),
                  n.html(c),
                  d.isFunction(r) && r.call(e.element, n, e.suggestions),
                  e.fixPosition(),
                  n.show(),
                  s.autoSelectFirst &&
                    ((e.selectedIndex = 0),
                    n.scrollTop(0),
                    n
                      .children("." + u)
                      .first()
                      .addClass(t)),
                  (e.visible = !0),
                  e.findBestHint()))
            : this.options.showNoSuggestionNotice
            ? this.noSuggestions()
            : this.hide();
        },
        noSuggestions: function () {
          var e = this,
            t = e.options.beforeRender,
            n = d(e.suggestionsContainer),
            o = d(e.noSuggestionsContainer);
          this.adjustContainerWidth(),
            o.detach(),
            n.empty(),
            n.append(o),
            d.isFunction(t) && t.call(e.element, n, e.suggestions),
            e.fixPosition(),
            n.show(),
            (e.visible = !0);
        },
        adjustContainerWidth: function () {
          var e,
            t = this.options,
            n = d(this.suggestionsContainer);
          "auto" === t.width
            ? ((e = this.el.outerWidth()), n.css("width", 0 < e ? e : 300))
            : "flex" === t.width && n.css("width", "");
        },
        findBestHint: function () {
          var o = this.el.val().toLowerCase(),
            s = null;
          o &&
            (d.each(this.suggestions, function (e, t) {
              var n = 0 === t.value.toLowerCase().indexOf(o);
              return n && (s = t), !n;
            }),
            this.signalHint(s));
        },
        signalHint: function (e) {
          var t = "",
            n = this;
          e && (t = n.currentValue + e.value.substr(n.currentValue.length)),
            n.hintValue !== t &&
              ((n.hintValue = t),
              (n.hint = e),
              (this.options.onHint || d.noop)(t));
        },
        verifySuggestionsFormat: function (e) {
          return e.length && "string" == typeof e[0]
            ? d.map(e, function (e) {
                return { value: e, data: null };
              })
            : e;
        },
        validateOrientation: function (e, t) {
          return (
            (e = d.trim(e || "").toLowerCase()),
            (e = -1 === d.inArray(e, ["auto", "bottom", "top"]) ? t : e)
          );
        },
        processResponse: function (e, t, n) {
          var o = this,
            s = o.options;
          (e.suggestions = o.verifySuggestionsFormat(e.suggestions)),
            s.noCache ||
              ((o.cachedResponse[n] = e),
              s.preventBadQueries &&
                !e.suggestions.length &&
                o.badQueries.push(t)),
            t === o.getQuery(o.currentValue) &&
              ((o.suggestions = e.suggestions), o.suggest());
        },
        activate: function (e) {
          var t = this,
            n = t.classes.selected,
            o = d(t.suggestionsContainer),
            s = o.find("." + t.classes.suggestion);
          return (
            o.find("." + n).removeClass(n),
            (t.selectedIndex = e),
            -1 !== t.selectedIndex && s.length > t.selectedIndex
              ? ((t = s.get(t.selectedIndex)), d(t).addClass(n), t)
              : null
          );
        },
        selectHint: function () {
          var e = d.inArray(this.hint, this.suggestions);
          this.select(e);
        },
        select: function (e) {
          this.hide(), this.onSelect(e);
        },
        moveUp: function () {
          var e = this;
          if (-1 !== e.selectedIndex)
            return 0 === e.selectedIndex
              ? (d(e.suggestionsContainer)
                  .children("." + e.classes.suggestion)
                  .first()
                  .removeClass(e.classes.selected),
                (e.selectedIndex = -1),
                (e.ignoreValueChange = !1),
                e.el.val(e.currentValue),
                void e.findBestHint())
              : void e.adjustScroll(e.selectedIndex - 1);
        },
        moveDown: function () {
          this.selectedIndex !== this.suggestions.length - 1 &&
            this.adjustScroll(this.selectedIndex + 1);
        },
        adjustScroll: function (e) {
          var t,
            n,
            o,
            s = this,
            i = s.activate(e);
          i &&
            ((t = d(i).outerHeight()),
            (n = i.offsetTop),
            (i =
              (o = d(s.suggestionsContainer).scrollTop()) +
              s.options.maxHeight -
              t),
            n < o
              ? d(s.suggestionsContainer).scrollTop(n)
              : i < n &&
                d(s.suggestionsContainer).scrollTop(
                  n - s.options.maxHeight + t
                ),
            s.options.preserveInput ||
              ((s.ignoreValueChange = !0),
              s.el.val(s.getValue(s.suggestions[e].value))),
            s.signalHint(null));
        },
        onSelect: function (e) {
          var t = this,
            n = t.options.onSelect,
            e = t.suggestions[e];
          (t.currentValue = t.getValue(e.value)),
            t.currentValue === t.el.val() ||
              t.options.preserveInput ||
              t.el.val(t.currentValue),
            t.signalHint(null),
            (t.suggestions = []),
            (t.selection = e),
            d.isFunction(n) && n.call(t.element, e);
        },
        getValue: function (e) {
          var t,
            n = this.options.delimiter;
          return !n || 1 === (n = (t = this.currentValue).split(n)).length
            ? e
            : t.substr(0, t.length - n[n.length - 1].length) + e;
        },
        dispose: function () {
          this.el.off(".autocomplete").removeData("autocomplete"),
            d(window).off("resize.autocomplete", this.fixPositionCapture),
            d(this.suggestionsContainer).remove();
        },
      }),
      (d.fn.devbridgeAutocomplete = function (n, o) {
        var s = "autocomplete";
        return arguments.length
          ? this.each(function () {
              var e = d(this),
                t = e.data(s);
              "string" == typeof n
                ? t && "function" == typeof t[n] && t[n](o)
                : (t && t.dispose && t.dispose(),
                  (t = new r(this, n)),
                  e.data(s, t));
            })
          : this.first().data(s);
      }),
      d.fn.autocomplete || (d.fn.autocomplete = d.fn.devbridgeAutocomplete);
  });
