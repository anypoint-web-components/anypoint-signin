!(function(t) {
  var e = {};
  function n(i) {
    if (e[i]) return e[i].exports;
    var s = (e[i] = { i: i, l: !1, exports: {} });
    return t[i].call(s.exports, s, s.exports, n), (s.l = !0), s.exports;
  }
  (n.m = t),
    (n.c = e),
    (n.d = function(t, e, i) {
      n.o(t, e) || Object.defineProperty(t, e, { enumerable: !0, get: i });
    }),
    (n.r = function(t) {
      'undefined' != typeof Symbol &&
        Symbol.toStringTag &&
        Object.defineProperty(t, Symbol.toStringTag, { value: 'Module' }),
        Object.defineProperty(t, '__esModule', { value: !0 });
    }),
    (n.t = function(t, e) {
      if ((1 & e && (t = n(t)), 8 & e)) return t;
      if (4 & e && 'object' == typeof t && t && t.__esModule) return t;
      var i = Object.create(null);
      if ((n.r(i), Object.defineProperty(i, 'default', { enumerable: !0, value: t }), 2 & e && 'string' != typeof t))
        for (var s in t)
          n.d(
            i,
            s,
            function(e) {
              return t[e];
            }.bind(null, s)
          );
      return i;
    }),
    (n.n = function(t) {
      var e =
        t && t.__esModule
          ? function() {
              return t.default;
            }
          : function() {
              return t;
            };
      return n.d(e, 'a', e), e;
    }),
    (n.o = function(t, e) {
      return Object.prototype.hasOwnProperty.call(t, e);
    }),
    (n.p = ''),
    n((n.s = 3));
})([
  function(t, e, n) {
    (function(e) {
      var n = (function(t) {
        var e = /\blang(?:uage)?-([\w-]+)\b/i,
          n = 0,
          i = {
            manual: t.Prism && t.Prism.manual,
            disableWorkerMessageHandler: t.Prism && t.Prism.disableWorkerMessageHandler,
            util: {
              encode: function(t) {
                return t instanceof s
                  ? new s(t.type, i.util.encode(t.content), t.alias)
                  : Array.isArray(t)
                  ? t.map(i.util.encode)
                  : t
                      .replace(/&/g, '&amp;')
                      .replace(/</g, '&lt;')
                      .replace(/\u00a0/g, ' ');
              },
              type: function(t) {
                return Object.prototype.toString.call(t).slice(8, -1);
              },
              objId: function(t) {
                return t.__id || Object.defineProperty(t, '__id', { value: ++n }), t.__id;
              },
              clone: function t(e, n) {
                var s,
                  o,
                  r = i.util.type(e);
                switch (((n = n || {}), r)) {
                  case 'Object':
                    if (((o = i.util.objId(e)), n[o])) return n[o];
                    for (var a in ((s = {}), (n[o] = s), e)) e.hasOwnProperty(a) && (s[a] = t(e[a], n));
                    return s;
                  case 'Array':
                    return (
                      (o = i.util.objId(e)),
                      n[o]
                        ? n[o]
                        : ((s = []),
                          (n[o] = s),
                          e.forEach(function(e, i) {
                            s[i] = t(e, n);
                          }),
                          s)
                    );
                  default:
                    return e;
                }
              }
            },
            languages: {
              extend: function(t, e) {
                var n = i.util.clone(i.languages[t]);
                for (var s in e) n[s] = e[s];
                return n;
              },
              insertBefore: function(t, e, n, s) {
                var o = (s = s || i.languages)[t],
                  r = {};
                for (var a in o)
                  if (o.hasOwnProperty(a)) {
                    if (a == e) for (var l in n) n.hasOwnProperty(l) && (r[l] = n[l]);
                    n.hasOwnProperty(a) || (r[a] = o[a]);
                  }
                var c = s[t];
                return (
                  (s[t] = r),
                  i.languages.DFS(i.languages, function(e, n) {
                    n === c && e != t && (this[e] = r);
                  }),
                  r
                );
              },
              DFS: function t(e, n, s, o) {
                o = o || {};
                var r = i.util.objId;
                for (var a in e)
                  if (e.hasOwnProperty(a)) {
                    n.call(e, a, e[a], s || a);
                    var l = e[a],
                      c = i.util.type(l);
                    'Object' !== c || o[r(l)]
                      ? 'Array' !== c || o[r(l)] || ((o[r(l)] = !0), t(l, n, a, o))
                      : ((o[r(l)] = !0), t(l, n, null, o));
                  }
              }
            },
            plugins: {},
            highlightAll: function(t, e) {
              i.highlightAllUnder(document, t, e);
            },
            highlightAllUnder: function(t, e, n) {
              var s = {
                callback: n,
                selector:
                  'code[class*="language-"], [class*="language-"] code, code[class*="lang-"], [class*="lang-"] code'
              };
              i.hooks.run('before-highlightall', s);
              for (var o, r = t.querySelectorAll(s.selector), a = 0; (o = r[a++]); )
                i.highlightElement(o, !0 === e, s.callback);
            },
            highlightElement: function(n, s, o) {
              for (var r, a = 'none', l = n; l && !e.test(l.className); ) l = l.parentNode;
              l && ((a = (l.className.match(e) || [, 'none'])[1].toLowerCase()), (r = i.languages[a])),
                (n.className = n.className.replace(e, '').replace(/\s+/g, ' ') + ' language-' + a),
                n.parentNode &&
                  ((l = n.parentNode),
                  /pre/i.test(l.nodeName) &&
                    (l.className = l.className.replace(e, '').replace(/\s+/g, ' ') + ' language-' + a));
              var c = { element: n, language: a, grammar: r, code: n.textContent },
                h = function(t) {
                  (c.highlightedCode = t),
                    i.hooks.run('before-insert', c),
                    (c.element.innerHTML = c.highlightedCode),
                    i.hooks.run('after-highlight', c),
                    i.hooks.run('complete', c),
                    o && o.call(c.element);
                };
              if ((i.hooks.run('before-sanity-check', c), c.code))
                if ((i.hooks.run('before-highlight', c), c.grammar))
                  if (s && t.Worker) {
                    var d = new Worker(i.filename);
                    (d.onmessage = function(t) {
                      h(t.data);
                    }),
                      d.postMessage(JSON.stringify({ language: c.language, code: c.code, immediateClose: !0 }));
                  } else h(i.highlight(c.code, c.grammar, c.language));
                else h(i.util.encode(c.code));
              else i.hooks.run('complete', c);
            },
            highlight: function(t, e, n) {
              var o = { code: t, grammar: e, language: n };
              return (
                i.hooks.run('before-tokenize', o),
                (o.tokens = i.tokenize(o.code, o.grammar)),
                i.hooks.run('after-tokenize', o),
                s.stringify(i.util.encode(o.tokens), o.language)
              );
            },
            matchGrammar: function(t, e, n, o, r, a, l) {
              for (var c in n)
                if (n.hasOwnProperty(c) && n[c]) {
                  if (c == l) return;
                  var h = n[c];
                  h = 'Array' === i.util.type(h) ? h : [h];
                  for (var d = 0; d < h.length; ++d) {
                    var u = h[d],
                      p = u.inside,
                      _ = !!u.lookbehind,
                      f = !!u.greedy,
                      m = 0,
                      g = u.alias;
                    if (f && !u.pattern.global) {
                      var y = u.pattern.toString().match(/[imuy]*$/)[0];
                      u.pattern = RegExp(u.pattern.source, y + 'g');
                    }
                    u = u.pattern || u;
                    for (var b = o, v = r; b < e.length; v += e[b].length, ++b) {
                      var w = e[b];
                      if (e.length > t.length) return;
                      if (!(w instanceof s)) {
                        if (f && b != e.length - 1) {
                          if (((u.lastIndex = v), !(P = u.exec(t)))) break;
                          for (
                            var C = P.index + (_ ? P[1].length : 0),
                              S = P.index + P[0].length,
                              x = b,
                              k = v,
                              E = e.length;
                            x < E && (k < S || (!e[x].type && !e[x - 1].greedy));
                            ++x
                          )
                            C >= (k += e[x].length) && (++b, (v = k));
                          if (e[b] instanceof s) continue;
                          (T = x - b), (w = t.slice(v, k)), (P.index -= v);
                        } else {
                          u.lastIndex = 0;
                          var P = u.exec(w),
                            T = 1;
                        }
                        if (P) {
                          _ && (m = P[1] ? P[1].length : 0);
                          S = (C = P.index + m) + (P = P[0].slice(m)).length;
                          var A = w.slice(0, C),
                            O = w.slice(S),
                            N = [b, T];
                          A && (++b, (v += A.length), N.push(A));
                          var I = new s(c, p ? i.tokenize(P, p) : P, g, P, f);
                          if (
                            (N.push(I),
                            O && N.push(O),
                            Array.prototype.splice.apply(e, N),
                            1 != T && i.matchGrammar(t, e, n, b, v, !0, c),
                            a)
                          )
                            break;
                        } else if (a) break;
                      }
                    }
                  }
                }
            },
            tokenize: function(t, e) {
              var n = [t],
                s = e.rest;
              if (s) {
                for (var o in s) e[o] = s[o];
                delete e.rest;
              }
              return i.matchGrammar(t, n, e, 0, 0, !1), n;
            },
            hooks: {
              all: {},
              add: function(t, e) {
                var n = i.hooks.all;
                (n[t] = n[t] || []), n[t].push(e);
              },
              run: function(t, e) {
                var n = i.hooks.all[t];
                if (n && n.length) for (var s, o = 0; (s = n[o++]); ) s(e);
              }
            },
            Token: s
          };
        function s(t, e, n, i, s) {
          (this.type = t),
            (this.content = e),
            (this.alias = n),
            (this.length = 0 | (i || '').length),
            (this.greedy = !!s);
        }
        if (
          ((t.Prism = i),
          (s.stringify = function(t, e) {
            if ('string' == typeof t) return t;
            if (Array.isArray(t))
              return t
                .map(function(t) {
                  return s.stringify(t, e);
                })
                .join('');
            var n = {
              type: t.type,
              content: s.stringify(t.content, e),
              tag: 'span',
              classes: ['token', t.type],
              attributes: {},
              language: e
            };
            if (t.alias) {
              var o = Array.isArray(t.alias) ? t.alias : [t.alias];
              Array.prototype.push.apply(n.classes, o);
            }
            i.hooks.run('wrap', n);
            var r = Object.keys(n.attributes)
              .map(function(t) {
                return t + '="' + (n.attributes[t] || '').replace(/"/g, '&quot;') + '"';
              })
              .join(' ');
            return (
              '<' +
              n.tag +
              ' class="' +
              n.classes.join(' ') +
              '"' +
              (r ? ' ' + r : '') +
              '>' +
              n.content +
              '</' +
              n.tag +
              '>'
            );
          }),
          !t.document)
        )
          return t.addEventListener
            ? (i.disableWorkerMessageHandler ||
                t.addEventListener(
                  'message',
                  function(e) {
                    var n = JSON.parse(e.data),
                      s = n.language,
                      o = n.code,
                      r = n.immediateClose;
                    t.postMessage(i.highlight(o, i.languages[s], s)), r && t.close();
                  },
                  !1
                ),
              i)
            : i;
        var o = document.currentScript || [].slice.call(document.getElementsByTagName('script')).pop();
        return (
          o &&
            ((i.filename = o.src),
            i.manual ||
              o.hasAttribute('data-manual') ||
              ('loading' !== document.readyState
                ? window.requestAnimationFrame
                  ? window.requestAnimationFrame(i.highlightAll)
                  : window.setTimeout(i.highlightAll, 16)
                : document.addEventListener('DOMContentLoaded', i.highlightAll))),
          i
        );
      })(
        'undefined' != typeof window
          ? window
          : 'undefined' != typeof WorkerGlobalScope && self instanceof WorkerGlobalScope
          ? self
          : {}
      );
      t.exports && (t.exports = n),
        void 0 !== e && (e.Prism = n),
        (n.languages.markup = {
          comment: /<!--[\s\S]*?-->/,
          prolog: /<\?[\s\S]+?\?>/,
          doctype: /<!DOCTYPE[\s\S]+?>/i,
          cdata: /<!\[CDATA\[[\s\S]*?]]>/i,
          tag: {
            pattern: /<\/?(?!\d)[^\s>\/=$<%]+(?:\s(?:\s*[^\s>\/=]+(?:\s*=\s*(?:"[^"]*"|'[^']*'|[^\s'">=]+(?=[\s>]))|(?=[\s\/>])))+)?\s*\/?>/i,
            greedy: !0,
            inside: {
              'tag': { pattern: /^<\/?[^\s>\/]+/i, inside: { punctuation: /^<\/?/, namespace: /^[^\s>\/:]+:/ } },
              'attr-value': {
                pattern: /=\s*(?:"[^"]*"|'[^']*'|[^\s'">=]+)/i,
                inside: { punctuation: [/^=/, { pattern: /^(\s*)["']|["']$/, lookbehind: !0 }] }
              },
              'punctuation': /\/?>/,
              'attr-name': { pattern: /[^\s>\/]+/, inside: { namespace: /^[^\s>\/:]+:/ } }
            }
          },
          entity: /&#?[\da-z]{1,8};/i
        }),
        (n.languages.markup.tag.inside['attr-value'].inside.entity = n.languages.markup.entity),
        n.hooks.add('wrap', function(t) {
          'entity' === t.type && (t.attributes.title = t.content.replace(/&amp;/, '&'));
        }),
        Object.defineProperty(n.languages.markup.tag, 'addInlined', {
          value: function(t, e) {
            var i = {};
            (i['language-' + e] = {
              pattern: /(^<!\[CDATA\[)[\s\S]+?(?=\]\]>$)/i,
              lookbehind: !0,
              inside: n.languages[e]
            }),
              (i.cdata = /^<!\[CDATA\[|\]\]>$/i);
            var s = { 'included-cdata': { pattern: /<!\[CDATA\[[\s\S]*?\]\]>/i, inside: i } };
            s['language-' + e] = { pattern: /[\s\S]+/, inside: n.languages[e] };
            var o = {};
            (o[t] = {
              pattern: RegExp(
                /(<__[\s\S]*?>)(?:<!\[CDATA\[[\s\S]*?\]\]>\s*|[\s\S])*?(?=<\/__>)/.source.replace(/__/g, t),
                'i'
              ),
              lookbehind: !0,
              greedy: !0,
              inside: s
            }),
              n.languages.insertBefore('markup', 'cdata', o);
          }
        }),
        (n.languages.xml = n.languages.extend('markup', {})),
        (n.languages.html = n.languages.markup),
        (n.languages.mathml = n.languages.markup),
        (n.languages.svg = n.languages.markup),
        (function(t) {
          var e = /("|')(?:\\(?:\r\n|[\s\S])|(?!\1)[^\\\r\n])*\1/;
          (t.languages.css = {
            comment: /\/\*[\s\S]*?\*\//,
            atrule: { pattern: /@[\w-]+[\s\S]*?(?:;|(?=\s*\{))/, inside: { rule: /@[\w-]+/ } },
            url: {
              pattern: RegExp('url\\((?:' + e.source + '|[^\n\r()]*)\\)', 'i'),
              inside: { function: /^url/i, punctuation: /^\(|\)$/ }
            },
            selector: RegExp('[^{}\\s](?:[^{};"\']|' + e.source + ')*?(?=\\s*\\{)'),
            string: { pattern: e, greedy: !0 },
            property: /[-_a-z\xA0-\uFFFF][-\w\xA0-\uFFFF]*(?=\s*:)/i,
            important: /!important\b/i,
            function: /[-a-z0-9]+(?=\()/i,
            punctuation: /[(){};:,]/
          }),
            (t.languages.css.atrule.inside.rest = t.languages.css);
          var n = t.languages.markup;
          n &&
            (n.tag.addInlined('style', 'css'),
            t.languages.insertBefore(
              'inside',
              'attr-value',
              {
                'style-attr': {
                  pattern: /\s*style=("|')(?:\\[\s\S]|(?!\1)[^\\])*\1/i,
                  inside: {
                    'attr-name': { pattern: /^\s*style/i, inside: n.tag.inside },
                    'punctuation': /^\s*=\s*['"]|['"]\s*$/,
                    'attr-value': { pattern: /.+/i, inside: t.languages.css }
                  },
                  alias: 'language-css'
                }
              },
              n.tag
            ));
        })(n),
        (n.languages.clike = {
          'comment': [
            { pattern: /(^|[^\\])\/\*[\s\S]*?(?:\*\/|$)/, lookbehind: !0 },
            { pattern: /(^|[^\\:])\/\/.*/, lookbehind: !0, greedy: !0 }
          ],
          'string': { pattern: /(["'])(?:\\(?:\r\n|[\s\S])|(?!\1)[^\\\r\n])*\1/, greedy: !0 },
          'class-name': {
            pattern: /((?:\b(?:class|interface|extends|implements|trait|instanceof|new)\s+)|(?:catch\s+\())[\w.\\]+/i,
            lookbehind: !0,
            inside: { punctuation: /[.\\]/ }
          },
          'keyword': /\b(?:if|else|while|do|for|return|in|instanceof|function|new|try|throw|catch|finally|null|break|continue)\b/,
          'boolean': /\b(?:true|false)\b/,
          'function': /\w+(?=\()/,
          'number': /\b0x[\da-f]+\b|(?:\b\d+\.?\d*|\B\.\d+)(?:e[+-]?\d+)?/i,
          'operator': /--?|\+\+?|!=?=?|<=?|>=?|==?=?|&&?|\|\|?|\?|\*|\/|~|\^|%/,
          'punctuation': /[{}[\];(),.:]/
        }),
        (n.languages.javascript = n.languages.extend('clike', {
          'class-name': [
            n.languages.clike['class-name'],
            {
              pattern: /(^|[^$\w\xA0-\uFFFF])[_$A-Z\xA0-\uFFFF][$\w\xA0-\uFFFF]*(?=\.(?:prototype|constructor))/,
              lookbehind: !0
            }
          ],
          'keyword': [
            { pattern: /((?:^|})\s*)(?:catch|finally)\b/, lookbehind: !0 },
            {
              pattern: /(^|[^.])\b(?:as|async(?=\s*(?:function\b|\(|[$\w\xA0-\uFFFF]|$))|await|break|case|class|const|continue|debugger|default|delete|do|else|enum|export|extends|for|from|function|get|if|implements|import|in|instanceof|interface|let|new|null|of|package|private|protected|public|return|set|static|super|switch|this|throw|try|typeof|undefined|var|void|while|with|yield)\b/,
              lookbehind: !0
            }
          ],
          'number': /\b(?:(?:0[xX](?:[\dA-Fa-f](?:_[\dA-Fa-f])?)+|0[bB](?:[01](?:_[01])?)+|0[oO](?:[0-7](?:_[0-7])?)+)n?|(?:\d(?:_\d)?)+n|NaN|Infinity)\b|(?:\b(?:\d(?:_\d)?)+\.?(?:\d(?:_\d)?)*|\B\.(?:\d(?:_\d)?)+)(?:[Ee][+-]?(?:\d(?:_\d)?)+)?/,
          'function': /#?[_$a-zA-Z\xA0-\uFFFF][$\w\xA0-\uFFFF]*(?=\s*(?:\.\s*(?:apply|bind|call)\s*)?\()/,
          'operator': /-[-=]?|\+[+=]?|!=?=?|<<?=?|>>?>?=?|=(?:==?|>)?|&[&=]?|\|[|=]?|\*\*?=?|\/=?|~|\^=?|%=?|\?|\.{3}/
        })),
        (n.languages.javascript[
          'class-name'
        ][0].pattern = /(\b(?:class|interface|extends|implements|instanceof|new)\s+)[\w.\\]+/),
        n.languages.insertBefore('javascript', 'keyword', {
          'regex': {
            pattern: /((?:^|[^$\w\xA0-\uFFFF."'\])\s])\s*)\/(\[(?:[^\]\\\r\n]|\\.)*]|\\.|[^\/\\\[\r\n])+\/[gimyus]{0,6}(?=\s*($|[\r\n,.;})\]]))/,
            lookbehind: !0,
            greedy: !0
          },
          'function-variable': {
            pattern: /#?[_$a-zA-Z\xA0-\uFFFF][$\w\xA0-\uFFFF]*(?=\s*[=:]\s*(?:async\s*)?(?:\bfunction\b|(?:\((?:[^()]|\([^()]*\))*\)|[_$a-zA-Z\xA0-\uFFFF][$\w\xA0-\uFFFF]*)\s*=>))/,
            alias: 'function'
          },
          'parameter': [
            {
              pattern: /(function(?:\s+[_$A-Za-z\xA0-\uFFFF][$\w\xA0-\uFFFF]*)?\s*\(\s*)(?!\s)(?:[^()]|\([^()]*\))+?(?=\s*\))/,
              lookbehind: !0,
              inside: n.languages.javascript
            },
            { pattern: /[_$a-z\xA0-\uFFFF][$\w\xA0-\uFFFF]*(?=\s*=>)/i, inside: n.languages.javascript },
            {
              pattern: /(\(\s*)(?!\s)(?:[^()]|\([^()]*\))+?(?=\s*\)\s*=>)/,
              lookbehind: !0,
              inside: n.languages.javascript
            },
            {
              pattern: /((?:\b|\s|^)(?!(?:as|async|await|break|case|catch|class|const|continue|debugger|default|delete|do|else|enum|export|extends|finally|for|from|function|get|if|implements|import|in|instanceof|interface|let|new|null|of|package|private|protected|public|return|set|static|super|switch|this|throw|try|typeof|undefined|var|void|while|with|yield)(?![$\w\xA0-\uFFFF]))(?:[_$A-Za-z\xA0-\uFFFF][$\w\xA0-\uFFFF]*\s*)\(\s*)(?!\s)(?:[^()]|\([^()]*\))+?(?=\s*\)\s*\{)/,
              lookbehind: !0,
              inside: n.languages.javascript
            }
          ],
          'constant': /\b[A-Z](?:[A-Z_]|\dx?)*\b/
        }),
        n.languages.insertBefore('javascript', 'string', {
          'template-string': {
            pattern: /`(?:\\[\s\S]|\${(?:[^{}]|{(?:[^{}]|{[^}]*})*})+}|(?!\${)[^\\`])*`/,
            greedy: !0,
            inside: {
              'template-punctuation': { pattern: /^`|`$/, alias: 'string' },
              'interpolation': {
                pattern: /((?:^|[^\\])(?:\\{2})*)\${(?:[^{}]|{(?:[^{}]|{[^}]*})*})+}/,
                lookbehind: !0,
                inside: {
                  'interpolation-punctuation': { pattern: /^\${|}$/, alias: 'punctuation' },
                  'rest': n.languages.javascript
                }
              },
              'string': /[\s\S]+/
            }
          }
        }),
        n.languages.markup && n.languages.markup.tag.addInlined('script', 'javascript'),
        (n.languages.js = n.languages.javascript),
        'undefined' != typeof self &&
          self.Prism &&
          self.document &&
          document.querySelector &&
          ((self.Prism.fileHighlight = function(t) {
            t = t || document;
            var e = {
              js: 'javascript',
              py: 'python',
              rb: 'ruby',
              ps1: 'powershell',
              psm1: 'powershell',
              sh: 'bash',
              bat: 'batch',
              h: 'c',
              tex: 'latex'
            };
            Array.prototype.slice.call(t.querySelectorAll('pre[data-src]')).forEach(function(t) {
              if (!t.hasAttribute('data-src-loaded')) {
                for (
                  var i, s = t.getAttribute('data-src'), o = t, r = /\blang(?:uage)?-([\w-]+)\b/i;
                  o && !r.test(o.className);

                )
                  o = o.parentNode;
                if ((o && (i = (t.className.match(r) || [, ''])[1]), !i)) {
                  var a = (s.match(/\.(\w+)$/) || [, ''])[1];
                  i = e[a] || a;
                }
                var l = document.createElement('code');
                (l.className = 'language-' + i), (t.textContent = ''), (l.textContent = 'Loading…'), t.appendChild(l);
                var c = new XMLHttpRequest();
                c.open('GET', s, !0),
                  (c.onreadystatechange = function() {
                    4 == c.readyState &&
                      (c.status < 400 && c.responseText
                        ? ((l.textContent = c.responseText),
                          n.highlightElement(l),
                          t.setAttribute('data-src-loaded', ''))
                        : c.status >= 400
                        ? (l.textContent = '✖ Error ' + c.status + ' while fetching file: ' + c.statusText)
                        : (l.textContent = '✖ Error: File does not exist or is empty'));
                  }),
                  c.send(null);
              }
            }),
              n.plugins.toolbar &&
                n.plugins.toolbar.registerButton('download-file', function(t) {
                  var e = t.element.parentNode;
                  if (
                    e &&
                    /pre/i.test(e.nodeName) &&
                    e.hasAttribute('data-src') &&
                    e.hasAttribute('data-download-link')
                  ) {
                    var n = e.getAttribute('data-src'),
                      i = document.createElement('a');
                    return (
                      (i.textContent = e.getAttribute('data-download-link-label') || 'Download'),
                      i.setAttribute('download', ''),
                      (i.href = n),
                      i
                    );
                  }
                });
          }),
          document.addEventListener('DOMContentLoaded', function() {
            self.Prism.fileHighlight();
          }));
    }.call(this, n(1)));
  },
  function(t, e) {
    var n;
    n = (function() {
      return this;
    })();
    try {
      n = n || new Function('return this')();
    } catch (t) {
      'object' == typeof window && (n = window);
    }
    t.exports = n;
  },
  function(t, e) {
    !(function(t) {
      function e(t, e) {
        return (
          (t = t.replace(/<inner>/g, '(?:\\\\.|[^\\\\\\n\r]|(?:\r?\n|\r)(?!\r?\n|\r))')),
          e && (t = t + '|' + t.replace(/_/g, '\\*')),
          RegExp('((?:^|[^\\\\])(?:\\\\{2})*)(?:' + t + ')')
        );
      }
      var n = '(?:\\\\.|``.+?``|`[^`\r\\n]+`|[^\\\\|\r\\n`])+',
        i = '\\|?__(?:\\|__)+\\|?(?:(?:\r?\n|\r)|$)'.replace(/__/g, n),
        s = '\\|?[ \t]*:?-{3,}:?[ \t]*(?:\\|[ \t]*:?-{3,}:?[ \t]*)+\\|?(?:\r?\n|\r)';
      (t.languages.markdown = t.languages.extend('markup', {})),
        t.languages.insertBefore('markdown', 'prolog', {
          'blockquote': { pattern: /^>(?:[\t ]*>)*/m, alias: 'punctuation' },
          'table': {
            pattern: RegExp('^' + i + s + '(?:' + i + ')*', 'm'),
            inside: {
              'table-data-rows': {
                pattern: RegExp('^(' + i + s + ')(?:' + i + ')*$'),
                lookbehind: !0,
                inside: { 'table-data': { pattern: RegExp(n), inside: t.languages.markdown }, 'punctuation': /\|/ }
              },
              'table-line': {
                pattern: RegExp('^(' + i + ')' + s + '$'),
                lookbehind: !0,
                inside: { punctuation: /\||:?-{3,}:?/ }
              },
              'table-header-row': {
                pattern: RegExp('^' + i + '$'),
                inside: {
                  'table-header': { pattern: RegExp(n), alias: 'important', inside: t.languages.markdown },
                  'punctuation': /\|/
                }
              }
            }
          },
          'code': [
            {
              pattern: /(^[ \t]*(?:\r?\n|\r))(?: {4}|\t).+(?:(?:\r?\n|\r)(?: {4}|\t).+)*/m,
              lookbehind: !0,
              alias: 'keyword'
            },
            { pattern: /``.+?``|`[^`\r\n]+`/, alias: 'keyword' },
            {
              pattern: /^```[\s\S]*?^```$/m,
              greedy: !0,
              inside: {
                'code-block': { pattern: /^(```.*(?:\r?\n|\r))[\s\S]+?(?=(?:\r?\n|\r)^```$)/m, lookbehind: !0 },
                'code-language': { pattern: /^(```).+/, lookbehind: !0 },
                'punctuation': /```/
              }
            }
          ],
          'title': [
            {
              pattern: /\S.*(?:\r?\n|\r)(?:==+|--+)(?=[ \t]*$)/m,
              alias: 'important',
              inside: { punctuation: /==+$|--+$/ }
            },
            { pattern: /(^\s*)#+.+/m, lookbehind: !0, alias: 'important', inside: { punctuation: /^#+|#+$/ } }
          ],
          'hr': { pattern: /(^\s*)([*-])(?:[\t ]*\2){2,}(?=\s*$)/m, lookbehind: !0, alias: 'punctuation' },
          'list': { pattern: /(^\s*)(?:[*+-]|\d+\.)(?=[\t ].)/m, lookbehind: !0, alias: 'punctuation' },
          'url-reference': {
            pattern: /!?\[[^\]]+\]:[\t ]+(?:\S+|<(?:\\.|[^>\\])+>)(?:[\t ]+(?:"(?:\\.|[^"\\])*"|'(?:\\.|[^'\\])*'|\((?:\\.|[^)\\])*\)))?/,
            inside: {
              variable: { pattern: /^(!?\[)[^\]]+/, lookbehind: !0 },
              string: /(?:"(?:\\.|[^"\\])*"|'(?:\\.|[^'\\])*'|\((?:\\.|[^)\\])*\))$/,
              punctuation: /^[\[\]!:]|[<>]/
            },
            alias: 'url'
          },
          'bold': {
            pattern: e('__(?:(?!_)<inner>|_(?:(?!_)<inner>)+_)+__', !0),
            lookbehind: !0,
            greedy: !0,
            inside: { content: { pattern: /(^..)[\s\S]+(?=..$)/, lookbehind: !0, inside: {} }, punctuation: /\*\*|__/ }
          },
          'italic': {
            pattern: e('_(?:(?!_)<inner>|__(?:(?!_)<inner>)+__)+_', !0),
            lookbehind: !0,
            greedy: !0,
            inside: { content: { pattern: /(^.)[\s\S]+(?=.$)/, lookbehind: !0, inside: {} }, punctuation: /[*_]/ }
          },
          'strike': {
            pattern: e('(~~?)(?:(?!~)<inner>)+?\\2', !1),
            lookbehind: !0,
            greedy: !0,
            inside: { content: { pattern: /(^~~?)[\s\S]+(?=\1$)/, lookbehind: !0, inside: {} }, punctuation: /~~?/ }
          },
          'url': {
            pattern: e(
              '!?\\[(?:(?!\\])<inner>)+\\](?:\\([^\\s)]+(?:[\t ]+"(?:\\\\.|[^"\\\\])*")?\\)| ?\\[(?:(?!\\])<inner>)+\\])',
              !1
            ),
            lookbehind: !0,
            greedy: !0,
            inside: {
              variable: { pattern: /(\[)[^\]]+(?=\]$)/, lookbehind: !0 },
              content: { pattern: /(^!?\[)[^\]]+(?=\])/, lookbehind: !0, inside: {} },
              string: { pattern: /"(?:\\.|[^"\\])*"(?=\)$)/ }
            }
          }
        }),
        ['url', 'bold', 'italic', 'strike'].forEach(function(e) {
          ['url', 'bold', 'italic', 'strike'].forEach(function(n) {
            e !== n && (t.languages.markdown[e].inside.content.inside[n] = t.languages.markdown[n]);
          });
        }),
        t.hooks.add('after-tokenize', function(t) {
          ('markdown' !== t.language && 'md' !== t.language) ||
            (function t(e) {
              if (e && 'string' != typeof e)
                for (var n = 0, i = e.length; n < i; n++) {
                  var s = e[n];
                  if ('code' === s.type) {
                    var o = s.content[1],
                      r = s.content[3];
                    if (
                      o &&
                      r &&
                      'code-language' === o.type &&
                      'code-block' === r.type &&
                      'string' == typeof o.content
                    ) {
                      var a =
                        'language-' +
                        o.content
                          .trim()
                          .split(/\s+/)[0]
                          .toLowerCase();
                      r.alias
                        ? 'string' == typeof r.alias
                          ? (r.alias = [r.alias, a])
                          : r.alias.push(a)
                        : (r.alias = [a]);
                    }
                  } else t(s.content);
                }
            })(t.tokens);
        }),
        t.hooks.add('wrap', function(e) {
          if ('code-block' === e.type) {
            for (var n = '', i = 0, s = e.classes.length; i < s; i++) {
              var o = e.classes[i],
                r = /language-(.+)/.exec(o);
              if (r) {
                n = r[1];
                break;
              }
            }
            var a = t.languages[n];
            if (a) {
              var l = e.content.replace(/&lt;/g, '<').replace(/&amp;/g, '&');
              e.content = t.highlight(l, a, n);
            } else if (n && 'none' !== n && t.plugins.autoloader) {
              var c = 'md-' + new Date().valueOf() + '-' + Math.floor(1e16 * Math.random());
              (e.attributes.id = c),
                t.plugins.autoloader.loadLanguages(n, function() {
                  var e = document.getElementById(c);
                  e && (e.innerHTML = t.highlight(e.textContent, t.languages[n], n));
                });
            }
          }
        }),
        (t.languages.md = t.languages.markdown);
    })(Prism);
  },
  function(t, e, n) {
    'use strict';
    n.r(e);
    /**
     * @license
     * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
     * This code may only be used under the BSD style license found at
     * http://polymer.github.io/LICENSE.txt
     * The complete set of authors may be found at
     * http://polymer.github.io/AUTHORS.txt
     * The complete set of contributors may be found at
     * http://polymer.github.io/CONTRIBUTORS.txt
     * Code distributed by Google as part of the polymer project is also
     * subject to an additional IP rights grant found at
     * http://polymer.github.io/PATENTS.txt
     */
    const i = new WeakMap(),
      s = (t) => 'function' == typeof t && i.has(t),
      o = void 0 !== window.customElements && void 0 !== window.customElements.polyfillWrapFlushCallback,
      r = (t, e, n = null) => {
        for (; e !== n; ) {
          const n = e.nextSibling;
          t.removeChild(e), (e = n);
        }
      },
      a = {},
      l = {},
      c = `{{lit-${String(Math.random()).slice(2)}}}`,
      h = `\x3c!--${c}--\x3e`,
      d = new RegExp(`${c}|${h}`),
      u = '$lit$';
    class p {
      constructor(t, e) {
        (this.parts = []), (this.element = e);
        const n = [],
          i = [],
          s = document.createTreeWalker(e.content, 133, null, !1);
        let o = 0,
          r = -1,
          a = 0;
        const {
          strings: l,
          values: { length: h }
        } = t;
        for (; a < h; ) {
          const t = s.nextNode();
          if (null !== t) {
            if ((r++, 1 === t.nodeType)) {
              if (t.hasAttributes()) {
                const e = t.attributes,
                  { length: n } = e;
                let i = 0;
                for (let t = 0; t < n; t++) _(e[t].name, u) && i++;
                for (; i-- > 0; ) {
                  const e = l[a],
                    n = g.exec(e)[2],
                    i = n.toLowerCase() + u,
                    s = t.getAttribute(i);
                  t.removeAttribute(i);
                  const o = s.split(d);
                  this.parts.push({ type: 'attribute', index: r, name: n, strings: o }), (a += o.length - 1);
                }
              }
              'TEMPLATE' === t.tagName && (i.push(t), (s.currentNode = t.content));
            } else if (3 === t.nodeType) {
              const e = t.data;
              if (e.indexOf(c) >= 0) {
                const i = t.parentNode,
                  s = e.split(d),
                  o = s.length - 1;
                for (let e = 0; e < o; e++) {
                  let n,
                    o = s[e];
                  if ('' === o) n = m();
                  else {
                    const t = g.exec(o);
                    null !== t && _(t[2], u) && (o = o.slice(0, t.index) + t[1] + t[2].slice(0, -u.length) + t[3]),
                      (n = document.createTextNode(o));
                  }
                  i.insertBefore(n, t), this.parts.push({ type: 'node', index: ++r });
                }
                '' === s[o] ? (i.insertBefore(m(), t), n.push(t)) : (t.data = s[o]), (a += o);
              }
            } else if (8 === t.nodeType)
              if (t.data === c) {
                const e = t.parentNode;
                (null !== t.previousSibling && r !== o) || (r++, e.insertBefore(m(), t)),
                  (o = r),
                  this.parts.push({ type: 'node', index: r }),
                  null === t.nextSibling ? (t.data = '') : (n.push(t), r--),
                  a++;
              } else {
                let e = -1;
                for (; -1 !== (e = t.data.indexOf(c, e + 1)); ) this.parts.push({ type: 'node', index: -1 }), a++;
              }
          } else s.currentNode = i.pop();
        }
        for (const t of n) t.parentNode.removeChild(t);
      }
    }
    const _ = (t, e) => {
        const n = t.length - e.length;
        return n >= 0 && t.slice(n) === e;
      },
      f = (t) => -1 !== t.index,
      m = () => document.createComment(''),
      g = /([ \x09\x0a\x0c\x0d])([^\0-\x1F\x7F-\x9F "'>=\/]+)([ \x09\x0a\x0c\x0d]*=[ \x09\x0a\x0c\x0d]*(?:[^ \x09\x0a\x0c\x0d"'`<>=]*|"[^"]*|'[^']*))$/;
    /**
     * @license
     * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
     * This code may only be used under the BSD style license found at
     * http://polymer.github.io/LICENSE.txt
     * The complete set of authors may be found at
     * http://polymer.github.io/AUTHORS.txt
     * The complete set of contributors may be found at
     * http://polymer.github.io/CONTRIBUTORS.txt
     * Code distributed by Google as part of the polymer project is also
     * subject to an additional IP rights grant found at
     * http://polymer.github.io/PATENTS.txt
     */
    class y {
      constructor(t, e, n) {
        (this.__parts = []), (this.template = t), (this.processor = e), (this.options = n);
      }
      update(t) {
        let e = 0;
        for (const n of this.__parts) void 0 !== n && n.setValue(t[e]), e++;
        for (const t of this.__parts) void 0 !== t && t.commit();
      }
      _clone() {
        const t = o
            ? this.template.element.content.cloneNode(!0)
            : document.importNode(this.template.element.content, !0),
          e = [],
          n = this.template.parts,
          i = document.createTreeWalker(t, 133, null, !1);
        let s,
          r = 0,
          a = 0,
          l = i.nextNode();
        for (; r < n.length; )
          if (((s = n[r]), f(s))) {
            for (; a < s.index; )
              a++,
                'TEMPLATE' === l.nodeName && (e.push(l), (i.currentNode = l.content)),
                null === (l = i.nextNode()) && ((i.currentNode = e.pop()), (l = i.nextNode()));
            if ('node' === s.type) {
              const t = this.processor.handleTextExpression(this.options);
              t.insertAfterNode(l.previousSibling), this.__parts.push(t);
            } else this.__parts.push(...this.processor.handleAttributeExpressions(l, s.name, s.strings, this.options));
            r++;
          } else this.__parts.push(void 0), r++;
        return o && (document.adoptNode(t), customElements.upgrade(t)), t;
      }
    }
    /**
     * @license
     * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
     * This code may only be used under the BSD style license found at
     * http://polymer.github.io/LICENSE.txt
     * The complete set of authors may be found at
     * http://polymer.github.io/AUTHORS.txt
     * The complete set of contributors may be found at
     * http://polymer.github.io/CONTRIBUTORS.txt
     * Code distributed by Google as part of the polymer project is also
     * subject to an additional IP rights grant found at
     * http://polymer.github.io/PATENTS.txt
     */ const b = ` ${c} `;
    class v {
      constructor(t, e, n, i) {
        (this.strings = t), (this.values = e), (this.type = n), (this.processor = i);
      }
      getHTML() {
        const t = this.strings.length - 1;
        let e = '',
          n = !1;
        for (let i = 0; i < t; i++) {
          const t = this.strings[i],
            s = t.lastIndexOf('\x3c!--');
          n = (s > -1 || n) && -1 === t.indexOf('--\x3e', s + 1);
          const o = g.exec(t);
          e += null === o ? t + (n ? b : h) : t.substr(0, o.index) + o[1] + o[2] + u + o[3] + c;
        }
        return (e += this.strings[t]);
      }
      getTemplateElement() {
        const t = document.createElement('template');
        return (t.innerHTML = this.getHTML()), t;
      }
    }
    /**
     * @license
     * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
     * This code may only be used under the BSD style license found at
     * http://polymer.github.io/LICENSE.txt
     * The complete set of authors may be found at
     * http://polymer.github.io/AUTHORS.txt
     * The complete set of contributors may be found at
     * http://polymer.github.io/CONTRIBUTORS.txt
     * Code distributed by Google as part of the polymer project is also
     * subject to an additional IP rights grant found at
     * http://polymer.github.io/PATENTS.txt
     */
    const w = (t) => null === t || !('object' == typeof t || 'function' == typeof t),
      C = (t) => Array.isArray(t) || !(!t || !t[Symbol.iterator]);
    class S {
      constructor(t, e, n) {
        (this.dirty = !0), (this.element = t), (this.name = e), (this.strings = n), (this.parts = []);
        for (let t = 0; t < n.length - 1; t++) this.parts[t] = this._createPart();
      }
      _createPart() {
        return new x(this);
      }
      _getValue() {
        const t = this.strings,
          e = t.length - 1;
        let n = '';
        for (let i = 0; i < e; i++) {
          n += t[i];
          const e = this.parts[i];
          if (void 0 !== e) {
            const t = e.value;
            if (w(t) || !C(t)) n += 'string' == typeof t ? t : String(t);
            else for (const e of t) n += 'string' == typeof e ? e : String(e);
          }
        }
        return (n += t[e]);
      }
      commit() {
        this.dirty && ((this.dirty = !1), this.element.setAttribute(this.name, this._getValue()));
      }
    }
    class x {
      constructor(t) {
        (this.value = void 0), (this.committer = t);
      }
      setValue(t) {
        t === a || (w(t) && t === this.value) || ((this.value = t), s(t) || (this.committer.dirty = !0));
      }
      commit() {
        for (; s(this.value); ) {
          const t = this.value;
          (this.value = a), t(this);
        }
        this.value !== a && this.committer.commit();
      }
    }
    class k {
      constructor(t) {
        (this.value = void 0), (this.__pendingValue = void 0), (this.options = t);
      }
      appendInto(t) {
        (this.startNode = t.appendChild(m())), (this.endNode = t.appendChild(m()));
      }
      insertAfterNode(t) {
        (this.startNode = t), (this.endNode = t.nextSibling);
      }
      appendIntoPart(t) {
        t.__insert((this.startNode = m())), t.__insert((this.endNode = m()));
      }
      insertAfterPart(t) {
        t.__insert((this.startNode = m())), (this.endNode = t.endNode), (t.endNode = this.startNode);
      }
      setValue(t) {
        this.__pendingValue = t;
      }
      commit() {
        for (; s(this.__pendingValue); ) {
          const t = this.__pendingValue;
          (this.__pendingValue = a), t(this);
        }
        const t = this.__pendingValue;
        t !== a &&
          (w(t)
            ? t !== this.value && this.__commitText(t)
            : t instanceof v
            ? this.__commitTemplateResult(t)
            : t instanceof Node
            ? this.__commitNode(t)
            : C(t)
            ? this.__commitIterable(t)
            : t === l
            ? ((this.value = l), this.clear())
            : this.__commitText(t));
      }
      __insert(t) {
        this.endNode.parentNode.insertBefore(t, this.endNode);
      }
      __commitNode(t) {
        this.value !== t && (this.clear(), this.__insert(t), (this.value = t));
      }
      __commitText(t) {
        const e = this.startNode.nextSibling,
          n = 'string' == typeof (t = null == t ? '' : t) ? t : String(t);
        e === this.endNode.previousSibling && 3 === e.nodeType
          ? (e.data = n)
          : this.__commitNode(document.createTextNode(n)),
          (this.value = t);
      }
      __commitTemplateResult(t) {
        const e = this.options.templateFactory(t);
        if (this.value instanceof y && this.value.template === e) this.value.update(t.values);
        else {
          const n = new y(e, t.processor, this.options),
            i = n._clone();
          n.update(t.values), this.__commitNode(i), (this.value = n);
        }
      }
      __commitIterable(t) {
        Array.isArray(this.value) || ((this.value = []), this.clear());
        const e = this.value;
        let n,
          i = 0;
        for (const s of t)
          void 0 === (n = e[i]) &&
            ((n = new k(this.options)), e.push(n), 0 === i ? n.appendIntoPart(this) : n.insertAfterPart(e[i - 1])),
            n.setValue(s),
            n.commit(),
            i++;
        i < e.length && ((e.length = i), this.clear(n && n.endNode));
      }
      clear(t = this.startNode) {
        r(this.startNode.parentNode, t.nextSibling, this.endNode);
      }
    }
    class E {
      constructor(t, e, n) {
        if (((this.value = void 0), (this.__pendingValue = void 0), 2 !== n.length || '' !== n[0] || '' !== n[1]))
          throw new Error('Boolean attributes can only contain a single expression');
        (this.element = t), (this.name = e), (this.strings = n);
      }
      setValue(t) {
        this.__pendingValue = t;
      }
      commit() {
        for (; s(this.__pendingValue); ) {
          const t = this.__pendingValue;
          (this.__pendingValue = a), t(this);
        }
        if (this.__pendingValue === a) return;
        const t = !!this.__pendingValue;
        this.value !== t &&
          (t ? this.element.setAttribute(this.name, '') : this.element.removeAttribute(this.name), (this.value = t)),
          (this.__pendingValue = a);
      }
    }
    class P extends S {
      constructor(t, e, n) {
        super(t, e, n), (this.single = 2 === n.length && '' === n[0] && '' === n[1]);
      }
      _createPart() {
        return new T(this);
      }
      _getValue() {
        return this.single ? this.parts[0].value : super._getValue();
      }
      commit() {
        this.dirty && ((this.dirty = !1), (this.element[this.name] = this._getValue()));
      }
    }
    class T extends x {}
    let A = !1;
    try {
      const t = {
        get capture() {
          return (A = !0), !1;
        }
      };
      window.addEventListener('test', t, t), window.removeEventListener('test', t, t);
    } catch (t) {}
    class O {
      constructor(t, e, n) {
        (this.value = void 0),
          (this.__pendingValue = void 0),
          (this.element = t),
          (this.eventName = e),
          (this.eventContext = n),
          (this.__boundHandleEvent = (t) => this.handleEvent(t));
      }
      setValue(t) {
        this.__pendingValue = t;
      }
      commit() {
        for (; s(this.__pendingValue); ) {
          const t = this.__pendingValue;
          (this.__pendingValue = a), t(this);
        }
        if (this.__pendingValue === a) return;
        const t = this.__pendingValue,
          e = this.value,
          n = null == t || (null != e && (t.capture !== e.capture || t.once !== e.once || t.passive !== e.passive)),
          i = null != t && (null == e || n);
        n && this.element.removeEventListener(this.eventName, this.__boundHandleEvent, this.__options),
          i &&
            ((this.__options = N(t)),
            this.element.addEventListener(this.eventName, this.__boundHandleEvent, this.__options)),
          (this.value = t),
          (this.__pendingValue = a);
      }
      handleEvent(t) {
        'function' == typeof this.value
          ? this.value.call(this.eventContext || this.element, t)
          : this.value.handleEvent(t);
      }
    }
    const N = (t) => t && (A ? { capture: t.capture, passive: t.passive, once: t.once } : t.capture);
    /**
     * @license
     * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
     * This code may only be used under the BSD style license found at
     * http://polymer.github.io/LICENSE.txt
     * The complete set of authors may be found at
     * http://polymer.github.io/AUTHORS.txt
     * The complete set of contributors may be found at
     * http://polymer.github.io/CONTRIBUTORS.txt
     * Code distributed by Google as part of the polymer project is also
     * subject to an additional IP rights grant found at
     * http://polymer.github.io/PATENTS.txt
     */ const I = new (class {
      handleAttributeExpressions(t, e, n, i) {
        const s = e[0];
        if ('.' === s) {
          return new P(t, e.slice(1), n).parts;
        }
        return '@' === s
          ? [new O(t, e.slice(1), i.eventContext)]
          : '?' === s
          ? [new E(t, e.slice(1), n)]
          : new S(t, e, n).parts;
      }
      handleTextExpression(t) {
        return new k(t);
      }
    })();
    /**
     * @license
     * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
     * This code may only be used under the BSD style license found at
     * http://polymer.github.io/LICENSE.txt
     * The complete set of authors may be found at
     * http://polymer.github.io/AUTHORS.txt
     * The complete set of contributors may be found at
     * http://polymer.github.io/CONTRIBUTORS.txt
     * Code distributed by Google as part of the polymer project is also
     * subject to an additional IP rights grant found at
     * http://polymer.github.io/PATENTS.txt
     */ function R(t) {
      let e = z.get(t.type);
      void 0 === e && ((e = { stringsArray: new WeakMap(), keyString: new Map() }), z.set(t.type, e));
      let n = e.stringsArray.get(t.strings);
      if (void 0 !== n) return n;
      const i = t.strings.join(c);
      return (
        void 0 === (n = e.keyString.get(i)) && ((n = new p(t, t.getTemplateElement())), e.keyString.set(i, n)),
        e.stringsArray.set(t.strings, n),
        n
      );
    }
    const z = new Map(),
      L = new WeakMap();
    /**
     * @license
     * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
     * This code may only be used under the BSD style license found at
     * http://polymer.github.io/LICENSE.txt
     * The complete set of authors may be found at
     * http://polymer.github.io/AUTHORS.txt
     * The complete set of contributors may be found at
     * http://polymer.github.io/CONTRIBUTORS.txt
     * Code distributed by Google as part of the polymer project is also
     * subject to an additional IP rights grant found at
     * http://polymer.github.io/PATENTS.txt
     */
    /**
     * @license
     * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
     * This code may only be used under the BSD style license found at
     * http://polymer.github.io/LICENSE.txt
     * The complete set of authors may be found at
     * http://polymer.github.io/AUTHORS.txt
     * The complete set of contributors may be found at
     * http://polymer.github.io/CONTRIBUTORS.txt
     * Code distributed by Google as part of the polymer project is also
     * subject to an additional IP rights grant found at
     * http://polymer.github.io/PATENTS.txt
     */
    (window.litHtmlVersions || (window.litHtmlVersions = [])).push('1.1.2');
    const M = (t, ...e) => new v(t, e, 'html', I),
      F = 133;
    function D(t, e) {
      const {
          element: { content: n },
          parts: i
        } = t,
        s = document.createTreeWalker(n, F, null, !1);
      let o = B(i),
        r = i[o],
        a = -1,
        l = 0;
      const c = [];
      let h = null;
      for (; s.nextNode(); ) {
        a++;
        const t = s.currentNode;
        for (
          t.previousSibling === h && (h = null), e.has(t) && (c.push(t), null === h && (h = t)), null !== h && l++;
          void 0 !== r && r.index === a;

        )
          (r.index = null !== h ? -1 : r.index - l), (r = i[(o = B(i, o))]);
      }
      c.forEach((t) => t.parentNode.removeChild(t));
    }
    const H = (t) => {
        let e = 11 === t.nodeType ? 0 : 1;
        const n = document.createTreeWalker(t, F, null, !1);
        for (; n.nextNode(); ) e++;
        return e;
      },
      B = (t, e = -1) => {
        for (let n = e + 1; n < t.length; n++) {
          const e = t[n];
          if (f(e)) return n;
        }
        return -1;
      };
    /**
     * @license
     * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
     * This code may only be used under the BSD style license found at
     * http://polymer.github.io/LICENSE.txt
     * The complete set of authors may be found at
     * http://polymer.github.io/AUTHORS.txt
     * The complete set of contributors may be found at
     * http://polymer.github.io/CONTRIBUTORS.txt
     * Code distributed by Google as part of the polymer project is also
     * subject to an additional IP rights grant found at
     * http://polymer.github.io/PATENTS.txt
     */
    const U = (t, e) => `${t}--${e}`;
    let $ = !0;
    void 0 === window.ShadyCSS
      ? ($ = !1)
      : void 0 === window.ShadyCSS.prepareTemplateDom &&
        (console.warn(
          'Incompatible ShadyCSS version detected. Please update to at least @webcomponents/webcomponentsjs@2.0.2 and @webcomponents/shadycss@1.3.1.'
        ),
        ($ = !1));
    const q = (t) => (e) => {
        const n = U(e.type, t);
        let i = z.get(n);
        void 0 === i && ((i = { stringsArray: new WeakMap(), keyString: new Map() }), z.set(n, i));
        let s = i.stringsArray.get(e.strings);
        if (void 0 !== s) return s;
        const o = e.strings.join(c);
        if (void 0 === (s = i.keyString.get(o))) {
          const n = e.getTemplateElement();
          $ && window.ShadyCSS.prepareTemplateDom(n, t), (s = new p(e, n)), i.keyString.set(o, s);
        }
        return i.stringsArray.set(e.strings, s), s;
      },
      j = ['html', 'svg'],
      V = new Set(),
      K = (t, e, n) => {
        V.add(t);
        const i = n ? n.element : document.createElement('template'),
          s = e.querySelectorAll('style'),
          { length: o } = s;
        if (0 === o) return void window.ShadyCSS.prepareTemplateStyles(i, t);
        const r = document.createElement('style');
        for (let t = 0; t < o; t++) {
          const e = s[t];
          e.parentNode.removeChild(e), (r.textContent += e.textContent);
        }
        ((t) => {
          j.forEach((e) => {
            const n = z.get(U(e, t));
            void 0 !== n &&
              n.keyString.forEach((t) => {
                const {
                    element: { content: e }
                  } = t,
                  n = new Set();
                Array.from(e.querySelectorAll('style')).forEach((t) => {
                  n.add(t);
                }),
                  D(t, n);
              });
          });
        })(t);
        const a = i.content;
        n
          ? (function(t, e, n = null) {
              const {
                element: { content: i },
                parts: s
              } = t;
              if (null == n) return void i.appendChild(e);
              const o = document.createTreeWalker(i, F, null, !1);
              let r = B(s),
                a = 0,
                l = -1;
              for (; o.nextNode(); ) {
                for (
                  l++, o.currentNode === n && ((a = H(e)), n.parentNode.insertBefore(e, n));
                  -1 !== r && s[r].index === l;

                ) {
                  if (a > 0) {
                    for (; -1 !== r; ) (s[r].index += a), (r = B(s, r));
                    return;
                  }
                  r = B(s, r);
                }
              }
            })(n, r, a.firstChild)
          : a.insertBefore(r, a.firstChild),
          window.ShadyCSS.prepareTemplateStyles(i, t);
        const l = a.querySelector('style');
        if (window.ShadyCSS.nativeShadow && null !== l) e.insertBefore(l.cloneNode(!0), e.firstChild);
        else if (n) {
          a.insertBefore(r, a.firstChild);
          const t = new Set();
          t.add(r), D(n, t);
        }
      };
    window.JSCompiler_renameProperty = (t, e) => t;
    const Y = {
        toAttribute(t, e) {
          switch (e) {
            case Boolean:
              return t ? '' : null;
            case Object:
            case Array:
              return null == t ? t : JSON.stringify(t);
          }
          return t;
        },
        fromAttribute(t, e) {
          switch (e) {
            case Boolean:
              return null !== t;
            case Number:
              return null === t ? null : Number(t);
            case Object:
            case Array:
              return JSON.parse(t);
          }
          return t;
        }
      },
      W = (t, e) => e !== t && (e == e || t == t),
      J = { attribute: !0, type: String, converter: Y, reflect: !1, hasChanged: W },
      X = Promise.resolve(!0),
      Z = 1,
      G = 4,
      Q = 8,
      tt = 16,
      et = 32,
      nt = 'finalized';
    class it extends HTMLElement {
      constructor() {
        super(),
          (this._updateState = 0),
          (this._instanceProperties = void 0),
          (this._updatePromise = X),
          (this._hasConnectedResolver = void 0),
          (this._changedProperties = new Map()),
          (this._reflectingProperties = void 0),
          this.initialize();
      }
      static get observedAttributes() {
        this.finalize();
        const t = [];
        return (
          this._classProperties.forEach((e, n) => {
            const i = this._attributeNameForProperty(n, e);
            void 0 !== i && (this._attributeToPropertyMap.set(i, n), t.push(i));
          }),
          t
        );
      }
      static _ensureClassProperties() {
        if (!this.hasOwnProperty(JSCompiler_renameProperty('_classProperties', this))) {
          this._classProperties = new Map();
          const t = Object.getPrototypeOf(this)._classProperties;
          void 0 !== t && t.forEach((t, e) => this._classProperties.set(e, t));
        }
      }
      static createProperty(t, e = J) {
        if (
          (this._ensureClassProperties(),
          this._classProperties.set(t, e),
          e.noAccessor || this.prototype.hasOwnProperty(t))
        )
          return;
        const n = 'symbol' == typeof t ? Symbol() : `__${t}`;
        Object.defineProperty(this.prototype, t, {
          get() {
            return this[n];
          },
          set(e) {
            const i = this[t];
            (this[n] = e), this._requestUpdate(t, i);
          },
          configurable: !0,
          enumerable: !0
        });
      }
      static finalize() {
        const t = Object.getPrototypeOf(this);
        if (
          (t.hasOwnProperty(nt) || t.finalize(),
          (this[nt] = !0),
          this._ensureClassProperties(),
          (this._attributeToPropertyMap = new Map()),
          this.hasOwnProperty(JSCompiler_renameProperty('properties', this)))
        ) {
          const t = this.properties,
            e = [
              ...Object.getOwnPropertyNames(t),
              ...('function' == typeof Object.getOwnPropertySymbols ? Object.getOwnPropertySymbols(t) : [])
            ];
          for (const n of e) this.createProperty(n, t[n]);
        }
      }
      static _attributeNameForProperty(t, e) {
        const n = e.attribute;
        return !1 === n ? void 0 : 'string' == typeof n ? n : 'string' == typeof t ? t.toLowerCase() : void 0;
      }
      static _valueHasChanged(t, e, n = W) {
        return n(t, e);
      }
      static _propertyValueFromAttribute(t, e) {
        const n = e.type,
          i = e.converter || Y,
          s = 'function' == typeof i ? i : i.fromAttribute;
        return s ? s(t, n) : t;
      }
      static _propertyValueToAttribute(t, e) {
        if (void 0 === e.reflect) return;
        const n = e.type,
          i = e.converter;
        return ((i && i.toAttribute) || Y.toAttribute)(t, n);
      }
      initialize() {
        this._saveInstanceProperties(), this._requestUpdate();
      }
      _saveInstanceProperties() {
        this.constructor._classProperties.forEach((t, e) => {
          if (this.hasOwnProperty(e)) {
            const t = this[e];
            delete this[e],
              this._instanceProperties || (this._instanceProperties = new Map()),
              this._instanceProperties.set(e, t);
          }
        });
      }
      _applyInstanceProperties() {
        this._instanceProperties.forEach((t, e) => (this[e] = t)), (this._instanceProperties = void 0);
      }
      connectedCallback() {
        (this._updateState = this._updateState | et),
          this._hasConnectedResolver && (this._hasConnectedResolver(), (this._hasConnectedResolver = void 0));
      }
      disconnectedCallback() {}
      attributeChangedCallback(t, e, n) {
        e !== n && this._attributeToProperty(t, n);
      }
      _propertyToAttribute(t, e, n = J) {
        const i = this.constructor,
          s = i._attributeNameForProperty(t, n);
        if (void 0 !== s) {
          const t = i._propertyValueToAttribute(e, n);
          if (void 0 === t) return;
          (this._updateState = this._updateState | Q),
            null == t ? this.removeAttribute(s) : this.setAttribute(s, t),
            (this._updateState = this._updateState & ~Q);
        }
      }
      _attributeToProperty(t, e) {
        if (this._updateState & Q) return;
        const n = this.constructor,
          i = n._attributeToPropertyMap.get(t);
        if (void 0 !== i) {
          const t = n._classProperties.get(i) || J;
          (this._updateState = this._updateState | tt),
            (this[i] = n._propertyValueFromAttribute(e, t)),
            (this._updateState = this._updateState & ~tt);
        }
      }
      _requestUpdate(t, e) {
        let n = !0;
        if (void 0 !== t) {
          const i = this.constructor,
            s = i._classProperties.get(t) || J;
          i._valueHasChanged(this[t], e, s.hasChanged)
            ? (this._changedProperties.has(t) || this._changedProperties.set(t, e),
              !0 !== s.reflect ||
                this._updateState & tt ||
                (void 0 === this._reflectingProperties && (this._reflectingProperties = new Map()),
                this._reflectingProperties.set(t, s)))
            : (n = !1);
        }
        !this._hasRequestedUpdate && n && this._enqueueUpdate();
      }
      requestUpdate(t, e) {
        return this._requestUpdate(t, e), this.updateComplete;
      }
      async _enqueueUpdate() {
        let t, e;
        this._updateState = this._updateState | G;
        const n = this._updatePromise;
        this._updatePromise = new Promise((n, i) => {
          (t = n), (e = i);
        });
        try {
          await n;
        } catch (t) {}
        this._hasConnected || (await new Promise((t) => (this._hasConnectedResolver = t)));
        try {
          const t = this.performUpdate();
          null != t && (await t);
        } catch (t) {
          e(t);
        }
        t(!this._hasRequestedUpdate);
      }
      get _hasConnected() {
        return this._updateState & et;
      }
      get _hasRequestedUpdate() {
        return this._updateState & G;
      }
      get hasUpdated() {
        return this._updateState & Z;
      }
      performUpdate() {
        this._instanceProperties && this._applyInstanceProperties();
        let t = !1;
        const e = this._changedProperties;
        try {
          (t = this.shouldUpdate(e)) && this.update(e);
        } catch (e) {
          throw ((t = !1), e);
        } finally {
          this._markUpdated();
        }
        t &&
          (this._updateState & Z || ((this._updateState = this._updateState | Z), this.firstUpdated(e)),
          this.updated(e));
      }
      _markUpdated() {
        (this._changedProperties = new Map()), (this._updateState = this._updateState & ~G);
      }
      get updateComplete() {
        return this._getUpdateComplete();
      }
      _getUpdateComplete() {
        return this._updatePromise;
      }
      shouldUpdate(t) {
        return !0;
      }
      update(t) {
        void 0 !== this._reflectingProperties &&
          this._reflectingProperties.size > 0 &&
          (this._reflectingProperties.forEach((t, e) => this._propertyToAttribute(e, this[e], t)),
          (this._reflectingProperties = void 0));
      }
      updated(t) {}
      firstUpdated(t) {}
    }
    it[nt] = !0;
    const st = 'adoptedStyleSheets' in Document.prototype && 'replace' in CSSStyleSheet.prototype,
      ot = Symbol();
    class rt {
      constructor(t, e) {
        if (e !== ot) throw new Error('CSSResult is not constructable. Use `unsafeCSS` or `css` instead.');
        this.cssText = t;
      }
      get styleSheet() {
        return (
          void 0 === this._styleSheet &&
            (st
              ? ((this._styleSheet = new CSSStyleSheet()), this._styleSheet.replaceSync(this.cssText))
              : (this._styleSheet = null)),
          this._styleSheet
        );
      }
      toString() {
        return this.cssText;
      }
    }
    const at = (t, ...e) => {
      const n = e.reduce(
        (e, n, i) =>
          e +
          ((t) => {
            if (t instanceof rt) return t.cssText;
            if ('number' == typeof t) return t;
            throw new Error(
              `Value passed to 'css' function must be a 'css' function result: ${t}. Use 'unsafeCSS' to pass non-literal values, but\n            take care to ensure page security.`
            );
          })(n) +
          t[i + 1],
        t[0]
      );
      return new rt(n, ot);
    };
    /**
     * @license
     * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
     * This code may only be used under the BSD style license found at
     * http://polymer.github.io/LICENSE.txt
     * The complete set of authors may be found at
     * http://polymer.github.io/AUTHORS.txt
     * The complete set of contributors may be found at
     * http://polymer.github.io/CONTRIBUTORS.txt
     * Code distributed by Google as part of the polymer project is also
     * subject to an additional IP rights grant found at
     * http://polymer.github.io/PATENTS.txt
     */
    (window.litElementVersions || (window.litElementVersions = [])).push('2.2.1');
    const lt = (t) =>
      t.flat
        ? t.flat(1 / 0)
        : (function t(e, n = []) {
            for (let i = 0, s = e.length; i < s; i++) {
              const s = e[i];
              Array.isArray(s) ? t(s, n) : n.push(s);
            }
            return n;
          })(t);
    class ct extends it {
      static finalize() {
        super.finalize.call(this),
          (this._styles = this.hasOwnProperty(JSCompiler_renameProperty('styles', this))
            ? this._getUniqueStyles()
            : this._styles || []);
      }
      static _getUniqueStyles() {
        const t = this.styles,
          e = [];
        if (Array.isArray(t)) {
          lt(t)
            .reduceRight((t, e) => (t.add(e), t), new Set())
            .forEach((t) => e.unshift(t));
        } else t && e.push(t);
        return e;
      }
      initialize() {
        super.initialize(),
          (this.renderRoot = this.createRenderRoot()),
          window.ShadowRoot && this.renderRoot instanceof window.ShadowRoot && this.adoptStyles();
      }
      createRenderRoot() {
        return this.attachShadow({ mode: 'open' });
      }
      adoptStyles() {
        const t = this.constructor._styles;
        0 !== t.length &&
          (void 0 === window.ShadyCSS || window.ShadyCSS.nativeShadow
            ? st
              ? (this.renderRoot.adoptedStyleSheets = t.map((t) => t.styleSheet))
              : (this._needsShimAdoptedStyleSheets = !0)
            : window.ShadyCSS.ScopingShim.prepareAdoptedCssText(t.map((t) => t.cssText), this.localName));
      }
      connectedCallback() {
        super.connectedCallback(), this.hasUpdated && void 0 !== window.ShadyCSS && window.ShadyCSS.styleElement(this);
      }
      update(t) {
        super.update(t);
        const e = this.render();
        e instanceof v &&
          this.constructor.render(e, this.renderRoot, { scopeName: this.localName, eventContext: this }),
          this._needsShimAdoptedStyleSheets &&
            ((this._needsShimAdoptedStyleSheets = !1),
            this.constructor._styles.forEach((t) => {
              const e = document.createElement('style');
              (e.textContent = t.cssText), this.renderRoot.appendChild(e);
            }));
      }
      render() {}
    }
    (ct.finalized = !0),
      (ct.render = (t, e, n) => {
        if (!n || 'object' != typeof n || !n.scopeName) throw new Error('The `scopeName` option is required.');
        const i = n.scopeName,
          s = L.has(e),
          o = $ && 11 === e.nodeType && !!e.host,
          a = o && !V.has(i),
          l = a ? document.createDocumentFragment() : e;
        if (
          (((t, e, n) => {
            let i = L.get(e);
            void 0 === i &&
              (r(e, e.firstChild), L.set(e, (i = new k(Object.assign({ templateFactory: R }, n)))), i.appendInto(e)),
              i.setValue(t),
              i.commit();
          })(t, l, Object.assign({ templateFactory: q(i) }, n)),
          a)
        ) {
          const t = L.get(l);
          L.delete(l);
          const n = t.value instanceof y ? t.value.template : void 0;
          K(i, l, n), r(e, e.firstChild), e.appendChild(l), L.set(e, t);
        }
        !s && o && window.ShadyCSS.styleElement(e.host);
      });
    const ht = at`
html {
  font-size: 15px;
  line-height: 20px;
}

body {
  font-family: 'Roboto', 'Noto', sans-serif;
  font-size: 14px;
  margin: 0;
  padding: 24px;
  background-color: #fafafa;
  color: #5f6368;
}

.horizontal-section-container {
  display: flex;
  flex-direction: row;
  justify-content: center;
  flex-wrap: wrap;
}

.vertical-section-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.centered {
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
}

.card {
  box-shadow: 0 4px 5px 0 rgba(0, 0, 0, 0.14),
              0 1px 10px 0 rgba(0, 0, 0, 0.12),
              0 2px 4px -1px rgba(0, 0, 0, 0.4);
  padding: 20px;
  margin-top: 20px;
  margin-bottom: 20px;
  margin-left: 20px;
  box-sizing: border-box;
  background-color: #fff;
}

header {
  padding: 12px 24px;
  background-color: #2196F3;
  color: #000;
  display: flex;
  align-items: center;
  --iron-icon-fill-color: #000;
  --paper-input-container-focus-color: #33691E;
  --paper-input-container-label: {
    color: #3E2723;
  };
}

header h1 {
  font-size: 24px;
  font-weight: 400;
  letter-spacing: -.012em;
  line-height: 32px;
}

.spacer {
  flex: 1;
}

.settings-action-item {
  height: 48px;
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 16px;
  box-sizing: border-box;
}

body.styled {
  margin: 0;
  padding: 0;
  background-color: #fff;
  height: 100vh;
  --primary-color: #00A2DF;
  --accent-color: rgb(33, 150, 243);
  --arc-font-body1-font-size: 14px;
  --arc-font-body1-font-weight: 400;
  --arc-font-body1-line-height: 20px;
  --arc-font-code-family: 'Roboto Mono', 'Consolas', 'Menlo', monospace;
  --code-background-color: #f5f2f0;
}

body.styled.dark {
  background-color: #424242;
  height: 100vh;
  color: #fff;
  --primary-color: #2196f3;
  --primary-text-color: #fff;
  --paper-toggle-button-label-color: #fff;
  --primary-background-color: #424242;
  --secondary-text-color: #616161;
  --arc-interactive-demo-options-color: #F5F5F5;
  --error-color: #FF5722;
}

body.styled.dark arc-demo-helper {
  --arc-demo-helper-code-container-background-color: #263238;
  --code-background-color: #263238;
  --code-type-boolean-value-color: #F07178;
  --code-type-number-value-color: #F78C6A;
  --code-type-text-value-color: #C3E88D;
  --code-property-value-color: #F07178;
  --code-operator-value-background-color: transparent;
  --arc-demo-helper-demo-background-color: #263238;
}

body.styled.dark .card {
  background-color: #424242;
}

body.styled.dark header {
  background-color: #212121;
  color: #fff;
  --iron-icon-fill-color: #fff;
  --paper-input-container-color: rgba(255, 255, 255, 0.84);
}

body.styled.dark .settings-action-item {
  background-color: #212121;
}

.demo-container {
  flex: 1;
}

h2 {
  font-size: 60px;
  color: #202124;
  font-weight: 400;
  line-height: 1.2;
}

h3 {
  font-size: 24px;
  color: #202124;
  font-weight: 400;
  line-height: 1.2;
}

h4 {
  font-size: 20px;
  font-weight: 400;
  line-height: 1.2;
  margin: 0 0 8px;
}

body.styled.dark h2,
body.styled.dark h3,
body.styled.dark h4 {
  color: #F5F5F5;
}

.documentation-section {
  max-width: 1400px;
  padding: 60px 20px;
  max-width: 1400px;
  width: 100%;
  border-bottom: 1px #e5e5e5 solid;
  margin: 0 auto;
  box-sizing: border-box;
}

ul {
  padding-left: 20px;
}

p {
  margin: 1.40em 0;
}
`;
    try {
      document.adoptedStyleSheets = document.adoptedStyleSheets.concat(ht.styleSheet);
    } catch (t) {
      {
        const t = document.createElement('style');
        (t.type = 'text/css'), (t.innerHTML = ht.cssText), document.getElementsByTagName('head')[0].appendChild(t);
      }
    }
    const dt = document.createElement('link');
    (dt.rel = 'stylesheet'),
      (dt.type = 'text/css'),
      (dt.crossOrigin = 'anonymous'),
      (dt.href =
        'https://fonts.googleapis.com/css?family=Roboto+Mono:400,700|Roboto:400,300,300italic,400italic,500,500italic,700,700italic'),
      document.head.appendChild(dt);
    n(0), n(2);
    let ut = !1,
      pt = !1;
    class _t extends ct {
      static get prismStyles() {
        return at`/**
     * prism.js default theme for JavaScript, CSS and HTML
     * Based on dabblet (http://dabblet.com)
     * @author Lea Verou
     */
    code[class*="language-"],
    pre[class*="language-"] {
      white-space: pre-wrap;
      word-spacing: normal;
      word-break: break-all;
      word-wrap: break-word;
      line-height: 1.5;
      -moz-tab-size: 4;
      -o-tab-size: 4;
      tab-size: 4;
      hyphens: auto;
      background-color: var(--prism-container-background-color);
      display: block;
      font-family: var(--arc-font-code-family, monospace);
      font-size: var(--arc-font-code-font-size, 10pt);
    }
    pre[class*="language-"]::-moz-selection,
    pre[class*="language-"]::-moz-selection,
    code[class*="language-"]::-moz-selection,
    code[class*="language-"]::-moz-selection {
      text-shadow: none;
      background: var(--prism-container-selection-background-color, #b3d4fc);
    }
    pre[class*="language-"]::selection,
    pre[class*="language-"]::selection,
    code[class*="language-"]::selection,
    code[class*="language-"]::selection {
      text-shadow: none;
      background: var(--prism-container-selection-background-color, #b3d4fc);
    }
    @media print {
      code[class*="language-"],
      pre[class*="language-"] {
        text-shadow: none;
      }
    }
    /* Code blocks */
    pre[class*="language-"] {
      padding: 1em;
      margin: .5em 0;
      overflow: auto;
    }
    :not(pre) > code[class*="language-"],
    pre[class*="language-"] {
      background: var(--prism-container-pre-background-color, #f5f2f0);
    }
    /* Inline code */
    :not(pre) > code[class*="language-"] {
      padding: .1em;
      border-radius: .3em;
      white-space: normal;
    }
    .token.comment,
    .token.prolog,
    .token.doctype,
    .token.cdata {
      color: var(--code-token-comment-value-color, slategray);
    }
    .token.punctuation {
      color: var(--code-punctuation-value-color, #999);
    }
    .namespace {
      opacity: .7;
    }
    .token.property,
    .token.tag,
    .token.constant,
    .token.symbol,
    .token.deleted {
      color: var(--code-property-value-color, #905);
    }
    .token.number {
      color: var(--code-type-number-value-color, #905);
    }
    .token.boolean {
      color: var(--code-type-boolean-value-color, #905);
    }
    .token.selector,
    .token.attr-name,
    .token.string,
    .token.char,
    .token.builtin,
    .token.inserted {
      color: var(--code-type-text-value-color, #690);
    }
    .token.operator,
    .token.entity,
    .token.url,
    .language-css .token.string,
    .style .token.string {
      color: var(--code-operator-value-color, #a67f59);
      background: var(--code-operator-value-background-color, hsla(0, 0%, 100%, .5));
    }
    .token.atrule,
    .token.attr-value,
    .token.keyword {
      color: var(--code-keyword-value-color, #07a);
    }
    .token.function {
      color: var(--code-function-value-color, #DD4A68);
    }
    .token.regex,
    .token.important,
    .token.variable {
      color: var(--code-variable-value-color, #e90);
    }
    .token.important,
    .token.bold {
      font-weight: bold;
    }
    .token.italic {
      font-style: italic;
    }
    .token.entity {
      cursor: help;
    }`;
      }
      static get styles() {
        return [
          at`
    :host {
      display: block;
      box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.14),
                  0 1px 5px 0 rgba(0, 0, 0, 0.12),
                  0 3px 1px -2px rgba(0, 0, 0, 0.2);
      margin-bottom: 40px;
    }

    .demo {
      display: block;
      border-bottom: 1px solid #e0e0e0;
      background-color: var(--arc-demo-helper-demo-background-color, white);
      margin: 0;
      padding: 20px;
    }

    .code-container {
      margin: 0;
      background-color: var(--arc-demo-helper-code-container-background-color, #f5f5f5);
      font-size: 13px;
      overflow: auto;
      position: relative;
      padding: 0 20px;
    }

    .code {
      padding: 20px;
      margin: 0;
      background-color: var(--arc-demo-helper-code-container-background-color, var(--google-grey-100));
      font-size: 13px;
      overflow: auto;

      display: block;
      white-space: pre-wrap;
    }

    .code > pre {
      margin: 0;
      padding: 0 0 10px 0;
    }

    #copyButton {
      position: absolute;
      top: 0;
      right: 0px;
      text-transform: uppercase;
      border: none;
      cursor: pointer;
      background: #e0e0e0;
    }
    `,
          _t.prismStyles
        ];
      }
      set markdown(t) {
        (this._markdown = t), this._highlight(t);
      }
      get markdown() {
        return this._markdown;
      }
      constructor() {
        super(), (this._slotChangeHandler = this._slotChangeHandler.bind(this));
      }
      render() {
        return M`
    <div class="demo">
      <slot id="content"></slot>
      <div id="demoContent"></div>
    </div>
    <div class="code-container">
      <code class="code"></code>
      <button id="copyButton" title="copy to clipboard" @click="${this._copyToClipboard}">Copy</button>
    </div>
    `;
      }
      firstUpdated() {
        (ut = !0), this._registerSlotListener();
      }
      connectedCallback() {
        super.connectedCallback(), ut && !pt && this._registerSlotListener();
      }
      _registerSlotListener() {
        const t = this.shadowRoot.querySelector('#content');
        t && t.addEventListener('slotchange', this._slotChangeHandler);
      }
      disconnectedCallback() {
        super.disconnectedCallback(),
          this.shadowRoot.querySelector('#content').removeEventListener('slotchange', this._slotChangeHandler);
      }
      _slotChangeHandler() {
        this._updateContent();
      }
      _updateContent() {
        const t = this.shadowRoot.querySelector('#content'),
          e = t.assignedNodes().find((t) => 'TEMPLATE' === t.nodeName);
        if (!e) return;
        let n = this.unindent(e.innerHTML);
        (n = (n = n.replace(/ class=""/g, '')).replace(/=""/g, '')),
          (this.markdown = n),
          t.removeEventListener('slotchange', this._slotChangeHandler),
          this.appendChild(document.importNode(e.content, !0)),
          (pt = !0);
      }
      unindent(t) {
        if (!t) return t;
        const e = t.replace(/\t/g, '  ').split('\n'),
          n = e.reduce(function(t, e) {
            if (/^\s*$/.test(e)) return t;
            const n = e.match(/^(\s*)/)[0].length;
            return null === t ? n : n < t ? n : t;
          }, null);
        return e.map((t) => t.substr(n)).join('\n');
      }
      _highlight(t) {
        const e = Prism.languages.markdown,
          n = { code: t, grammar: e, language: 'markdown' };
        Prism.hooks.run('before-highlight', n);
        const i = Prism.highlight(t, e, 'markdown');
        this.shadowRoot.querySelector('code').innerHTML = i;
      }
      _copyToClipboard() {
        const t = this.shadowRoot.querySelector('#copyButton'),
          e = document.createRange();
        e.selectNodeContents(this.shadowRoot.querySelector('.code'));
        const n = window.getSelection();
        n.removeAllRanges(), n.addRange(e);
        let i = !1;
        try {
          (i = document.execCommand('copy')), (t.textContent = 'done');
        } catch (e) {
          console.warn(e), (t.textContent = 'error');
        }
        return setTimeout(this._resetCopyButtonState.bind(this), 1e3), n.removeAllRanges(), i;
      }
      _resetCopyButtonState() {
        this.shadowRoot.querySelector('#copyButton').textContent = 'copy';
      }
    }
    window.customElements.define('arc-demo-helper', _t);
    /**
@license
Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/
    const ft = !(window.ShadyDOM && window.ShadyDOM.inUse);
    let mt, gt;
    function yt(t) {
      mt =
        (!t || !t.shimcssproperties) &&
        (ft ||
          Boolean(
            !navigator.userAgent.match(/AppleWebKit\/601|Edge\/15/) &&
              window.CSS &&
              CSS.supports &&
              CSS.supports('box-shadow', '0 0 0 var(--foo)')
          ));
    }
    window.ShadyCSS && void 0 !== window.ShadyCSS.cssBuild && (gt = window.ShadyCSS.cssBuild);
    const bt = Boolean(window.ShadyCSS && window.ShadyCSS.disableRuntime);
    window.ShadyCSS && void 0 !== window.ShadyCSS.nativeCss
      ? (mt = window.ShadyCSS.nativeCss)
      : window.ShadyCSS
      ? (yt(window.ShadyCSS), (window.ShadyCSS = void 0))
      : yt(window.WebComponents && window.WebComponents.flags);
    const vt = mt;
    /**
@license
Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/ class wt {
      constructor() {
        (this.start = 0),
          (this.end = 0),
          (this.previous = null),
          (this.parent = null),
          (this.rules = null),
          (this.parsedCssText = ''),
          (this.cssText = ''),
          (this.atRule = !1),
          (this.type = 0),
          (this.keyframesName = ''),
          (this.selector = ''),
          (this.parsedSelector = '');
      }
    }
    function Ct(t) {
      return (function t(e, n) {
        let i = n.substring(e.start, e.end - 1);
        e.parsedCssText = e.cssText = i.trim();
        if (e.parent) {
          let t = e.previous ? e.previous.end : e.parent.start;
          i = (i = (i = (function(t) {
            return t.replace(/\\([0-9a-f]{1,6})\s/gi, function() {
              let t = arguments[1],
                e = 6 - t.length;
              for (; e--; ) t = '0' + t;
              return '\\' + t;
            });
          })((i = n.substring(t, e.start - 1)))).replace(Pt.multipleSpaces, ' ')).substring(i.lastIndexOf(';') + 1);
          let s = (e.parsedSelector = e.selector = i.trim());
          (e.atRule = 0 === s.indexOf(Ot)),
            e.atRule
              ? 0 === s.indexOf(At)
                ? (e.type = xt.MEDIA_RULE)
                : s.match(Pt.keyframesRule) &&
                  ((e.type = xt.KEYFRAMES_RULE), (e.keyframesName = e.selector.split(Pt.multipleSpaces).pop()))
              : 0 === s.indexOf(Tt)
              ? (e.type = xt.MIXIN_RULE)
              : (e.type = xt.STYLE_RULE);
        }
        let s = e.rules;
        if (s) for (let e, i = 0, o = s.length; i < o && (e = s[i]); i++) t(e, n);
        return e;
      })(
        (function(t) {
          let e = new wt();
          (e.start = 0), (e.end = t.length);
          let n = e;
          for (let i = 0, s = t.length; i < s; i++)
            if (t[i] === kt) {
              n.rules || (n.rules = []);
              let t = n,
                e = t.rules[t.rules.length - 1] || null;
              ((n = new wt()).start = i + 1), (n.parent = t), (n.previous = e), t.rules.push(n);
            } else t[i] === Et && ((n.end = i + 1), (n = n.parent || e));
          return e;
        })((t = t.replace(Pt.comments, '').replace(Pt.port, ''))),
        t
      );
    }
    function St(t, e, n = '') {
      let i = '';
      if (t.cssText || t.rules) {
        let n = t.rules;
        if (
          n &&
          !(function(t) {
            let e = t[0];
            return Boolean(e) && Boolean(e.selector) && 0 === e.selector.indexOf(Tt);
          })(n)
        )
          for (let t, s = 0, o = n.length; s < o && (t = n[s]); s++) i = St(t, e, i);
        else
          (i = (i = e
            ? t.cssText
            : (function(t) {
                return (function(t) {
                  return t.replace(Pt.mixinApply, '').replace(Pt.varApply, '');
                })(
                  (t = (function(t) {
                    return t.replace(Pt.customProp, '').replace(Pt.mixinProp, '');
                  })(t))
                );
              })(t.cssText)).trim()) && (i = '  ' + i + '\n');
      }
      return i && (t.selector && (n += t.selector + ' ' + kt + '\n'), (n += i), t.selector && (n += Et + '\n\n')), n;
    }
    const xt = { STYLE_RULE: 1, KEYFRAMES_RULE: 7, MEDIA_RULE: 4, MIXIN_RULE: 1e3 },
      kt = '{',
      Et = '}',
      Pt = {
        comments: /\/\*[^*]*\*+([^\/*][^*]*\*+)*\//gim,
        port: /@import[^;]*;/gim,
        customProp: /(?:^[^;\-\s}]+)?--[^;{}]*?:[^{};]*?(?:[;\n]|$)/gim,
        mixinProp: /(?:^[^;\-\s}]+)?--[^;{}]*?:[^{};]*?{[^}]*?}(?:[;\n]|$)?/gim,
        mixinApply: /@apply\s*\(?[^);]*\)?\s*(?:[;\n]|$)?/gim,
        varApply: /[^;:]*?:[^;]*?var\([^;]*\)(?:[;\n]|$)?/gim,
        keyframesRule: /^@[^\s]*keyframes/,
        multipleSpaces: /\s+/g
      },
      Tt = '--',
      At = '@media',
      Ot = '@',
      Nt = /(?:^|[;\s{]\s*)(--[\w-]*?)\s*:\s*(?:((?:'(?:\\'|.)*?'|"(?:\\"|.)*?"|\([^)]*?\)|[^};{])+)|\{([^}]*)\}(?:(?=[;\s}])|$))/gi,
      It = /(?:^|\W+)@apply\s*\(?([^);\n]*)\)?/gi,
      Rt = /@media\s(.*)/,
      zt = new Set(),
      Lt = 'shady-unscoped';
    function Mt(t) {
      const e = t.textContent;
      if (!zt.has(e)) {
        zt.add(e);
        const n = t.cloneNode(!0);
        document.head.appendChild(n);
      }
    }
    function Ft(t) {
      return t.hasAttribute(Lt);
    }
    /**
@license
Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/ function Dt(
      t,
      e
    ) {
      return t ? ('string' == typeof t && (t = Ct(t)), e && Bt(t, e), St(t, vt)) : '';
    }
    function Ht(t) {
      return !t.__cssRules && t.textContent && (t.__cssRules = Ct(t.textContent)), t.__cssRules || null;
    }
    function Bt(t, e, n, i) {
      if (!t) return;
      let s = !1,
        o = t.type;
      if (i && o === xt.MEDIA_RULE) {
        let e = t.selector.match(Rt);
        e && (window.matchMedia(e[1]).matches || (s = !0));
      }
      o === xt.STYLE_RULE ? e(t) : n && o === xt.KEYFRAMES_RULE ? n(t) : o === xt.MIXIN_RULE && (s = !0);
      let r = t.rules;
      if (r && !s) for (let t, s = 0, o = r.length; s < o && (t = r[s]); s++) Bt(t, e, n, i);
    }
    function Ut(t, e) {
      let n = 0;
      for (let i = e, s = t.length; i < s; i++)
        if ('(' === t[i]) n++;
        else if (')' === t[i] && 0 == --n) return i;
      return -1;
    }
    window.ShadyDOM && window.ShadyDOM.wrap;
    const $t = 'css-build';
    function qt(t) {
      if (void 0 !== gt) return gt;
      if (void 0 === t.__cssBuild) {
        const e = t.getAttribute($t);
        if (e) t.__cssBuild = e;
        else {
          const e = (function(t) {
            const e = 'template' === t.localName ? t.content.firstChild : t.firstChild;
            if (e instanceof Comment) {
              const t = e.textContent.trim().split(':');
              if (t[0] === $t) return t[1];
            }
            return '';
          })(t);
          '' !== e &&
            (function(t) {
              const e = 'template' === t.localName ? t.content.firstChild : t.firstChild;
              e.parentNode.removeChild(e);
            })(
              /**
@license
Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/ t
            ),
            (t.__cssBuild = e);
        }
      }
      return t.__cssBuild || '';
    }
    function jt(t) {
      return '' !== qt(t);
    }
    function Vt(t, e) {
      for (let n in e) null === n ? t.style.removeProperty(n) : t.style.setProperty(n, e[n]);
    }
    function Kt(t, e) {
      const n = window.getComputedStyle(t).getPropertyValue(e);
      return n ? n.trim() : '';
    }
    /**
@license
Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/
    const Yt = /;\s*/m,
      Wt = /^\s*(initial)|(inherit)\s*$/,
      Jt = /\s*!important/,
      Xt = '_-_';
    class Zt {
      constructor() {
        this._map = {};
      }
      set(t, e) {
        (t = t.trim()), (this._map[t] = { properties: e, dependants: {} });
      }
      get(t) {
        return (t = t.trim()), this._map[t] || null;
      }
    }
    let Gt = null;
    class Qt {
      constructor() {
        (this._currentElement = null), (this._measureElement = null), (this._map = new Zt());
      }
      detectMixin(t) {
        return (function(t) {
          const e = It.test(t) || Nt.test(t);
          return (It.lastIndex = 0), (Nt.lastIndex = 0), e;
        })(t);
      }
      gatherStyles(t) {
        const e = (function(t) {
          const e = [],
            n = t.querySelectorAll('style');
          for (let t = 0; t < n.length; t++) {
            const i = n[t];
            Ft(i) ? ft || (Mt(i), i.parentNode.removeChild(i)) : (e.push(i.textContent), i.parentNode.removeChild(i));
          }
          return e.join('').trim();
        })(t.content);
        if (e) {
          const n = document.createElement('style');
          return (n.textContent = e), t.content.insertBefore(n, t.content.firstChild), n;
        }
        return null;
      }
      transformTemplate(t, e) {
        void 0 === t._gatheredStyle && (t._gatheredStyle = this.gatherStyles(t));
        const n = t._gatheredStyle;
        return n ? this.transformStyle(n, e) : null;
      }
      transformStyle(t, e = '') {
        let n = Ht(t);
        return this.transformRules(n, e), (t.textContent = Dt(n)), n;
      }
      transformCustomStyle(t) {
        let e = Ht(t);
        return (
          Bt(e, (t) => {
            ':root' === t.selector && (t.selector = 'html'), this.transformRule(t);
          }),
          (t.textContent = Dt(e)),
          e
        );
      }
      transformRules(t, e) {
        (this._currentElement = e),
          Bt(t, (t) => {
            this.transformRule(t);
          }),
          (this._currentElement = null);
      }
      transformRule(t) {
        (t.cssText = this.transformCssText(t.parsedCssText, t)), ':root' === t.selector && (t.selector = ':host > *');
      }
      transformCssText(t, e) {
        return (
          (t = t.replace(Nt, (t, n, i, s) => this._produceCssProperties(t, n, i, s, e))),
          this._consumeCssProperties(t, e)
        );
      }
      _getInitialValueForProperty(t) {
        return (
          this._measureElement ||
            ((this._measureElement = document.createElement('meta')),
            this._measureElement.setAttribute('apply-shim-measure', ''),
            (this._measureElement.style.all = 'initial'),
            document.head.appendChild(this._measureElement)),
          window.getComputedStyle(this._measureElement).getPropertyValue(t)
        );
      }
      _fallbacksFromPreviousRules(t) {
        let e = t;
        for (; e.parent; ) e = e.parent;
        const n = {};
        let i = !1;
        return (
          Bt(e, (e) => {
            (i = i || e === t) || (e.selector === t.selector && Object.assign(n, this._cssTextToMap(e.parsedCssText)));
          }),
          n
        );
      }
      _consumeCssProperties(t, e) {
        let n = null;
        for (; (n = It.exec(t)); ) {
          let i = n[0],
            s = n[1],
            o = n.index,
            r = o + i.indexOf('@apply'),
            a = o + i.length,
            l = t.slice(0, r),
            c = t.slice(a),
            h = e ? this._fallbacksFromPreviousRules(e) : {};
          Object.assign(h, this._cssTextToMap(l));
          let d = this._atApplyToCssProperties(s, h);
          (t = `${l}${d}${c}`), (It.lastIndex = o + d.length);
        }
        return t;
      }
      _atApplyToCssProperties(t, e) {
        t = t.replace(Yt, '');
        let n = [],
          i = this._map.get(t);
        if ((i || (this._map.set(t, {}), (i = this._map.get(t))), i)) {
          let s, o, r;
          this._currentElement && (i.dependants[this._currentElement] = !0);
          const a = i.properties;
          for (s in a)
            (r = e && e[s]),
              (o = [s, ': var(', t, Xt, s]),
              r && o.push(',', r.replace(Jt, '')),
              o.push(')'),
              Jt.test(a[s]) && o.push(' !important'),
              n.push(o.join(''));
        }
        return n.join('; ');
      }
      _replaceInitialOrInherit(t, e) {
        let n = Wt.exec(e);
        return n && (e = n[1] ? this._getInitialValueForProperty(t) : 'apply-shim-inherit'), e;
      }
      _cssTextToMap(t, e = !1) {
        let n,
          i,
          s = t.split(';'),
          o = {};
        for (let t, r, a = 0; a < s.length; a++)
          (t = s[a]) &&
            (r = t.split(':')).length > 1 &&
            ((n = r[0].trim()), (i = r.slice(1).join(':')), e && (i = this._replaceInitialOrInherit(n, i)), (o[n] = i));
        return o;
      }
      _invalidateMixinEntry(t) {
        if (Gt) for (let e in t.dependants) e !== this._currentElement && Gt(e);
      }
      _produceCssProperties(t, e, n, i, s) {
        if (
          (n &&
            (function t(e, n) {
              let i = e.indexOf('var(');
              if (-1 === i) return n(e, '', '', '');
              let s = Ut(e, i + 3),
                o = e.substring(i + 4, s),
                r = e.substring(0, i),
                a = t(e.substring(s + 1), n),
                l = o.indexOf(',');
              return -1 === l ? n(r, o.trim(), '', a) : n(r, o.substring(0, l).trim(), o.substring(l + 1).trim(), a);
            })(n, (t, e) => {
              e && this._map.get(e) && (i = `@apply ${e};`);
            }),
          !i)
        )
          return t;
        let o = this._consumeCssProperties('' + i, s),
          r = t.slice(0, t.indexOf('--')),
          a = this._cssTextToMap(o, !0),
          l = a,
          c = this._map.get(e),
          h = c && c.properties;
        h ? (l = Object.assign(Object.create(h), a)) : this._map.set(e, l);
        let d,
          u,
          p = [],
          _ = !1;
        for (d in l) void 0 === (u = a[d]) && (u = 'initial'), !h || d in h || (_ = !0), p.push(`${e}${Xt}${d}: ${u}`);
        return (
          _ && this._invalidateMixinEntry(c), c && (c.properties = l), n && (r = `${t};${r}`), `${r}${p.join('; ')};`
        );
      }
    }
    (Qt.prototype.detectMixin = Qt.prototype.detectMixin),
      (Qt.prototype.transformStyle = Qt.prototype.transformStyle),
      (Qt.prototype.transformCustomStyle = Qt.prototype.transformCustomStyle),
      (Qt.prototype.transformRules = Qt.prototype.transformRules),
      (Qt.prototype.transformRule = Qt.prototype.transformRule),
      (Qt.prototype.transformTemplate = Qt.prototype.transformTemplate),
      (Qt.prototype._separator = Xt),
      Object.defineProperty(Qt.prototype, 'invalidCallback', {
        get: () => Gt,
        set(t) {
          Gt = t;
        }
      });
    var te = Qt;
    /**
@license
Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/ var ee = {};
    /**
@license
Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/ const ne =
        '_applyShimCurrentVersion',
      ie = '_applyShimNextVersion',
      se = '_applyShimValidatingVersion',
      oe = Promise.resolve();
    function re(t) {
      let e = ee[t];
      e &&
        (function(t) {
          (t[ne] = t[ne] || 0), (t[se] = t[se] || 0), (t[ie] = (t[ie] || 0) + 1);
        })(e);
    }
    function ae(t) {
      return t[ne] === t[ie];
    }
    function le(t) {
      return !ae(t) && t[se] === t[ie];
    }
    function ce(t) {
      (t[se] = t[ie]),
        t._validating ||
          ((t._validating = !0),
          oe.then(function() {
            (t[ne] = t[ie]), (t._validating = !1);
          }));
    }
    /**
@license
Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/
    let he,
      de = null,
      ue = (window.HTMLImports && window.HTMLImports.whenReady) || null;
    function pe(t) {
      requestAnimationFrame(function() {
        ue
          ? ue(t)
          : (de ||
              ((de = new Promise((t) => {
                he = t;
              })),
              'complete' === document.readyState
                ? he()
                : document.addEventListener('readystatechange', () => {
                    'complete' === document.readyState && he();
                  })),
            de.then(function() {
              t && t();
            }));
      });
    }
    /**
@license
Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/ const _e =
        '__seenByShadyCSS',
      fe = '__shadyCSSCachedStyle';
    let me = null,
      ge = null;
    class ye {
      constructor() {
        (this.customStyles = []),
          (this.enqueued = !1),
          pe(() => {
            window.ShadyCSS.flushCustomStyles && window.ShadyCSS.flushCustomStyles();
          });
      }
      enqueueDocumentValidation() {
        !this.enqueued && ge && ((this.enqueued = !0), pe(ge));
      }
      addCustomStyle(t) {
        t[_e] || ((t[_e] = !0), this.customStyles.push(t), this.enqueueDocumentValidation());
      }
      getStyleForCustomStyle(t) {
        if (t[fe]) return t[fe];
        let e;
        return (e = t.getStyle ? t.getStyle() : t);
      }
      processStyles() {
        const t = this.customStyles;
        for (let e = 0; e < t.length; e++) {
          const n = t[e];
          if (n[fe]) continue;
          const i = this.getStyleForCustomStyle(n);
          if (i) {
            const t = i.__appliedElement || i;
            me && me(t), (n[fe] = t);
          }
        }
        return t;
      }
    }
    (ye.prototype.addCustomStyle = ye.prototype.addCustomStyle),
      (ye.prototype.getStyleForCustomStyle = ye.prototype.getStyleForCustomStyle),
      (ye.prototype.processStyles = ye.prototype.processStyles),
      Object.defineProperties(ye.prototype, {
        transformCallback: {
          get: () => me,
          set(t) {
            me = t;
          }
        },
        validateCallback: {
          get: () => ge,
          set(t) {
            let e = !1;
            ge || (e = !0), (ge = t), e && this.enqueueDocumentValidation();
          }
        }
      });
    /**
@license
Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/
    const be = new te();
    class ve {
      constructor() {
        (this.customStyleInterface = null), (be.invalidCallback = re);
      }
      ensure() {
        this.customStyleInterface ||
          (window.ShadyCSS.CustomStyleInterface &&
            ((this.customStyleInterface = window.ShadyCSS.CustomStyleInterface),
            (this.customStyleInterface.transformCallback = (t) => {
              be.transformCustomStyle(t);
            }),
            (this.customStyleInterface.validateCallback = () => {
              requestAnimationFrame(() => {
                this.customStyleInterface.enqueued && this.flushCustomStyles();
              });
            })));
      }
      prepareTemplate(t, e) {
        if ((this.ensure(), jt(t))) return;
        ee[e] = t;
        let n = be.transformTemplate(t, e);
        t._styleAst = n;
      }
      flushCustomStyles() {
        if ((this.ensure(), !this.customStyleInterface)) return;
        let t = this.customStyleInterface.processStyles();
        if (this.customStyleInterface.enqueued) {
          for (let e = 0; e < t.length; e++) {
            let n = t[e],
              i = this.customStyleInterface.getStyleForCustomStyle(n);
            i && be.transformCustomStyle(i);
          }
          this.customStyleInterface.enqueued = !1;
        }
      }
      styleSubtree(t, e) {
        if ((this.ensure(), e && Vt(t, e), t.shadowRoot)) {
          this.styleElement(t);
          let e = t.shadowRoot.children || t.shadowRoot.childNodes;
          for (let t = 0; t < e.length; t++) this.styleSubtree(e[t]);
        } else {
          let e = t.children || t.childNodes;
          for (let t = 0; t < e.length; t++) this.styleSubtree(e[t]);
        }
      }
      styleElement(t) {
        this.ensure();
        let { is: e } = (function(t) {
            let e = t.localName,
              n = '',
              i = '';
            return (
              e
                ? e.indexOf('-') > -1
                  ? (n = e)
                  : ((i = e), (n = (t.getAttribute && t.getAttribute('is')) || ''))
                : ((n = t.is), (i = t.extends)),
              { is: n, typeExtension: i }
            );
          })(t),
          n = ee[e];
        if ((!n || !jt(n)) && n && !ae(n)) {
          le(n) || (this.prepareTemplate(n, e), ce(n));
          let i = t.shadowRoot;
          if (i) {
            let t = i.querySelector('style');
            t && ((t.__cssRules = n._styleAst), (t.textContent = Dt(n._styleAst)));
          }
        }
      }
      styleDocument(t) {
        this.ensure(), this.styleSubtree(document.body, t);
      }
    }
    if (!window.ShadyCSS || !window.ShadyCSS.ScopingShim) {
      const t = new ve();
      let e = window.ShadyCSS && window.ShadyCSS.CustomStyleInterface;
      (window.ShadyCSS = {
        prepareTemplate(e, n, i) {
          t.flushCustomStyles(), t.prepareTemplate(e, n);
        },
        prepareTemplateStyles(t, e, n) {
          window.ShadyCSS.prepareTemplate(t, e, n);
        },
        prepareTemplateDom(t, e) {},
        styleSubtree(e, n) {
          t.flushCustomStyles(), t.styleSubtree(e, n);
        },
        styleElement(e) {
          t.flushCustomStyles(), t.styleElement(e);
        },
        styleDocument(e) {
          t.flushCustomStyles(), t.styleDocument(e);
        },
        getComputedStyleValue: (t, e) => Kt(t, e),
        flushCustomStyles() {
          t.flushCustomStyles();
        },
        nativeCss: vt,
        nativeShadow: ft,
        cssBuild: gt,
        disableRuntime: bt
      }),
        e && (window.ShadyCSS.CustomStyleInterface = e);
    }
    (window.ShadyCSS.ApplyShim = be),
      /**
@license
Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/
      (window.JSCompiler_renameProperty = function(t, e) {
        return t;
      });
    /**
@license
Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/
    let we,
      Ce,
      Se = /(url\()([^)]*)(\))/g,
      xe = /(^\/[^\/])|(^#)|(^[\w-\d]*:)/;
    function ke(t, e) {
      if (t && xe.test(t)) return t;
      if ('//' === t) return t;
      if (void 0 === we) {
        we = !1;
        try {
          const t = new URL('b', 'http://a');
          (t.pathname = 'c%20d'), (we = 'http://a/c%20d' === t.href);
        } catch (t) {}
      }
      if ((e || (e = document.baseURI || window.location.href), we))
        try {
          return new URL(t, e).href;
        } catch (e) {
          return t;
        }
      return (
        Ce ||
          (((Ce = document.implementation.createHTMLDocument('temp')).base = Ce.createElement('base')),
          Ce.head.appendChild(Ce.base),
          (Ce.anchor = Ce.createElement('a')),
          Ce.body.appendChild(Ce.anchor)),
        (Ce.base.href = e),
        (Ce.anchor.href = t),
        Ce.anchor.href || t
      );
    }
    function Ee(t, e) {
      return t.replace(Se, function(t, n, i, s) {
        return n + "'" + ke(i.replace(/["']/g, ''), e) + "'" + s;
      });
    }
    function Pe(t) {
      return t.substring(0, t.lastIndexOf('/') + 1);
    }
    /**
@license
Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/ const Te = !window.ShadyDOM;
    Boolean(!window.ShadyCSS || window.ShadyCSS.nativeCss), window.customElements.polyfillWrapFlushCallback;
    let Ae = Pe(document.baseURI || window.location.href);
    let Oe = (window.Polymer && window.Polymer.sanitizeDOMValue) || void 0;
    let Ne = !1;
    let Ie = !1;
    let Re = !1;
    let ze = !1;
    let Le = !1;
    let Me = !0;
    /**
@license
Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/
    let Fe = 0;
    function De() {}
    De.prototype.__mixinApplications, De.prototype.__mixinSet;
    const He = function(t) {
      let e = t.__mixinApplications;
      e || ((e = new WeakMap()), (t.__mixinApplications = e));
      let n = Fe++;
      return function(i) {
        let s = i.__mixinSet;
        if (s && s[n]) return i;
        let o = e,
          r = o.get(i);
        r || ((r = t(i)), o.set(i, r));
        let a = Object.create(r.__mixinSet || s || null);
        return (a[n] = !0), (r.__mixinSet = a), r;
      };
    };
    /**
@license
Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/ let Be = {},
      Ue = {};
    function $e(t, e) {
      Be[t] = Ue[t.toLowerCase()] = e;
    }
    function qe(t) {
      return Be[t] || Ue[t.toLowerCase()];
    }
    class je extends HTMLElement {
      static get observedAttributes() {
        return ['id'];
      }
      static import(t, e) {
        if (t) {
          let n = qe(t);
          return n && e ? n.querySelector(e) : n;
        }
        return null;
      }
      attributeChangedCallback(t, e, n, i) {
        e !== n && this.register();
      }
      get assetpath() {
        if (!this.__assetpath) {
          const t =
              window.HTMLImports && HTMLImports.importForElement
                ? HTMLImports.importForElement(this) || document
                : this.ownerDocument,
            e = ke(this.getAttribute('assetpath') || '', t.baseURI);
          this.__assetpath = Pe(e);
        }
        return this.__assetpath;
      }
      register(t) {
        if ((t = t || this.id)) {
          if (Ie && void 0 !== qe(t))
            throw ($e(t, null), new Error(`strictTemplatePolicy: dom-module ${t} re-registered`));
          (this.id = t),
            $e(t, this),
            (e = this).querySelector('style') && console.warn('dom-module %s has style outside template', e.id);
        }
        var e;
      }
    }
    (je.prototype.modules = Be), customElements.define('dom-module', je);
    /**
@license
Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/
    const Ve = 'link[rel=import][type~=css]',
      Ke = 'include',
      Ye = 'shady-unscoped';
    function We(t) {
      return je.import(t);
    }
    function Je(t) {
      const e = Ee((t.body ? t.body : t).textContent, t.baseURI),
        n = document.createElement('style');
      return (n.textContent = e), n;
    }
    function Xe(t) {
      const e = t.trim().split(/\s+/),
        n = [];
      for (let t = 0; t < e.length; t++) n.push(...Ze(e[t]));
      return n;
    }
    function Ze(t) {
      const e = We(t);
      if (!e) return console.warn('Could not find style data in module named', t), [];
      if (void 0 === e._styles) {
        const t = [];
        t.push(...Qe(e));
        const n = e.querySelector('template');
        n && t.push(...Ge(n, e.assetpath)), (e._styles = t);
      }
      return e._styles;
    }
    function Ge(t, e) {
      if (!t._styles) {
        const n = [],
          i = t.content.querySelectorAll('style');
        for (let t = 0; t < i.length; t++) {
          let s = i[t],
            o = s.getAttribute(Ke);
          o &&
            n.push(
              ...Xe(o).filter(function(t, e, n) {
                return n.indexOf(t) === e;
              })
            ),
            e && (s.textContent = Ee(s.textContent, e)),
            n.push(s);
        }
        t._styles = n;
      }
      return t._styles;
    }
    function Qe(t) {
      const e = [],
        n = t.querySelectorAll(Ve);
      for (let t = 0; t < n.length; t++) {
        let i = n[t];
        if (i.import) {
          const t = i.import,
            n = i.hasAttribute(Ye);
          if (n && !t._unscopedStyle) {
            const e = Je(t);
            e.setAttribute(Ye, ''), (t._unscopedStyle = e);
          } else t._style || (t._style = Je(t));
          e.push(n ? t._unscopedStyle : t._style);
        }
      }
      return e;
    }
    function tn(t) {
      let e = We(t);
      if (e && void 0 === e._cssText) {
        let t = en(e),
          n = e.querySelector('template');
        n &&
          (t += (function(t, e) {
            let n = '';
            const i = Ge(t, e);
            for (let t = 0; t < i.length; t++) {
              let e = i[t];
              e.parentNode && e.parentNode.removeChild(e), (n += e.textContent);
            }
            return n;
          })(n, e.assetpath)),
          (e._cssText = t || null);
      }
      return e || console.warn('Could not find style data in module named', t), (e && e._cssText) || '';
    }
    function en(t) {
      let e = '',
        n = Qe(t);
      for (let t = 0; t < n.length; t++) e += n[t].textContent;
      return e;
    }
    /**
@license
Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/ const nn =
      window.ShadyDOM && window.ShadyDOM.noPatch && window.ShadyDOM.wrap
        ? window.ShadyDOM.wrap
        : window.ShadyDOM
        ? (t) => ShadyDOM.patch(t)
        : (t) => t;
    /**
@license
Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/ function sn(
      t
    ) {
      return t.indexOf('.') >= 0;
    }
    function on(t) {
      let e = t.indexOf('.');
      return -1 === e ? t : t.slice(0, e);
    }
    function rn(t, e) {
      return 0 === t.indexOf(e + '.');
    }
    function an(t, e) {
      return 0 === e.indexOf(t + '.');
    }
    function ln(t, e, n) {
      return e + n.slice(t.length);
    }
    function cn(t) {
      if (Array.isArray(t)) {
        let e = [];
        for (let n = 0; n < t.length; n++) {
          let i = t[n].toString().split('.');
          for (let t = 0; t < i.length; t++) e.push(i[t]);
        }
        return e.join('.');
      }
      return t;
    }
    function hn(t) {
      return Array.isArray(t) ? cn(t).split('.') : t.toString().split('.');
    }
    function dn(t, e, n) {
      let i = t,
        s = hn(e);
      for (let t = 0; t < s.length; t++) {
        if (!i) return;
        i = i[s[t]];
      }
      return n && (n.path = s.join('.')), i;
    }
    function un(t, e, n) {
      let i = t,
        s = hn(e),
        o = s[s.length - 1];
      if (s.length > 1) {
        for (let t = 0; t < s.length - 1; t++) {
          if (!(i = i[s[t]])) return;
        }
        i[o] = n;
      } else i[e] = n;
      return s.join('.');
    }
    const pn = {},
      _n = /-[a-z]/g,
      fn = /([A-Z])/g;
    /**
@license
Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/ function mn(
      t
    ) {
      return pn[t] || (pn[t] = t.indexOf('-') < 0 ? t : t.replace(_n, (t) => t[1].toUpperCase()));
    }
    function gn(t) {
      return pn[t] || (pn[t] = t.replace(fn, '-$1').toLowerCase());
    }
    /**
@license
Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/ let yn = 0,
      bn = 0,
      vn = [],
      wn = 0,
      Cn = document.createTextNode('');
    new window.MutationObserver(function() {
      const t = vn.length;
      for (let e = 0; e < t; e++) {
        let t = vn[e];
        if (t)
          try {
            t();
          } catch (t) {
            setTimeout(() => {
              throw t;
            });
          }
      }
      vn.splice(0, t), (bn += t);
    }).observe(Cn, { characterData: !0 });
    const Sn = {
        after: (t) => ({
          run: (e) => window.setTimeout(e, t),
          cancel(t) {
            window.clearTimeout(t);
          }
        }),
        run: (t, e) => window.setTimeout(t, e),
        cancel(t) {
          window.clearTimeout(t);
        }
      },
      xn = {
        run: (t) => ((Cn.textContent = wn++), vn.push(t), yn++),
        cancel(t) {
          const e = t - bn;
          if (e >= 0) {
            if (!vn[e]) throw new Error('invalid async handle: ' + t);
            vn[e] = null;
          }
        }
      },
      kn = xn,
      En = He((t) => {
        return class extends t {
          static createProperties(t) {
            const e = this.prototype;
            for (let n in t) n in e || e._createPropertyAccessor(n);
          }
          static attributeNameForProperty(t) {
            return t.toLowerCase();
          }
          static typeForProperty(t) {}
          _createPropertyAccessor(t, e) {
            this._addPropertyToAttributeMap(t),
              this.hasOwnProperty('__dataHasAccessor') ||
                (this.__dataHasAccessor = Object.assign({}, this.__dataHasAccessor)),
              this.__dataHasAccessor[t] || ((this.__dataHasAccessor[t] = !0), this._definePropertyAccessor(t, e));
          }
          _addPropertyToAttributeMap(t) {
            if (
              (this.hasOwnProperty('__dataAttributes') ||
                (this.__dataAttributes = Object.assign({}, this.__dataAttributes)),
              !this.__dataAttributes[t])
            ) {
              const e = this.constructor.attributeNameForProperty(t);
              this.__dataAttributes[e] = t;
            }
          }
          _definePropertyAccessor(t, e) {
            Object.defineProperty(this, t, {
              get() {
                return this._getProperty(t);
              },
              set: e
                ? function() {}
                : function(e) {
                    this._setProperty(t, e);
                  }
            });
          }
          constructor() {
            super(),
              (this.__dataEnabled = !1),
              (this.__dataReady = !1),
              (this.__dataInvalid = !1),
              (this.__data = {}),
              (this.__dataPending = null),
              (this.__dataOld = null),
              (this.__dataInstanceProps = null),
              (this.__serializing = !1),
              this._initializeProperties();
          }
          ready() {
            (this.__dataReady = !0), this._flushProperties();
          }
          _initializeProperties() {
            for (let t in this.__dataHasAccessor)
              this.hasOwnProperty(t) &&
                ((this.__dataInstanceProps = this.__dataInstanceProps || {}),
                (this.__dataInstanceProps[t] = this[t]),
                delete this[t]);
          }
          _initializeInstanceProperties(t) {
            Object.assign(this, t);
          }
          _setProperty(t, e) {
            this._setPendingProperty(t, e) && this._invalidateProperties();
          }
          _getProperty(t) {
            return this.__data[t];
          }
          _setPendingProperty(t, e, n) {
            let i = this.__data[t],
              s = this._shouldPropertyChange(t, e, i);
            return (
              s &&
                (this.__dataPending || ((this.__dataPending = {}), (this.__dataOld = {})),
                !this.__dataOld || t in this.__dataOld || (this.__dataOld[t] = i),
                (this.__data[t] = e),
                (this.__dataPending[t] = e)),
              s
            );
          }
          _invalidateProperties() {
            !this.__dataInvalid &&
              this.__dataReady &&
              ((this.__dataInvalid = !0),
              kn.run(() => {
                this.__dataInvalid && ((this.__dataInvalid = !1), this._flushProperties());
              }));
          }
          _enableProperties() {
            this.__dataEnabled ||
              ((this.__dataEnabled = !0),
              this.__dataInstanceProps &&
                (this._initializeInstanceProperties(this.__dataInstanceProps), (this.__dataInstanceProps = null)),
              this.ready());
          }
          _flushProperties() {
            const t = this.__data,
              e = this.__dataPending,
              n = this.__dataOld;
            this._shouldPropertiesChange(t, e, n) &&
              ((this.__dataPending = null), (this.__dataOld = null), this._propertiesChanged(t, e, n));
          }
          _shouldPropertiesChange(t, e, n) {
            return Boolean(e);
          }
          _propertiesChanged(t, e, n) {}
          _shouldPropertyChange(t, e, n) {
            return n !== e && (n == n || e == e);
          }
          attributeChangedCallback(t, e, n, i) {
            e !== n && this._attributeToProperty(t, n),
              super.attributeChangedCallback && super.attributeChangedCallback(t, e, n, i);
          }
          _attributeToProperty(t, e, n) {
            if (!this.__serializing) {
              const i = this.__dataAttributes,
                s = (i && i[t]) || t;
              this[s] = this._deserializeValue(e, n || this.constructor.typeForProperty(s));
            }
          }
          _propertyToAttribute(t, e, n) {
            (this.__serializing = !0),
              (n = arguments.length < 3 ? this[t] : n),
              this._valueToNodeAttribute(this, n, e || this.constructor.attributeNameForProperty(t)),
              (this.__serializing = !1);
          }
          _valueToNodeAttribute(t, e, n) {
            const i = this._serializeValue(e);
            ('class' !== n && 'name' !== n && 'slot' !== n) || (t = nn(t)),
              void 0 === i ? t.removeAttribute(n) : t.setAttribute(n, i);
          }
          _serializeValue(t) {
            switch (typeof t) {
              case 'boolean':
                return t ? '' : void 0;
              default:
                return null != t ? t.toString() : void 0;
            }
          }
          _deserializeValue(t, e) {
            switch (e) {
              case Boolean:
                return null !== t;
              case Number:
                return Number(t);
              default:
                return t;
            }
          }
        };
      }),
      Pn = {};
    let Tn = HTMLElement.prototype;
    for (; Tn; ) {
      let t = Object.getOwnPropertyNames(Tn);
      for (let e = 0; e < t.length; e++) Pn[t[e]] = !0;
      Tn = Object.getPrototypeOf(Tn);
    }
    const An = He((t) => {
        const e = En(t);
        return class extends e {
          static createPropertiesForAttributes() {
            let t = this.observedAttributes;
            for (let e = 0; e < t.length; e++) this.prototype._createPropertyAccessor(mn(t[e]));
          }
          static attributeNameForProperty(t) {
            return gn(t);
          }
          _initializeProperties() {
            this.__dataProto && (this._initializeProtoProperties(this.__dataProto), (this.__dataProto = null)),
              super._initializeProperties();
          }
          _initializeProtoProperties(t) {
            for (let e in t) this._setProperty(e, t[e]);
          }
          _ensureAttribute(t, e) {
            const n = this;
            n.hasAttribute(t) || this._valueToNodeAttribute(n, e, t);
          }
          _serializeValue(t) {
            switch (typeof t) {
              case 'object':
                if (t instanceof Date) return t.toString();
                if (t)
                  try {
                    return JSON.stringify(t);
                  } catch (t) {
                    return '';
                  }
              default:
                return super._serializeValue(t);
            }
          }
          _deserializeValue(t, e) {
            let n;
            switch (e) {
              case Object:
                try {
                  n = JSON.parse(t);
                } catch (e) {
                  n = t;
                }
                break;
              case Array:
                try {
                  n = JSON.parse(t);
                } catch (e) {
                  (n = null), console.warn(`Polymer::Attributes: couldn't decode Array as JSON: ${t}`);
                }
                break;
              case Date:
                (n = isNaN(t) ? String(t) : Number(t)), (n = new Date(n));
                break;
              default:
                n = super._deserializeValue(t, e);
            }
            return n;
          }
          _definePropertyAccessor(t, e) {
            !(function(t, e) {
              if (!Pn[e]) {
                let n = t[e];
                void 0 !== n &&
                  (t.__data
                    ? t._setPendingProperty(e, n)
                    : (t.__dataProto
                        ? t.hasOwnProperty(JSCompiler_renameProperty('__dataProto', t)) ||
                          (t.__dataProto = Object.create(t.__dataProto))
                        : (t.__dataProto = {}),
                      (t.__dataProto[e] = n)));
              }
            })(this, t),
              super._definePropertyAccessor(t, e);
          }
          _hasAccessor(t) {
            return this.__dataHasAccessor && this.__dataHasAccessor[t];
          }
          _isPropertyPending(t) {
            return Boolean(this.__dataPending && t in this.__dataPending);
          }
        };
      }),
      On = { 'dom-if': !0, 'dom-repeat': !0 };
    /**
@license
Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/ function Nn(
      t
    ) {
      let e = t.getAttribute('is');
      if (e && On[e]) {
        let n = t;
        for (
          n.removeAttribute('is'),
            t = n.ownerDocument.createElement(e),
            n.parentNode.replaceChild(t, n),
            t.appendChild(n);
          n.attributes.length;

        )
          t.setAttribute(n.attributes[0].name, n.attributes[0].value), n.removeAttribute(n.attributes[0].name);
      }
      return t;
    }
    function In(t, e) {
      let n = e.parentInfo && In(t, e.parentInfo);
      if (!n) return t;
      for (let t = n.firstChild, i = 0; t; t = t.nextSibling) if (e.parentIndex === i++) return t;
    }
    function Rn(t, e, n, i) {
      i.id && (e[i.id] = n);
    }
    function zn(t, e, n) {
      if (n.events && n.events.length)
        for (let i, s = 0, o = n.events; s < o.length && (i = o[s]); s++)
          t._addMethodEventListenerToNode(e, i.name, i.value, t);
    }
    function Ln(t, e, n) {
      n.templateInfo && (e._templateInfo = n.templateInfo);
    }
    const Mn = He((t) => {
      return class extends t {
        static _parseTemplate(t, e) {
          if (!t._templateInfo) {
            let n = (t._templateInfo = {});
            (n.nodeInfoList = []),
              (n.stripWhiteSpace = (e && e.stripWhiteSpace) || t.hasAttribute('strip-whitespace')),
              this._parseTemplateContent(t, n, { parent: null });
          }
          return t._templateInfo;
        }
        static _parseTemplateContent(t, e, n) {
          return this._parseTemplateNode(t.content, e, n);
        }
        static _parseTemplateNode(t, e, n) {
          let i = !1,
            s = t;
          return (
            'template' != s.localName || s.hasAttribute('preserve-content')
              ? 'slot' === s.localName && (e.hasInsertionPoint = !0)
              : (i = this._parseTemplateNestedTemplate(s, e, n) || i),
            s.firstChild && this._parseTemplateChildNodes(s, e, n),
            s.hasAttributes && s.hasAttributes() && (i = this._parseTemplateNodeAttributes(s, e, n) || i),
            i
          );
        }
        static _parseTemplateChildNodes(t, e, n) {
          if ('script' !== t.localName && 'style' !== t.localName)
            for (let i, s = t.firstChild, o = 0; s; s = i) {
              if (('template' == s.localName && (s = Nn(s)), (i = s.nextSibling), s.nodeType === Node.TEXT_NODE)) {
                let n = i;
                for (; n && n.nodeType === Node.TEXT_NODE; )
                  (s.textContent += n.textContent), (i = n.nextSibling), t.removeChild(n), (n = i);
                if (e.stripWhiteSpace && !s.textContent.trim()) {
                  t.removeChild(s);
                  continue;
                }
              }
              let r = { parentIndex: o, parentInfo: n };
              this._parseTemplateNode(s, e, r) && (r.infoIndex = e.nodeInfoList.push(r) - 1), s.parentNode && o++;
            }
        }
        static _parseTemplateNestedTemplate(t, e, n) {
          let i = t,
            s = this._parseTemplate(i, e);
          return (
            (s.content = i.content.ownerDocument.createDocumentFragment()).appendChild(i.content),
            (n.templateInfo = s),
            !0
          );
        }
        static _parseTemplateNodeAttributes(t, e, n) {
          let i = !1,
            s = Array.from(t.attributes);
          for (let o, r = s.length - 1; (o = s[r]); r--)
            i = this._parseTemplateNodeAttribute(t, e, n, o.name, o.value) || i;
          return i;
        }
        static _parseTemplateNodeAttribute(t, e, n, i, s) {
          return 'on-' === i.slice(0, 3)
            ? (t.removeAttribute(i), (n.events = n.events || []), n.events.push({ name: i.slice(3), value: s }), !0)
            : 'id' === i && ((n.id = s), !0);
        }
        static _contentForTemplate(t) {
          let e = t._templateInfo;
          return (e && e.content) || t.content;
        }
        _stampTemplate(t) {
          t &&
            !t.content &&
            window.HTMLTemplateElement &&
            HTMLTemplateElement.decorate &&
            HTMLTemplateElement.decorate(t);
          let e = this.constructor._parseTemplate(t),
            n = e.nodeInfoList,
            i = e.content || t.content,
            s = document.importNode(i, !0);
          s.__noInsertionPoint = !e.hasInsertionPoint;
          let o = (s.nodeList = new Array(n.length));
          s.$ = {};
          for (let t, e = 0, i = n.length; e < i && (t = n[e]); e++) {
            let n = (o[e] = In(s, t));
            Rn(0, s.$, n, t), Ln(0, n, t), zn(this, n, t);
          }
          return (s = s);
        }
        _addMethodEventListenerToNode(t, e, n, i) {
          let s = (function(t, e, n) {
            return (
              (t = t._methodHost || t),
              function(e) {
                t[n] ? t[n](e, e.detail) : console.warn('listener method `' + n + '` not defined');
              }
            );
          })((i = i || t), 0, n);
          return this._addEventListenerToNode(t, e, s), s;
        }
        _addEventListenerToNode(t, e, n) {
          t.addEventListener(e, n);
        }
        _removeEventListenerFromNode(t, e, n) {
          t.removeEventListener(e, n);
        }
      };
    });
    /**
     * @fileoverview
     * @suppress {checkPrototypalTypes}
     * @license Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
     * This code may only be used under the BSD style license found at
     * http://polymer.github.io/LICENSE.txt The complete set of authors may be found
     * at http://polymer.github.io/AUTHORS.txt The complete set of contributors may
     * be found at http://polymer.github.io/CONTRIBUTORS.txt Code distributed by
     * Google as part of the polymer project is also subject to an additional IP
     * rights grant found at http://polymer.github.io/PATENTS.txt
     */ let Fn = 0;
    const Dn = {
        COMPUTE: '__computeEffects',
        REFLECT: '__reflectEffects',
        NOTIFY: '__notifyEffects',
        PROPAGATE: '__propagateEffects',
        OBSERVE: '__observeEffects',
        READ_ONLY: '__readOnly'
      },
      Hn = /[A-Z]/;
    function Bn(t, e) {
      let n = t[e];
      if (n) {
        if (!t.hasOwnProperty(e)) {
          n = t[e] = Object.create(t[e]);
          for (let t in n) {
            let e = n[t],
              i = (n[t] = Array(e.length));
            for (let t = 0; t < e.length; t++) i[t] = e[t];
          }
        }
      } else n = t[e] = {};
      return n;
    }
    function Un(t, e, n, i, s, o) {
      if (e) {
        let r = !1,
          a = Fn++;
        for (let l in n) $n(t, e, a, l, n, i, s, o) && (r = !0);
        return r;
      }
      return !1;
    }
    function $n(t, e, n, i, s, o, r, a) {
      let l = !1,
        c = e[r ? on(i) : i];
      if (c)
        for (let e, h = 0, d = c.length; h < d && (e = c[h]); h++)
          (e.info && e.info.lastRun === n) ||
            (r && !qn(i, e.trigger)) ||
            (e.info && (e.info.lastRun = n), e.fn(t, i, s, o, e.info, r, a), (l = !0));
      return l;
    }
    function qn(t, e) {
      if (e) {
        let n = e.name;
        return n == t || !(!e.structured || !rn(n, t)) || !(!e.wildcard || !an(n, t));
      }
      return !0;
    }
    function jn(t, e, n, i, s) {
      let o = 'string' == typeof s.method ? t[s.method] : s.method,
        r = s.property;
      o ? o.call(t, t.__data[r], i[r]) : s.dynamicFn || console.warn('observer method `' + s.method + '` not defined');
    }
    function Vn(t, e, n) {
      let i = on(e);
      if (i !== e) {
        return Kn(t, gn(i) + '-changed', n[e], e), !0;
      }
      return !1;
    }
    function Kn(t, e, n, i) {
      let s = { value: n, queueProperty: !0 };
      i && (s.path = i), nn(t).dispatchEvent(new CustomEvent(e, { detail: s }));
    }
    function Yn(t, e, n, i, s, o) {
      let r = (o ? on(e) : e) != e ? e : null,
        a = r ? dn(t, r) : t.__data[e];
      r && void 0 === a && (a = n[e]), Kn(t, s.eventName, a, r);
    }
    function Wn(t, e, n, i, s) {
      let o = t.__data[e];
      Oe && (o = Oe(o, s.attrName, 'attribute', t)), t._propertyToAttribute(e, s.attrName, o);
    }
    function Jn(t, e, n, i, s) {
      let o = ni(t, e, n, i, s),
        r = s.methodInfo;
      t.__dataHasAccessor && t.__dataHasAccessor[r] ? t._setPendingProperty(r, o, !0) : (t[r] = o);
    }
    function Xn(t, e, n, i, s, o, r) {
      n.bindings = n.bindings || [];
      let a = { kind: i, target: s, parts: o, literal: r, isCompound: 1 !== o.length };
      if (
        (n.bindings.push(a),
        (function(t) {
          return (
            Boolean(t.target) && 'attribute' != t.kind && 'text' != t.kind && !t.isCompound && '{' === t.parts[0].mode
          );
        })(a))
      ) {
        let { event: t, negate: e } = a.parts[0];
        (a.listenerEvent = t || gn(s) + '-changed'), (a.listenerNegate = e);
      }
      let l = e.nodeInfoList.length;
      for (let n = 0; n < a.parts.length; n++) {
        let i = a.parts[n];
        (i.compoundIndex = n), Zn(t, e, a, i, l);
      }
    }
    function Zn(t, e, n, i, s) {
      if (!i.literal)
        if ('attribute' === n.kind && '-' === n.target[0])
          console.warn('Cannot set attribute ' + n.target + ' because "-" is not a valid attribute starting character');
        else {
          let o = i.dependencies,
            r = { index: s, binding: n, part: i, evaluator: t };
          for (let n = 0; n < o.length; n++) {
            let i = o[n];
            'string' == typeof i && ((i = ai(i)).wildcard = !0),
              t._addTemplatePropertyEffect(e, i.rootProperty, { fn: Gn, info: r, trigger: i });
          }
        }
    }
    function Gn(t, e, n, i, s, o, r) {
      let a = r[s.index],
        l = s.binding,
        c = s.part;
      if (
        o &&
        c.source &&
        e.length > c.source.length &&
        'property' == l.kind &&
        !l.isCompound &&
        a.__isPropertyEffectsClient &&
        a.__dataHasAccessor &&
        a.__dataHasAccessor[l.target]
      ) {
        let i = n[e];
        (e = ln(c.source, l.target, e)), a._setPendingPropertyOrPath(e, i, !1, !0) && t._enqueueClient(a);
      } else {
        !(function(t, e, n, i, s) {
          (s = (function(t, e, n, i) {
            if (n.isCompound) {
              let s = t.__dataCompoundStorage[n.target];
              (s[i.compoundIndex] = e), (e = s.join(''));
            }
            'attribute' !== n.kind &&
              (('textContent' !== n.target &&
                ('value' !== n.target || ('input' !== t.localName && 'textarea' !== t.localName))) ||
                (e = null == e ? '' : e));
            return e;
          })(e, s, n, i)),
            Oe && (s = Oe(s, n.target, n.kind, e));
          if ('attribute' == n.kind) t._valueToNodeAttribute(e, s, n.target);
          else {
            let i = n.target;
            e.__isPropertyEffectsClient && e.__dataHasAccessor && e.__dataHasAccessor[i]
              ? (e[Dn.READ_ONLY] && e[Dn.READ_ONLY][i]) || (e._setPendingProperty(i, s) && t._enqueueClient(e))
              : t._setUnmanagedPropertyToNode(e, i, s);
          }
        })(t, a, l, c, s.evaluator._evaluateBinding(t, c, e, n, i, o));
      }
    }
    function Qn(t, e) {
      if (e.isCompound) {
        let n = t.__dataCompoundStorage || (t.__dataCompoundStorage = {}),
          i = e.parts,
          s = new Array(i.length);
        for (let t = 0; t < i.length; t++) s[t] = i[t].literal;
        let o = e.target;
        (n[o] = s), e.literal && 'property' == e.kind && ('className' === o && (t = nn(t)), (t[o] = e.literal));
      }
    }
    function ti(t, e, n) {
      if (n.listenerEvent) {
        let i = n.parts[0];
        t.addEventListener(n.listenerEvent, function(t) {
          !(function(t, e, n, i, s) {
            let o,
              r = t.detail,
              a = r && r.path;
            a ? ((i = ln(n, i, a)), (o = r && r.value)) : (o = t.currentTarget[n]),
              (o = s ? !o : o),
              (e[Dn.READ_ONLY] && e[Dn.READ_ONLY][i]) ||
                !e._setPendingPropertyOrPath(i, o, !0, Boolean(a)) ||
                (r && r.queueProperty) ||
                e._invalidateProperties();
          })(t, e, n.target, i.source, i.negate);
        });
      }
    }
    function ei(t, e, n, i, s, o) {
      o = e.static || (o && ('object' != typeof o || o[e.methodName]));
      let r = { methodName: e.methodName, args: e.args, methodInfo: s, dynamicFn: o };
      for (let s, o = 0; o < e.args.length && (s = e.args[o]); o++)
        s.literal || t._addPropertyEffect(s.rootProperty, n, { fn: i, info: r, trigger: s });
      o && t._addPropertyEffect(e.methodName, n, { fn: i, info: r });
    }
    function ni(t, e, n, i, s) {
      let o = t._methodHost || t,
        r = o[s.methodName];
      if (r) {
        let i = t._marshalArgs(s.args, e, n);
        return r.apply(o, i);
      }
      s.dynamicFn || console.warn('method `' + s.methodName + '` not defined');
    }
    const ii = [],
      si = new RegExp(
        '(\\[\\[|{{)\\s*(?:(!)\\s*)?((?:[a-zA-Z_$][\\w.:$\\-*]*)\\s*(?:\\(\\s*(?:(?:(?:((?:[a-zA-Z_$][\\w.:$\\-*]*)|(?:[-+]?[0-9]*\\.?[0-9]+(?:[eE][-+]?[0-9]+)?)|(?:(?:\'(?:[^\'\\\\]|\\\\.)*\')|(?:"(?:[^"\\\\]|\\\\.)*")))\\s*)(?:,\\s*(?:((?:[a-zA-Z_$][\\w.:$\\-*]*)|(?:[-+]?[0-9]*\\.?[0-9]+(?:[eE][-+]?[0-9]+)?)|(?:(?:\'(?:[^\'\\\\]|\\\\.)*\')|(?:"(?:[^"\\\\]|\\\\.)*")))\\s*))*)?)\\)\\s*)?)(?:]]|}})',
        'g'
      );
    function oi(t) {
      let e = '';
      for (let n = 0; n < t.length; n++) {
        e += t[n].literal || '';
      }
      return e;
    }
    function ri(t) {
      let e = t.match(/([^\s]+?)\(([\s\S]*)\)/);
      if (e) {
        let t = { methodName: e[1], static: !0, args: ii };
        if (e[2].trim()) {
          return (function(t, e) {
            return (
              (e.args = t.map(function(t) {
                let n = ai(t);
                return n.literal || (e.static = !1), n;
              }, this)),
              e
            );
          })(e[2].replace(/\\,/g, '&comma;').split(','), t);
        }
        return t;
      }
      return null;
    }
    function ai(t) {
      let e = t
          .trim()
          .replace(/&comma;/g, ',')
          .replace(/\\(.)/g, '$1'),
        n = { name: e, value: '', literal: !1 },
        i = e[0];
      switch (('-' === i && (i = e[1]), i >= '0' && i <= '9' && (i = '#'), i)) {
        case "'":
        case '"':
          (n.value = e.slice(1, -1)), (n.literal = !0);
          break;
        case '#':
          (n.value = Number(e)), (n.literal = !0);
      }
      return (
        n.literal ||
          ((n.rootProperty = on(e)),
          (n.structured = sn(e)),
          n.structured && ((n.wildcard = '.*' == e.slice(-2)), n.wildcard && (n.name = e.slice(0, -2)))),
        n
      );
    }
    function li(t, e, n) {
      let i = dn(t, n);
      return void 0 === i && (i = e[n]), i;
    }
    function ci(t, e, n, i) {
      t.notifyPath(n + '.splices', { indexSplices: i }), t.notifyPath(n + '.length', e.length);
    }
    function hi(t, e, n, i, s, o) {
      ci(t, e, n, [{ index: i, addedCount: s, removed: o, object: e, type: 'splice' }]);
    }
    const di = He((t) => {
      const e = Mn(An(t));
      return class extends e {
        constructor() {
          super(),
            (this.__isPropertyEffectsClient = !0),
            (this.__dataCounter = 0),
            this.__dataClientsReady,
            this.__dataPendingClients,
            this.__dataToNotify,
            this.__dataLinkedPaths,
            this.__dataHasPaths,
            this.__dataCompoundStorage,
            this.__dataHost,
            this.__dataTemp,
            this.__dataClientsInitialized,
            this.__data,
            this.__dataPending,
            this.__dataOld,
            this.__computeEffects,
            this.__reflectEffects,
            this.__notifyEffects,
            this.__propagateEffects,
            this.__observeEffects,
            this.__readOnly,
            this.__templateInfo;
        }
        get PROPERTY_EFFECT_TYPES() {
          return Dn;
        }
        _initializeProperties() {
          super._initializeProperties(),
            ui.registerHost(this),
            (this.__dataClientsReady = !1),
            (this.__dataPendingClients = null),
            (this.__dataToNotify = null),
            (this.__dataLinkedPaths = null),
            (this.__dataHasPaths = !1),
            (this.__dataCompoundStorage = this.__dataCompoundStorage || null),
            (this.__dataHost = this.__dataHost || null),
            (this.__dataTemp = {}),
            (this.__dataClientsInitialized = !1);
        }
        _initializeProtoProperties(t) {
          (this.__data = Object.create(t)), (this.__dataPending = Object.create(t)), (this.__dataOld = {});
        }
        _initializeInstanceProperties(t) {
          let e = this[Dn.READ_ONLY];
          for (let n in t)
            (e && e[n]) ||
              ((this.__dataPending = this.__dataPending || {}),
              (this.__dataOld = this.__dataOld || {}),
              (this.__data[n] = this.__dataPending[n] = t[n]));
        }
        _addPropertyEffect(t, e, n) {
          this._createPropertyAccessor(t, e == Dn.READ_ONLY);
          let i = Bn(this, e)[t];
          i || (i = this[e][t] = []), i.push(n);
        }
        _removePropertyEffect(t, e, n) {
          let i = Bn(this, e)[t],
            s = i.indexOf(n);
          s >= 0 && i.splice(s, 1);
        }
        _hasPropertyEffect(t, e) {
          let n = this[e];
          return Boolean(n && n[t]);
        }
        _hasReadOnlyEffect(t) {
          return this._hasPropertyEffect(t, Dn.READ_ONLY);
        }
        _hasNotifyEffect(t) {
          return this._hasPropertyEffect(t, Dn.NOTIFY);
        }
        _hasReflectEffect(t) {
          return this._hasPropertyEffect(t, Dn.REFLECT);
        }
        _hasComputedEffect(t) {
          return this._hasPropertyEffect(t, Dn.COMPUTE);
        }
        _setPendingPropertyOrPath(t, e, n, i) {
          if (i || on(Array.isArray(t) ? t[0] : t) !== t) {
            if (!i) {
              let n = dn(this, t);
              if (!(t = un(this, t, e)) || !super._shouldPropertyChange(t, e, n)) return !1;
            }
            if (((this.__dataHasPaths = !0), this._setPendingProperty(t, e, n)))
              return (
                (function(t, e, n) {
                  let i = t.__dataLinkedPaths;
                  if (i) {
                    let s;
                    for (let o in i) {
                      let r = i[o];
                      an(o, e)
                        ? ((s = ln(o, r, e)), t._setPendingPropertyOrPath(s, n, !0, !0))
                        : an(r, e) && ((s = ln(r, o, e)), t._setPendingPropertyOrPath(s, n, !0, !0));
                    }
                  }
                })(this, t, e),
                !0
              );
          } else {
            if (this.__dataHasAccessor && this.__dataHasAccessor[t]) return this._setPendingProperty(t, e, n);
            this[t] = e;
          }
          return !1;
        }
        _setUnmanagedPropertyToNode(t, e, n) {
          (n === t[e] && 'object' != typeof n) || ('className' === e && (t = nn(t)), (t[e] = n));
        }
        _setPendingProperty(t, e, n) {
          let i = this.__dataHasPaths && sn(t),
            s = i ? this.__dataTemp : this.__data;
          return (
            !!this._shouldPropertyChange(t, e, s[t]) &&
            (this.__dataPending || ((this.__dataPending = {}), (this.__dataOld = {})),
            t in this.__dataOld || (this.__dataOld[t] = this.__data[t]),
            i ? (this.__dataTemp[t] = e) : (this.__data[t] = e),
            (this.__dataPending[t] = e),
            (i || (this[Dn.NOTIFY] && this[Dn.NOTIFY][t])) &&
              ((this.__dataToNotify = this.__dataToNotify || {}), (this.__dataToNotify[t] = n)),
            !0)
          );
        }
        _setProperty(t, e) {
          this._setPendingProperty(t, e, !0) && this._invalidateProperties();
        }
        _invalidateProperties() {
          this.__dataReady && this._flushProperties();
        }
        _enqueueClient(t) {
          (this.__dataPendingClients = this.__dataPendingClients || []),
            t !== this && this.__dataPendingClients.push(t);
        }
        _flushProperties() {
          this.__dataCounter++, super._flushProperties(), this.__dataCounter--;
        }
        _flushClients() {
          this.__dataClientsReady
            ? this.__enableOrFlushClients()
            : ((this.__dataClientsReady = !0), this._readyClients(), (this.__dataReady = !0));
        }
        __enableOrFlushClients() {
          let t = this.__dataPendingClients;
          if (t) {
            this.__dataPendingClients = null;
            for (let e = 0; e < t.length; e++) {
              let n = t[e];
              n.__dataEnabled ? n.__dataPending && n._flushProperties() : n._enableProperties();
            }
          }
        }
        _readyClients() {
          this.__enableOrFlushClients();
        }
        setProperties(t, e) {
          for (let n in t)
            (!e && this[Dn.READ_ONLY] && this[Dn.READ_ONLY][n]) || this._setPendingPropertyOrPath(n, t[n], !0);
          this._invalidateProperties();
        }
        ready() {
          this._flushProperties(),
            this.__dataClientsReady || this._flushClients(),
            this.__dataPending && this._flushProperties();
        }
        _propertiesChanged(t, e, n) {
          let i = this.__dataHasPaths;
          (this.__dataHasPaths = !1),
            (function(t, e, n, i) {
              let s = t[Dn.COMPUTE];
              if (s) {
                let o = e;
                for (; Un(t, s, o, n, i); )
                  Object.assign(n, t.__dataOld),
                    Object.assign(e, t.__dataPending),
                    (o = t.__dataPending),
                    (t.__dataPending = null);
              }
            })(this, e, n, i);
          let s = this.__dataToNotify;
          (this.__dataToNotify = null),
            this._propagatePropertyChanges(e, n, i),
            this._flushClients(),
            Un(this, this[Dn.REFLECT], e, n, i),
            Un(this, this[Dn.OBSERVE], e, n, i),
            s &&
              (function(t, e, n, i, s) {
                let o,
                  r,
                  a = t[Dn.NOTIFY],
                  l = Fn++;
                for (let r in e) e[r] && (a && $n(t, a, l, r, n, i, s) ? (o = !0) : s && Vn(t, r, n) && (o = !0));
                o && (r = t.__dataHost) && r._invalidateProperties && r._invalidateProperties();
              })(this, s, e, n, i),
            1 == this.__dataCounter && (this.__dataTemp = {});
        }
        _propagatePropertyChanges(t, e, n) {
          this[Dn.PROPAGATE] && Un(this, this[Dn.PROPAGATE], t, e, n);
          let i = this.__templateInfo;
          for (; i; ) Un(this, i.propertyEffects, t, e, n, i.nodeList), (i = i.nextTemplateInfo);
        }
        linkPaths(t, e) {
          (t = cn(t)),
            (e = cn(e)),
            (this.__dataLinkedPaths = this.__dataLinkedPaths || {}),
            (this.__dataLinkedPaths[t] = e);
        }
        unlinkPaths(t) {
          (t = cn(t)), this.__dataLinkedPaths && delete this.__dataLinkedPaths[t];
        }
        notifySplices(t, e) {
          let n = { path: '' };
          ci(this, dn(this, t, n), n.path, e);
        }
        get(t, e) {
          return dn(e || this, t);
        }
        set(t, e, n) {
          n
            ? un(n, t, e)
            : (this[Dn.READ_ONLY] && this[Dn.READ_ONLY][t]) ||
              (this._setPendingPropertyOrPath(t, e, !0) && this._invalidateProperties());
        }
        push(t, ...e) {
          let n = { path: '' },
            i = dn(this, t, n),
            s = i.length,
            o = i.push(...e);
          return e.length && hi(this, i, n.path, s, e.length, []), o;
        }
        pop(t) {
          let e = { path: '' },
            n = dn(this, t, e),
            i = Boolean(n.length),
            s = n.pop();
          return i && hi(this, n, e.path, n.length, 0, [s]), s;
        }
        splice(t, e, n, ...i) {
          let s,
            o = { path: '' },
            r = dn(this, t, o);
          return (
            e < 0 ? (e = r.length - Math.floor(-e)) : e && (e = Math.floor(e)),
            (s = 2 === arguments.length ? r.splice(e) : r.splice(e, n, ...i)),
            (i.length || s.length) && hi(this, r, o.path, e, i.length, s),
            s
          );
        }
        shift(t) {
          let e = { path: '' },
            n = dn(this, t, e),
            i = Boolean(n.length),
            s = n.shift();
          return i && hi(this, n, e.path, 0, 0, [s]), s;
        }
        unshift(t, ...e) {
          let n = { path: '' },
            i = dn(this, t, n),
            s = i.unshift(...e);
          return e.length && hi(this, i, n.path, 0, e.length, []), s;
        }
        notifyPath(t, e) {
          let n;
          if (1 == arguments.length) {
            let i = { path: '' };
            (e = dn(this, t, i)), (n = i.path);
          } else n = Array.isArray(t) ? cn(t) : t;
          this._setPendingPropertyOrPath(n, e, !0, !0) && this._invalidateProperties();
        }
        _createReadOnlyProperty(t, e) {
          var n;
          this._addPropertyEffect(t, Dn.READ_ONLY),
            e &&
              (this['_set' + ((n = t), n[0].toUpperCase() + n.substring(1))] = function(e) {
                this._setProperty(t, e);
              });
        }
        _createPropertyObserver(t, e, n) {
          let i = { property: t, method: e, dynamicFn: Boolean(n) };
          this._addPropertyEffect(t, Dn.OBSERVE, { fn: jn, info: i, trigger: { name: t } }),
            n && this._addPropertyEffect(e, Dn.OBSERVE, { fn: jn, info: i, trigger: { name: e } });
        }
        _createMethodObserver(t, e) {
          let n = ri(t);
          if (!n) throw new Error("Malformed observer expression '" + t + "'");
          ei(this, n, Dn.OBSERVE, ni, null, e);
        }
        _createNotifyingProperty(t) {
          this._addPropertyEffect(t, Dn.NOTIFY, { fn: Yn, info: { eventName: gn(t) + '-changed', property: t } });
        }
        _createReflectedProperty(t) {
          let e = this.constructor.attributeNameForProperty(t);
          '-' === e[0]
            ? console.warn(
                'Property ' +
                  t +
                  ' cannot be reflected to attribute ' +
                  e +
                  ' because "-" is not a valid starting attribute name. Use a lowercase first letter for the property instead.'
              )
            : this._addPropertyEffect(t, Dn.REFLECT, { fn: Wn, info: { attrName: e } });
        }
        _createComputedProperty(t, e, n) {
          let i = ri(e);
          if (!i) throw new Error("Malformed computed expression '" + e + "'");
          ei(this, i, Dn.COMPUTE, Jn, t, n);
        }
        _marshalArgs(t, e, n) {
          const i = this.__data,
            s = [];
          for (let o = 0, r = t.length; o < r; o++) {
            let { name: r, structured: a, wildcard: l, value: c, literal: h } = t[o];
            if (!h)
              if (l) {
                const t = an(r, e),
                  s = li(i, n, t ? e : r);
                c = { path: t ? e : r, value: s, base: t ? dn(i, r) : s };
              } else c = a ? li(i, n, r) : i[r];
            s[o] = c;
          }
          return s;
        }
        static addPropertyEffect(t, e, n) {
          this.prototype._addPropertyEffect(t, e, n);
        }
        static createPropertyObserver(t, e, n) {
          this.prototype._createPropertyObserver(t, e, n);
        }
        static createMethodObserver(t, e) {
          this.prototype._createMethodObserver(t, e);
        }
        static createNotifyingProperty(t) {
          this.prototype._createNotifyingProperty(t);
        }
        static createReadOnlyProperty(t, e) {
          this.prototype._createReadOnlyProperty(t, e);
        }
        static createReflectedProperty(t) {
          this.prototype._createReflectedProperty(t);
        }
        static createComputedProperty(t, e, n) {
          this.prototype._createComputedProperty(t, e, n);
        }
        static bindTemplate(t) {
          return this.prototype._bindTemplate(t);
        }
        _bindTemplate(t, e) {
          let n = this.constructor._parseTemplate(t),
            i = this.__templateInfo == n;
          if (!i) for (let t in n.propertyEffects) this._createPropertyAccessor(t);
          if (e && (((n = Object.create(n)).wasPreBound = i), !i && this.__templateInfo)) {
            let t = this.__templateInfoLast || this.__templateInfo;
            return (this.__templateInfoLast = t.nextTemplateInfo = n), (n.previousTemplateInfo = t), n;
          }
          return (this.__templateInfo = n);
        }
        static _addTemplatePropertyEffect(t, e, n) {
          (t.hostProps = t.hostProps || {})[e] = !0;
          let i = (t.propertyEffects = t.propertyEffects || {});
          (i[e] = i[e] || []).push(n);
        }
        _stampTemplate(t) {
          ui.beginHosting(this);
          let e = super._stampTemplate(t);
          ui.endHosting(this);
          let n = this._bindTemplate(t, !0);
          if (((n.nodeList = e.nodeList), !n.wasPreBound)) {
            let t = (n.childNodes = []);
            for (let n = e.firstChild; n; n = n.nextSibling) t.push(n);
          }
          return (
            (e.templateInfo = n),
            (function(t, e) {
              let { nodeList: n, nodeInfoList: i } = e;
              if (i.length)
                for (let e = 0; e < i.length; e++) {
                  let s = i[e],
                    o = n[e],
                    r = s.bindings;
                  if (r)
                    for (let e = 0; e < r.length; e++) {
                      let n = r[e];
                      Qn(o, n), ti(o, t, n);
                    }
                  o.__dataHost = t;
                }
            })(this, n),
            this.__dataReady && Un(this, n.propertyEffects, this.__data, null, !1, n.nodeList),
            e
          );
        }
        _removeBoundDom(t) {
          let e = t.templateInfo;
          e.previousTemplateInfo && (e.previousTemplateInfo.nextTemplateInfo = e.nextTemplateInfo),
            e.nextTemplateInfo && (e.nextTemplateInfo.previousTemplateInfo = e.previousTemplateInfo),
            this.__templateInfoLast == e && (this.__templateInfoLast = e.previousTemplateInfo),
            (e.previousTemplateInfo = e.nextTemplateInfo = null);
          let n = e.childNodes;
          for (let t = 0; t < n.length; t++) {
            let e = n[t];
            e.parentNode.removeChild(e);
          }
        }
        static _parseTemplateNode(t, n, i) {
          let s = e._parseTemplateNode.call(this, t, n, i);
          if (t.nodeType === Node.TEXT_NODE) {
            let e = this._parseBindings(t.textContent, n);
            e && ((t.textContent = oi(e) || ' '), Xn(this, n, i, 'text', 'textContent', e), (s = !0));
          }
          return s;
        }
        static _parseTemplateNodeAttribute(t, n, i, s, o) {
          let r = this._parseBindings(o, n);
          if (r) {
            let e = s,
              o = 'property';
            Hn.test(s) ? (o = 'attribute') : '$' == s[s.length - 1] && ((s = s.slice(0, -1)), (o = 'attribute'));
            let a = oi(r);
            return (
              a &&
                'attribute' == o &&
                ('class' == s && t.hasAttribute('class') && (a += ' ' + t.getAttribute(s)), t.setAttribute(s, a)),
              'input' === t.localName && 'value' === e && t.setAttribute(e, ''),
              t.removeAttribute(e),
              'property' === o && (s = mn(s)),
              Xn(this, n, i, o, s, r, a),
              !0
            );
          }
          return e._parseTemplateNodeAttribute.call(this, t, n, i, s, o);
        }
        static _parseTemplateNestedTemplate(t, n, i) {
          let s = e._parseTemplateNestedTemplate.call(this, t, n, i),
            o = i.templateInfo.hostProps;
          for (let t in o) {
            Xn(this, n, i, 'property', '_host_' + t, [{ mode: '{', source: t, dependencies: [t] }]);
          }
          return s;
        }
        static _parseBindings(t, e) {
          let n,
            i = [],
            s = 0;
          for (; null !== (n = si.exec(t)); ) {
            n.index > s && i.push({ literal: t.slice(s, n.index) });
            let o = n[1][0],
              r = Boolean(n[2]),
              a = n[3].trim(),
              l = !1,
              c = '',
              h = -1;
            '{' == o && (h = a.indexOf('::')) > 0 && ((c = a.substring(h + 2)), (a = a.substring(0, h)), (l = !0));
            let d = ri(a),
              u = [];
            if (d) {
              let { args: t, methodName: n } = d;
              for (let e = 0; e < t.length; e++) {
                let n = t[e];
                n.literal || u.push(n);
              }
              let i = e.dynamicFns;
              ((i && i[n]) || d.static) && (u.push(n), (d.dynamicFn = !0));
            } else u.push(a);
            i.push({ source: a, mode: o, negate: r, customEvent: l, signature: d, dependencies: u, event: c }),
              (s = si.lastIndex);
          }
          if (s && s < t.length) {
            let e = t.substring(s);
            e && i.push({ literal: e });
          }
          return i.length ? i : null;
        }
        static _evaluateBinding(t, e, n, i, s, o) {
          let r;
          return (
            (r = e.signature
              ? ni(t, n, i, 0, e.signature)
              : n != e.source
              ? dn(t, e.source)
              : o && sn(n)
              ? dn(t, n)
              : t.__data[n]),
            e.negate && (r = !r),
            r
          );
        }
      };
    });
    const ui = new (class {
      constructor() {
        this.stack = [];
      }
      registerHost(t) {
        if (this.stack.length) {
          this.stack[this.stack.length - 1]._enqueueClient(t);
        }
      }
      beginHosting(t) {
        this.stack.push(t);
      }
      endHosting(t) {
        let e = this.stack.length;
        e && this.stack[e - 1] == t && this.stack.pop();
      }
    })();
    /**
@license
Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/ const pi = [];
    const _i = He((t) => {
        const e = En(t);
        function n(t) {
          const e = Object.getPrototypeOf(t);
          return e.prototype instanceof s ? e : null;
        }
        function i(t) {
          if (!t.hasOwnProperty(JSCompiler_renameProperty('__ownProperties', t))) {
            let e = null;
            if (t.hasOwnProperty(JSCompiler_renameProperty('properties', t))) {
              const n = t.properties;
              n &&
                (e =
                  /**
@license
Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/
                  (function(t) {
                    const e = {};
                    for (let n in t) {
                      const i = t[n];
                      e[n] = 'function' == typeof i ? { type: i } : i;
                    }
                    return e;
                  })(n));
            }
            t.__ownProperties = e;
          }
          return t.__ownProperties;
        }
        class s extends e {
          static get observedAttributes() {
            if (!this.hasOwnProperty('__observedAttributes')) {
              (t = this.prototype), pi.push(t);
              const e = this._properties;
              this.__observedAttributes = e ? Object.keys(e).map((t) => this.attributeNameForProperty(t)) : [];
            }
            var t;
            return this.__observedAttributes;
          }
          static finalize() {
            if (!this.hasOwnProperty(JSCompiler_renameProperty('__finalized', this))) {
              const t = n(this);
              t && t.finalize(), (this.__finalized = !0), this._finalizeClass();
            }
          }
          static _finalizeClass() {
            const t = i(this);
            t && this.createProperties(t);
          }
          static get _properties() {
            if (!this.hasOwnProperty(JSCompiler_renameProperty('__properties', this))) {
              const t = n(this);
              this.__properties = Object.assign({}, t && t._properties, i(this));
            }
            return this.__properties;
          }
          static typeForProperty(t) {
            const e = this._properties[t];
            return e && e.type;
          }
          _initializeProperties() {
            0, this.constructor.finalize(), super._initializeProperties();
          }
          connectedCallback() {
            super.connectedCallback && super.connectedCallback(), this._enableProperties();
          }
          disconnectedCallback() {
            super.disconnectedCallback && super.disconnectedCallback();
          }
        }
        return s;
      }),
      fi = '3.3.0',
      mi = window.ShadyCSS && window.ShadyCSS.cssBuild,
      gi = He((t) => {
        const e = _i(di(t));
        function n(t, e, n, i) {
          if (!mi) {
            const s = e.content.querySelectorAll('style'),
              o = Ge(e),
              r = (function(t) {
                let e = We(t);
                return e ? Qe(e) : [];
              })(n),
              a = e.content.firstElementChild;
            for (let n = 0; n < r.length; n++) {
              let s = r[n];
              (s.textContent = t._processStyleText(s.textContent, i)), e.content.insertBefore(s, a);
            }
            let l = 0;
            for (let e = 0; e < o.length; e++) {
              let n = o[e],
                r = s[l];
              r !== n ? ((n = n.cloneNode(!0)), r.parentNode.insertBefore(n, r)) : l++,
                (n.textContent = t._processStyleText(n.textContent, i));
            }
          }
          window.ShadyCSS && window.ShadyCSS.prepareTemplate(e, n);
        }
        return class extends e {
          static get polymerElementVersion() {
            return fi;
          }
          static _finalizeClass() {
            e._finalizeClass.call(this);
            const t =
              ((n = this).hasOwnProperty(JSCompiler_renameProperty('__ownObservers', n)) ||
                (n.__ownObservers = n.hasOwnProperty(JSCompiler_renameProperty('observers', n)) ? n.observers : null),
              n.__ownObservers);
            var n;
            t && this.createObservers(t, this._properties), this._prepareTemplate();
          }
          static _prepareTemplate() {
            let t = this.template;
            t &&
              ('string' == typeof t
                ? (console.error('template getter must return HTMLTemplateElement'), (t = null))
                : ze || (t = t.cloneNode(!0))),
              (this.prototype._template = t);
          }
          static createProperties(t) {
            for (let o in t)
              (e = this.prototype),
                (n = o),
                (i = t[o]),
                (s = t),
                i.computed && (i.readOnly = !0),
                i.computed &&
                  (e._hasReadOnlyEffect(n)
                    ? console.warn(`Cannot redefine computed property '${n}'.`)
                    : e._createComputedProperty(n, i.computed, s)),
                i.readOnly && !e._hasReadOnlyEffect(n)
                  ? e._createReadOnlyProperty(n, !i.computed)
                  : !1 === i.readOnly &&
                    e._hasReadOnlyEffect(n) &&
                    console.warn(`Cannot make readOnly property '${n}' non-readOnly.`),
                i.reflectToAttribute && !e._hasReflectEffect(n)
                  ? e._createReflectedProperty(n)
                  : !1 === i.reflectToAttribute &&
                    e._hasReflectEffect(n) &&
                    console.warn(`Cannot make reflected property '${n}' non-reflected.`),
                i.notify && !e._hasNotifyEffect(n)
                  ? e._createNotifyingProperty(n)
                  : !1 === i.notify &&
                    e._hasNotifyEffect(n) &&
                    console.warn(`Cannot make notify property '${n}' non-notify.`),
                i.observer && e._createPropertyObserver(n, i.observer, s[i.observer]),
                e._addPropertyToAttributeMap(n);
            var e, n, i, s;
          }
          static createObservers(t, e) {
            const n = this.prototype;
            for (let i = 0; i < t.length; i++) n._createMethodObserver(t[i], e);
          }
          static get template() {
            return (
              this.hasOwnProperty(JSCompiler_renameProperty('_template', this)) ||
                (this._template = this.prototype.hasOwnProperty(JSCompiler_renameProperty('_template', this.prototype))
                  ? this.prototype._template
                  : (function(t) {
                      let e = null;
                      if (t && (!Ie || Re) && ((e = je.import(t, 'template')), Ie && !e))
                        throw new Error(`strictTemplatePolicy: expecting dom-module or null template for ${t}`);
                      return e;
                    })(this.is) || Object.getPrototypeOf(this.prototype).constructor.template),
              this._template
            );
          }
          static set template(t) {
            this._template = t;
          }
          static get importPath() {
            if (!this.hasOwnProperty(JSCompiler_renameProperty('_importPath', this))) {
              const t = this.importMeta;
              if (t) this._importPath = Pe(t.url);
              else {
                const t = je.import(this.is);
                this._importPath = (t && t.assetpath) || Object.getPrototypeOf(this.prototype).constructor.importPath;
              }
            }
            return this._importPath;
          }
          constructor() {
            super(), this._template, this._importPath, this.rootPath, this.importPath, this.root, this.$;
          }
          _initializeProperties() {
            this.constructor.finalize(),
              this.constructor._finalizeTemplate(this.localName),
              super._initializeProperties(),
              (this.rootPath = Ae),
              (this.importPath = this.constructor.importPath);
            let t = (function(t) {
              if (!t.hasOwnProperty(JSCompiler_renameProperty('__propertyDefaults', t))) {
                t.__propertyDefaults = null;
                let e = t._properties;
                for (let n in e) {
                  let i = e[n];
                  'value' in i && ((t.__propertyDefaults = t.__propertyDefaults || {}), (t.__propertyDefaults[n] = i));
                }
              }
              return t.__propertyDefaults;
            })(this.constructor);
            if (t)
              for (let e in t) {
                let n = t[e];
                if (!this.hasOwnProperty(e)) {
                  let t = 'function' == typeof n.value ? n.value.call(this) : n.value;
                  this._hasAccessor(e) ? this._setPendingProperty(e, t, !0) : (this[e] = t);
                }
              }
          }
          static _processStyleText(t, e) {
            return Ee(t, e);
          }
          static _finalizeTemplate(t) {
            const e = this.prototype._template;
            if (e && !e.__polymerFinalized) {
              e.__polymerFinalized = !0;
              const i = this.importPath;
              n(this, e, t, i ? ke(i) : ''), this.prototype._bindTemplate(e);
            }
          }
          connectedCallback() {
            window.ShadyCSS && this._template && window.ShadyCSS.styleElement(this), super.connectedCallback();
          }
          ready() {
            this._template && ((this.root = this._stampTemplate(this._template)), (this.$ = this.root.$)),
              super.ready();
          }
          _readyClients() {
            this._template && (this.root = this._attachDom(this.root)), super._readyClients();
          }
          _attachDom(t) {
            const e = nn(this);
            if (e.attachShadow)
              return t
                ? (e.shadowRoot ||
                    (e.attachShadow({ mode: 'open', shadyUpgradeFragment: t }), e.shadowRoot.appendChild(t)),
                  Le && window.ShadyDOM && ShadyDOM.flushInitial(e.shadowRoot),
                  e.shadowRoot)
                : null;
            throw new Error(
              'ShadowDOM not available. PolymerElement can create dom as children instead of in ShadowDOM by setting `this.root = this;` before `ready`.'
            );
          }
          updateStyles(t) {
            window.ShadyCSS && window.ShadyCSS.styleSubtree(this, t);
          }
          resolveUrl(t, e) {
            return !e && this.importPath && (e = ke(this.importPath)), ke(t, e);
          }
          static _parseTemplateContent(t, n, i) {
            return (n.dynamicFns = n.dynamicFns || this._properties), e._parseTemplateContent.call(this, t, n, i);
          }
          static _addTemplatePropertyEffect(t, n, i) {
            return (
              !ze ||
                n in this._properties ||
                console.warn(
                  `Property '${n}' used in template but not declared in 'properties'; ` +
                    'attribute will not be observed.'
                ),
              e._addTemplatePropertyEffect.call(this, t, n, i)
            );
          }
        };
      });
    /**
     * @fileoverview
     * @suppress {checkPrototypalTypes}
     * @license Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
     * This code may only be used under the BSD style license found at
     * http://polymer.github.io/LICENSE.txt The complete set of authors may be found
     * at http://polymer.github.io/AUTHORS.txt The complete set of contributors may
     * be found at http://polymer.github.io/CONTRIBUTORS.txt Code distributed by
     * Google as part of the polymer project is also subject to an additional IP
     * rights grant found at http://polymer.github.io/PATENTS.txt
     */
    /**
@license
Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/
    class yi {
      constructor() {
        (this._asyncModule = null), (this._callback = null), (this._timer = null);
      }
      setConfig(t, e) {
        (this._asyncModule = t),
          (this._callback = e),
          (this._timer = this._asyncModule.run(() => {
            (this._timer = null), bi.delete(this), this._callback();
          }));
      }
      cancel() {
        this.isActive() && (this._cancelAsync(), bi.delete(this));
      }
      _cancelAsync() {
        this.isActive() && (this._asyncModule.cancel(this._timer), (this._timer = null));
      }
      flush() {
        this.isActive() && (this.cancel(), this._callback());
      }
      isActive() {
        return null != this._timer;
      }
      static debounce(t, e, n) {
        return t instanceof yi ? t._cancelAsync() : (t = new yi()), t.setConfig(e, n), t;
      }
    }
    let bi = new Set();
    const vi = function(t) {
        bi.add(t);
      },
      wi = function() {
        const t = Boolean(bi.size);
        return (
          bi.forEach((t) => {
            try {
              t.flush();
            } catch (t) {
              setTimeout(() => {
                throw t;
              });
            }
          }),
          t
        );
      };
    /**
@license
Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/
    let Ci = 'string' == typeof document.head.style.touchAction,
      Si = '__polymerGestures',
      xi = '__polymerGesturesHandled',
      ki = '__polymerGesturesTouchAction',
      Ei = 25,
      Pi = 5,
      Ti = 2500,
      Ai = ['mousedown', 'mousemove', 'mouseup', 'click'],
      Oi = [0, 1, 4, 2],
      Ni = (function() {
        try {
          return 1 === new MouseEvent('test', { buttons: 1 }).buttons;
        } catch (t) {
          return !1;
        }
      })();
    function Ii(t) {
      return Ai.indexOf(t) > -1;
    }
    let Ri = !1;
    function zi(t) {
      if (!Ii(t) && 'touchend' !== t) return Ci && Ri && Ne ? { passive: !0 } : void 0;
    }
    !(function() {
      try {
        let t = Object.defineProperty({}, 'passive', {
          get() {
            Ri = !0;
          }
        });
        window.addEventListener('test', null, t), window.removeEventListener('test', null, t);
      } catch (t) {}
    })();
    let Li = navigator.userAgent.match(/iP(?:[oa]d|hone)|Android/);
    const Mi = [],
      Fi = { button: !0, input: !0, keygen: !0, meter: !0, output: !0, textarea: !0, progress: !0, select: !0 },
      Di = {
        button: !0,
        command: !0,
        fieldset: !0,
        input: !0,
        keygen: !0,
        optgroup: !0,
        option: !0,
        select: !0,
        textarea: !0
      };
    function Hi(t) {
      let e = Array.prototype.slice.call(t.labels || []);
      if (!e.length) {
        e = [];
        let n = t.getRootNode();
        if (t.id) {
          let i = n.querySelectorAll(`label[for = ${t.id}]`);
          for (let t = 0; t < i.length; t++) e.push(i[t]);
        }
      }
      return e;
    }
    let Bi = function(t) {
      let e = t.sourceCapabilities;
      var n;
      if ((!e || e.firesTouchEvents) && ((t[xi] = { skip: !0 }), 'click' === t.type)) {
        let e = !1,
          i = Ki(t);
        for (let t = 0; t < i.length; t++) {
          if (i[t].nodeType === Node.ELEMENT_NODE)
            if ('label' === i[t].localName) Mi.push(i[t]);
            else if (((n = i[t]), Fi[n.localName])) {
              let n = Hi(i[t]);
              for (let t = 0; t < n.length; t++) e = e || Mi.indexOf(n[t]) > -1;
            }
          if (i[t] === qi.mouse.target) return;
        }
        if (e) return;
        t.preventDefault(), t.stopPropagation();
      }
    };
    function Ui(t) {
      let e = Li ? ['click'] : Ai;
      for (let n, i = 0; i < e.length; i++)
        (n = e[i]),
          t ? ((Mi.length = 0), document.addEventListener(n, Bi, !0)) : document.removeEventListener(n, Bi, !0);
    }
    function $i(t) {
      let e = t.type;
      if (!Ii(e)) return !1;
      if ('mousemove' === e) {
        let e = void 0 === t.buttons ? 1 : t.buttons;
        return t instanceof window.MouseEvent && !Ni && (e = Oi[t.which] || 0), Boolean(1 & e);
      }
      return 0 === (void 0 === t.button ? 0 : t.button);
    }
    let qi = { mouse: { target: null, mouseIgnoreJob: null }, touch: { x: 0, y: 0, id: -1, scrollDecided: !1 } };
    function ji(t, e, n) {
      (t.movefn = e), (t.upfn = n), document.addEventListener('mousemove', e), document.addEventListener('mouseup', n);
    }
    function Vi(t) {
      document.removeEventListener('mousemove', t.movefn),
        document.removeEventListener('mouseup', t.upfn),
        (t.movefn = null),
        (t.upfn = null);
    }
    Me &&
      document.addEventListener(
        'touchend',
        function(t) {
          if (!Me) return;
          qi.mouse.mouseIgnoreJob || Ui(!0),
            (qi.mouse.target = Ki(t)[0]),
            (qi.mouse.mouseIgnoreJob = yi.debounce(qi.mouse.mouseIgnoreJob, Sn.after(Ti), function() {
              Ui(), (qi.mouse.target = null), (qi.mouse.mouseIgnoreJob = null);
            }));
        },
        !!Ri && { passive: !0 }
      );
    const Ki =
        window.ShadyDOM && window.ShadyDOM.noPatch
          ? window.ShadyDOM.composedPath
          : (t) => (t.composedPath && t.composedPath()) || [],
      Yi = {},
      Wi = [];
    function Ji(t) {
      const e = Ki(t);
      return e.length > 0 ? e[0] : t.target;
    }
    function Xi(t) {
      let e,
        n = t.type,
        i = t.currentTarget[Si];
      if (!i) return;
      let s = i[n];
      if (s) {
        if (!t[xi] && ((t[xi] = {}), 'touch' === n.slice(0, 5))) {
          let e = (t = t).changedTouches[0];
          if (
            ('touchstart' === n && 1 === t.touches.length && (qi.touch.id = e.identifier), qi.touch.id !== e.identifier)
          )
            return;
          Ci ||
            ('touchstart' !== n && 'touchmove' !== n) ||
            (function(t) {
              let e = t.changedTouches[0],
                n = t.type;
              if ('touchstart' === n) (qi.touch.x = e.clientX), (qi.touch.y = e.clientY), (qi.touch.scrollDecided = !1);
              else if ('touchmove' === n) {
                if (qi.touch.scrollDecided) return;
                qi.touch.scrollDecided = !0;
                let n = (function(t) {
                    let e = 'auto',
                      n = Ki(t);
                    for (let t, i = 0; i < n.length; i++)
                      if ((t = n[i])[ki]) {
                        e = t[ki];
                        break;
                      }
                    return e;
                  })(t),
                  i = !1,
                  s = Math.abs(qi.touch.x - e.clientX),
                  o = Math.abs(qi.touch.y - e.clientY);
                t.cancelable && ('none' === n ? (i = !0) : 'pan-x' === n ? (i = o > s) : 'pan-y' === n && (i = s > o)),
                  i ? t.preventDefault() : ns('track');
              }
            })(t);
        }
        if (!(e = t[xi]).skip) {
          for (let n, i = 0; i < Wi.length; i++)
            s[(n = Wi[i]).name] && !e[n.name] && n.flow && n.flow.start.indexOf(t.type) > -1 && n.reset && n.reset();
          for (let i, o = 0; o < Wi.length; o++) s[(i = Wi[o]).name] && !e[i.name] && ((e[i.name] = !0), i[n](t));
        }
      }
    }
    function Zi(t, e, n) {
      return (
        !!Yi[e] &&
        ((function(t, e, n) {
          let i = Yi[e],
            s = i.deps,
            o = i.name,
            r = t[Si];
          r || (t[Si] = r = {});
          for (let e, n, i = 0; i < s.length; i++)
            (e = s[i]),
              (Li && Ii(e) && 'click' !== e) ||
                ((n = r[e]) || (r[e] = n = { _count: 0 }),
                0 === n._count && t.addEventListener(e, Xi, zi(e)),
                (n[o] = (n[o] || 0) + 1),
                (n._count = (n._count || 0) + 1));
          t.addEventListener(e, n), i.touchAction && ts(t, i.touchAction);
        })(t, e, n),
        !0)
      );
    }
    function Gi(t, e, n) {
      return (
        !!Yi[e] &&
        ((function(t, e, n) {
          let i = Yi[e],
            s = i.deps,
            o = i.name,
            r = t[Si];
          if (r)
            for (let e, n, i = 0; i < s.length; i++)
              (e = s[i]),
                (n = r[e]) &&
                  n[o] &&
                  ((n[o] = (n[o] || 1) - 1),
                  (n._count = (n._count || 1) - 1),
                  0 === n._count && t.removeEventListener(e, Xi, zi(e)));
          t.removeEventListener(e, n);
        })(t, e, n),
        !0)
      );
    }
    function Qi(t) {
      Wi.push(t);
      for (let e = 0; e < t.emits.length; e++) Yi[t.emits[e]] = t;
    }
    function ts(t, e) {
      Ci &&
        t instanceof HTMLElement &&
        xn.run(() => {
          t.style.touchAction = e;
        }),
        (t[ki] = e);
    }
    function es(t, e, n) {
      let i = new Event(e, { bubbles: !0, cancelable: !0, composed: !0 });
      if (((i.detail = n), nn(t).dispatchEvent(i), i.defaultPrevented)) {
        let t = n.preventer || n.sourceEvent;
        t && t.preventDefault && t.preventDefault();
      }
    }
    function ns(t) {
      let e = (function(t) {
        for (let e, n = 0; n < Wi.length; n++) {
          e = Wi[n];
          for (let n, i = 0; i < e.emits.length; i++) if ((n = e.emits[i]) === t) return e;
        }
        return null;
      })(t);
      e.info && (e.info.prevent = !0);
    }
    function is(t, e, n, i) {
      e &&
        es(e, t, {
          x: n.clientX,
          y: n.clientY,
          sourceEvent: n,
          preventer: i,
          prevent: function(t) {
            return ns(t);
          }
        });
    }
    function ss(t, e, n) {
      if (t.prevent) return !1;
      if (t.started) return !0;
      let i = Math.abs(t.x - e),
        s = Math.abs(t.y - n);
      return i >= Pi || s >= Pi;
    }
    function os(t, e, n) {
      if (!e) return;
      let i,
        s = t.moves[t.moves.length - 2],
        o = t.moves[t.moves.length - 1],
        r = o.x - t.x,
        a = o.y - t.y,
        l = 0;
      s && ((i = o.x - s.x), (l = o.y - s.y)),
        es(e, 'track', {
          state: t.state,
          x: n.clientX,
          y: n.clientY,
          dx: r,
          dy: a,
          ddx: i,
          ddy: l,
          sourceEvent: n,
          hover: function() {
            return (function(t, e) {
              let n = document.elementFromPoint(t, e),
                i = n;
              for (; i && i.shadowRoot && !window.ShadyDOM; ) {
                if (i === (i = i.shadowRoot.elementFromPoint(t, e))) break;
                i && (n = i);
              }
              return n;
            })(n.clientX, n.clientY);
          }
        });
    }
    function rs(t, e, n) {
      let i = Math.abs(e.clientX - t.x),
        s = Math.abs(e.clientY - t.y),
        o = Ji(n || e);
      !o ||
        (Di[o.localName] && o.hasAttribute('disabled')) ||
        ((isNaN(i) ||
          isNaN(s) ||
          (i <= Ei && s <= Ei) ||
          (function(t) {
            if ('click' === t.type) {
              if (0 === t.detail) return !0;
              let e = Ji(t);
              if (!e.nodeType || e.nodeType !== Node.ELEMENT_NODE) return !0;
              let n = e.getBoundingClientRect(),
                i = t.pageX,
                s = t.pageY;
              return !(i >= n.left && i <= n.right && s >= n.top && s <= n.bottom);
            }
            return !1;
          })(e)) &&
          (t.prevent || es(o, 'tap', { x: e.clientX, y: e.clientY, sourceEvent: e, preventer: n })));
    }
    Qi({
      name: 'downup',
      deps: ['mousedown', 'touchstart', 'touchend'],
      flow: { start: ['mousedown', 'touchstart'], end: ['mouseup', 'touchend'] },
      emits: ['down', 'up'],
      info: { movefn: null, upfn: null },
      reset: function() {
        Vi(this.info);
      },
      mousedown: function(t) {
        if (!$i(t)) return;
        let e = Ji(t),
          n = this;
        ji(
          this.info,
          function(t) {
            $i(t) || (is('up', e, t), Vi(n.info));
          },
          function(t) {
            $i(t) && is('up', e, t), Vi(n.info);
          }
        ),
          is('down', e, t);
      },
      touchstart: function(t) {
        is('down', Ji(t), t.changedTouches[0], t);
      },
      touchend: function(t) {
        is('up', Ji(t), t.changedTouches[0], t);
      }
    }),
      Qi({
        name: 'track',
        touchAction: 'none',
        deps: ['mousedown', 'touchstart', 'touchmove', 'touchend'],
        flow: { start: ['mousedown', 'touchstart'], end: ['mouseup', 'touchend'] },
        emits: ['track'],
        info: {
          x: 0,
          y: 0,
          state: 'start',
          started: !1,
          moves: [],
          addMove: function(t) {
            this.moves.length > 2 && this.moves.shift(), this.moves.push(t);
          },
          movefn: null,
          upfn: null,
          prevent: !1
        },
        reset: function() {
          (this.info.state = 'start'),
            (this.info.started = !1),
            (this.info.moves = []),
            (this.info.x = 0),
            (this.info.y = 0),
            (this.info.prevent = !1),
            Vi(this.info);
        },
        mousedown: function(t) {
          if (!$i(t)) return;
          let e = Ji(t),
            n = this,
            i = function(t) {
              let i = t.clientX,
                s = t.clientY;
              ss(n.info, i, s) &&
                ((n.info.state = n.info.started ? ('mouseup' === t.type ? 'end' : 'track') : 'start'),
                'start' === n.info.state && ns('tap'),
                n.info.addMove({ x: i, y: s }),
                $i(t) || ((n.info.state = 'end'), Vi(n.info)),
                e && os(n.info, e, t),
                (n.info.started = !0));
            };
          ji(this.info, i, function(t) {
            n.info.started && i(t), Vi(n.info);
          }),
            (this.info.x = t.clientX),
            (this.info.y = t.clientY);
        },
        touchstart: function(t) {
          let e = t.changedTouches[0];
          (this.info.x = e.clientX), (this.info.y = e.clientY);
        },
        touchmove: function(t) {
          let e = Ji(t),
            n = t.changedTouches[0],
            i = n.clientX,
            s = n.clientY;
          ss(this.info, i, s) &&
            ('start' === this.info.state && ns('tap'),
            this.info.addMove({ x: i, y: s }),
            os(this.info, e, n),
            (this.info.state = 'track'),
            (this.info.started = !0));
        },
        touchend: function(t) {
          let e = Ji(t),
            n = t.changedTouches[0];
          this.info.started &&
            ((this.info.state = 'end'), this.info.addMove({ x: n.clientX, y: n.clientY }), os(this.info, e, n));
        }
      }),
      Qi({
        name: 'tap',
        deps: ['mousedown', 'click', 'touchstart', 'touchend'],
        flow: { start: ['mousedown', 'touchstart'], end: ['click', 'touchend'] },
        emits: ['tap'],
        info: { x: NaN, y: NaN, prevent: !1 },
        reset: function() {
          (this.info.x = NaN), (this.info.y = NaN), (this.info.prevent = !1);
        },
        mousedown: function(t) {
          $i(t) && ((this.info.x = t.clientX), (this.info.y = t.clientY));
        },
        click: function(t) {
          $i(t) && rs(this.info, t);
        },
        touchstart: function(t) {
          const e = t.changedTouches[0];
          (this.info.x = e.clientX), (this.info.y = e.clientY);
        },
        touchend: function(t) {
          rs(this.info, t.changedTouches[0], t);
        }
      });
    const as = Zi,
      ls = He((t) => {
        return class extends t {
          _addEventListenerToNode(t, e, n) {
            Zi(t, e, n) || super._addEventListenerToNode(t, e, n);
          }
          _removeEventListenerFromNode(t, e, n) {
            Gi(t, e, n) || super._removeEventListenerFromNode(t, e, n);
          }
        };
      }),
      cs = /:host\(:dir\((ltr|rtl)\)\)/g,
      hs = ':host([dir="$1"])',
      ds = /([\s\w-#\.\[\]\*]*):dir\((ltr|rtl)\)/g,
      us = ':host([dir="$2"]) $1',
      ps = /:dir\((?:ltr|rtl)\)/,
      _s = Boolean(window.ShadyDOM && window.ShadyDOM.inUse),
      fs = [];
    let ms = null,
      gs = '';
    function ys() {
      gs = document.documentElement.getAttribute('dir');
    }
    function bs(t) {
      if (!t.__autoDirOptOut) {
        t.setAttribute('dir', gs);
      }
    }
    function vs() {
      ys(), (gs = document.documentElement.getAttribute('dir'));
      for (let t = 0; t < fs.length; t++) bs(fs[t]);
    }
    const ws = He((t) => {
      _s ||
        ms ||
        (ys(),
        (ms = new MutationObserver(vs)).observe(document.documentElement, {
          attributes: !0,
          attributeFilter: ['dir']
        }));
      const e = An(t);
      class n extends e {
        static _processStyleText(t, n) {
          return (
            (t = e._processStyleText.call(this, t, n)),
            !_s && ps.test(t) && ((t = this._replaceDirInCssText(t)), (this.__activateDir = !0)),
            t
          );
        }
        static _replaceDirInCssText(t) {
          let e = t;
          return (e = (e = e.replace(cs, hs)).replace(ds, us));
        }
        constructor() {
          super(), (this.__autoDirOptOut = !1);
        }
        ready() {
          super.ready(), (this.__autoDirOptOut = this.hasAttribute('dir'));
        }
        connectedCallback() {
          e.prototype.connectedCallback && super.connectedCallback(),
            this.constructor.__activateDir && (ms && ms.takeRecords().length && vs(), fs.push(this), bs(this));
        }
        disconnectedCallback() {
          if ((e.prototype.disconnectedCallback && super.disconnectedCallback(), this.constructor.__activateDir)) {
            const t = fs.indexOf(this);
            t > -1 && fs.splice(t, 1);
          }
        }
      }
      return (n.__activateDir = !1), n;
    });
    /**
@license
Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/
    /**
@license
Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/
    function Cs() {
      document.body.removeAttribute('unresolved');
    }
    /**
@license
Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/
    function Ss(t, e, n) {
      return { index: t, removed: e, addedCount: n };
    }
    'interactive' === document.readyState || 'complete' === document.readyState
      ? Cs()
      : window.addEventListener('DOMContentLoaded', Cs);
    const xs = 0,
      ks = 1,
      Es = 2,
      Ps = 3;
    function Ts(t, e, n, i, s, o) {
      let r,
        a = 0,
        l = 0,
        c = Math.min(n - e, o - s);
      if (
        (0 == e &&
          0 == s &&
          (a = (function(t, e, n) {
            for (let i = 0; i < n; i++) if (!Os(t[i], e[i])) return i;
            return n;
          })(t, i, c)),
        n == t.length &&
          o == i.length &&
          (l = (function(t, e, n) {
            let i = t.length,
              s = e.length,
              o = 0;
            for (; o < n && Os(t[--i], e[--s]); ) o++;
            return o;
          })(t, i, c - a)),
        (s += a),
        (o -= l),
        (n -= l) - (e += a) == 0 && o - s == 0)
      )
        return [];
      if (e == n) {
        for (r = Ss(e, [], 0); s < o; ) r.removed.push(i[s++]);
        return [r];
      }
      if (s == o) return [Ss(e, [], n - e)];
      let h = (function(t) {
        let e = t.length - 1,
          n = t[0].length - 1,
          i = t[e][n],
          s = [];
        for (; e > 0 || n > 0; ) {
          if (0 == e) {
            s.push(Es), n--;
            continue;
          }
          if (0 == n) {
            s.push(Ps), e--;
            continue;
          }
          let o,
            r = t[e - 1][n - 1],
            a = t[e - 1][n],
            l = t[e][n - 1];
          (o = a < l ? (a < r ? a : r) : l < r ? l : r) == r
            ? (r == i ? s.push(xs) : (s.push(ks), (i = r)), e--, n--)
            : o == a
            ? (s.push(Ps), e--, (i = a))
            : (s.push(Es), n--, (i = l));
        }
        return s.reverse(), s;
      })(
        (function(t, e, n, i, s, o) {
          let r = o - s + 1,
            a = n - e + 1,
            l = new Array(r);
          for (let t = 0; t < r; t++) (l[t] = new Array(a)), (l[t][0] = t);
          for (let t = 0; t < a; t++) l[0][t] = t;
          for (let n = 1; n < r; n++)
            for (let o = 1; o < a; o++)
              if (Os(t[e + o - 1], i[s + n - 1])) l[n][o] = l[n - 1][o - 1];
              else {
                let t = l[n - 1][o] + 1,
                  e = l[n][o - 1] + 1;
                l[n][o] = t < e ? t : e;
              }
          return l;
        })(t, e, n, i, s, o)
      );
      r = void 0;
      let d = [],
        u = e,
        p = s;
      for (let t = 0; t < h.length; t++)
        switch (h[t]) {
          case xs:
            r && (d.push(r), (r = void 0)), u++, p++;
            break;
          case ks:
            r || (r = Ss(u, [], 0)), r.addedCount++, u++, r.removed.push(i[p]), p++;
            break;
          case Es:
            r || (r = Ss(u, [], 0)), r.addedCount++, u++;
            break;
          case Ps:
            r || (r = Ss(u, [], 0)), r.removed.push(i[p]), p++;
        }
      return r && d.push(r), d;
    }
    function As(t, e) {
      return Ts(t, 0, t.length, e, 0, e.length);
    }
    function Os(t, e) {
      return t === e;
    }
    /**
@license
Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/ function Ns(
      t
    ) {
      return 'slot' === t.localName;
    }
    let Is = class {
      static getFlattenedNodes(t) {
        const e = nn(t);
        return Ns(t)
          ? ((t = t), e.assignedNodes({ flatten: !0 }))
          : Array.from(e.childNodes)
              .map((t) => (Ns(t) ? nn((t = t)).assignedNodes({ flatten: !0 }) : [t]))
              .reduce((t, e) => t.concat(e), []);
      }
      constructor(t, e) {
        (this._shadyChildrenObserver = null),
          (this._nativeChildrenObserver = null),
          (this._connected = !1),
          (this._target = t),
          (this.callback = e),
          (this._effectiveNodes = []),
          (this._observer = null),
          (this._scheduled = !1),
          (this._boundSchedule = () => {
            this._schedule();
          }),
          this.connect(),
          this._schedule();
      }
      connect() {
        Ns(this._target)
          ? this._listenSlots([this._target])
          : nn(this._target).children &&
            (this._listenSlots(nn(this._target).children),
            window.ShadyDOM
              ? (this._shadyChildrenObserver = ShadyDOM.observeChildren(this._target, (t) => {
                  this._processMutations(t);
                }))
              : ((this._nativeChildrenObserver = new MutationObserver((t) => {
                  this._processMutations(t);
                })),
                this._nativeChildrenObserver.observe(this._target, { childList: !0 }))),
          (this._connected = !0);
      }
      disconnect() {
        Ns(this._target)
          ? this._unlistenSlots([this._target])
          : nn(this._target).children &&
            (this._unlistenSlots(nn(this._target).children),
            window.ShadyDOM && this._shadyChildrenObserver
              ? (ShadyDOM.unobserveChildren(this._shadyChildrenObserver), (this._shadyChildrenObserver = null))
              : this._nativeChildrenObserver &&
                (this._nativeChildrenObserver.disconnect(), (this._nativeChildrenObserver = null))),
          (this._connected = !1);
      }
      _schedule() {
        this._scheduled || ((this._scheduled = !0), xn.run(() => this.flush()));
      }
      _processMutations(t) {
        this._processSlotMutations(t), this.flush();
      }
      _processSlotMutations(t) {
        if (t)
          for (let e = 0; e < t.length; e++) {
            let n = t[e];
            n.addedNodes && this._listenSlots(n.addedNodes), n.removedNodes && this._unlistenSlots(n.removedNodes);
          }
      }
      flush() {
        if (!this._connected) return !1;
        window.ShadyDOM && ShadyDOM.flush(),
          this._nativeChildrenObserver
            ? this._processSlotMutations(this._nativeChildrenObserver.takeRecords())
            : this._shadyChildrenObserver && this._processSlotMutations(this._shadyChildrenObserver.takeRecords()),
          (this._scheduled = !1);
        let t = { target: this._target, addedNodes: [], removedNodes: [] },
          e = this.constructor.getFlattenedNodes(this._target),
          n = As(e, this._effectiveNodes);
        for (let e, i = 0; i < n.length && (e = n[i]); i++)
          for (let n, i = 0; i < e.removed.length && (n = e.removed[i]); i++) t.removedNodes.push(n);
        for (let i, s = 0; s < n.length && (i = n[s]); s++)
          for (let n = i.index; n < i.index + i.addedCount; n++) t.addedNodes.push(e[n]);
        this._effectiveNodes = e;
        let i = !1;
        return (t.addedNodes.length || t.removedNodes.length) && ((i = !0), this.callback.call(this._target, t)), i;
      }
      _listenSlots(t) {
        for (let e = 0; e < t.length; e++) {
          let n = t[e];
          Ns(n) && n.addEventListener('slotchange', this._boundSchedule);
        }
      }
      _unlistenSlots(t) {
        for (let e = 0; e < t.length; e++) {
          let n = t[e];
          Ns(n) && n.removeEventListener('slotchange', this._boundSchedule);
        }
      }
    };
    /**
@license
Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/ const Rs = function() {
        let t, e;
        do {
          (t = window.ShadyDOM && ShadyDOM.flush()),
            window.ShadyCSS && window.ShadyCSS.ScopingShim && window.ShadyCSS.ScopingShim.flush(),
            (e = wi());
        } while (t || e);
      },
      zs = Element.prototype,
      Ls =
        zs.matches ||
        zs.matchesSelector ||
        zs.mozMatchesSelector ||
        zs.msMatchesSelector ||
        zs.oMatchesSelector ||
        zs.webkitMatchesSelector,
      Ms = function(t, e) {
        return Ls.call(t, e);
      };
    /**
@license
Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/ class Fs {
      constructor(t) {
        window.ShadyDOM && window.ShadyDOM.inUse && window.ShadyDOM.patch(t), (this.node = t);
      }
      observeNodes(t) {
        return new Is(this.node, t);
      }
      unobserveNodes(t) {
        t.disconnect();
      }
      notifyObserver() {}
      deepContains(t) {
        if (nn(this.node).contains(t)) return !0;
        let e = t,
          n = t.ownerDocument;
        for (; e && e !== n && e !== this.node; ) e = nn(e).parentNode || nn(e).host;
        return e === this.node;
      }
      getOwnerRoot() {
        return nn(this.node).getRootNode();
      }
      getDistributedNodes() {
        return 'slot' === this.node.localName ? nn(this.node).assignedNodes({ flatten: !0 }) : [];
      }
      getDestinationInsertionPoints() {
        let t = [],
          e = nn(this.node).assignedSlot;
        for (; e; ) t.push(e), (e = nn(e).assignedSlot);
        return t;
      }
      importNode(t, e) {
        let n = this.node instanceof Document ? this.node : this.node.ownerDocument;
        return nn(n).importNode(t, e);
      }
      getEffectiveChildNodes() {
        return Is.getFlattenedNodes(this.node);
      }
      queryDistributedElements(t) {
        let e = this.getEffectiveChildNodes(),
          n = [];
        for (let i, s = 0, o = e.length; s < o && (i = e[s]); s++)
          i.nodeType === Node.ELEMENT_NODE && Ms(i, t) && n.push(i);
        return n;
      }
      get activeElement() {
        let t = this.node;
        return void 0 !== t._activeElement ? t._activeElement : t.activeElement;
      }
    }
    function Ds(t, e) {
      for (let n = 0; n < e.length; n++) {
        let i = e[n];
        Object.defineProperty(t, i, {
          get: function() {
            return this.node[i];
          },
          configurable: !0
        });
      }
    }
    class Hs {
      constructor(t) {
        this.event = t;
      }
      get rootTarget() {
        return this.path[0];
      }
      get localTarget() {
        return this.event.target;
      }
      get path() {
        return this.event.composedPath();
      }
    }
    Fs.prototype.cloneNode,
      Fs.prototype.appendChild,
      Fs.prototype.insertBefore,
      Fs.prototype.removeChild,
      Fs.prototype.replaceChild,
      Fs.prototype.setAttribute,
      Fs.prototype.removeAttribute,
      Fs.prototype.querySelector,
      Fs.prototype.querySelectorAll,
      Fs.prototype.parentNode,
      Fs.prototype.firstChild,
      Fs.prototype.lastChild,
      Fs.prototype.nextSibling,
      Fs.prototype.previousSibling,
      Fs.prototype.firstElementChild,
      Fs.prototype.lastElementChild,
      Fs.prototype.nextElementSibling,
      Fs.prototype.previousElementSibling,
      Fs.prototype.childNodes,
      Fs.prototype.children,
      Fs.prototype.classList,
      Fs.prototype.textContent,
      Fs.prototype.innerHTML;
    let Bs = Fs;
    if (window.ShadyDOM && window.ShadyDOM.inUse && window.ShadyDOM.noPatch && window.ShadyDOM.Wrapper) {
      class t extends window.ShadyDOM.Wrapper {}
      Object.getOwnPropertyNames(Fs.prototype).forEach((e) => {
        'activeElement' != e && (t.prototype[e] = Fs.prototype[e]);
      }),
        Ds(t.prototype, ['classList']),
        (Bs = t),
        Object.defineProperties(Hs.prototype, {
          localTarget: {
            get() {
              const t = this.event.currentTarget,
                e = t && Us(t).getOwnerRoot(),
                n = this.path;
              for (let t = 0; t < n.length; t++) {
                const i = n[t];
                if (Us(i).getOwnerRoot() === e) return i;
              }
            },
            configurable: !0
          },
          path: {
            get() {
              return window.ShadyDOM.composedPath(this.event);
            },
            configurable: !0
          }
        });
    } else
      !(function(t, e) {
        for (let n = 0; n < e.length; n++) {
          let i = e[n];
          t[i] = function() {
            return this.node[i].apply(this.node, arguments);
          };
        }
      })(Fs.prototype, [
        'cloneNode',
        'appendChild',
        'insertBefore',
        'removeChild',
        'replaceChild',
        'setAttribute',
        'removeAttribute',
        'querySelector',
        'querySelectorAll'
      ]),
        Ds(Fs.prototype, [
          'parentNode',
          'firstChild',
          'lastChild',
          'nextSibling',
          'previousSibling',
          'firstElementChild',
          'lastElementChild',
          'nextElementSibling',
          'previousElementSibling',
          'childNodes',
          'children',
          'classList'
        ]),
        (function(t, e) {
          for (let n = 0; n < e.length; n++) {
            let i = e[n];
            Object.defineProperty(t, i, {
              get: function() {
                return this.node[i];
              },
              set: function(t) {
                this.node[i] = t;
              },
              configurable: !0
            });
          }
        })(Fs.prototype, ['textContent', 'innerHTML', 'className']);
    const Us = function(t) {
        if ((t = t || document) instanceof Bs) return t;
        if (t instanceof Hs) return t;
        let e = t.__domApi;
        return e || ((e = t instanceof Event ? new Hs(t) : new Bs(t)), (t.__domApi = e)), e;
      },
      $s = window.ShadyDOM,
      qs = window.ShadyCSS;
    function js(t, e) {
      return nn(t).getRootNode() === e;
    }
    /**
@license
Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/
    let Vs = window.ShadyCSS;
    const Ks = He((t) => {
        const e = ws(ls(gi(t))),
          n = { x: 'pan-x', y: 'pan-y', none: 'none', all: 'auto' };
        class i extends e {
          constructor() {
            super(), this.isAttached, this.__boundListeners, this._debouncers;
          }
          static get importMeta() {
            return this.prototype.importMeta;
          }
          created() {}
          connectedCallback() {
            super.connectedCallback(), (this.isAttached = !0), this.attached();
          }
          attached() {}
          disconnectedCallback() {
            super.disconnectedCallback(), (this.isAttached = !1), this.detached();
          }
          detached() {}
          attributeChangedCallback(t, e, n, i) {
            e !== n && (super.attributeChangedCallback(t, e, n, i), this.attributeChanged(t, e, n));
          }
          attributeChanged(t, e, n) {}
          _initializeProperties() {
            let t = Object.getPrototypeOf(this);
            t.hasOwnProperty('__hasRegisterFinished') || (this._registered(), (t.__hasRegisterFinished = !0)),
              super._initializeProperties(),
              (this.root = this),
              this.created(),
              this._applyListeners();
          }
          _registered() {}
          ready() {
            this._ensureAttributes(), super.ready();
          }
          _ensureAttributes() {}
          _applyListeners() {}
          serialize(t) {
            return this._serializeValue(t);
          }
          deserialize(t, e) {
            return this._deserializeValue(t, e);
          }
          reflectPropertyToAttribute(t, e, n) {
            this._propertyToAttribute(t, e, n);
          }
          serializeValueToAttribute(t, e, n) {
            this._valueToNodeAttribute(n || this, t, e);
          }
          extend(t, e) {
            if (!t || !e) return t || e;
            let n = Object.getOwnPropertyNames(e);
            for (let i, s = 0; s < n.length && (i = n[s]); s++) {
              let n = Object.getOwnPropertyDescriptor(e, i);
              n && Object.defineProperty(t, i, n);
            }
            return t;
          }
          mixin(t, e) {
            for (let n in e) t[n] = e[n];
            return t;
          }
          chainObject(t, e) {
            return t && e && t !== e && (t.__proto__ = e), t;
          }
          instanceTemplate(t) {
            let e = this.constructor._contentForTemplate(t);
            return document.importNode(e, !0);
          }
          fire(t, e, n) {
            (n = n || {}), (e = null == e ? {} : e);
            let i = new Event(t, {
              bubbles: void 0 === n.bubbles || n.bubbles,
              cancelable: Boolean(n.cancelable),
              composed: void 0 === n.composed || n.composed
            });
            i.detail = e;
            let s = n.node || this;
            return nn(s).dispatchEvent(i), i;
          }
          listen(t, e, n) {
            t = t || this;
            let i = this.__boundListeners || (this.__boundListeners = new WeakMap()),
              s = i.get(t);
            s || ((s = {}), i.set(t, s));
            let o = e + n;
            s[o] || (s[o] = this._addMethodEventListenerToNode(t, e, n, this));
          }
          unlisten(t, e, n) {
            t = t || this;
            let i = this.__boundListeners && this.__boundListeners.get(t),
              s = e + n,
              o = i && i[s];
            o && (this._removeEventListenerFromNode(t, e, o), (i[s] = null));
          }
          setScrollDirection(t, e) {
            ts(e || this, n[t] || 'auto');
          }
          $$(t) {
            return this.root.querySelector(t);
          }
          get domHost() {
            let t = nn(this).getRootNode();
            return t instanceof DocumentFragment ? t.host : t;
          }
          distributeContent() {
            const t = Us(this);
            window.ShadyDOM && t.shadowRoot && ShadyDOM.flush();
          }
          getEffectiveChildNodes() {
            return Us(this).getEffectiveChildNodes();
          }
          queryDistributedElements(t) {
            return Us(this).queryDistributedElements(t);
          }
          getEffectiveChildren() {
            return this.getEffectiveChildNodes().filter(function(t) {
              return t.nodeType === Node.ELEMENT_NODE;
            });
          }
          getEffectiveTextContent() {
            let t = this.getEffectiveChildNodes(),
              e = [];
            for (let n, i = 0; (n = t[i]); i++) n.nodeType !== Node.COMMENT_NODE && e.push(n.textContent);
            return e.join('');
          }
          queryEffectiveChildren(t) {
            let e = this.queryDistributedElements(t);
            return e && e[0];
          }
          queryAllEffectiveChildren(t) {
            return this.queryDistributedElements(t);
          }
          getContentChildNodes(t) {
            let e = this.root.querySelector(t || 'slot');
            return e ? Us(e).getDistributedNodes() : [];
          }
          getContentChildren(t) {
            return this.getContentChildNodes(t).filter(function(t) {
              return t.nodeType === Node.ELEMENT_NODE;
            });
          }
          isLightDescendant(t) {
            return this !== t && nn(this).contains(t) && nn(this).getRootNode() === nn(t).getRootNode();
          }
          isLocalDescendant(t) {
            return this.root === nn(t).getRootNode();
          }
          scopeSubtree(t, e = !1) {
            return (function(t, e = !1) {
              if (!$s || !qs) return null;
              if (!$s.handlesDynamicScoping) return null;
              const n = qs.ScopingShim;
              if (!n) return null;
              const i = n.scopeForNode(t),
                s = nn(t).getRootNode(),
                o = (t) => {
                  if (!js(t, s)) return;
                  const e = Array.from($s.nativeMethods.querySelectorAll.call(t, '*'));
                  e.push(t);
                  for (let t = 0; t < e.length; t++) {
                    const o = e[t];
                    if (!js(o, s)) continue;
                    const r = n.currentScopeForNode(o);
                    r !== i && ('' !== r && n.unscopeNode(o, r), n.scopeNode(o, i));
                  }
                };
              if ((o(t), e)) {
                const e = new MutationObserver((t) => {
                  for (let e = 0; e < t.length; e++) {
                    const n = t[e];
                    for (let t = 0; t < n.addedNodes.length; t++) {
                      const e = n.addedNodes[t];
                      e.nodeType === Node.ELEMENT_NODE && o(e);
                    }
                  }
                });
                return e.observe(t, { childList: !0, subtree: !0 }), e;
              }
              return null;
            })(t, e);
          }
          getComputedStyleValue(t) {
            return Vs.getComputedStyleValue(this, t);
          }
          debounce(t, e, n) {
            return (
              (this._debouncers = this._debouncers || {}),
              (this._debouncers[t] = yi.debounce(this._debouncers[t], n > 0 ? Sn.after(n) : xn, e.bind(this)))
            );
          }
          isDebouncerActive(t) {
            this._debouncers = this._debouncers || {};
            let e = this._debouncers[t];
            return !(!e || !e.isActive());
          }
          flushDebouncer(t) {
            this._debouncers = this._debouncers || {};
            let e = this._debouncers[t];
            e && e.flush();
          }
          cancelDebouncer(t) {
            this._debouncers = this._debouncers || {};
            let e = this._debouncers[t];
            e && e.cancel();
          }
          async(t, e) {
            return e > 0 ? Sn.run(t.bind(this), e) : ~xn.run(t.bind(this));
          }
          cancelAsync(t) {
            t < 0 ? xn.cancel(~t) : Sn.cancel(t);
          }
          create(t, e) {
            let n = document.createElement(t);
            if (e)
              if (n.setProperties) n.setProperties(e);
              else for (let t in e) n[t] = e[t];
            return n;
          }
          elementMatches(t, e) {
            return Ms(e || this, t);
          }
          toggleAttribute(t, e) {
            let n = this;
            return (
              3 === arguments.length && (n = arguments[2]),
              1 == arguments.length && (e = !n.hasAttribute(t)),
              e ? (nn(n).setAttribute(t, ''), !0) : (nn(n).removeAttribute(t), !1)
            );
          }
          toggleClass(t, e, n) {
            (n = n || this),
              1 == arguments.length && (e = !n.classList.contains(t)),
              e ? n.classList.add(t) : n.classList.remove(t);
          }
          transform(t, e) {
            ((e = e || this).style.webkitTransform = t), (e.style.transform = t);
          }
          translate3d(t, e, n, i) {
            (i = i || this), this.transform('translate3d(' + t + ',' + e + ',' + n + ')', i);
          }
          arrayDelete(t, e) {
            let n;
            if (Array.isArray(t)) {
              if ((n = t.indexOf(e)) >= 0) return t.splice(n, 1);
            } else {
              if ((n = dn(this, t).indexOf(e)) >= 0) return this.splice(t, n, 1);
            }
            return null;
          }
          _logger(t, e) {
            switch ((Array.isArray(e) && 1 === e.length && Array.isArray(e[0]) && (e = e[0]), t)) {
              case 'log':
              case 'warn':
              case 'error':
                console[t](...e);
            }
          }
          _log(...t) {
            this._logger('log', t);
          }
          _warn(...t) {
            this._logger('warn', t);
          }
          _error(...t) {
            this._logger('error', t);
          }
          _logf(t, ...e) {
            return ['[%s::%s]', this.is, t, ...e];
          }
        }
        return (i.prototype.is = ''), i;
      }),
      Ys = {
        attached: !0,
        detached: !0,
        ready: !0,
        created: !0,
        beforeRegister: !0,
        registered: !0,
        attributeChanged: !0,
        listeners: !0,
        hostAttributes: !0
      },
      Ws = {
        attached: !0,
        detached: !0,
        ready: !0,
        created: !0,
        beforeRegister: !0,
        registered: !0,
        attributeChanged: !0,
        behaviors: !0,
        _noAccessors: !0
      },
      Js = Object.assign({ listeners: !0, hostAttributes: !0, properties: !0, observers: !0 }, Ws);
    /**
@license
Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/ function Xs(
      t,
      e,
      n,
      i
    ) {
      !(function(t, e, n) {
        const i = t._noAccessors,
          s = Object.getOwnPropertyNames(t);
        for (let o = 0; o < s.length; o++) {
          let r = s[o];
          if (!(r in n))
            if (i) e[r] = t[r];
            else {
              let n = Object.getOwnPropertyDescriptor(t, r);
              n && ((n.configurable = !0), Object.defineProperty(e, r, n));
            }
        }
      })(e, t, i);
      for (let t in Ys) e[t] && ((n[t] = n[t] || []), n[t].push(e[t]));
    }
    function Zs(t, e) {
      for (const n in e) {
        const i = t[n],
          s = e[n];
        t[n] = !('value' in s) && i && 'value' in i ? Object.assign({ value: i.value }, s) : s;
      }
    }
    function Gs(t, e, n) {
      let i;
      const s = {};
      class o extends e {
        static _finalizeClass() {
          if (this.hasOwnProperty(JSCompiler_renameProperty('generatedFrom', this))) {
            if (i)
              for (let t, e = 0; e < i.length; e++)
                (t = i[e]).properties && this.createProperties(t.properties),
                  t.observers && this.createObservers(t.observers, t.properties);
            t.properties && this.createProperties(t.properties),
              t.observers && this.createObservers(t.observers, t.properties),
              this._prepareTemplate();
          } else e._finalizeClass.call(this);
        }
        static get properties() {
          const e = {};
          if (i) for (let t = 0; t < i.length; t++) Zs(e, i[t].properties);
          return Zs(e, t.properties), e;
        }
        static get observers() {
          let e = [];
          if (i) for (let t, n = 0; n < i.length; n++) (t = i[n]).observers && (e = e.concat(t.observers));
          return t.observers && (e = e.concat(t.observers)), e;
        }
        created() {
          super.created();
          const t = s.created;
          if (t) for (let e = 0; e < t.length; e++) t[e].call(this);
        }
        _registered() {
          const t = o.prototype;
          if (!t.hasOwnProperty('__hasRegisterFinished')) {
            (t.__hasRegisterFinished = !0), super._registered(), ze && r(t);
            const e = Object.getPrototypeOf(this);
            let n = s.beforeRegister;
            if (n) for (let t = 0; t < n.length; t++) n[t].call(e);
            if ((n = s.registered)) for (let t = 0; t < n.length; t++) n[t].call(e);
          }
        }
        _applyListeners() {
          super._applyListeners();
          const t = s.listeners;
          if (t)
            for (let e = 0; e < t.length; e++) {
              const n = t[e];
              if (n) for (let t in n) this._addMethodEventListenerToNode(this, t, n[t]);
            }
        }
        _ensureAttributes() {
          const t = s.hostAttributes;
          if (t)
            for (let e = t.length - 1; e >= 0; e--) {
              const n = t[e];
              for (let t in n) this._ensureAttribute(t, n[t]);
            }
          super._ensureAttributes();
        }
        ready() {
          super.ready();
          let t = s.ready;
          if (t) for (let e = 0; e < t.length; e++) t[e].call(this);
        }
        attached() {
          super.attached();
          let t = s.attached;
          if (t) for (let e = 0; e < t.length; e++) t[e].call(this);
        }
        detached() {
          super.detached();
          let t = s.detached;
          if (t) for (let e = 0; e < t.length; e++) t[e].call(this);
        }
        attributeChanged(t, e, n) {
          super.attributeChanged();
          let i = s.attributeChanged;
          if (i) for (let s = 0; s < i.length; s++) i[s].call(this, t, e, n);
        }
      }
      if (n) {
        Array.isArray(n) || (n = [n]);
        let t = e.prototype.behaviors;
        (i = (function t(e, n, i) {
          n = n || [];
          for (let s = e.length - 1; s >= 0; s--) {
            let o = e[s];
            o
              ? Array.isArray(o)
                ? t(o, n)
                : n.indexOf(o) < 0 && (!i || i.indexOf(o) < 0) && n.unshift(o)
              : console.warn('behavior is null, check for missing or 404 import');
          }
          return n;
        })(n, null, t)),
          (o.prototype.behaviors = t ? t.concat(n) : i);
      }
      const r = (e) => {
        i &&
          (function(t, e, n) {
            for (let i = 0; i < e.length; i++) Xs(t, e[i], n, Js);
          })(e, i, s),
          Xs(e, t, s, Ws);
      };
      return ze || r(o.prototype), (o.generatedFrom = t), o;
    }
    const Qs = function(t) {
      let e;
      return (e = 'function' == typeof t ? t : Qs.Class(t)), customElements.define(e.is, e), e;
    };
    /**
@license
Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/
    /**
@license
Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/
    function to(t, e, n, i, s) {
      let o;
      s && (o = 'object' == typeof n && null !== n) && (i = t.__dataTemp[e]);
      let r = i !== n && (i == i || n == n);
      return o && r && (t.__dataTemp[e] = n), r;
    }
    Qs.Class = function(t, e) {
      t || console.warn('Polymer.Class requires `info` argument');
      let n = e ? e(Ks(HTMLElement)) : Ks(HTMLElement);
      return ((n = Gs(t, n, t.behaviors)).is = n.prototype.is = t.is), n;
    };
    const eo = He((t) => {
        return class extends t {
          _shouldPropertyChange(t, e, n) {
            return to(this, t, e, n, !0);
          }
        };
      }),
      no = He((t) => {
        return class extends t {
          static get properties() {
            return { mutableData: Boolean };
          }
          _shouldPropertyChange(t, e, n) {
            return to(this, t, e, n, this.mutableData);
          }
        };
      });
    eo._mutablePropertyChange = to;
    /**
@license
Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/
    let io = null;
    function so() {
      return io;
    }
    so.prototype = Object.create(HTMLTemplateElement.prototype, { constructor: { value: so, writable: !0 } });
    const oo = di(so),
      ro = eo(oo);
    const ao = di(class {});
    class lo extends ao {
      constructor(t) {
        super(), this._configureProperties(t), (this.root = this._stampTemplate(this.__dataHost));
        let e = [];
        this.children = e;
        for (let t = this.root.firstChild; t; t = t.nextSibling) e.push(t), (t.__templatizeInstance = this);
        this.__templatizeOwner && this.__templatizeOwner.__hideTemplateChildren__ && this._showHideChildren(!0);
        let n = this.__templatizeOptions;
        ((t && n.instanceProps) || !n.instanceProps) && this._enableProperties();
      }
      _configureProperties(t) {
        if (this.__templatizeOptions.forwardHostProp)
          for (let t in this.__hostProps) this._setPendingProperty(t, this.__dataHost['_host_' + t]);
        for (let e in t) this._setPendingProperty(e, t[e]);
      }
      forwardHostProp(t, e) {
        this._setPendingPropertyOrPath(t, e, !1, !0) && this.__dataHost._enqueueClient(this);
      }
      _addEventListenerToNode(t, e, n) {
        if (this._methodHost && this.__templatizeOptions.parentModel)
          this._methodHost._addEventListenerToNode(t, e, (t) => {
            (t.model = this), n(t);
          });
        else {
          let i = this.__dataHost.__dataHost;
          i && i._addEventListenerToNode(t, e, n);
        }
      }
      _showHideChildren(t) {
        let e = this.children;
        for (let n = 0; n < e.length; n++) {
          let i = e[n];
          if (Boolean(t) != Boolean(i.__hideTemplateChildren__))
            if (i.nodeType === Node.TEXT_NODE)
              t
                ? ((i.__polymerTextContent__ = i.textContent), (i.textContent = ''))
                : (i.textContent = i.__polymerTextContent__);
            else if ('slot' === i.localName)
              if (t)
                (i.__polymerReplaced__ = document.createComment('hidden-slot')),
                  nn(nn(i).parentNode).replaceChild(i.__polymerReplaced__, i);
              else {
                const t = i.__polymerReplaced__;
                t && nn(nn(t).parentNode).replaceChild(i, t);
              }
            else
              i.style &&
                (t
                  ? ((i.__polymerDisplay__ = i.style.display), (i.style.display = 'none'))
                  : (i.style.display = i.__polymerDisplay__));
          (i.__hideTemplateChildren__ = t), i._showHideChildren && i._showHideChildren(t);
        }
      }
      _setUnmanagedPropertyToNode(t, e, n) {
        t.__hideTemplateChildren__ && t.nodeType == Node.TEXT_NODE && 'textContent' == e
          ? (t.__polymerTextContent__ = n)
          : super._setUnmanagedPropertyToNode(t, e, n);
      }
      get parentModel() {
        let t = this.__parentModel;
        if (!t) {
          let e;
          t = this;
          do {
            t = t.__dataHost.__dataHost;
          } while ((e = t.__templatizeOptions) && !e.parentModel);
          this.__parentModel = t;
        }
        return t;
      }
      dispatchEvent(t) {
        return !0;
      }
    }
    lo.prototype.__dataHost,
      lo.prototype.__templatizeOptions,
      lo.prototype._methodHost,
      lo.prototype.__templatizeOwner,
      lo.prototype.__hostProps;
    const co = eo(lo);
    function ho(t) {
      let e = t.__dataHost;
      return (e && e._methodHost) || e;
    }
    function uo(t, e, n) {
      let i = n.mutableData ? co : lo;
      mo.mixin && (i = mo.mixin(i));
      let s = class extends i {};
      return (
        (s.prototype.__templatizeOptions = n),
        s.prototype._bindTemplate(t),
        (function(t, e, n, i) {
          let s = n.hostProps || {};
          for (let e in i.instanceProps) {
            delete s[e];
            let n = i.notifyInstanceProp;
            n && t.prototype._addPropertyEffect(e, t.prototype.PROPERTY_EFFECT_TYPES.NOTIFY, { fn: fo(e, n) });
          }
          if (i.forwardHostProp && e.__dataHost)
            for (let e in s)
              n.hasHostProps || (n.hasHostProps = !0),
                t.prototype._addPropertyEffect(e, t.prototype.PROPERTY_EFFECT_TYPES.NOTIFY, {
                  fn: function(t, e, n) {
                    t.__dataHost._setPendingPropertyOrPath('_host_' + e, n[e], !0, !0);
                  }
                });
        })(s, t, e, n),
        s
      );
    }
    function po(t, e, n) {
      let i = n.forwardHostProp;
      if (i && e.hasHostProps) {
        let s = e.templatizeTemplateClass;
        if (!s) {
          let t = n.mutableData ? ro : oo;
          s = e.templatizeTemplateClass = class extends t {};
          let o = e.hostProps;
          for (let t in o)
            s.prototype._addPropertyEffect('_host_' + t, s.prototype.PROPERTY_EFFECT_TYPES.PROPAGATE, { fn: _o(t, i) }),
              s.prototype._createNotifyingProperty('_host_' + t);
        }
        !(function(t, e) {
          (io = t), Object.setPrototypeOf(t, e.prototype), new e(), (io = null);
        })(t, s),
          t.__dataProto && Object.assign(t.__data, t.__dataProto),
          (t.__dataTemp = {}),
          (t.__dataPending = null),
          (t.__dataOld = null),
          t._enableProperties();
      }
    }
    function _o(t, e) {
      return function(t, n, i) {
        e.call(t.__templatizeOwner, n.substring('_host_'.length), i[n]);
      };
    }
    function fo(t, e) {
      return function(t, n, i) {
        e.call(t.__templatizeOwner, t, n, i[n]);
      };
    }
    function mo(t, e, n) {
      if (Ie && !ho(t)) throw new Error('strictTemplatePolicy: template owner not trusted');
      if (((n = n || {}), t.__templatizeOwner)) throw new Error('A <template> can only be templatized once');
      t.__templatizeOwner = e;
      let i = (e ? e.constructor : lo)._parseTemplate(t),
        s = i.templatizeInstanceClass;
      s || ((s = uo(t, i, n)), (i.templatizeInstanceClass = s)), po(t, i, n);
      let o = class extends s {};
      return (
        (o.prototype._methodHost = ho(t)),
        (o.prototype.__dataHost = t),
        (o.prototype.__templatizeOwner = e),
        (o.prototype.__hostProps = i.hostProps),
        (o = o)
      );
    }
    function go(t, e) {
      let n;
      for (; e; )
        if ((n = e.__templatizeInstance)) {
          if (n.__dataHost == t) return n;
          e = n.__dataHost;
        } else e = nn(e).parentNode;
      return null;
    }
    /**
@license
Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/
    /**
@license
Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/
    let yo = !1;
    function bo() {
      if (ze && !Te) {
        if (!yo) {
          yo = !0;
          const t = document.createElement('style');
          (t.textContent = 'dom-bind,dom-if,dom-repeat{display:none;}'), document.head.appendChild(t);
        }
        return !0;
      }
      return !1;
    }
    /**
@license
Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/ const vo = ls(
      no(di(HTMLElement))
    );
    customElements.define(
      'dom-bind',
      class extends vo {
        static get observedAttributes() {
          return ['mutable-data'];
        }
        constructor() {
          if ((super(), Ie)) throw new Error('strictTemplatePolicy: dom-bind not allowed');
          (this.root = null), (this.$ = null), (this.__children = null);
        }
        attributeChangedCallback(t, e, n, i) {
          this.mutableData = !0;
        }
        connectedCallback() {
          bo() || (this.style.display = 'none'), this.render();
        }
        disconnectedCallback() {
          this.__removeChildren();
        }
        __insertChildren() {
          nn(nn(this).parentNode).insertBefore(this.root, this);
        }
        __removeChildren() {
          if (this.__children)
            for (let t = 0; t < this.__children.length; t++) this.root.appendChild(this.__children[t]);
        }
        render() {
          let t;
          if (!this.__children) {
            if (!(t = t || this.querySelector('template'))) {
              let e = new MutationObserver(() => {
                if (!(t = this.querySelector('template'))) throw new Error('dom-bind requires a <template> child');
                e.disconnect(), this.render();
              });
              return void e.observe(this, { childList: !0 });
            }
            (this.root = this._stampTemplate(t)), (this.$ = this.root.$), (this.__children = []);
            for (let t = this.root.firstChild; t; t = t.nextSibling) this.__children[this.__children.length] = t;
            this._enableProperties();
          }
          this.__insertChildren(), this.dispatchEvent(new CustomEvent('dom-change', { bubbles: !0, composed: !0 }));
        }
      }
    );
    /**
@license
Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/
    class wo {
      constructor(t) {
        this.value = t.toString();
      }
      toString() {
        return this.value;
      }
    }
    function Co(t) {
      if (t instanceof wo) return t.value;
      throw new Error(`non-literal value passed to Polymer's htmlLiteral function: ${t}`);
    }
    const So = function(t, ...e) {
        const n = document.createElement('template');
        return (
          (n.innerHTML = e.reduce(
            (e, n, i) =>
              e +
              (function(t) {
                if (t instanceof HTMLTemplateElement) return t.innerHTML;
                if (t instanceof wo) return Co(t);
                throw new Error(`non-template value passed to Polymer's html function: ${t}`);
              })(n) +
              t[i + 1],
            t[0]
          )),
          n
        );
      },
      xo = gi(HTMLElement),
      ko = no(xo);
    class Eo extends ko {
      static get is() {
        return 'dom-repeat';
      }
      static get template() {
        return null;
      }
      static get properties() {
        return {
          items: { type: Array },
          as: { type: String, value: 'item' },
          indexAs: { type: String, value: 'index' },
          itemsIndexAs: { type: String, value: 'itemsIndex' },
          sort: { type: Function, observer: '__sortChanged' },
          filter: { type: Function, observer: '__filterChanged' },
          observe: { type: String, observer: '__observeChanged' },
          delay: Number,
          renderedItemCount: { type: Number, notify: !0, readOnly: !0 },
          initialCount: { type: Number, observer: '__initializeChunking' },
          targetFramerate: { type: Number, value: 20 },
          _targetFrameTime: { type: Number, computed: '__computeFrameTime(targetFramerate)' }
        };
      }
      static get observers() {
        return ['__itemsChanged(items.*)'];
      }
      constructor() {
        super(),
          (this.__instances = []),
          (this.__limit = 1 / 0),
          (this.__pool = []),
          (this.__renderDebouncer = null),
          (this.__itemsIdxToInstIdx = {}),
          (this.__chunkCount = null),
          (this.__lastChunkTime = null),
          (this.__sortFn = null),
          (this.__filterFn = null),
          (this.__observePaths = null),
          (this.__ctor = null),
          (this.__isDetached = !0),
          (this.template = null);
      }
      disconnectedCallback() {
        super.disconnectedCallback(), (this.__isDetached = !0);
        for (let t = 0; t < this.__instances.length; t++) this.__detachInstance(t);
      }
      connectedCallback() {
        if ((super.connectedCallback(), bo() || (this.style.display = 'none'), this.__isDetached)) {
          this.__isDetached = !1;
          let t = nn(nn(this).parentNode);
          for (let e = 0; e < this.__instances.length; e++) this.__attachInstance(e, t);
        }
      }
      __ensureTemplatized() {
        if (!this.__ctor) {
          let t = (this.template = this.querySelector('template'));
          if (!t) {
            let t = new MutationObserver(() => {
              if (!this.querySelector('template')) throw new Error('dom-repeat requires a <template> child');
              t.disconnect(), this.__render();
            });
            return t.observe(this, { childList: !0 }), !1;
          }
          let e = {};
          (e[this.as] = !0),
            (e[this.indexAs] = !0),
            (e[this.itemsIndexAs] = !0),
            (this.__ctor = mo(t, this, {
              mutableData: this.mutableData,
              parentModel: !0,
              instanceProps: e,
              forwardHostProp: function(t, e) {
                let n = this.__instances;
                for (let i, s = 0; s < n.length && (i = n[s]); s++) i.forwardHostProp(t, e);
              },
              notifyInstanceProp: function(t, e, n) {
                if ((i = this.as) === (s = e) || rn(i, s) || an(i, s)) {
                  let i = t[this.itemsIndexAs];
                  e == this.as && (this.items[i] = n);
                  let s = ln(this.as, `${JSCompiler_renameProperty('items', this)}.${i}`, e);
                  this.notifyPath(s, n);
                }
                var i, s;
              }
            }));
        }
        return !0;
      }
      __getMethodHost() {
        return this.__dataHost._methodHost || this.__dataHost;
      }
      __functionFromPropertyValue(t) {
        if ('string' == typeof t) {
          let e = t,
            n = this.__getMethodHost();
          return function() {
            return n[e].apply(n, arguments);
          };
        }
        return t;
      }
      __sortChanged(t) {
        (this.__sortFn = this.__functionFromPropertyValue(t)), this.items && this.__debounceRender(this.__render);
      }
      __filterChanged(t) {
        (this.__filterFn = this.__functionFromPropertyValue(t)), this.items && this.__debounceRender(this.__render);
      }
      __computeFrameTime(t) {
        return Math.ceil(1e3 / t);
      }
      __initializeChunking() {
        this.initialCount &&
          ((this.__limit = this.initialCount),
          (this.__chunkCount = this.initialCount),
          (this.__lastChunkTime = performance.now()));
      }
      __tryRenderChunk() {
        this.items && this.__limit < this.items.length && this.__debounceRender(this.__requestRenderChunk);
      }
      __requestRenderChunk() {
        requestAnimationFrame(() => this.__renderChunk());
      }
      __renderChunk() {
        let t = performance.now(),
          e = this._targetFrameTime / (t - this.__lastChunkTime);
        (this.__chunkCount = Math.round(this.__chunkCount * e) || 1),
          (this.__limit += this.__chunkCount),
          (this.__lastChunkTime = t),
          this.__debounceRender(this.__render);
      }
      __observeChanged() {
        this.__observePaths = this.observe && this.observe.replace('.*', '.').split(' ');
      }
      __itemsChanged(t) {
        this.items &&
          !Array.isArray(this.items) &&
          console.warn('dom-repeat expected array for `items`, found', this.items),
          this.__handleItemPath(t.path, t.value) || (this.__initializeChunking(), this.__debounceRender(this.__render));
      }
      __handleObservedPaths(t) {
        if (this.__sortFn || this.__filterFn)
          if (t) {
            if (this.__observePaths) {
              let e = this.__observePaths;
              for (let n = 0; n < e.length; n++)
                0 === t.indexOf(e[n]) && this.__debounceRender(this.__render, this.delay);
            }
          } else this.__debounceRender(this.__render, this.delay);
      }
      __debounceRender(t, e = 0) {
        (this.__renderDebouncer = yi.debounce(this.__renderDebouncer, e > 0 ? Sn.after(e) : xn, t.bind(this))),
          vi(this.__renderDebouncer);
      }
      render() {
        this.__debounceRender(this.__render), Rs();
      }
      __render() {
        this.__ensureTemplatized() &&
          (this.__applyFullRefresh(),
          (this.__pool.length = 0),
          this._setRenderedItemCount(this.__instances.length),
          this.dispatchEvent(new CustomEvent('dom-change', { bubbles: !0, composed: !0 })),
          this.__tryRenderChunk());
      }
      __applyFullRefresh() {
        let t = this.items || [],
          e = new Array(t.length);
        for (let n = 0; n < t.length; n++) e[n] = n;
        this.__filterFn && (e = e.filter((e, n, i) => this.__filterFn(t[e], n, i))),
          this.__sortFn && e.sort((e, n) => this.__sortFn(t[e], t[n]));
        const n = (this.__itemsIdxToInstIdx = {});
        let i = 0;
        const s = Math.min(e.length, this.__limit);
        for (; i < s; i++) {
          let s = this.__instances[i],
            o = e[i],
            r = t[o];
          (n[o] = i),
            s
              ? (s._setPendingProperty(this.as, r),
                s._setPendingProperty(this.indexAs, i),
                s._setPendingProperty(this.itemsIndexAs, o),
                s._flushProperties())
              : this.__insertInstance(r, i, o);
        }
        for (let t = this.__instances.length - 1; t >= i; t--) this.__detachAndRemoveInstance(t);
      }
      __detachInstance(t) {
        let e = this.__instances[t];
        const n = nn(e.root);
        for (let t = 0; t < e.children.length; t++) {
          let i = e.children[t];
          n.appendChild(i);
        }
        return e;
      }
      __attachInstance(t, e) {
        let n = this.__instances[t];
        e.insertBefore(n.root, this);
      }
      __detachAndRemoveInstance(t) {
        let e = this.__detachInstance(t);
        e && this.__pool.push(e), this.__instances.splice(t, 1);
      }
      __stampInstance(t, e, n) {
        let i = {};
        return (i[this.as] = t), (i[this.indexAs] = e), (i[this.itemsIndexAs] = n), new this.__ctor(i);
      }
      __insertInstance(t, e, n) {
        let i = this.__pool.pop();
        i
          ? (i._setPendingProperty(this.as, t),
            i._setPendingProperty(this.indexAs, e),
            i._setPendingProperty(this.itemsIndexAs, n),
            i._flushProperties())
          : (i = this.__stampInstance(t, e, n));
        let s = this.__instances[e + 1],
          o = s ? s.children[0] : this;
        return nn(nn(this).parentNode).insertBefore(i.root, o), (this.__instances[e] = i), i;
      }
      _showHideChildren(t) {
        for (let e = 0; e < this.__instances.length; e++) this.__instances[e]._showHideChildren(t);
      }
      __handleItemPath(t, e) {
        let n = t.slice(6),
          i = n.indexOf('.'),
          s = i < 0 ? n : n.substring(0, i);
        if (s == parseInt(s, 10)) {
          let t = i < 0 ? '' : n.substring(i + 1);
          this.__handleObservedPaths(t);
          let o = this.__itemsIdxToInstIdx[s],
            r = this.__instances[o];
          if (r) {
            let n = this.as + (t ? '.' + t : '');
            r._setPendingPropertyOrPath(n, e, !1, !0), r._flushProperties();
          }
          return !0;
        }
      }
      itemForElement(t) {
        let e = this.modelForElement(t);
        return e && e[this.as];
      }
      indexForElement(t) {
        let e = this.modelForElement(t);
        return e && e[this.indexAs];
      }
      modelForElement(t) {
        return go(this.template, t);
      }
    }
    customElements.define(Eo.is, Eo);
    /**
@license
Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/
    class Po extends xo {
      static get is() {
        return 'dom-if';
      }
      static get template() {
        return null;
      }
      static get properties() {
        return {
          if: { type: Boolean, observer: '__debounceRender' },
          restamp: { type: Boolean, observer: '__debounceRender' }
        };
      }
      constructor() {
        super(),
          (this.__renderDebouncer = null),
          (this.__invalidProps = null),
          (this.__instance = null),
          (this._lastIf = !1),
          (this.__ctor = null),
          (this.__hideTemplateChildren__ = !1);
      }
      __debounceRender() {
        (this.__renderDebouncer = yi.debounce(this.__renderDebouncer, xn, () => this.__render())),
          vi(this.__renderDebouncer);
      }
      disconnectedCallback() {
        super.disconnectedCallback();
        const t = nn(this).parentNode;
        (t && (t.nodeType != Node.DOCUMENT_FRAGMENT_NODE || nn(t).host)) || this.__teardownInstance();
      }
      connectedCallback() {
        super.connectedCallback(), bo() || (this.style.display = 'none'), this.if && this.__debounceRender();
      }
      render() {
        Rs();
      }
      __render() {
        if (this.if) {
          if (!this.__ensureInstance()) return;
          this._showHideChildren();
        } else this.restamp && this.__teardownInstance();
        !this.restamp && this.__instance && this._showHideChildren(),
          this.if != this._lastIf &&
            (this.dispatchEvent(new CustomEvent('dom-change', { bubbles: !0, composed: !0 })),
            (this._lastIf = this.if));
      }
      __ensureInstance() {
        let t = nn(this).parentNode;
        if (t) {
          if (!this.__ctor) {
            let t = nn(this).querySelector('template');
            if (!t) {
              let t = new MutationObserver(() => {
                if (!nn(this).querySelector('template')) throw new Error('dom-if requires a <template> child');
                t.disconnect(), this.__render();
              });
              return t.observe(this, { childList: !0 }), !1;
            }
            this.__ctor = mo(t, this, {
              mutableData: !0,
              forwardHostProp: function(t, e) {
                this.__instance &&
                  (this.if
                    ? this.__instance.forwardHostProp(t, e)
                    : ((this.__invalidProps = this.__invalidProps || Object.create(null)),
                      (this.__invalidProps[on(t)] = !0)));
              }
            });
          }
          if (this.__instance) {
            this.__syncHostProperties();
            let e = this.__instance.children;
            if (e && e.length) {
              if (nn(this).previousSibling !== e[e.length - 1])
                for (let n, i = 0; i < e.length && (n = e[i]); i++) nn(t).insertBefore(n, this);
            }
          } else (this.__instance = new this.__ctor()), nn(t).insertBefore(this.__instance.root, this);
        }
        return !0;
      }
      __syncHostProperties() {
        let t = this.__invalidProps;
        if (t) {
          for (let e in t) this.__instance._setPendingProperty(e, this.__dataHost[e]);
          (this.__invalidProps = null), this.__instance._flushProperties();
        }
      }
      __teardownInstance() {
        if (this.__instance) {
          let t = this.__instance.children;
          if (t && t.length) {
            let e = nn(t[0]).parentNode;
            if (e) {
              e = nn(e);
              for (let n, i = 0; i < t.length && (n = t[i]); i++) e.removeChild(n);
            }
          }
          (this.__instance = null), (this.__invalidProps = null);
        }
      }
      _showHideChildren() {
        let t = this.__hideTemplateChildren__ || !this.if;
        this.__instance && this.__instance._showHideChildren(t);
      }
    }
    customElements.define(Po.is, Po);
    /**
@license
Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/
    let To = He((t) => {
      let e = gi(t);
      return class extends e {
        static get properties() {
          return {
            items: { type: Array },
            multi: { type: Boolean, value: !1 },
            selected: { type: Object, notify: !0 },
            selectedItem: { type: Object, notify: !0 },
            toggle: { type: Boolean, value: !1 }
          };
        }
        static get observers() {
          return ['__updateSelection(multi, items.*)'];
        }
        constructor() {
          super(), (this.__lastItems = null), (this.__lastMulti = null), (this.__selectedMap = null);
        }
        __updateSelection(t, e) {
          let n = e.path;
          if (n == JSCompiler_renameProperty('items', this)) {
            let n = e.base || [],
              i = this.__lastItems;
            if ((t !== this.__lastMulti && this.clearSelection(), i)) {
              let t = As(n, i);
              this.__applySplices(t);
            }
            (this.__lastItems = n), (this.__lastMulti = t);
          } else if (e.path == `${JSCompiler_renameProperty('items', this)}.splices`)
            this.__applySplices(e.value.indexSplices);
          else {
            let t = n.slice(`${JSCompiler_renameProperty('items', this)}.`.length),
              e = parseInt(t, 10);
            t.indexOf('.') < 0 && t == e && this.__deselectChangedIdx(e);
          }
        }
        __applySplices(t) {
          let e = this.__selectedMap;
          for (let n = 0; n < t.length; n++) {
            let i = t[n];
            e.forEach((t, n) => {
              t < i.index ||
                (t >= i.index + i.removed.length ? e.set(n, t + i.addedCount - i.removed.length) : e.set(n, -1));
            });
            for (let t = 0; t < i.addedCount; t++) {
              let n = i.index + t;
              e.has(this.items[n]) && e.set(this.items[n], n);
            }
          }
          this.__updateLinks();
          let n = 0;
          e.forEach((t, i) => {
            t < 0
              ? (this.multi
                  ? this.splice(JSCompiler_renameProperty('selected', this), n, 1)
                  : (this.selected = this.selectedItem = null),
                e.delete(i))
              : n++;
          });
        }
        __updateLinks() {
          if (((this.__dataLinkedPaths = {}), this.multi)) {
            let t = 0;
            this.__selectedMap.forEach((e) => {
              e >= 0 &&
                this.linkPaths(
                  `${JSCompiler_renameProperty('items', this)}.${e}`,
                  `${JSCompiler_renameProperty('selected', this)}.${t++}`
                );
            });
          } else
            this.__selectedMap.forEach((t) => {
              this.linkPaths(
                JSCompiler_renameProperty('selected', this),
                `${JSCompiler_renameProperty('items', this)}.${t}`
              ),
                this.linkPaths(
                  JSCompiler_renameProperty('selectedItem', this),
                  `${JSCompiler_renameProperty('items', this)}.${t}`
                );
            });
        }
        clearSelection() {
          (this.__dataLinkedPaths = {}),
            (this.__selectedMap = new Map()),
            (this.selected = this.multi ? [] : null),
            (this.selectedItem = null);
        }
        isSelected(t) {
          return this.__selectedMap.has(t);
        }
        isIndexSelected(t) {
          return this.isSelected(this.items[t]);
        }
        __deselectChangedIdx(t) {
          let e = this.__selectedIndexForItemIndex(t);
          if (e >= 0) {
            let t = 0;
            this.__selectedMap.forEach((n, i) => {
              e == t++ && this.deselect(i);
            });
          }
        }
        __selectedIndexForItemIndex(t) {
          let e = this.__dataLinkedPaths[`${JSCompiler_renameProperty('items', this)}.${t}`];
          if (e) return parseInt(e.slice(`${JSCompiler_renameProperty('selected', this)}.`.length), 10);
        }
        deselect(t) {
          let e = this.__selectedMap.get(t);
          if (e >= 0) {
            let n;
            this.__selectedMap.delete(t),
              this.multi && (n = this.__selectedIndexForItemIndex(e)),
              this.__updateLinks(),
              this.multi
                ? this.splice(JSCompiler_renameProperty('selected', this), n, 1)
                : (this.selected = this.selectedItem = null);
          }
        }
        deselectIndex(t) {
          this.deselect(this.items[t]);
        }
        select(t) {
          this.selectIndex(this.items.indexOf(t));
        }
        selectIndex(t) {
          let e = this.items[t];
          this.isSelected(e)
            ? this.toggle && this.deselectIndex(t)
            : (this.multi || this.__selectedMap.clear(),
              this.__selectedMap.set(e, t),
              this.__updateLinks(),
              this.multi
                ? this.push(JSCompiler_renameProperty('selected', this), e)
                : (this.selected = this.selectedItem = e));
        }
      };
    })(xo);
    class Ao extends To {
      static get is() {
        return 'array-selector';
      }
      static get template() {
        return null;
      }
    }
    customElements.define(Ao.is, Ao);
    /**
@license
Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/
    const Oo = new ye();
    window.ShadyCSS ||
      (window.ShadyCSS = {
        prepareTemplate(t, e, n) {},
        prepareTemplateDom(t, e) {},
        prepareTemplateStyles(t, e, n) {},
        styleSubtree(t, e) {
          Oo.processStyles(), Vt(t, e);
        },
        styleElement(t) {
          Oo.processStyles();
        },
        styleDocument(t) {
          Oo.processStyles(), Vt(document.body, t);
        },
        getComputedStyleValue: (t, e) => Kt(t, e),
        flushCustomStyles() {},
        nativeCss: vt,
        nativeShadow: ft,
        cssBuild: gt,
        disableRuntime: bt
      }),
      (window.ShadyCSS.CustomStyleInterface = Oo);
    /**
@license
Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/
    const No = 'include',
      Io = window.ShadyCSS.CustomStyleInterface;
    /**
@license
Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/
    let Ro;
    window.customElements.define(
      'custom-style',
      class extends HTMLElement {
        constructor() {
          super(), (this._style = null), Io.addCustomStyle(this);
        }
        getStyle() {
          if (this._style) return this._style;
          const t = this.querySelector('style');
          if (!t) return null;
          this._style = t;
          const e = t.getAttribute(No);
          return (
            e &&
              (t.removeAttribute(No),
              (t.textContent =
                (function(t) {
                  let e = t.trim().split(/\s+/),
                    n = '';
                  for (let t = 0; t < e.length; t++) n += tn(e[t]);
                  return n;
                })(e) + t.textContent)),
            this.ownerDocument !== window.document && window.document.head.appendChild(this),
            this._style
          );
        }
      }
    ),
      (Ro = eo._mutablePropertyChange);
    Boolean;
    const zo = Ks(HTMLElement).prototype,
      Lo = Qs({
        _template: So`
    <style>
      :host {
        display: inline-block;
        position: fixed;
        clip: rect(0px,0px,0px,0px);
      }
    </style>
    <div aria-live$="[[mode]]">[[_text]]</div>
`,
        is: 'iron-a11y-announcer',
        properties: { mode: { type: String, value: 'polite' }, _text: { type: String, value: '' } },
        created: function() {
          Lo.instance || (Lo.instance = this),
            document.body.addEventListener('iron-announce', this._onIronAnnounce.bind(this));
        },
        announce: function(t) {
          (this._text = ''),
            this.async(function() {
              this._text = t;
            }, 100);
        },
        _onIronAnnounce: function(t) {
          t.detail && t.detail.text && this.announce(t.detail.text);
        }
      });
    (Lo.instance = null),
      (Lo.requestAvailability = function() {
        Lo.instance || (Lo.instance = document.createElement('iron-a11y-announcer')),
          document.body.appendChild(Lo.instance);
      });
    /**
@license
Copyright (c) 2015 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at
http://polymer.github.io/LICENSE.txt The complete set of authors may be found at
http://polymer.github.io/AUTHORS.txt The complete set of contributors may be
found at http://polymer.github.io/CONTRIBUTORS.txt Code distributed by Google as
part of the polymer project is also subject to an additional IP rights grant
found at http://polymer.github.io/PATENTS.txt
*/
    const Mo = {
      properties: {
        sizingTarget: {
          type: Object,
          value: function() {
            return this;
          }
        },
        fitInto: { type: Object, value: window },
        noOverlap: { type: Boolean },
        positionTarget: { type: Element },
        horizontalAlign: { type: String },
        verticalAlign: { type: String },
        dynamicAlign: { type: Boolean },
        horizontalOffset: { type: Number, value: 0, notify: !0 },
        verticalOffset: { type: Number, value: 0, notify: !0 },
        autoFitOnAttach: { type: Boolean, value: !1 },
        _fitInfo: { type: Object }
      },
      get _fitWidth() {
        return this.fitInto === window ? this.fitInto.innerWidth : this.fitInto.getBoundingClientRect().width;
      },
      get _fitHeight() {
        return this.fitInto === window ? this.fitInto.innerHeight : this.fitInto.getBoundingClientRect().height;
      },
      get _fitLeft() {
        return this.fitInto === window ? 0 : this.fitInto.getBoundingClientRect().left;
      },
      get _fitTop() {
        return this.fitInto === window ? 0 : this.fitInto.getBoundingClientRect().top;
      },
      get _defaultPositionTarget() {
        var t = Us(this).parentNode;
        return t && t.nodeType === Node.DOCUMENT_FRAGMENT_NODE && (t = t.host), t;
      },
      get _localeHorizontalAlign() {
        if (this._isRTL) {
          if ('right' === this.horizontalAlign) return 'left';
          if ('left' === this.horizontalAlign) return 'right';
        }
        return this.horizontalAlign;
      },
      get __shouldPosition() {
        return (this.horizontalAlign || this.verticalAlign) && this.positionTarget;
      },
      attached: function() {
        void 0 === this._isRTL && (this._isRTL = 'rtl' == window.getComputedStyle(this).direction),
          (this.positionTarget = this.positionTarget || this._defaultPositionTarget),
          this.autoFitOnAttach &&
            ('none' === window.getComputedStyle(this).display
              ? setTimeout(
                  function() {
                    this.fit();
                  }.bind(this)
                )
              : (window.ShadyDOM && ShadyDOM.flush(), this.fit()));
      },
      detached: function() {
        this.__deferredFit && (clearTimeout(this.__deferredFit), (this.__deferredFit = null));
      },
      fit: function() {
        this.position(), this.constrain(), this.center();
      },
      _discoverInfo: function() {
        if (!this._fitInfo) {
          var t = window.getComputedStyle(this),
            e = window.getComputedStyle(this.sizingTarget);
          this._fitInfo = {
            inlineStyle: {
              top: this.style.top || '',
              left: this.style.left || '',
              position: this.style.position || ''
            },
            sizerInlineStyle: {
              maxWidth: this.sizingTarget.style.maxWidth || '',
              maxHeight: this.sizingTarget.style.maxHeight || '',
              boxSizing: this.sizingTarget.style.boxSizing || ''
            },
            positionedBy: {
              vertically: 'auto' !== t.top ? 'top' : 'auto' !== t.bottom ? 'bottom' : null,
              horizontally: 'auto' !== t.left ? 'left' : 'auto' !== t.right ? 'right' : null
            },
            sizedBy: {
              height: 'none' !== e.maxHeight,
              width: 'none' !== e.maxWidth,
              minWidth: parseInt(e.minWidth, 10) || 0,
              minHeight: parseInt(e.minHeight, 10) || 0
            },
            margin: {
              top: parseInt(t.marginTop, 10) || 0,
              right: parseInt(t.marginRight, 10) || 0,
              bottom: parseInt(t.marginBottom, 10) || 0,
              left: parseInt(t.marginLeft, 10) || 0
            }
          };
        }
      },
      resetFit: function() {
        var t = this._fitInfo || {};
        for (var e in t.sizerInlineStyle) this.sizingTarget.style[e] = t.sizerInlineStyle[e];
        for (var e in t.inlineStyle) this.style[e] = t.inlineStyle[e];
        this._fitInfo = null;
      },
      refit: function() {
        var t = this.sizingTarget.scrollLeft,
          e = this.sizingTarget.scrollTop;
        this.resetFit(), this.fit(), (this.sizingTarget.scrollLeft = t), (this.sizingTarget.scrollTop = e);
      },
      position: function() {
        if (this.__shouldPosition) {
          this._discoverInfo(),
            (this.style.position = 'fixed'),
            (this.sizingTarget.style.boxSizing = 'border-box'),
            (this.style.left = '0px'),
            (this.style.top = '0px');
          var t = this.getBoundingClientRect(),
            e = this.__getNormalizedRect(this.positionTarget),
            n = this.__getNormalizedRect(this.fitInto),
            i = this._fitInfo.margin,
            s = { width: t.width + i.left + i.right, height: t.height + i.top + i.bottom },
            o = this.__getPosition(this._localeHorizontalAlign, this.verticalAlign, s, t, e, n),
            r = o.left + i.left,
            a = o.top + i.top,
            l = Math.min(n.right - i.right, r + t.width),
            c = Math.min(n.bottom - i.bottom, a + t.height);
          (r = Math.max(n.left + i.left, Math.min(r, l - this._fitInfo.sizedBy.minWidth))),
            (a = Math.max(n.top + i.top, Math.min(a, c - this._fitInfo.sizedBy.minHeight))),
            (this.sizingTarget.style.maxWidth = Math.max(l - r, this._fitInfo.sizedBy.minWidth) + 'px'),
            (this.sizingTarget.style.maxHeight = Math.max(c - a, this._fitInfo.sizedBy.minHeight) + 'px'),
            (this.style.left = r - t.left + 'px'),
            (this.style.top = a - t.top + 'px');
        }
      },
      constrain: function() {
        if (!this.__shouldPosition) {
          this._discoverInfo();
          var t = this._fitInfo;
          t.positionedBy.vertically || ((this.style.position = 'fixed'), (this.style.top = '0px')),
            t.positionedBy.horizontally || ((this.style.position = 'fixed'), (this.style.left = '0px')),
            (this.sizingTarget.style.boxSizing = 'border-box');
          var e = this.getBoundingClientRect();
          t.sizedBy.height || this.__sizeDimension(e, t.positionedBy.vertically, 'top', 'bottom', 'Height'),
            t.sizedBy.width || this.__sizeDimension(e, t.positionedBy.horizontally, 'left', 'right', 'Width');
        }
      },
      _sizeDimension: function(t, e, n, i, s) {
        this.__sizeDimension(t, e, n, i, s);
      },
      __sizeDimension: function(t, e, n, i, s) {
        var o = this._fitInfo,
          r = this.__getNormalizedRect(this.fitInto),
          a = 'Width' === s ? r.width : r.height,
          l = e === i,
          c = l ? a - t[i] : t[n],
          h = o.margin[l ? n : i],
          d = 'offset' + s,
          u = this[d] - this.sizingTarget[d];
        this.sizingTarget.style['max' + s] = a - h - c - u + 'px';
      },
      center: function() {
        if (!this.__shouldPosition) {
          this._discoverInfo();
          var t = this._fitInfo.positionedBy;
          if (!t.vertically || !t.horizontally) {
            (this.style.position = 'fixed'),
              t.vertically || (this.style.top = '0px'),
              t.horizontally || (this.style.left = '0px');
            var e = this.getBoundingClientRect(),
              n = this.__getNormalizedRect(this.fitInto);
            if (!t.vertically) {
              var i = n.top - e.top + (n.height - e.height) / 2;
              this.style.top = i + 'px';
            }
            if (!t.horizontally) {
              var s = n.left - e.left + (n.width - e.width) / 2;
              this.style.left = s + 'px';
            }
          }
        }
      },
      __getNormalizedRect: function(t) {
        return t === document.documentElement || t === window
          ? {
              top: 0,
              left: 0,
              width: window.innerWidth,
              height: window.innerHeight,
              right: window.innerWidth,
              bottom: window.innerHeight
            }
          : t.getBoundingClientRect();
      },
      __getOffscreenArea: function(t, e, n) {
        var i = Math.min(0, t.top) + Math.min(0, n.bottom - (t.top + e.height)),
          s = Math.min(0, t.left) + Math.min(0, n.right - (t.left + e.width));
        return Math.abs(i) * e.width + Math.abs(s) * e.height;
      },
      __getPosition: function(t, e, n, i, s, o) {
        var r,
          a = [
            {
              verticalAlign: 'top',
              horizontalAlign: 'left',
              top: s.top + this.verticalOffset,
              left: s.left + this.horizontalOffset
            },
            {
              verticalAlign: 'top',
              horizontalAlign: 'right',
              top: s.top + this.verticalOffset,
              left: s.right - n.width - this.horizontalOffset
            },
            {
              verticalAlign: 'bottom',
              horizontalAlign: 'left',
              top: s.bottom - n.height - this.verticalOffset,
              left: s.left + this.horizontalOffset
            },
            {
              verticalAlign: 'bottom',
              horizontalAlign: 'right',
              top: s.bottom - n.height - this.verticalOffset,
              left: s.right - n.width - this.horizontalOffset
            }
          ];
        if (this.noOverlap) {
          for (var l = 0, c = a.length; l < c; l++) {
            var h = {};
            for (var d in a[l]) h[d] = a[l][d];
            a.push(h);
          }
          (a[0].top = a[1].top += s.height),
            (a[2].top = a[3].top -= s.height),
            (a[4].left = a[6].left += s.width),
            (a[5].left = a[7].left -= s.width);
        }
        (e = 'auto' === e ? null : e),
          ((t = 'auto' === t ? null : t) && 'center' !== t) ||
            (a.push({
              verticalAlign: 'top',
              horizontalAlign: 'center',
              top: s.top + this.verticalOffset + (this.noOverlap ? s.height : 0),
              left: s.left - i.width / 2 + s.width / 2 + this.horizontalOffset
            }),
            a.push({
              verticalAlign: 'bottom',
              horizontalAlign: 'center',
              top: s.bottom - n.height - this.verticalOffset - (this.noOverlap ? s.height : 0),
              left: s.left - i.width / 2 + s.width / 2 + this.horizontalOffset
            })),
          (e && 'middle' !== e) ||
            (a.push({
              verticalAlign: 'middle',
              horizontalAlign: 'left',
              top: s.top - i.height / 2 + s.height / 2 + this.verticalOffset,
              left: s.left + this.horizontalOffset + (this.noOverlap ? s.width : 0)
            }),
            a.push({
              verticalAlign: 'middle',
              horizontalAlign: 'right',
              top: s.top - i.height / 2 + s.height / 2 + this.verticalOffset,
              left: s.right - n.width - this.horizontalOffset - (this.noOverlap ? s.width : 0)
            })),
          'middle' === e &&
            'center' === t &&
            a.push({
              verticalAlign: 'middle',
              horizontalAlign: 'center',
              top: s.top - i.height / 2 + s.height / 2 + this.verticalOffset,
              left: s.left - i.width / 2 + s.width / 2 + this.horizontalOffset
            });
        for (l = 0; l < a.length; l++) {
          var u = a[l],
            p = u.verticalAlign === e,
            _ = u.horizontalAlign === t;
          if (!this.dynamicAlign && !this.noOverlap && p && _) {
            r = u;
            break;
          }
          var f = (!e || p) && (!t || _);
          if (this.dynamicAlign || f) {
            if (((u.offscreenArea = this.__getOffscreenArea(u, n, o)), 0 === u.offscreenArea && f)) {
              r = u;
              break;
            }
            r = r || u;
            var m = u.offscreenArea - r.offscreenArea;
            (m < 0 || (0 === m && (p || _))) && (r = u);
          }
        }
        return r;
      }
    };
    /**
@license
Copyright (c) 2015 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at
http://polymer.github.io/LICENSE.txt The complete set of authors may be found at
http://polymer.github.io/AUTHORS.txt The complete set of contributors may be
found at http://polymer.github.io/CONTRIBUTORS.txt Code distributed by Google as
part of the polymer project is also subject to an additional IP rights grant
found at http://polymer.github.io/PATENTS.txt
*/ var Fo = new Set();
    const Do = {
      properties: {
        _parentResizable: { type: Object, observer: '_parentResizableChanged' },
        _notifyingDescendant: { type: Boolean, value: !1 }
      },
      listeners: { 'iron-request-resize-notifications': '_onIronRequestResizeNotifications' },
      created: function() {
        (this._interestedResizables = []),
          (this._boundNotifyResize = this.notifyResize.bind(this)),
          (this._boundOnDescendantIronResize = this._onDescendantIronResize.bind(this));
      },
      attached: function() {
        this._requestResizeNotifications();
      },
      detached: function() {
        this._parentResizable
          ? this._parentResizable.stopResizeNotificationsFor(this)
          : (Fo.delete(this), window.removeEventListener('resize', this._boundNotifyResize)),
          (this._parentResizable = null);
      },
      notifyResize: function() {
        this.isAttached &&
          (this._interestedResizables.forEach(function(t) {
            this.resizerShouldNotify(t) && this._notifyDescendant(t);
          }, this),
          this._fireResize());
      },
      assignParentResizable: function(t) {
        this._parentResizable && this._parentResizable.stopResizeNotificationsFor(this),
          (this._parentResizable = t),
          t &&
            -1 === t._interestedResizables.indexOf(this) &&
            (t._interestedResizables.push(this), t._subscribeIronResize(this));
      },
      stopResizeNotificationsFor: function(t) {
        var e = this._interestedResizables.indexOf(t);
        e > -1 && (this._interestedResizables.splice(e, 1), this._unsubscribeIronResize(t));
      },
      _subscribeIronResize: function(t) {
        t.addEventListener('iron-resize', this._boundOnDescendantIronResize);
      },
      _unsubscribeIronResize: function(t) {
        t.removeEventListener('iron-resize', this._boundOnDescendantIronResize);
      },
      resizerShouldNotify: function(t) {
        return !0;
      },
      _onDescendantIronResize: function(t) {
        this._notifyingDescendant ? t.stopPropagation() : Te || this._fireResize();
      },
      _fireResize: function() {
        this.fire('iron-resize', null, { node: this, bubbles: !1 });
      },
      _onIronRequestResizeNotifications: function(t) {
        var e = Us(t).rootTarget;
        e !== this && (e.assignParentResizable(this), this._notifyDescendant(e), t.stopPropagation());
      },
      _parentResizableChanged: function(t) {
        t && window.removeEventListener('resize', this._boundNotifyResize);
      },
      _notifyDescendant: function(t) {
        this.isAttached && ((this._notifyingDescendant = !0), t.notifyResize(), (this._notifyingDescendant = !1));
      },
      _requestResizeNotifications: function() {
        if (this.isAttached)
          if ('loading' === document.readyState) {
            var t = this._requestResizeNotifications.bind(this);
            document.addEventListener('readystatechange', function e() {
              document.removeEventListener('readystatechange', e), t();
            });
          } else
            this._findParent(),
              this._parentResizable
                ? this._parentResizable._interestedResizables.forEach(function(t) {
                    t !== this && t._findParent();
                  }, this)
                : (Fo.forEach(function(t) {
                    t !== this && t._findParent();
                  }, this),
                  window.addEventListener('resize', this._boundNotifyResize),
                  this.notifyResize());
      },
      _findParent: function() {
        this.assignParentResizable(null),
          this.fire('iron-request-resize-notifications', null, { node: this, bubbles: !0, cancelable: !0 }),
          this._parentResizable ? Fo.delete(this) : Fo.add(this);
      }
    };
    /**
@license
Copyright (c) 2016 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at
http://polymer.github.io/LICENSE.txt The complete set of authors may be found at
http://polymer.github.io/AUTHORS.txt The complete set of contributors may be
found at http://polymer.github.io/CONTRIBUTORS.txt Code distributed by Google as
part of the polymer project is also subject to an additional IP rights grant
found at http://polymer.github.io/PATENTS.txt
*/ var Ho =
        Element.prototype,
      Bo =
        Ho.matches ||
        Ho.matchesSelector ||
        Ho.mozMatchesSelector ||
        Ho.msMatchesSelector ||
        Ho.oMatchesSelector ||
        Ho.webkitMatchesSelector;
    const Uo = {
      getTabbableNodes: function(t) {
        var e = [];
        return this._collectTabbableNodes(t, e) ? this._sortByTabIndex(e) : e;
      },
      isFocusable: function(t) {
        return Bo.call(t, 'input, select, textarea, button, object')
          ? Bo.call(t, ':not([disabled])')
          : Bo.call(t, 'a[href], area[href], iframe, [tabindex], [contentEditable]');
      },
      isTabbable: function(t) {
        return this.isFocusable(t) && Bo.call(t, ':not([tabindex="-1"])') && this._isVisible(t);
      },
      _normalizedTabIndex: function(t) {
        if (this.isFocusable(t)) {
          var e = t.getAttribute('tabindex') || 0;
          return Number(e);
        }
        return -1;
      },
      _collectTabbableNodes: function(t, e) {
        if (t.nodeType !== Node.ELEMENT_NODE || !this._isVisible(t)) return !1;
        var n,
          i = t,
          s = this._normalizedTabIndex(i),
          o = s > 0;
        s >= 0 && e.push(i),
          (n =
            'content' === i.localName || 'slot' === i.localName
              ? Us(i).getDistributedNodes()
              : Us(i.root || i).children);
        for (var r = 0; r < n.length; r++) o = this._collectTabbableNodes(n[r], e) || o;
        return o;
      },
      _isVisible: function(t) {
        var e = t.style;
        return (
          'hidden' !== e.visibility &&
          'none' !== e.display &&
          ('hidden' !== (e = window.getComputedStyle(t)).visibility && 'none' !== e.display)
        );
      },
      _sortByTabIndex: function(t) {
        var e = t.length;
        if (e < 2) return t;
        var n = Math.ceil(e / 2),
          i = this._sortByTabIndex(t.slice(0, n)),
          s = this._sortByTabIndex(t.slice(n));
        return this._mergeSortByTabIndex(i, s);
      },
      _mergeSortByTabIndex: function(t, e) {
        for (var n = []; t.length > 0 && e.length > 0; )
          this._hasLowerTabOrder(t[0], e[0]) ? n.push(e.shift()) : n.push(t.shift());
        return n.concat(t, e);
      },
      _hasLowerTabOrder: function(t, e) {
        var n = Math.max(t.tabIndex, 0),
          i = Math.max(e.tabIndex, 0);
        return 0 === n || 0 === i ? i > n : n > i;
      }
    };
    /**
@license
Copyright (c) 2015 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at
http://polymer.github.io/LICENSE.txt The complete set of authors may be found at
http://polymer.github.io/AUTHORS.txt The complete set of contributors may be
found at http://polymer.github.io/CONTRIBUTORS.txt Code distributed by Google as
part of the polymer project is also subject to an additional IP rights grant
found at http://polymer.github.io/PATENTS.txt
*/ Qs(
      {
        _template: So`
    <style>
      :host {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: var(--iron-overlay-backdrop-background-color, #000);
        opacity: 0;
        transition: opacity 0.2s;
        pointer-events: none;
        @apply --iron-overlay-backdrop;
      }

      :host(.opened) {
        opacity: var(--iron-overlay-backdrop-opacity, 0.6);
        pointer-events: auto;
        @apply --iron-overlay-backdrop-opened;
      }
    </style>

    <slot></slot>
`,
        is: 'iron-overlay-backdrop',
        properties: { opened: { reflectToAttribute: !0, type: Boolean, value: !1, observer: '_openedChanged' } },
        listeners: { transitionend: '_onTransitionend' },
        created: function() {
          this.__openedRaf = null;
        },
        attached: function() {
          this.opened && this._openedChanged(this.opened);
        },
        prepare: function() {
          this.opened && !this.parentNode && Us(document.body).appendChild(this);
        },
        open: function() {
          this.opened = !0;
        },
        close: function() {
          this.opened = !1;
        },
        complete: function() {
          this.opened || this.parentNode !== document.body || Us(this.parentNode).removeChild(this);
        },
        _onTransitionend: function(t) {
          t && t.target === this && this.complete();
        },
        _openedChanged: function(t) {
          if (t) this.prepare();
          else {
            var e = window.getComputedStyle(this);
            ('0s' !== e.transitionDuration && 0 != e.opacity) || this.complete();
          }
          this.isAttached &&
            (this.__openedRaf && (window.cancelAnimationFrame(this.__openedRaf), (this.__openedRaf = null)),
            (this.scrollTop = this.scrollTop),
            (this.__openedRaf = window.requestAnimationFrame(
              function() {
                (this.__openedRaf = null), this.toggleClass('opened', this.opened);
              }.bind(this)
            )));
        }
      }
    );
    /**
@license
Copyright (c) 2015 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at
http://polymer.github.io/LICENSE.txt The complete set of authors may be found at
http://polymer.github.io/AUTHORS.txt The complete set of contributors may be
found at http://polymer.github.io/CONTRIBUTORS.txt Code distributed by Google as
part of the polymer project is also subject to an additional IP rights grant
found at http://polymer.github.io/PATENTS.txt
*/
    var $o = { 'U+0008': 'backspace', 'U+0009': 'tab', 'U+001B': 'esc', 'U+0020': 'space', 'U+007F': 'del' },
      qo = {
        8: 'backspace',
        9: 'tab',
        13: 'enter',
        27: 'esc',
        33: 'pageup',
        34: 'pagedown',
        35: 'end',
        36: 'home',
        32: 'space',
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down',
        46: 'del',
        106: '*'
      },
      jo = { shift: 'shiftKey', ctrl: 'ctrlKey', alt: 'altKey', meta: 'metaKey' },
      Vo = /[a-z0-9*]/,
      Ko = /U\+/,
      Yo = /^arrow/,
      Wo = /^space(bar)?/,
      Jo = /^escape$/;
    function Xo(t, e) {
      var n = '';
      if (t) {
        var i = t.toLowerCase();
        ' ' === i || Wo.test(i)
          ? (n = 'space')
          : Jo.test(i)
          ? (n = 'esc')
          : 1 == i.length
          ? (e && !Vo.test(i)) || (n = i)
          : (n = Yo.test(i) ? i.replace('arrow', '') : 'multiply' == i ? '*' : i);
      }
      return n;
    }
    function Zo(t, e) {
      return t.key
        ? Xo(t.key, e)
        : t.detail && t.detail.key
        ? Xo(t.detail.key, e)
        : ((n = t.keyIdentifier),
          (i = ''),
          n &&
            (n in $o
              ? (i = $o[n])
              : Ko.test(n)
              ? ((n = parseInt(n.replace('U+', '0x'), 16)), (i = String.fromCharCode(n).toLowerCase()))
              : (i = n.toLowerCase())),
          i ||
            (function(t) {
              var e = '';
              return (
                Number(t) &&
                  (e =
                    t >= 65 && t <= 90
                      ? String.fromCharCode(32 + t)
                      : t >= 112 && t <= 123
                      ? 'f' + (t - 112 + 1)
                      : t >= 48 && t <= 57
                      ? String(t - 48)
                      : t >= 96 && t <= 105
                      ? String(t - 96)
                      : qo[t]),
                e
              );
            })(t.keyCode) ||
            '');
      var n, i;
    }
    function Go(t, e) {
      return (
        Zo(e, t.hasModifiers) === t.key &&
        (!t.hasModifiers ||
          (!!e.shiftKey == !!t.shiftKey &&
            !!e.ctrlKey == !!t.ctrlKey &&
            !!e.altKey == !!t.altKey &&
            !!e.metaKey == !!t.metaKey))
      );
    }
    function Qo(t) {
      return t
        .trim()
        .split(' ')
        .map(function(t) {
          return (function(t) {
            return 1 === t.length
              ? { combo: t, key: t, event: 'keydown' }
              : t.split('+').reduce(
                  function(t, e) {
                    var n = e.split(':'),
                      i = n[0],
                      s = n[1];
                    return (
                      i in jo ? ((t[jo[i]] = !0), (t.hasModifiers = !0)) : ((t.key = i), (t.event = s || 'keydown')), t
                    );
                  },
                  { combo: t.split(':').shift() }
                );
          })(t);
        });
    }
    const tr = {
        properties: {
          keyEventTarget: {
            type: Object,
            value: function() {
              return this;
            }
          },
          stopKeyboardEventPropagation: { type: Boolean, value: !1 },
          _boundKeyHandlers: {
            type: Array,
            value: function() {
              return [];
            }
          },
          _imperativeKeyBindings: {
            type: Object,
            value: function() {
              return {};
            }
          }
        },
        observers: ['_resetKeyEventListeners(keyEventTarget, _boundKeyHandlers)'],
        keyBindings: {},
        registered: function() {
          this._prepKeyBindings();
        },
        attached: function() {
          this._listenKeyEventListeners();
        },
        detached: function() {
          this._unlistenKeyEventListeners();
        },
        addOwnKeyBinding: function(t, e) {
          (this._imperativeKeyBindings[t] = e), this._prepKeyBindings(), this._resetKeyEventListeners();
        },
        removeOwnKeyBindings: function() {
          (this._imperativeKeyBindings = {}), this._prepKeyBindings(), this._resetKeyEventListeners();
        },
        keyboardEventMatchesKeys: function(t, e) {
          for (var n = Qo(e), i = 0; i < n.length; ++i) if (Go(n[i], t)) return !0;
          return !1;
        },
        _collectKeyBindings: function() {
          var t = this.behaviors.map(function(t) {
            return t.keyBindings;
          });
          return -1 === t.indexOf(this.keyBindings) && t.push(this.keyBindings), t;
        },
        _prepKeyBindings: function() {
          for (var t in ((this._keyBindings = {}),
          this._collectKeyBindings().forEach(function(t) {
            for (var e in t) this._addKeyBinding(e, t[e]);
          }, this),
          this._imperativeKeyBindings))
            this._addKeyBinding(t, this._imperativeKeyBindings[t]);
          for (var e in this._keyBindings)
            this._keyBindings[e].sort(function(t, e) {
              var n = t[0].hasModifiers;
              return n === e[0].hasModifiers ? 0 : n ? -1 : 1;
            });
        },
        _addKeyBinding: function(t, e) {
          Qo(t).forEach(function(t) {
            (this._keyBindings[t.event] = this._keyBindings[t.event] || []), this._keyBindings[t.event].push([t, e]);
          }, this);
        },
        _resetKeyEventListeners: function() {
          this._unlistenKeyEventListeners(), this.isAttached && this._listenKeyEventListeners();
        },
        _listenKeyEventListeners: function() {
          this.keyEventTarget &&
            Object.keys(this._keyBindings).forEach(function(t) {
              var e = this._keyBindings[t],
                n = this._onKeyBindingEvent.bind(this, e);
              this._boundKeyHandlers.push([this.keyEventTarget, t, n]), this.keyEventTarget.addEventListener(t, n);
            }, this);
        },
        _unlistenKeyEventListeners: function() {
          for (var t, e, n, i; this._boundKeyHandlers.length; )
            (e = (t = this._boundKeyHandlers.pop())[0]), (n = t[1]), (i = t[2]), e.removeEventListener(n, i);
        },
        _onKeyBindingEvent: function(t, e) {
          if ((this.stopKeyboardEventPropagation && e.stopPropagation(), !e.defaultPrevented))
            for (var n = 0; n < t.length; n++) {
              var i = t[n][0],
                s = t[n][1];
              if (Go(i, e) && (this._triggerKeyHandler(i, s, e), e.defaultPrevented)) return;
            }
        },
        _triggerKeyHandler: function(t, e, n) {
          var i = Object.create(t);
          i.keyboardEvent = n;
          var s = new CustomEvent(t.event, { detail: i, cancelable: !0 });
          this[e].call(this, s), s.defaultPrevented && n.preventDefault();
        }
      },
      er = function() {
        (this._overlays = []),
          (this._minimumZ = 101),
          (this._backdropElement = null),
          as(document.documentElement, 'tap', function() {}),
          document.addEventListener('tap', this._onCaptureClick.bind(this), !0),
          document.addEventListener('focus', this._onCaptureFocus.bind(this), !0),
          document.addEventListener('keydown', this._onCaptureKeyDown.bind(this), !0);
      };
    /**
@license
Copyright (c) 2015 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at
http://polymer.github.io/LICENSE.txt The complete set of authors may be found at
http://polymer.github.io/AUTHORS.txt The complete set of contributors may be
found at http://polymer.github.io/CONTRIBUTORS.txt Code distributed by Google as
part of the polymer project is also subject to an additional IP rights grant
found at http://polymer.github.io/PATENTS.txt
*/ er.prototype = {
      constructor: er,
      get backdropElement() {
        return (
          this._backdropElement || (this._backdropElement = document.createElement('iron-overlay-backdrop')),
          this._backdropElement
        );
      },
      get deepActiveElement() {
        var t = document.activeElement;
        for ((t && t instanceof Element != !1) || (t = document.body); t.root && Us(t.root).activeElement; )
          t = Us(t.root).activeElement;
        return t;
      },
      _bringOverlayAtIndexToFront: function(t) {
        var e = this._overlays[t];
        if (e) {
          var n = this._overlays.length - 1,
            i = this._overlays[n];
          if ((i && this._shouldBeBehindOverlay(e, i) && n--, !(t >= n))) {
            var s = Math.max(this.currentOverlayZ(), this._minimumZ);
            for (this._getZ(e) <= s && this._applyOverlayZ(e, s); t < n; )
              (this._overlays[t] = this._overlays[t + 1]), t++;
            this._overlays[n] = e;
          }
        }
      },
      addOrRemoveOverlay: function(t) {
        t.opened ? this.addOverlay(t) : this.removeOverlay(t);
      },
      addOverlay: function(t) {
        var e = this._overlays.indexOf(t);
        if (e >= 0) return this._bringOverlayAtIndexToFront(e), void this.trackBackdrop();
        var n = this._overlays.length,
          i = this._overlays[n - 1],
          s = Math.max(this._getZ(i), this._minimumZ),
          o = this._getZ(t);
        if (i && this._shouldBeBehindOverlay(t, i)) {
          this._applyOverlayZ(i, s), n--;
          var r = this._overlays[n - 1];
          s = Math.max(this._getZ(r), this._minimumZ);
        }
        o <= s && this._applyOverlayZ(t, s), this._overlays.splice(n, 0, t), this.trackBackdrop();
      },
      removeOverlay: function(t) {
        var e = this._overlays.indexOf(t);
        -1 !== e && (this._overlays.splice(e, 1), this.trackBackdrop());
      },
      currentOverlay: function() {
        var t = this._overlays.length - 1;
        return this._overlays[t];
      },
      currentOverlayZ: function() {
        return this._getZ(this.currentOverlay());
      },
      ensureMinimumZ: function(t) {
        this._minimumZ = Math.max(this._minimumZ, t);
      },
      focusOverlay: function() {
        var t = this.currentOverlay();
        t && t._applyFocus();
      },
      trackBackdrop: function() {
        var t = this._overlayWithBackdrop();
        (t || this._backdropElement) &&
          ((this.backdropElement.style.zIndex = this._getZ(t) - 1),
          (this.backdropElement.opened = !!t),
          this.backdropElement.prepare());
      },
      getBackdrops: function() {
        for (var t = [], e = 0; e < this._overlays.length; e++)
          this._overlays[e].withBackdrop && t.push(this._overlays[e]);
        return t;
      },
      backdropZ: function() {
        return this._getZ(this._overlayWithBackdrop()) - 1;
      },
      _overlayWithBackdrop: function() {
        for (var t = this._overlays.length - 1; t >= 0; t--)
          if (this._overlays[t].withBackdrop) return this._overlays[t];
      },
      _getZ: function(t) {
        var e = this._minimumZ;
        if (t) {
          var n = Number(t.style.zIndex || window.getComputedStyle(t).zIndex);
          n == n && (e = n);
        }
        return e;
      },
      _setZ: function(t, e) {
        t.style.zIndex = e;
      },
      _applyOverlayZ: function(t, e) {
        this._setZ(t, e + 2);
      },
      _overlayInPath: function(t) {
        t = t || [];
        for (var e = 0; e < t.length; e++) if (t[e]._manager === this) return t[e];
      },
      _onCaptureClick: function(t) {
        var e = this._overlays.length - 1;
        if (-1 !== e)
          for (
            var n, i = Us(t).path;
            (n = this._overlays[e]) && this._overlayInPath(i) !== n && (n._onCaptureClick(t), n.allowClickThrough);

          )
            e--;
      },
      _onCaptureFocus: function(t) {
        var e = this.currentOverlay();
        e && e._onCaptureFocus(t);
      },
      _onCaptureKeyDown: function(t) {
        var e = this.currentOverlay();
        e &&
          (tr.keyboardEventMatchesKeys(t, 'esc')
            ? e._onCaptureEsc(t)
            : tr.keyboardEventMatchesKeys(t, 'tab') && e._onCaptureTab(t));
      },
      _shouldBeBehindOverlay: function(t, e) {
        return !t.alwaysOnTop && e.alwaysOnTop;
      }
    };
    const nr = new er();
    /**
@license
Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at
http://polymer.github.io/LICENSE.txt The complete set of authors may be found at
http://polymer.github.io/AUTHORS.txt The complete set of contributors may be
found at http://polymer.github.io/CONTRIBUTORS.txt Code distributed by Google as
part of the polymer project is also subject to an additional IP rights grant
found at http://polymer.github.io/PATENTS.txt
*/ var ir,
      sr,
      or = { pageX: 0, pageY: 0 },
      rr = null,
      ar = [],
      lr = ['wheel', 'mousewheel', 'DOMMouseScroll', 'touchstart', 'touchmove'];
    function cr(t) {
      dr.indexOf(t) >= 0 ||
        (0 === dr.length &&
          (function() {
            ir = ir || _r.bind(void 0);
            for (var t = 0, e = lr.length; t < e; t++)
              document.addEventListener(lr[t], ir, { capture: !0, passive: !1 });
          })(),
        dr.push(t),
        (sr = dr[dr.length - 1]),
        (ur = []),
        (pr = []));
    }
    function hr(t) {
      var e = dr.indexOf(t);
      -1 !== e &&
        (dr.splice(e, 1),
        (sr = dr[dr.length - 1]),
        (ur = []),
        (pr = []),
        0 === dr.length &&
          (function() {
            for (var t = 0, e = lr.length; t < e; t++)
              document.removeEventListener(lr[t], ir, { capture: !0, passive: !1 });
          })());
    }
    const dr = [];
    let ur = null,
      pr = null;
    function _r(t) {
      if (
        (t.cancelable &&
          (function(t) {
            var e = Us(t).rootTarget;
            'touchmove' !== t.type &&
              rr !== e &&
              ((rr = e),
              (ar = (function(t) {
                for (var e = [], n = t.indexOf(sr), i = 0; i <= n; i++)
                  if (t[i].nodeType === Node.ELEMENT_NODE) {
                    var s = t[i],
                      o = s.style;
                    'scroll' !== o.overflow && 'auto' !== o.overflow && (o = window.getComputedStyle(s)),
                      ('scroll' !== o.overflow && 'auto' !== o.overflow) || e.push(s);
                  }
                return e;
              })(Us(t).path)));
            if (!ar.length) return !0;
            if ('touchstart' === t.type) return !1;
            var n = (function(t) {
              var e = { deltaX: t.deltaX, deltaY: t.deltaY };
              if ('deltaX' in t);
              else if ('wheelDeltaX' in t && 'wheelDeltaY' in t)
                (e.deltaX = -t.wheelDeltaX), (e.deltaY = -t.wheelDeltaY);
              else if ('wheelDelta' in t) (e.deltaX = 0), (e.deltaY = -t.wheelDelta);
              else if ('axis' in t) (e.deltaX = 1 === t.axis ? t.detail : 0), (e.deltaY = 2 === t.axis ? t.detail : 0);
              else if (t.targetTouches) {
                var n = t.targetTouches[0];
                (e.deltaX = or.pageX - n.pageX), (e.deltaY = or.pageY - n.pageY);
              }
              return e;
            })(
              /**
@license
Copyright (c) 2015 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at
http://polymer.github.io/LICENSE.txt The complete set of authors may be found at
http://polymer.github.io/AUTHORS.txt The complete set of contributors may be
found at http://polymer.github.io/CONTRIBUTORS.txt Code distributed by Google as
part of the polymer project is also subject to an additional IP rights grant
found at http://polymer.github.io/PATENTS.txt
*/ t
            );
            return !(function(t, e, n) {
              if (!e && !n) return;
              for (var i = Math.abs(n) >= Math.abs(e), s = 0; s < t.length; s++) {
                var o = t[s];
                if (
                  i
                    ? n < 0
                      ? o.scrollTop > 0
                      : o.scrollTop < o.scrollHeight - o.clientHeight
                    : e < 0
                    ? o.scrollLeft > 0
                    : o.scrollLeft < o.scrollWidth - o.clientWidth
                )
                  return o;
              }
            })(ar, n.deltaX, n.deltaY);
          })(t) &&
          t.preventDefault(),
        t.targetTouches)
      ) {
        var e = t.targetTouches[0];
        (or.pageX = e.pageX), (or.pageY = e.pageY);
      }
    }
    const fr = {
      properties: {
        opened: { observer: '_openedChanged', type: Boolean, value: !1, notify: !0 },
        canceled: { observer: '_canceledChanged', readOnly: !0, type: Boolean, value: !1 },
        withBackdrop: { observer: '_withBackdropChanged', type: Boolean },
        noAutoFocus: { type: Boolean, value: !1 },
        noCancelOnEscKey: { type: Boolean, value: !1 },
        noCancelOnOutsideClick: { type: Boolean, value: !1 },
        closingReason: { type: Object },
        restoreFocusOnClose: { type: Boolean, value: !1 },
        allowClickThrough: { type: Boolean },
        alwaysOnTop: { type: Boolean },
        scrollAction: { type: String },
        _manager: { type: Object, value: nr },
        _focusedChild: { type: Object }
      },
      listeners: { 'iron-resize': '_onIronResize' },
      observers: ['__updateScrollObservers(isAttached, opened, scrollAction)'],
      get backdropElement() {
        return this._manager.backdropElement;
      },
      get _focusNode() {
        return this._focusedChild || Us(this).querySelector('[autofocus]') || this;
      },
      get _focusableNodes() {
        return Uo.getTabbableNodes(this);
      },
      ready: function() {
        (this.__isAnimating = !1),
          (this.__shouldRemoveTabIndex = !1),
          (this.__firstFocusableNode = this.__lastFocusableNode = null),
          (this.__rafs = {}),
          (this.__restoreFocusNode = null),
          (this.__scrollTop = this.__scrollLeft = null),
          (this.__onCaptureScroll = this.__onCaptureScroll.bind(this)),
          (this.__rootNodes = null),
          this._ensureSetup();
      },
      attached: function() {
        this.opened && this._openedChanged(this.opened), (this._observer = Us(this).observeNodes(this._onNodesChange));
      },
      detached: function() {
        for (var t in (Us(this).unobserveNodes(this._observer), (this._observer = null), this.__rafs))
          null !== this.__rafs[t] && cancelAnimationFrame(this.__rafs[t]);
        (this.__rafs = {}),
          this._manager.removeOverlay(this),
          this.__isAnimating &&
            (this.opened ? this._finishRenderOpened() : (this._applyFocus(), this._finishRenderClosed()));
      },
      toggle: function() {
        this._setCanceled(!1), (this.opened = !this.opened);
      },
      open: function() {
        this._setCanceled(!1), (this.opened = !0);
      },
      close: function() {
        this._setCanceled(!1), (this.opened = !1);
      },
      cancel: function(t) {
        this.fire('iron-overlay-canceled', t, { cancelable: !0 }).defaultPrevented ||
          (this._setCanceled(!0), (this.opened = !1));
      },
      invalidateTabbables: function() {
        this.__firstFocusableNode = this.__lastFocusableNode = null;
      },
      _ensureSetup: function() {
        this._overlaySetup || ((this._overlaySetup = !0), (this.style.outline = 'none'), (this.style.display = 'none'));
      },
      _openedChanged: function(t) {
        t ? this.removeAttribute('aria-hidden') : this.setAttribute('aria-hidden', 'true'),
          this.isAttached && ((this.__isAnimating = !0), this.__deraf('__openedChanged', this.__openedChanged));
      },
      _canceledChanged: function() {
        (this.closingReason = this.closingReason || {}), (this.closingReason.canceled = this.canceled);
      },
      _withBackdropChanged: function() {
        this.withBackdrop && !this.hasAttribute('tabindex')
          ? (this.setAttribute('tabindex', '-1'), (this.__shouldRemoveTabIndex = !0))
          : this.__shouldRemoveTabIndex && (this.removeAttribute('tabindex'), (this.__shouldRemoveTabIndex = !1)),
          this.opened && this.isAttached && this._manager.trackBackdrop();
      },
      _prepareRenderOpened: function() {
        (this.__restoreFocusNode = this._manager.deepActiveElement),
          this._preparePositioning(),
          this.refit(),
          this._finishPositioning(),
          this.noAutoFocus &&
            document.activeElement === this._focusNode &&
            (this._focusNode.blur(), this.__restoreFocusNode.focus());
      },
      _renderOpened: function() {
        this._finishRenderOpened();
      },
      _renderClosed: function() {
        this._finishRenderClosed();
      },
      _finishRenderOpened: function() {
        this.notifyResize(), (this.__isAnimating = !1), this.fire('iron-overlay-opened');
      },
      _finishRenderClosed: function() {
        (this.style.display = 'none'),
          (this.style.zIndex = ''),
          this.notifyResize(),
          (this.__isAnimating = !1),
          this.fire('iron-overlay-closed', this.closingReason);
      },
      _preparePositioning: function() {
        (this.style.transition = this.style.webkitTransition = 'none'),
          (this.style.transform = this.style.webkitTransform = 'none'),
          (this.style.display = '');
      },
      _finishPositioning: function() {
        (this.style.display = 'none'),
          (this.scrollTop = this.scrollTop),
          (this.style.transition = this.style.webkitTransition = ''),
          (this.style.transform = this.style.webkitTransform = ''),
          (this.style.display = ''),
          (this.scrollTop = this.scrollTop);
      },
      _applyFocus: function() {
        if (this.opened) this.noAutoFocus || this._focusNode.focus();
        else {
          if (this.restoreFocusOnClose && this.__restoreFocusNode) {
            var t = this._manager.deepActiveElement;
            (t === document.body || Us(this).deepContains(t)) && this.__restoreFocusNode.focus();
          }
          (this.__restoreFocusNode = null), this._focusNode.blur(), (this._focusedChild = null);
        }
      },
      _onCaptureClick: function(t) {
        this.noCancelOnOutsideClick || this.cancel(t);
      },
      _onCaptureFocus: function(t) {
        if (this.withBackdrop) {
          var e = Us(t).path;
          -1 === e.indexOf(this) ? (t.stopPropagation(), this._applyFocus()) : (this._focusedChild = e[0]);
        }
      },
      _onCaptureEsc: function(t) {
        this.noCancelOnEscKey || this.cancel(t);
      },
      _onCaptureTab: function(t) {
        if (this.withBackdrop) {
          this.__ensureFirstLastFocusables();
          var e = t.shiftKey,
            n = e ? this.__firstFocusableNode : this.__lastFocusableNode,
            i = e ? this.__lastFocusableNode : this.__firstFocusableNode,
            s = !1;
          if (n === i) s = !0;
          else {
            var o = this._manager.deepActiveElement;
            s = o === n || o === this;
          }
          s && (t.preventDefault(), (this._focusedChild = i), this._applyFocus());
        }
      },
      _onIronResize: function() {
        this.opened && !this.__isAnimating && this.__deraf('refit', this.refit);
      },
      _onNodesChange: function() {
        this.opened && !this.__isAnimating && (this.invalidateTabbables(), this.notifyResize());
      },
      __ensureFirstLastFocusables: function() {
        var t = this._focusableNodes;
        (this.__firstFocusableNode = t[0]), (this.__lastFocusableNode = t[t.length - 1]);
      },
      __openedChanged: function() {
        this.opened
          ? (this._prepareRenderOpened(), this._manager.addOverlay(this), this._applyFocus(), this._renderOpened())
          : (this._manager.removeOverlay(this), this._applyFocus(), this._renderClosed());
      },
      __deraf: function(t, e) {
        var n = this.__rafs;
        null !== n[t] && cancelAnimationFrame(n[t]),
          (n[t] = requestAnimationFrame(
            function() {
              (n[t] = null), e.call(this);
            }.bind(this)
          ));
      },
      __updateScrollObservers: function(t, e, n) {
        t && e && this.__isValidScrollAction(n)
          ? ('lock' === n && (this.__saveScrollPosition(), cr(this)), this.__addScrollListeners())
          : (hr(this), this.__removeScrollListeners());
      },
      __addScrollListeners: function() {
        if (!this.__rootNodes) {
          if (((this.__rootNodes = []), Te))
            for (var t = this; t; )
              t.nodeType === Node.DOCUMENT_FRAGMENT_NODE && t.host && this.__rootNodes.push(t),
                (t = t.host || t.assignedSlot || t.parentNode);
          this.__rootNodes.push(document);
        }
        this.__rootNodes.forEach(function(t) {
          t.addEventListener('scroll', this.__onCaptureScroll, { capture: !0, passive: !0 });
        }, this);
      },
      __removeScrollListeners: function() {
        this.__rootNodes &&
          this.__rootNodes.forEach(function(t) {
            t.removeEventListener('scroll', this.__onCaptureScroll, { capture: !0, passive: !0 });
          }, this),
          this.isAttached || (this.__rootNodes = null);
      },
      __isValidScrollAction: function(t) {
        return 'lock' === t || 'refit' === t || 'cancel' === t;
      },
      __onCaptureScroll: function(t) {
        if (!(this.__isAnimating || Us(t).path.indexOf(this) >= 0))
          switch (this.scrollAction) {
            case 'lock':
              this.__restoreScrollPosition();
              break;
            case 'refit':
              this.__deraf('refit', this.refit);
              break;
            case 'cancel':
              this.cancel(t);
          }
      },
      __saveScrollPosition: function() {
        document.scrollingElement
          ? ((this.__scrollTop = document.scrollingElement.scrollTop),
            (this.__scrollLeft = document.scrollingElement.scrollLeft))
          : ((this.__scrollTop = Math.max(document.documentElement.scrollTop, document.body.scrollTop)),
            (this.__scrollLeft = Math.max(document.documentElement.scrollLeft, document.body.scrollLeft)));
      },
      __restoreScrollPosition: function() {
        document.scrollingElement
          ? ((document.scrollingElement.scrollTop = this.__scrollTop),
            (document.scrollingElement.scrollLeft = this.__scrollLeft))
          : ((document.documentElement.scrollTop = document.body.scrollTop = this.__scrollTop),
            (document.documentElement.scrollLeft = document.body.scrollLeft = this.__scrollLeft));
      }
    };
    /**
@license
Copyright (c) 2015 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at
http://polymer.github.io/LICENSE.txt The complete set of authors may be found at
http://polymer.github.io/AUTHORS.txt The complete set of contributors may be
found at http://polymer.github.io/CONTRIBUTORS.txt Code distributed by Google as
part of the polymer project is also subject to an additional IP rights grant
found at http://polymer.github.io/PATENTS.txt
*/
    var mr = null;
    Qs({
      _template: So`
    <style>
      :host {
        display: block;
        position: fixed;
        background-color: var(--paper-toast-background-color, #323232);
        color: var(--paper-toast-color, #f1f1f1);
        min-height: 48px;
        min-width: 288px;
        padding: 16px 24px;
        box-sizing: border-box;
        box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.26);
        border-radius: 2px;
        margin: 12px;
        font-size: 14px;
        cursor: default;
        -webkit-transition: -webkit-transform 0.3s, opacity 0.3s;
        transition: transform 0.3s, opacity 0.3s;
        opacity: 0;
        -webkit-transform: translateY(100px);
        transform: translateY(100px);
        @apply --paper-font-common-base;
      }

      :host(.capsule) {
        border-radius: 24px;
      }

      :host(.fit-bottom) {
        width: 100%;
        min-width: 0;
        border-radius: 0;
        margin: 0;
      }

      :host(.paper-toast-open) {
        opacity: 1;
        -webkit-transform: translateY(0px);
        transform: translateY(0px);
      }
    </style>

    <span id="label">{{text}}</span>
    <slot></slot>
`,
      is: 'paper-toast',
      behaviors: [[Mo, Do, fr]],
      properties: {
        fitInto: { type: Object, value: window, observer: '_onFitIntoChanged' },
        horizontalAlign: { type: String, value: 'left' },
        verticalAlign: { type: String, value: 'bottom' },
        duration: { type: Number, value: 3e3 },
        text: { type: String, value: '' },
        noCancelOnOutsideClick: { type: Boolean, value: !0 },
        noAutoFocus: { type: Boolean, value: !0 }
      },
      listeners: { transitionend: '__onTransitionEnd' },
      get visible() {
        return zo._warn('`visible` is deprecated, use `opened` instead'), this.opened;
      },
      get _canAutoClose() {
        return this.duration > 0 && this.duration !== 1 / 0;
      },
      created: function() {
        (this._autoClose = null), Lo.requestAvailability();
      },
      show: function(t) {
        for (var e in ('string' == typeof t && (t = { text: t }), t))
          0 === e.indexOf('_')
            ? zo._warn('The property "' + e + '" is private and was not set.')
            : e in this
            ? (this[e] = t[e])
            : zo._warn('The property "' + e + '" is not valid.');
        this.open();
      },
      hide: function() {
        this.close();
      },
      __onTransitionEnd: function(t) {
        t &&
          t.target === this &&
          'opacity' === t.propertyName &&
          (this.opened ? this._finishRenderOpened() : this._finishRenderClosed());
      },
      _openedChanged: function() {
        null !== this._autoClose && (this.cancelAsync(this._autoClose), (this._autoClose = null)),
          this.opened
            ? (mr && mr !== this && mr.close(),
              (mr = this),
              this.fire('iron-announce', { text: this.text }),
              this._canAutoClose && (this._autoClose = this.async(this.close, this.duration)))
            : mr === this && (mr = null),
          fr._openedChanged.apply(this, arguments);
      },
      _renderOpened: function() {
        this.classList.add('paper-toast-open');
      },
      _renderClosed: function() {
        this.classList.remove('paper-toast-open');
      },
      _onFitIntoChanged: function(t) {
        this.positionTarget = t;
      }
    });
    const gr = at`
  html {
    --anypoint-color-primary: #00a2df;
    --anypoint-color-secondary: #506773;
    --anypoint-color-danger: #d1344e;
    --anypoint-color-success: #17bc65;
    --anypoint-color-tertiary: #ffffff;

    --anypoint-color-coreBlue1: #abe2f5;
    --anypoint-color-coreBlue2: #48c1ed;
    --anypoint-color-coreBlue3: #00a2df;
    --anypoint-color-coreBlue4: #087299;
    --anypoint-color-coreBlue5: #114459;

    --anypoint-color-robustBlue1: #a1b1b8;
    --anypoint-color-robustBlue2: #6b8a99;
    --anypoint-color-robustBlue3: #506773;
    --anypoint-color-robustBlue4: #32444d;
    --anypoint-color-robustBlue5: #272f33;

    --anypoint-color-futureGreen1: #aaf2cb;
    --anypoint-color-futureGreen2: #33cc7a;
    --anypoint-color-futureGreen3: #17bc65;
    --anypoint-color-futureGreen4: #0e8c48;
    --anypoint-color-futureGreen5: #174d30;

    --anypoint-color-aluminum1: #f9fafb;
    --anypoint-color-aluminum2: #f4f5f6;
    --anypoint-color-aluminum3: #e8e9ea;
    --anypoint-color-aluminum4: #cacbcc;
    --anypoint-color-aluminum5: #989a9b;

    --anypoint-color-steel1: #6b6c6d;
    --anypoint-color-steel2: #58595a;
    --anypoint-color-steel3: #3a3b3c;
    --anypoint-color-steel4: #262728;
    --anypoint-color-steel5: #121314;

    --anypoint-color-yellow3: #f2be24;
    --anypoint-color-viridian3: #00b49d;
    --anypoint-color-teal3: #00b5d1;
    --anypoint-color-navy3: #178bea;
    --anypoint-color-indigo3: #5e66f9;
    --anypoint-color-violet3: #9a63f9;
    --anypoint-color-red3: #d1344e;
  }
`;
    try {
      document.adoptedStyleSheets = document.adoptedStyleSheets.concat(gr.styleSheet);
    } catch (t) {
      {
        const t = document.createElement('style');
        (t.type = 'text/css'), (t.innerHTML = gr.cssText), document.getElementsByTagName('head')[0].appendChild(t);
      }
    }
    const yr = at`
  html {
    @font-face {
      font-family: 'DIN Pro';
      src: url('https://cdn.anypoint.mulesoft.com/artifacts/anypoint-styles/fonts/DINPro-Light.eot');
      src: url('https://cdn.anypoint.mulesoft.com/artifacts/anypoint-styles/fonts/DINPro-Light.woff2') format('woff2'),
        url('https://cdn.anypoint.mulesoft.com/artifacts/anypoint-styles/fonts/DINPro-Light.woff') format('woff'),
        url('https://cdn.anypoint.mulesoft.com/artifacts/anypoint-styles/fonts/DINPro-Light.ttf') format('truetype'),
        url('https://cdn.anypoint.mulesoft.com/artifacts/anypoint-styles/fonts/DINPro-Light.svg') format('svg');
      font-weight: 300;
      font-style: normal;
    }
    /* Regular - OpenSans */
    @font-face {
      font-family: 'Open Sans';
      src: url('https://cdn.anypoint.mulesoft.com/artifacts/anypoint-styles/fonts/OpenSans-Regular.eot');
      src: url('https://cdn.anypoint.mulesoft.com/artifacts/anypoint-styles/fonts/OpenSans-Regular.eot?#iefix')
          format('embedded-opentype'),
        url('https://cdn.anypoint.mulesoft.com/artifacts/anypoint-styles/fonts/OpenSans-Regular.woff2') format('woff2'),
        url('https://cdn.anypoint.mulesoft.com/artifacts/anypoint-styles/fonts/OpenSans-Regular.woff') format('woff'),
        url('https://cdn.anypoint.mulesoft.com/artifacts/anypoint-styles/fonts/OpenSans-Regular.ttf') format('truetype'),
        url('https://cdn.anypoint.mulesoft.com/artifacts/anypoint-styles/fonts/OpenSans-Regular.svg') format('svg');
      font-weight: 400;
      font-style: normal;
    }
    /* Semibold - OpenSansSemiBold */
    @font-face {
      font-family: 'Open Sans';
      src: url('https://cdn.anypoint.mulesoft.com/artifacts/anypoint-styles/fonts/OpenSans-Semibold.eot');
      src: url('https://cdn.anypoint.mulesoft.com/artifacts/anypoint-styles/fonts/OpenSans-Semibold.eot?#iefix')
          format('embedded-opentype'),
        url('https://cdn.anypoint.mulesoft.com/artifacts/anypoint-styles/fonts/OpenSans-Semibold.woff2') format('woff2'),
        url('https://cdn.anypoint.mulesoft.com/artifacts/anypoint-styles/fonts/OpenSans-Semibold.woff') format('woff'),
        url('https://cdn.anypoint.mulesoft.com/artifacts/anypoint-styles/fonts/OpenSans-Semibold.ttf') format('truetype'),
        url('https://cdn.anypoint.mulesoft.com/artifacts/anypoint-styles/fonts/OpenSans-Semibold.svg') format('svg');
      font-weight: 600;
      font-style: normal;
    }
    /* Bold - OpenSansBold */
    @font-face {
      font-family: 'Open Sans';
      src: url('https://cdn.anypoint.mulesoft.com/artifacts/anypoint-styles/fonts/OpenSans-Bold.eot');
      src: url('https://cdn.anypoint.mulesoft.com/artifacts/anypoint-styles/fonts/OpenSans-Bold.eot?#iefix')
          format('embedded-opentype'),
        url('https://cdn.anypoint.mulesoft.com/artifacts/anypoint-styles/fonts/OpenSans-Bold.woff2') format('woff2'),
        url('https://cdn.anypoint.mulesoft.com/artifacts/anypoint-styles/fonts/OpenSans-Bold.woff') format('woff'),
        url('https://cdn.anypoint.mulesoft.com/artifacts/anypoint-styles/fonts/OpenSans-Bold.ttf') format('truetype'),
        url('https://cdn.anypoint.mulesoft.com/artifacts/anypoint-styles/fonts/OpenSans-Bold.svg') format('svg');
      font-weight: 700;
      font-style: normal;
    }
    /* Light - OpenSansLight */
    @font-face {
      font-family: 'Open Sans';
      src: url('https://cdn.anypoint.mulesoft.com/artifacts/anypoint-styles/fonts/OpenSans-Light.eot');
      src: url('https://cdn.anypoint.mulesoft.com/artifacts/anypoint-styles/fonts/OpenSans-Light.eot?#iefix')
          format('embedded-opentype'),
        url('https://cdn.anypoint.mulesoft.com/artifacts/anypoint-styles/fonts/OpenSans-Light.woff2') format('woff2'),
        url('https://cdn.anypoint.mulesoft.com/artifacts/anypoint-styles/fonts/OpenSans-Light.woff') format('woff'),
        url('https://cdn.anypoint.mulesoft.com/artifacts/anypoint-styles/fonts/OpenSans-Light.ttf') format('truetype'),
        url('https://cdn.anypoint.mulesoft.com/artifacts/anypoint-styles/fonts/OpenSans-Light.svg') format('svg');
      font-weight: 200;
      font-style: normal;
    }
    /* Light Italic - OpenSansLightItalic */
    @font-face {
      font-family: 'Open Sans';
      src: url('https://cdn.anypoint.mulesoft.com/artifacts/anypoint-styles/fonts/OpenSans-LightItalic.eot');
      src: url('https://cdn.anypoint.mulesoft.com/artifacts/anypoint-styles/fonts/OpenSans-LightItalic.eot?#iefix')
          format('embedded-opentype'),
        url('https://cdn.anypoint.mulesoft.com/artifacts/anypoint-styles/fonts/OpenSans-LightItalic.woff2')
          format('woff2'),
        url('https://cdn.anypoint.mulesoft.com/artifacts/anypoint-styles/fonts/OpenSans-LightItalic.woff') format('woff'),
        url('https://cdn.anypoint.mulesoft.com/artifacts/anypoint-styles/fonts/OpenSans-LightItalic.ttf')
          format('truetype'),
        url('https://cdn.anypoint.mulesoft.com/artifacts/anypoint-styles/fonts/OpenSans-LightItalic.svg') format('svg');
      font-weight: 200;
      font-style: italic;
    }
    /* Monospaced (for code examples, logs, etc) */
    @font-face {
      font-family: 'Source Code Pro';
      src: url('https://cdn.anypoint.mulesoft.com/artifacts/anypoint-styles/fonts/SourceCodePro-Regular.eot');
      src: url('https://cdn.anypoint.mulesoft.com/artifacts/anypoint-styles/fonts/SourceCodePro-Regular.eot?#iefix')
          format('embedded-opentype'),
        url('https://cdn.anypoint.mulesoft.com/artifacts/anypoint-styles/fonts/SourceCodePro-Regular.woff2')
          format('woff2'),
        url('https://cdn.anypoint.mulesoft.com/artifacts/anypoint-styles/fonts/SourceCodePro-Regular.woff') format('woff'),
        url('https://cdn.anypoint.mulesoft.com/artifacts/anypoint-styles/fonts/SourceCodePro-Regular.ttf')
          format('truetype'),
        url('https://cdn.anypoint.mulesoft.com/artifacts/anypoint-styles/fonts/SourceCodePro-Regular.svg') format('svg');
      font-weight: 400;
      font-style: normal;
    }
  }
`;
    try {
      document.adoptedStyleSheets = document.adoptedStyleSheets.concat(yr.styleSheet);
    } catch (t) {
      {
        const t = document.createElement('style');
        (t.type = 'text/css'), (t.innerHTML = yr.cssText), document.getElementsByTagName('head')[0].appendChild(t);
      }
    }
    const br = at`
  html {
    --font-family: 'Open Sans', 'DIN Pro', sans-serif;
    --font-family-din: 'DIN Pro', sans-serif;
    --font-code-family: 'Source Code Pro', 'Consolas', 'Menlo', monospace;
    /* Header 1 */
    --font-header1-font-size: 30px;
    --font-header1-font-weight: 100;
    --font-header1-letter-spacing: -0.5px;
    --font-header1-margin-bottom: 20px;
    /* Header 2 */
    --font-header2-font-size: 25px;
    --font-header2-font-weight: 100;
    --font-header2-letter-spacing: -0.3px;
    --font-header2-margin-bottom: 20px;
    /* Header 3 */
    --font-header3-font-size: 20px;
    --font-header3-font-weight: 100;
    --font-header3-letter-spacing: -0.25px;
    --font-header3-margin-bottom: 20px;
    /* Header 4 */
    --font-header4-font-size: 18px;
    --font-header4-font-weight: 100;
    --font-header4-letter-spacing: -0.2px;
    --font-header4-margin-bottom: 20px;
    /* Header 5 */
    --font-header5-font-size: 16px;
    --font-header5-font-weight: 100;
    --font-header5-letter-spacing: -0.2px;
    --font-header5-margin-bottom: 20px;
    /* Header 6 */
    --font-header6-font-size: 12px;
    --font-header6-font-weight: 700;
    --font-header6-letter-spacing: 0;
    --font-header6-margin-bottom: 20px;
    /* Body text */
    --font-body-font-size: 14px;
    --font-body-letter-spacing: 0;
    --font-body-font-weight: 400;
    /* Body text small */
    --font-body-small-font-size: 14px;
    --font-body-small-letter-spacing: 0;
    --font-body-small-font-weight: 400;
    /* Blockquote container */
    --font-blockquote-font-style: italic;
    --font-blockquote-font-weight: 200;
    --font-blockquote-font-size: 18px;
    /* Code block */
    --font-code-font-size: 14px;
    --font-code-font-weight: 500;
    --font-code-line-height: 20px;
  }
`;
    try {
      document.adoptedStyleSheets = document.adoptedStyleSheets.concat(br.styleSheet);
    } catch (t) {
      {
        const t = document.createElement('style');
        (t.type = 'text/css'), (t.innerHTML = br.cssText), document.getElementsByTagName('head')[0].appendChild(t);
      }
    }
    /**
@license
Copyright 2016 The Advanced REST client authors <arc@mulesoft.com>
Licensed under the Apache License, Version 2.0 (the "License"); you may not
use this file except in compliance with the License. You may obtain a copy of
the License at
http://www.apache.org/licenses/LICENSE-2.0
Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the
License for the specific language governing permissions and limitations under
the License.
*/ window.customElements.define(
      'oauth2-authorization',
      class extends HTMLElement {
        get tokenInfo() {
          return this._tokenInfo;
        }
        constructor() {
          super(),
            (this._frameLoadErrorHandler = this._frameLoadErrorHandler.bind(this)),
            (this._frameLoadHandler = this._frameLoadHandler.bind(this)),
            (this._tokenRequestedHandler = this._tokenRequestedHandler.bind(this)),
            (this._popupMessageHandler = this._popupMessageHandler.bind(this)),
            (this._popupObserver = this._popupObserver.bind(this));
        }
        connectedCallback() {
          window.addEventListener('oauth2-token-requested', this._tokenRequestedHandler),
            window.addEventListener('message', this._popupMessageHandler),
            this.setAttribute('aria-hidden', 'true');
        }
        disconnectedCallback() {
          window.removeEventListener('oauth2-token-requested', this._tokenRequestedHandler),
            window.removeEventListener('message', this._popupMessageHandler);
        }
        clear() {
          (this._state = void 0), (this._settings = void 0), this._cleanupFrame(), this._cleanupPopup();
        }
        _cleanupPopup() {
          this._popup && (this._popup.closed || this._popup.close(), (this._popup = void 0));
        }
        _tokenRequestedHandler(t) {
          t.preventDefault(), t.stopPropagation(), t.stopImmediatePropagation(), this.authorize(t.detail);
        }
        authorize(t) {
          (this._tokenInfo = void 0),
            (this._type = t.type),
            (this._state = t.state || this.randomString(6)),
            (this._settings = t),
            (this._errored = !1),
            (this._overrideExchangeCodeFlow = t.overrideExchangeCodeFlow);
          try {
            this._sanityCheck(t);
          } catch (e) {
            throw (this._dispatchError({
              message: e.message,
              code: 'oauth_error',
              state: this._state,
              interactive: t.interactive
            }),
            e);
          }
          switch (t.type) {
            case 'implicit':
              this._authorize(this._constructPopupUrl(t, 'token'), t);
              break;
            case 'authorization_code':
              this._authorize(this._constructPopupUrl(t, 'code'), t);
              break;
            case 'client_credentials':
              this.authorizeClientCredentials(t).catch(() => {});
              break;
            case 'password':
              this.authorizePassword(t).catch(() => {});
              break;
            default:
              this.authorizeCustomGrant(t).catch(() => {});
          }
        }
        _sanityCheck(t) {
          if ('implicit' === t.type || 'authorization_code' === t.type) {
            try {
              this._checkUrl(t.authorizationUri);
            } catch (t) {
              throw new Error(`authorizationUri: ${t.message}`);
            }
            if (t.accessTokenUri)
              try {
                this._checkUrl(t.accessTokenUri);
              } catch (t) {
                throw new Error(`accessTokenUri: ${t.message}`);
              }
          } else if (t.accessTokenUri && t.accessTokenUri)
            try {
              this._checkUrl(t.accessTokenUri);
            } catch (t) {
              throw new Error(`accessTokenUri: ${t.message}`);
            }
        }
        _checkUrl(t) {
          if (!t) throw new TypeError('the value is missing');
          if ('string' != typeof t) throw new TypeError('the value is not a string');
          if (-1 === t.indexOf('http://') && -1 === t.indexOf('https://'))
            throw new Error('the value has invalid scheme');
        }
        _authorize(t, e) {
          (this._settings = e),
            (this._errored = !1),
            !1 === e.interactive ? this._authorizeTokenNonInteractive(t) : this._authorizePopup(t);
        }
        _authorizePopup(t) {
          (this._popup = window.open(
            t,
            'oauth-window',
            'menubar=no,location=no,resizable=yes,scrollbars=yes,status=no,width=800,height=600'
          )),
            this._popup
              ? (this._popup.window.focus(), this._observePopupState())
              : this._dispatchError({
                  message: 'Authorization popup is being blocked.',
                  code: 'popup_blocked',
                  state: this._state,
                  interactive: this._settings.interactive
                });
        }
        _authorizeTokenNonInteractive(t) {
          const e = document.createElement('iframe');
          (e.style.border = '0'),
            (e.style.width = '0'),
            (e.style.height = '0'),
            (e.style.overflow = 'hidden'),
            e.addEventListener('error', this._frameLoadErrorHandler),
            e.addEventListener('load', this._frameLoadHandler),
            (e.id = 'oauth2-authorization-frame'),
            e.setAttribute('data-owner', 'arc-oauth-authorization'),
            document.body.appendChild(e),
            (e.src = t),
            (this._iframe = e);
        }
        _cleanupFrame() {
          if (this._iframe) {
            this._iframe.removeEventListener('error', this._frameLoadErrorHandler),
              this._iframe.removeEventListener('load', this._frameLoadHandler);
            try {
              document.body.removeChild(this._iframe);
            } catch (t) {}
            this._iframe = void 0;
          }
        }
        _frameLoadErrorHandler() {
          this._errored ||
            (this._dispatchResponse({ interactive: !1, code: 'iframe_load_error', state: this._state }), this.clear());
        }
        _frameLoadHandler() {
          this.__frameLoadInfo ||
            ((this.__frameLoadInfo = !0),
            (this.__frameLoadTimeout = setTimeout(() => {
              this.tokenInfo ||
                this._errored ||
                this._dispatchResponse({ interactive: !1, code: 'not_authorized', state: this._state }),
                this.clear(),
                (this.__frameLoadInfo = !1);
            }, 700)));
        }
        _observePopupState() {
          this.__popupCheckInterval = setInterval(this._popupObserver, 250);
        }
        _popupObserver() {
          (this._popup && !this._popup.closed) ||
            (clearInterval(this.__popupCheckInterval),
            (this.__popupCheckInterval = void 0),
            this._beforePopupUnloadHandler());
        }
        _constructPopupUrl(t, e) {
          let n = t.authorizationUri;
          if (
            (-1 === n.indexOf('?') ? (n += '?') : (n += '&'),
            (n += 'response_type=' + e),
            (n += '&client_id=' + encodeURIComponent(t.clientId || '')),
            t.redirectUri && (n += '&redirect_uri=' + encodeURIComponent(t.redirectUri)),
            t.scopes && t.scopes.length && (n += '&scope=' + this._computeScope(t.scopes)),
            (n += '&state=' + encodeURIComponent(this._state)),
            t.includeGrantedScopes && (n += '&include_granted_scopes=true'),
            t.loginHint && (n += '&login_hint=' + encodeURIComponent(t.loginHint)),
            !1 === t.interactive && (n += '&prompt=none'),
            t.customData)
          ) {
            const i = 'token' === e ? 'auth' : 'token',
              s = t.customData[i];
            s && (n = this._applyCustomSettingsQuery(n, s));
          }
          return n;
        }
        _computeScope(t) {
          if (!t) return '';
          const e = t.join(' ');
          return encodeURIComponent(e);
        }
        _popupMessageHandler(t) {
          (this._popup || this._iframe) && this._processPopupData(t);
        }
        _processPopupData(t) {
          const e = t.data;
          !(this._overrideExchangeCodeFlow || (e && e.oauth2response)) ||
            (this._settings || (this._settings = {}),
            e.state !== this._state
              ? (this._dispatchError({
                  message: 'Invalid state returned by the OAuth server.',
                  code: 'invalid_state',
                  state: this._state,
                  serverState: e.state,
                  interactive: this._settings.interactive
                }),
                (this._errored = !0),
                this._clearIframeTimeout(),
                this.clear())
              : 'error' in e
              ? (this._dispatchError({
                  message: e.errorDescription || 'The request is invalid.',
                  code: e.error || 'oauth_error',
                  state: this._state,
                  interactive: this._settings.interactive
                }),
                (this._errored = !0),
                this._clearIframeTimeout(),
                this.clear())
              : 'implicit' === this._type
              ? (this._handleTokenInfo(e), this.clear())
              : 'authorization_code' === this._type &&
                (this._overrideExchangeCodeFlow
                  ? this._dispatchCodeResponse(e)
                  : ((this._exchangeCodeValue = e.code),
                    this._exchangeCode(e.code).catch(() => {}),
                    this._clearIframeTimeout())));
        }
        _clearIframeTimeout() {
          this.__frameLoadTimeout && (clearTimeout(this.__frameLoadTimeout), (this.__frameLoadTimeout = void 0));
        }
        randomString(t) {
          return Math.round(Math.pow(36, t + 1) - Math.random() * Math.pow(36, t))
            .toString(36)
            .slice(1);
        }
        _beforePopupUnloadHandler() {
          if (this.tokenInfo || ('authorization_code' === this._type && this._exchangeCodeValue)) return;
          const t = this._settings || {};
          this._dispatchError({
            message: 'No response has been recorded.',
            code: 'no_response',
            state: this._state,
            interactive: t.interactive
          }),
            this.clear();
        }
        async _exchangeCode(t) {
          const e = this._settings.accessTokenUri,
            n = this._getCodeEchangeBody(this._settings, t);
          try {
            const t = await this._requestToken(e, n, this._settings),
              i = this._handleTokenInfo(t);
            return this.clear(), i;
          } catch (t) {
            this._handleTokenCodeError(t);
          }
        }
        _getCodeEchangeBody(t, e) {
          let n = 'grant_type=authorization_code';
          return (
            (n += '&client_id=' + encodeURIComponent(t.clientId)),
            t.redirectUri && (n += '&redirect_uri=' + encodeURIComponent(t.redirectUri)),
            (n += '&code=' + encodeURIComponent(e)),
            t.clientSecret ? (n += '&client_secret=' + encodeURIComponent(t.clientSecret)) : (n += '&client_secret='),
            n
          );
        }
        _requestToken(t, e, n) {
          if (n.customData) {
            const i = n.customData.token;
            i && (t = this._applyCustomSettingsQuery(t, i)), (e = this._applyCustomSettingsBody(e, n.customData));
          }
          return new Promise((i, s) => {
            const o = new XMLHttpRequest();
            o.addEventListener('load', (t) => this._processTokenResponseHandler(t, i, s)),
              o.addEventListener('error', (t) => this._processTokenResponseErrorHandler(t, s)),
              o.open('POST', t),
              o.setRequestHeader('content-type', 'application/x-www-form-urlencoded'),
              n.customData && this._applyCustomSettingsHeaders(o, n.customData);
            try {
              o.send(e);
            } catch (t) {
              s(new Error('Client request error: ' + t.message));
            }
          });
        }
        _processTokenResponseHandler(t, e, n) {
          const i = t.target.status,
            s = t.target.response;
          if (404 === i) {
            return void n(new Error('Authorization URI is invalid. Received status 404.'));
          }
          if (i >= 400 && i < 500) {
            return void n(new Error('Client error: ' + s));
          }
          if (i >= 500) {
            return void n(new Error('Authorization server error. Response code is ' + i));
          }
          let o;
          try {
            o = this._processCodeResponse(s, t.target.getResponseHeader('content-type'));
          } catch (t) {
            return void n(new Error(t.message));
          }
          e(o);
        }
        _processTokenResponseErrorHandler(t, e) {
          const n = t.target.status;
          let i = 'The request to the authorization server failed.';
          n && (i += ' Response code is: ' + n), e(new Error(i));
        }
        _processCodeResponse(t, e) {
          if (!t) throw new Error('Code response body is empty.');
          let n;
          return (
            -1 !== e.indexOf('json')
              ? ((n = JSON.parse(t)),
                Object.keys(n).forEach((t) => {
                  const e = this._camel(t);
                  e && (n[e] = n[t]);
                }))
              : ((n = {}),
                t.split('&').forEach((t) => {
                  const e = t.split('='),
                    i = e[0],
                    s = this._camel(i),
                    o = decodeURIComponent(e[1]);
                  (n[i] = o), (n[s] = o);
                })),
            n
          );
        }
        _handleTokenInfo(t) {
          return (
            (this._tokenInfo = t),
            (t.interactive = this._settings.interactive),
            'error' in t
              ? this._dispatchError({
                  message: t.errorDescription || 'The request is invalid.',
                  code: t.error,
                  state: this._state,
                  interactive: this._settings.interactive
                })
              : this._dispatchResponse(t),
            this.__frameLoadTimeout && (clearTimeout(this.__frameLoadTimeout), (this.__frameLoadTimeout = void 0)),
            (this._settings = void 0),
            (this._exchangeCodeValue = void 0),
            t
          );
        }
        _handleTokenCodeError(t) {
          throw (this._dispatchError({
            message: "Couldn't connect to the server. " + t.message,
            code: 'request_error',
            state: this._state,
            interactive: this._settings.interactive
          }),
          this.clear(),
          t);
        }
        _camel(t) {
          let e,
            n = 0,
            i = !1;
          for (; (e = t[n]); )
            ('_' === e || '-' === e) &&
              n + 1 < t.length &&
              ((t = t.substr(0, n) + t[n + 1].toUpperCase() + t.substr(n + 2)), (i = !0)),
              n++;
          return i ? t : void 0;
        }
        async authorizePassword(t) {
          this._settings = t;
          const e = t.accessTokenUri,
            n = this._getPasswordBody(t);
          try {
            const i = await this._requestToken(e, n, t),
              s = this._handleTokenInfo(i);
            return this.clear(), s;
          } catch (t) {
            this._handleTokenCodeError(t);
          }
        }
        _getPasswordBody(t) {
          let e = 'grant_type=password';
          return (
            (e += '&username=' + encodeURIComponent(t.username)),
            (e += '&password=' + encodeURIComponent(t.password)),
            t.clientId && (e += '&client_id=' + encodeURIComponent(t.clientId)),
            t.scopes && t.scopes.length && (e += '&scope=' + encodeURIComponent(t.scopes.join(' '))),
            e
          );
        }
        async authorizeClientCredentials(t) {
          this._settings = t;
          const e = t.accessTokenUri,
            n = this._getClientCredentialsBody(t);
          try {
            const i = await this._requestToken(e, n, t),
              s = this._handleTokenInfo(i);
            return this.clear(), s;
          } catch (t) {
            this._handleTokenCodeError(t);
          }
        }
        _getClientCredentialsBody(t) {
          let e = 'grant_type=client_credentials';
          return (
            t.clientId && (e += '&client_id=' + encodeURIComponent(t.clientId)),
            t.clientSecret && (e += '&client_secret=' + encodeURIComponent(t.clientSecret)),
            t.scopes && t.scopes.length && (e += '&scope=' + this._computeScope(t.scopes)),
            e
          );
        }
        async authorizeCustomGrant(t) {
          this._settings = t;
          const e = t.accessTokenUri,
            n = this._getCustomGrantBody(t);
          try {
            const i = await this._requestToken(e, n, t),
              s = this._handleTokenInfo(i);
            return this.clear(), s;
          } catch (t) {
            this._handleTokenCodeError(t);
          }
        }
        _getCustomGrantBody(t) {
          const e = ['grant_type=' + encodeURIComponent(t.type)];
          return (
            t.clientId && (e[e.length] = 'client_id=' + encodeURIComponent(t.clientId)),
            t.clientSecret && (e[e.length] = 'client_secret=' + encodeURIComponent(t.clientSecret)),
            t.scopes && t.scopes.length && (e[e.length] = 'scope=' + this._computeScope(t.scopes)),
            t.redirectUri && (e[e.length] = 'redirect_uri=' + encodeURIComponent(t.redirectUri)),
            t.username && (e[e.length] = 'username=' + encodeURIComponent(t.username)),
            t.password && (e[e.length] = 'password=' + encodeURIComponent(t.password)),
            e.join('&')
          );
        }
        _applyCustomSettingsQuery(t, e) {
          return e && e.parameters
            ? ((t += -1 === t.indexOf('?') ? '?' : '&'),
              (t += e.parameters
                .map((t) => {
                  let e = t.value;
                  return e && (e = encodeURIComponent(e)), encodeURIComponent(t.name) + '=' + e;
                })
                .join('&')))
            : t;
        }
        _applyCustomSettingsHeaders(t, e) {
          e &&
            e.token &&
            e.token.headers &&
            e.token.headers.forEach((e) => {
              try {
                t.setRequestHeader(e.name, e.value);
              } catch (t) {}
            });
        }
        _applyCustomSettingsBody(t, e) {
          return e && e.token && e.token.body
            ? (t +=
                '&' +
                e.token.body
                  .map(function(t) {
                    let e = t.value;
                    return e && (e = encodeURIComponent(e)), encodeURIComponent(t.name) + '=' + e;
                  })
                  .join('&'))
            : t;
        }
        _dispatchError(t) {
          const e = new CustomEvent('oauth2-error', { bubbles: !0, composed: !0, detail: t });
          this.dispatchEvent(e);
        }
        _dispatchCodeResponse(t) {
          const e = new CustomEvent('oauth2-code-response', { bubbles: !0, composed: !0, detail: t });
          this.dispatchEvent(e), this.clear();
        }
        _dispatchResponse(t) {
          const e = new CustomEvent('oauth2-token-response', { bubbles: !0, composed: !0, detail: t });
          this.dispatchEvent(e);
        }
        get ontokenerror() {
          return this['_onoauth2-error'];
        }
        set ontokenerror(t) {
          this._registerCallback('oauth2-error', t);
        }
        get ontokenresponse() {
          return this['_onoauth2-token-response'];
        }
        set ontokenresponse(t) {
          this._registerCallback('oauth2-token-response', t);
        }
        _registerCallback(t, e) {
          const n = `_on${t}`;
          this[n] && this.removeEventListener(t, this[n]),
            'function' == typeof e ? ((this[n] = e), this.addEventListener(t, e)) : (this[n] = null);
        }
      }
    );
    /**
@license
Copyright 2018 The Advanced REST client authors <arc@mulesoft.com>
Licensed under the Apache License, Version 2.0 (the "License"); you may not
use this file except in compliance with the License. You may obtain a copy of
the License at
http://www.apache.org/licenses/LICENSE-2.0
Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the
License for the specific language governing permissions and limitations under
the License.
*/
    const vr = 'https://anypoint.mulesoft.com',
      wr = 'authorization_code',
      Cr = {
        _clientId: null,
        get clientId() {
          return Cr._clientId;
        },
        set clientId(t) {
          t && t !== Cr._clientId ? ((Cr._clientId = t), Cr.initAuth2()) : (Cr._clientId = t);
        },
        _redirectUri: null,
        get redirectUri() {
          return Cr._redirectUri;
        },
        set redirectUri(t) {
          t && t !== Cr._redirectUri ? ((Cr._redirectUri = t), Cr.initAuth2()) : (Cr._redirectUri = t);
        },
        _authType: wr,
        get authType() {
          return Cr._authType;
        },
        set authType(t) {
          t && t !== Cr._authType ? ((Cr._authType = t), Cr.initAuth2()) : (Cr._authType = t);
        },
        authorizationUri: `${vr}/accounts/api/v2/oauth2/authorize`,
        accessTokenUri: `${vr}/accounts/api/v2/oauth2/token`,
        logoutUri: `${vr}/accounts/api/logout/`,
        _signedIn: !1,
        get signedIn() {
          return Cr._signedIn;
        },
        set signedIn(t) {
          if (t !== Cr._signedIn) {
            Cr._signedIn = t;
            for (let e = 0; e < Cr.signinAwares.length; e++) Cr.signinAwares[e]._signedIn = t;
          }
        },
        _accessToken: null,
        get accessToken() {
          return Cr._accessToken;
        },
        set accessToken(t) {
          if (t !== Cr._accessToken) {
            Cr._accessToken = t;
            for (let e = 0; e < Cr.signinAwares.length; e++) Cr.signinAwares[e]._accessToken = t;
          }
        },
        signinAwares: [],
        _forceOauthEvents: null,
        get forceOauthEvents() {
          return Cr._forceOauthEvents;
        },
        set forceOauthEvents(t) {
          Cr._forceOauthEvents !== t &&
            ((Cr._forceOauthEvents = t),
            t
              ? (Cr._clearOauthAuthorization(), Cr._observeWindowEvents())
              : (Cr._setOauthAuthorization(), Cr._unobserveWindowEvents()));
        },
        init: function(t) {
          Cr.forceOauthEvents || Cr._setOauthAuthorization(), Cr.initAuth2(t);
        },
        _setOauthAuthorization() {
          let t;
          if (Cr._oauthFactory) t = Cr._oauthFactory;
          else {
            const e = 'oauth2-authorization[data-owner="anypoint-signin-aware"]';
            t = document.body.querySelector(e);
          }
          t ||
            ((Cr._oauthFactory = document.createElement('oauth2-authorization')),
            (Cr._oauthFactory.dataset.owner = 'anypoint-signin-aware'),
            Cr._oauthFactory.addEventListener('oauth2-error', Cr._oauth2ErrorHandler),
            Cr._oauthFactory.addEventListener('oauth2-token-response', Cr._oauth2TokenHandler),
            document.body.appendChild(Cr._oauthFactory));
        },
        _clearOauthAuthorization: function() {
          Cr._oauthFactory &&
            (Cr._oauthFactory.removeEventListener('oauth2-error', Cr._oauth2ErrorHandler),
            Cr._oauthFactory.removeEventListener('oauth2-token-response', Cr._oauth2TokenHandler),
            document.body.removeChild(Cr._oauthFactory),
            (Cr._oauthFactory = void 0));
        },
        _observeWindowEvents() {
          window.addEventListener('oauth2-error', Cr._oauth2ErrorHandler),
            window.addEventListener('oauth2-token-response', Cr._oauth2TokenHandler);
        },
        _unobserveWindowEvents() {
          window.removeEventListener('oauth2-error', Cr._oauth2ErrorHandler),
            window.removeEventListener('oauth2-token-response', Cr._oauth2TokenHandler);
        },
        initAuth2: function(t) {
          Cr._initSignIn(t);
        },
        generateState: function() {
          let t = '';
          const e = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
          for (let n = 0; n < 6; n++) t += e.charAt(Math.floor(Math.random() * e.length));
          return t;
        },
        _initSignIn: function(t) {
          Cr.clientId && Cr.redirectUri && Cr.signIn(!1, t);
        },
        assertAuthInitialized: function() {
          if (!Cr.clientId) throw new Error('AuthEngine not initialized. clientId has not been configured.');
          if (!Cr.redirectUri) throw new Error('AuthEngine not initialized. redirectUri has not been configured.');
        },
        oauth2Config: function() {
          Cr._lastState = Cr.generateState();
          const t = {
            type: Cr.authType,
            authorizationUri: Cr.authorizationUri,
            clientId: Cr.clientId,
            redirectUri: Cr.redirectUri,
            state: Cr._lastState,
            scopes: Cr.scopes
          };
          return Cr.authType === wr && ((t.accessTokenUri = Cr.accessTokenUri), (t.overrideExchangeCodeFlow = !0)), t;
        },
        signIn: function(t, e) {
          if (!Cr._oauthFactory && !Cr.forceOauthEvents) return;
          Cr.assertAuthInitialized();
          const n = Cr.oauth2Config();
          if ((!1 === t && (n.interactive = t), Cr.forceOauthEvents)) {
            const t = new CustomEvent('oauth2-token-requested', { bubbles: !0, composed: !0, detail: n });
            (e || document.body).dispatchEvent(t);
          } else Cr._oauthFactory.authorize(n);
        },
        signOut: function() {
          return Cr._logout()
            .catch(() => {})
            .then(() => Cr.setAuthData());
        },
        _oauth2TokenHandler: function(t) {
          const e = t.detail;
          e && Cr._lastState === t.detail.state && (e.accessToken ? Cr.setAuthData(e.accessToken) : Cr.setAuthData());
        },
        _oauth2ErrorHandler: function(t) {
          if (Cr._lastState !== t.detail.state) return;
          const e = t.detail.message;
          (Cr.accessToken = null), (Cr.signedIn = !1);
          for (let n = 0; n < Cr.signinAwares.length; n++)
            Cr.signinAwares[n]._updateStatus(),
              !1 !== t.detail.interactive && Cr.signinAwares[n].errorNotify({ message: e });
        },
        setAuthData: function(t) {
          (Cr.accessToken = t), (Cr.signedIn = !!t);
          for (let t = 0; t < Cr.signinAwares.length; t++) Cr.signinAwares[t]._updateStatus();
        },
        _logout: function() {
          const t = Cr.logoutUri;
          return new Promise(function(e, n) {
            const i = new XMLHttpRequest();
            i.open('GET', t),
              Cr.accessToken && i.setRequestHeader('Authorization', 'bearer ' + Cr.accessToken),
              i.addEventListener('load', function(t) {
                if (t.target.status > 299) return n(new Error('Delete token request failed.'));
                e();
              }),
              i.addEventListener('error', function(t) {
                const e = t.target.status;
                let i = 'Unable to delete the token.';
                e && (i += ' Response code is: ' + e), n(new Error(i));
              });
            try {
              i.send();
            } catch (t) {
              n(new Error('Unable to send the request.'));
            }
          });
        },
        attachSigninAware: function(t) {
          -1 === Cr.signinAwares.indexOf(t) &&
            (Cr.signinAwares.push(t),
            void 0 !== t.forceOauthEvents && (Cr.forceOauthEvents = t.forceOauthEvents),
            (t._signedIn = Cr.signedIn),
            (t._accessToken = Cr.accessToken)),
            Cr._initialized || (Cr.init(t), (Cr._initialized = !0));
        },
        detachSigninAware: function(t) {
          const e = Cr.signinAwares.indexOf(t);
          -1 !== e && Cr.signinAwares.splice(e, 1);
        },
        notifyError: function(t) {
          for (let e = 0; e < Cr.signinAwares.length; e++) Cr.signinAwares[e].errorNotify({ message: t });
        }
      };
    window.customElements.define(
      'anypoint-signin-aware',
      class extends ct {
        static get properties() {
          return {
            authType: { type: String },
            clientId: { type: String },
            redirectUri: { type: String },
            scopes: { type: String },
            forceOauthEvents: { type: Boolean }
          };
        }
        get accessToken() {
          return this._accessToken;
        }
        get _accessToken() {
          return this.__accessToken;
        }
        set _accessToken(t) {
          this.__accessToken !== t &&
            ((this.__accessToken = t),
            this.dispatchEvent(new CustomEvent('accesstoken-changed', { detail: { value: t } })));
        }
        get signedIn() {
          return this._signedIn;
        }
        get _signedIn() {
          return this.__signedIn;
        }
        set _signedIn(t) {
          this.__signedIn !== t &&
            ((this.__signedIn = t), this.dispatchEvent(new CustomEvent('signedin-changed', { detail: { value: t } })));
        }
        get redirectUri() {
          return this._redirectUri;
        }
        set redirectUri(t) {
          this._redirectUri !== t &&
            (t && -1 === (t = String(t)).indexOf('http') && (t = void 0),
            (this._redirectUri = t),
            this._redirectUriChanged(t));
        }
        get clientId() {
          return this._clientId;
        }
        set clientId(t) {
          this._clientId !== t && (t && (t = String(t)), (this._clientId = t), this._clientIdChanged(t));
        }
        get authType() {
          return this._authType;
        }
        set authType(t) {
          this._authType !== t && (t && (t = String(t)), (this._authType = t), this._authTypeChanged(t));
        }
        get scopes() {
          return this._scopes;
        }
        set scopes(t) {
          this._scopes !== t && (t && (t = String(t)), (this._scopes = t), this._scopesChanged(t));
        }
        connectedCallback() {
          super.connectedCallback && super.connectedCallback(),
            this.setAttribute('aria-hidden', 'true'),
            Cr.attachSigninAware(this);
        }
        disconnectedCallback() {
          super.disconnectedCallback && super.disconnectedCallback(), Cr.detachSigninAware(this);
        }
        signIn() {
          Cr.signIn(!0, this);
        }
        signOut() {
          return Cr.signOut();
        }
        errorNotify(t) {
          this.dispatchEvent(new CustomEvent('anypoint-signin-aware-error', { bubbles: !0, composed: !0, detail: t }));
        }
        _clientIdChanged(t) {
          Cr.clientId = t;
        }
        _authTypeChanged(t) {
          Cr.authType = t;
        }
        _scopesChanged(t) {
          const e = t && t.split(' ');
          Cr.scopes = e;
        }
        _redirectUriChanged(t) {
          Cr.redirectUri = t;
        }
        _updateStatus() {
          let t;
          (t = this.signedIn ? 'anypoint-signin-aware-success' : 'anypoint-signin-aware-signed-out'),
            this.dispatchEvent(new CustomEvent(t, { bubbles: !0, composed: !0, detail: this.user }));
        }
      }
    );
    /**
@license
Copyright 2019 The Advanced REST client authors <arc@mulesoft.com>
Licensed under the Apache License, Version 2.0 (the "License"); you may not
use this file except in compliance with the License. You may obtain a copy of
the License at
http://www.apache.org/licenses/LICENSE-2.0
Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the
License for the specific language governing permissions and limitations under
the License.
*/ var Sr = at`
  .buttonText {
    font-family: var(--arc-font-family, -apple-system, 'BlinkMacSystemFont', 'Helvetica Neue', 'Segoe UI', sans-serif);
    font-size: var(--arc-font-body1-font-size, 1rem);
    font-weight: var(--anypoint-signin-bold-font-weight, 600);
  }
`;
    /**
@license
Copyright 2017 Mulesoft.

All rights reserved.
*/ He((t) => {
      return class extends t {
        get hovered() {
          return this._hovered;
        }
        get _hovered() {
          return this.__hovered || !1;
        }
        set _hovered(t) {
          const e = this.__hovered;
          t !== e &&
            ((this.__hovered = t),
            this.requestUpdate && this.requestUpdate('hovered', e),
            t ? this.setAttribute('hovered', '') : this.removeAttribute('hovered'),
            this.dispatchEvent(new CustomEvent('hovered-changed', { composed: !0, detail: { value: t } })));
        }
        constructor() {
          super(),
            (this._hoverCallback = this._hoverCallback.bind(this)),
            (this._leaveCallback = this._leaveCallback.bind(this));
        }
        connectedCallback() {
          super.connectedCallback && super.connectedCallback(),
            this.addEventListener('mouseover', this._hoverCallback),
            this.addEventListener('mouseleave', this._leaveCallback);
        }
        disconnectedCallback() {
          super.disconnectedCallback && super.disconnectedCallback(),
            this.removeEventListener('mouseover', this._hoverCallback),
            this.removeEventListener('mouseleave', this._leaveCallback);
        }
        _hoverCallback() {
          this._hovered = !0;
        }
        _leaveCallback() {
          this._hovered = !1;
        }
      };
    });
    /**
@license
Copyright 2017 Mulesoft.

All rights reserved.
*/ const xr = He((t) => {
        return class extends t {
          static get properties() {
            return {
              toggles: { type: Boolean, reflect: !0 },
              active: { type: Boolean },
              ariaActiveAttribute: { type: String }
            };
          }
          get pressed() {
            return this._pressed;
          }
          get _pressed() {
            return this.__pressed || !1;
          }
          set _pressed(t) {
            this._setChanged('_pressed', t) &&
              (t ? this.setAttribute('pressed', '') : this.removeAttribute('pressed'),
              this.dispatchEvent(new CustomEvent('pressed-changed', { composed: !0, detail: { value: t } })),
              this._pressedChanged(t));
          }
          get active() {
            return this._active || !1;
          }
          set active(t) {
            this._setChanged('active', t) &&
              (t ? this.setAttribute('active', '') : this.removeAttribute('active'),
              this.dispatchEvent(new CustomEvent('active-changed', { composed: !0, detail: { value: t } })),
              this._activeChanged());
          }
          get pointerDown() {
            return this._pointerDown;
          }
          get _pointerDown() {
            return this.__pointerDown || !1;
          }
          set _pointerDown(t) {
            this._setChanged('_pointerDown', t);
          }
          get receivedFocusFromKeyboard() {
            return this._receivedFocusFromKeyboard || !1;
          }
          get _receivedFocusFromKeyboard() {
            return this.__receivedFocusFromKeyboard || !1;
          }
          set _receivedFocusFromKeyboard(t) {
            this._setChanged('_receivedFocusFromKeyboard', t);
          }
          get ariaActiveAttribute() {
            return this._ariaActiveAttribute;
          }
          set ariaActiveAttribute(t) {
            const e = this._ariaActiveAttribute;
            this._setChanged('ariaActiveAttribute', t) &&
              (e && this.hasAttribute(e) && this.removeAttribute(e), this._activeChanged());
          }
          _setChanged(t, e) {
            const n = `_${t}`,
              i = this[n];
            return e !== i && ((this[n] = e), this.requestUpdate && this.requestUpdate(t, i), !0);
          }
          constructor() {
            super(),
              (this.ariaActiveAttribute = 'aria-pressed'),
              (this._downHandler = this._downHandler.bind(this)),
              (this._upHandler = this._upHandler.bind(this)),
              (this._clickHandler = this._clickHandler.bind(this)),
              (this._keyDownHandler = this._keyDownHandler.bind(this)),
              (this._keyUpHandler = this._keyUpHandler.bind(this)),
              (this._blurHandler = this._blurHandler.bind(this)),
              (this._focusHandler = this._focusHandler.bind(this));
          }
          connectedCallback() {
            super.connectedCallback && super.connectedCallback(),
              this.addEventListener('mousedown', this._downHandler),
              this.addEventListener('mouseup', this._upHandler),
              this.addEventListener('click', this._clickHandler),
              this.addEventListener('keydown', this._keyDownHandler),
              this.addEventListener('keyup', this._keyUpHandler),
              this.addEventListener('blur', this._blurHandler),
              this.addEventListener('focus', this._focusHandler),
              this.hasAttribute('role') || this.setAttribute('role', 'button');
          }
          disconnectedCallback() {
            super.disconnectedCallback && super.disconnectedCallback(),
              this.removeEventListener('mousedown', this._downHandler),
              this.removeEventListener('mouseup', this._upHandler),
              this.removeEventListener('click', this._clickHandler),
              this.removeEventListener('keydown', this._keyDownHandler),
              this.removeEventListener('keyup', this._keyUpHandler),
              this.removeEventListener('blur', this._blurHandler),
              this.removeEventListener('focus', this._focusHandler);
          }
          _downHandler() {
            (this._pointerDown = !0), (this._pressed = !0), (this._receivedFocusFromKeyboard = !1);
          }
          _upHandler() {
            (this._pointerDown = !1), (this._pressed = !1);
          }
          _clickHandler() {
            this.toggles ? (this.active = !this.active) : (this.active = !1);
          }
          _keyDownHandler(t) {
            'Enter' === t.code || 'NumpadEnter' === t.code || 13 === t.keyCode
              ? this._asyncClick(t)
              : ('Space' !== t.code && 32 !== t.keyCode) || this._spaceKeyDownHandler(t);
          }
          _keyUpHandler(t) {
            ('Space' !== t.code && 32 !== t.keyCode) || this._spaceKeyUpHandler(t);
          }
          _blurHandler() {
            this._detectKeyboardFocus(!1), (this._pressed = !1);
          }
          _focusHandler() {
            this._detectKeyboardFocus(!0);
          }
          _detectKeyboardFocus(t) {
            this._receivedFocusFromKeyboard = !this.pointerDown && t;
          }
          _isLightDescendant(t) {
            return t !== this && this.contains(t);
          }
          _spaceKeyDownHandler(t) {
            const e = t.target;
            e &&
              !this._isLightDescendant(e) &&
              (t.preventDefault(), t.stopImmediatePropagation(), (this._pressed = !0));
          }
          _spaceKeyUpHandler(t) {
            const e = t.target;
            e && !this._isLightDescendant(e) && (this.pressed && this._asyncClick(), (this._pressed = !1));
          }
          _asyncClick() {
            setTimeout(() => this.click(), 1);
          }
          _pressedChanged() {
            this._changedButtonState();
          }
          _changedButtonState() {
            this._buttonStateChanged && this._buttonStateChanged();
          }
          _activeChanged() {
            const { active: t, ariaActiveAttribute: e } = this;
            this.toggles ? this.setAttribute(e, t ? 'true' : 'false') : this.removeAttribute(e),
              this._changedButtonState();
          }
          _controlStateChanged() {
            this.disabled ? (this._pressed = !1) : this._changedButtonState();
          }
        };
      }),
      kr = He((t) => {
        return class extends t {
          static get properties() {
            return { disabled: { type: Boolean }, focused: { type: Boolean } };
          }
          get focused() {
            return this._focused;
          }
          set focused(t) {
            this._setChanged('focused', t) &&
              (t ? this.setAttribute('focused', '') : this.removeAttribute('focused'),
              this.dispatchEvent(new CustomEvent('focused-changed', { composed: !0, detail: { value: t } })),
              this._changedControlState());
          }
          get disabled() {
            return this._disabled;
          }
          set disabled(t) {
            this._setChanged('disabled', t) &&
              (t ? this.setAttribute('disabled', '') : this.removeAttribute('disabled'),
              this.dispatchEvent(new CustomEvent('disabled-changed', { composed: !0, detail: { value: t } })),
              this._disabledChanged(t),
              this._changedControlState());
          }
          _setChanged(t, e) {
            const n = `_${t}`,
              i = this[n];
            return e !== i && ((this[n] = e), this.requestUpdate && this.requestUpdate(t, i), !0);
          }
          constructor() {
            super(), (this._focusBlurHandler = this._focusBlurHandler.bind(this));
          }
          connectedCallback() {
            super.connectedCallback && super.connectedCallback(),
              this.addEventListener('focus', this._focusBlurHandler),
              this.addEventListener('blur', this._focusBlurHandler);
          }
          disconnectedCallback() {
            super.disconnectedCallback && super.disconnectedCallback(),
              this.removeEventListener('focus', this._focusBlurHandler),
              this.removeEventListener('blur', this._focusBlurHandler);
          }
          _focusBlurHandler(t) {
            this.disabled ? this.focused && ((this.focused = !1), this.blur()) : (this.focused = 'focus' === t.type);
          }
          _disabledChanged(t) {
            this.setAttribute('aria-disabled', t ? 'true' : 'false'),
              (this.style.pointerEvents = t ? 'none' : ''),
              t
                ? ((this._oldTabIndex = this.getAttribute('tabindex')),
                  (this.focused = !1),
                  this.setAttribute('tabindex', '-1'),
                  this.blur())
                : void 0 !== this._oldTabIndex &&
                  (null === this._oldTabIndex
                    ? this.removeAttribute('tabindex')
                    : this.setAttribute('tabindex', this._oldTabIndex));
          }
          _changedControlState() {
            this._controlStateChanged && this._controlStateChanged();
          }
        };
      });
    /**
@license
Copyright (c) 2014 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at
http://polymer.github.io/LICENSE.txt The complete set of authors may be found at
http://polymer.github.io/AUTHORS.txt The complete set of contributors may be
found at http://polymer.github.io/CONTRIBUTORS.txt Code distributed by Google as
part of the polymer project is also subject to an additional IP rights grant
found at http://polymer.github.io/PATENTS.txt
*/
    var Er = {
      distance: function(t, e, n, i) {
        var s = t - n,
          o = e - i;
        return Math.sqrt(s * s + o * o);
      },
      now: window.performance && window.performance.now ? window.performance.now.bind(window.performance) : Date.now
    };
    function Pr(t) {
      (this.element = t),
        (this.width = this.boundingRect.width),
        (this.height = this.boundingRect.height),
        (this.size = Math.max(this.width, this.height));
    }
    function Tr(t) {
      (this.element = t),
        (this.color = window.getComputedStyle(t).color),
        (this.wave = document.createElement('div')),
        (this.waveContainer = document.createElement('div')),
        (this.wave.style.backgroundColor = this.color),
        this.wave.classList.add('wave'),
        this.waveContainer.classList.add('wave-container'),
        Us(this.waveContainer).appendChild(this.wave),
        this.resetInteractionState();
    }
    (Pr.prototype = {
      get boundingRect() {
        return this.element.getBoundingClientRect();
      },
      furthestCornerDistanceFrom: function(t, e) {
        var n = Er.distance(t, e, 0, 0),
          i = Er.distance(t, e, this.width, 0),
          s = Er.distance(t, e, 0, this.height),
          o = Er.distance(t, e, this.width, this.height);
        return Math.max(n, i, s, o);
      }
    }),
      (Tr.MAX_RADIUS = 300),
      (Tr.prototype = {
        get recenters() {
          return this.element.recenters;
        },
        get center() {
          return this.element.center;
        },
        get mouseDownElapsed() {
          var t;
          return this.mouseDownStart
            ? ((t = Er.now() - this.mouseDownStart), this.mouseUpStart && (t -= this.mouseUpElapsed), t)
            : 0;
        },
        get mouseUpElapsed() {
          return this.mouseUpStart ? Er.now() - this.mouseUpStart : 0;
        },
        get mouseDownElapsedSeconds() {
          return this.mouseDownElapsed / 1e3;
        },
        get mouseUpElapsedSeconds() {
          return this.mouseUpElapsed / 1e3;
        },
        get mouseInteractionSeconds() {
          return this.mouseDownElapsedSeconds + this.mouseUpElapsedSeconds;
        },
        get initialOpacity() {
          return this.element.initialOpacity;
        },
        get opacityDecayVelocity() {
          return this.element.opacityDecayVelocity;
        },
        get radius() {
          var t = this.containerMetrics.width * this.containerMetrics.width,
            e = this.containerMetrics.height * this.containerMetrics.height,
            n = 1.1 * Math.min(Math.sqrt(t + e), Tr.MAX_RADIUS) + 5,
            i = 1.1 - (n / Tr.MAX_RADIUS) * 0.2,
            s = this.mouseInteractionSeconds / i,
            o = n * (1 - Math.pow(80, -s));
          return Math.abs(o);
        },
        get opacity() {
          return this.mouseUpStart
            ? Math.max(0, this.initialOpacity - this.mouseUpElapsedSeconds * this.opacityDecayVelocity)
            : this.initialOpacity;
        },
        get outerOpacity() {
          var t = 0.3 * this.mouseUpElapsedSeconds,
            e = this.opacity;
          return Math.max(0, Math.min(t, e));
        },
        get isOpacityFullyDecayed() {
          return this.opacity < 0.01 && this.radius >= Math.min(this.maxRadius, Tr.MAX_RADIUS);
        },
        get isRestingAtMaxRadius() {
          return this.opacity >= this.initialOpacity && this.radius >= Math.min(this.maxRadius, Tr.MAX_RADIUS);
        },
        get isAnimationComplete() {
          return this.mouseUpStart ? this.isOpacityFullyDecayed : this.isRestingAtMaxRadius;
        },
        get translationFraction() {
          return Math.min(1, ((this.radius / this.containerMetrics.size) * 2) / Math.sqrt(2));
        },
        get xNow() {
          return this.xEnd ? this.xStart + this.translationFraction * (this.xEnd - this.xStart) : this.xStart;
        },
        get yNow() {
          return this.yEnd ? this.yStart + this.translationFraction * (this.yEnd - this.yStart) : this.yStart;
        },
        get isMouseDown() {
          return this.mouseDownStart && !this.mouseUpStart;
        },
        resetInteractionState: function() {
          (this.maxRadius = 0),
            (this.mouseDownStart = 0),
            (this.mouseUpStart = 0),
            (this.xStart = 0),
            (this.yStart = 0),
            (this.xEnd = 0),
            (this.yEnd = 0),
            (this.slideDistance = 0),
            (this.containerMetrics = new Pr(this.element));
        },
        draw: function() {
          var t, e, n;
          (this.wave.style.opacity = this.opacity),
            (t = this.radius / (this.containerMetrics.size / 2)),
            (e = this.xNow - this.containerMetrics.width / 2),
            (n = this.yNow - this.containerMetrics.height / 2),
            (this.waveContainer.style.webkitTransform = 'translate(' + e + 'px, ' + n + 'px)'),
            (this.waveContainer.style.transform = 'translate3d(' + e + 'px, ' + n + 'px, 0)'),
            (this.wave.style.webkitTransform = 'scale(' + t + ',' + t + ')'),
            (this.wave.style.transform = 'scale3d(' + t + ',' + t + ',1)');
        },
        downAction: function(t) {
          var e = this.containerMetrics.width / 2,
            n = this.containerMetrics.height / 2;
          this.resetInteractionState(),
            (this.mouseDownStart = Er.now()),
            this.center
              ? ((this.xStart = e),
                (this.yStart = n),
                (this.slideDistance = Er.distance(this.xStart, this.yStart, this.xEnd, this.yEnd)))
              : ((this.xStart = t
                  ? t.detail.x - this.containerMetrics.boundingRect.left
                  : this.containerMetrics.width / 2),
                (this.yStart = t
                  ? t.detail.y - this.containerMetrics.boundingRect.top
                  : this.containerMetrics.height / 2)),
            this.recenters &&
              ((this.xEnd = e),
              (this.yEnd = n),
              (this.slideDistance = Er.distance(this.xStart, this.yStart, this.xEnd, this.yEnd))),
            (this.maxRadius = this.containerMetrics.furthestCornerDistanceFrom(this.xStart, this.yStart)),
            (this.waveContainer.style.top = (this.containerMetrics.height - this.containerMetrics.size) / 2 + 'px'),
            (this.waveContainer.style.left = (this.containerMetrics.width - this.containerMetrics.size) / 2 + 'px'),
            (this.waveContainer.style.width = this.containerMetrics.size + 'px'),
            (this.waveContainer.style.height = this.containerMetrics.size + 'px');
        },
        upAction: function(t) {
          this.isMouseDown && (this.mouseUpStart = Er.now());
        },
        remove: function() {
          Us(this.waveContainer.parentNode).removeChild(this.waveContainer);
        }
      }),
      Qs({
        _template: So`
    <style>
      :host {
        display: block;
        position: absolute;
        border-radius: inherit;
        overflow: hidden;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;

        /* See PolymerElements/paper-behaviors/issues/34. On non-Chrome browsers,
         * creating a node (with a position:absolute) in the middle of an event
         * handler "interrupts" that event handler (which happens when the
         * ripple is created on demand) */
        pointer-events: none;
      }

      :host([animating]) {
        /* This resolves a rendering issue in Chrome (as of 40) where the
           ripple is not properly clipped by its parent (which may have
           rounded corners). See: http://jsbin.com/temexa/4

           Note: We only apply this style conditionally. Otherwise, the browser
           will create a new compositing layer for every ripple element on the
           page, and that would be bad. */
        -webkit-transform: translate(0, 0);
        transform: translate3d(0, 0, 0);
      }

      #background,
      #waves,
      .wave-container,
      .wave {
        pointer-events: none;
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
      }

      #background,
      .wave {
        opacity: 0;
      }

      #waves,
      .wave {
        overflow: hidden;
      }

      .wave-container,
      .wave {
        border-radius: 50%;
      }

      :host(.circle) #background,
      :host(.circle) #waves {
        border-radius: 50%;
      }

      :host(.circle) .wave-container {
        overflow: hidden;
      }
    </style>

    <div id="background"></div>
    <div id="waves"></div>
`,
        is: 'paper-ripple',
        behaviors: [tr],
        properties: {
          initialOpacity: { type: Number, value: 0.25 },
          opacityDecayVelocity: { type: Number, value: 0.8 },
          recenters: { type: Boolean, value: !1 },
          center: { type: Boolean, value: !1 },
          ripples: {
            type: Array,
            value: function() {
              return [];
            }
          },
          animating: { type: Boolean, readOnly: !0, reflectToAttribute: !0, value: !1 },
          holdDown: { type: Boolean, value: !1, observer: '_holdDownChanged' },
          noink: { type: Boolean, value: !1 },
          _animating: { type: Boolean },
          _boundAnimate: {
            type: Function,
            value: function() {
              return this.animate.bind(this);
            }
          }
        },
        get target() {
          return this.keyEventTarget;
        },
        keyBindings: {
          'enter:keydown': '_onEnterKeydown',
          'space:keydown': '_onSpaceKeydown',
          'space:keyup': '_onSpaceKeyup'
        },
        attached: function() {
          11 == this.parentNode.nodeType
            ? (this.keyEventTarget = Us(this).getOwnerRoot().host)
            : (this.keyEventTarget = this.parentNode);
          var t = this.keyEventTarget;
          this.listen(t, 'up', 'uiUpAction'), this.listen(t, 'down', 'uiDownAction');
        },
        detached: function() {
          this.unlisten(this.keyEventTarget, 'up', 'uiUpAction'),
            this.unlisten(this.keyEventTarget, 'down', 'uiDownAction'),
            (this.keyEventTarget = null);
        },
        get shouldKeepAnimating() {
          for (var t = 0; t < this.ripples.length; ++t) if (!this.ripples[t].isAnimationComplete) return !0;
          return !1;
        },
        simulatedRipple: function() {
          this.downAction(null),
            this.async(function() {
              this.upAction();
            }, 1);
        },
        uiDownAction: function(t) {
          this.noink || this.downAction(t);
        },
        downAction: function(t) {
          (this.holdDown && this.ripples.length > 0) ||
            (this.addRipple().downAction(t), this._animating || ((this._animating = !0), this.animate()));
        },
        uiUpAction: function(t) {
          this.noink || this.upAction(t);
        },
        upAction: function(t) {
          this.holdDown ||
            (this.ripples.forEach(function(e) {
              e.upAction(t);
            }),
            (this._animating = !0),
            this.animate());
        },
        onAnimationComplete: function() {
          (this._animating = !1), (this.$.background.style.backgroundColor = null), this.fire('transitionend');
        },
        addRipple: function() {
          var t = new Tr(this);
          return (
            Us(this.$.waves).appendChild(t.waveContainer),
            (this.$.background.style.backgroundColor = t.color),
            this.ripples.push(t),
            this._setAnimating(!0),
            t
          );
        },
        removeRipple: function(t) {
          var e = this.ripples.indexOf(t);
          e < 0 || (this.ripples.splice(e, 1), t.remove(), this.ripples.length || this._setAnimating(!1));
        },
        animate: function() {
          if (this._animating) {
            var t, e;
            for (t = 0; t < this.ripples.length; ++t)
              (e = this.ripples[t]).draw(),
                (this.$.background.style.opacity = e.outerOpacity),
                e.isOpacityFullyDecayed && !e.isRestingAtMaxRadius && this.removeRipple(e);
            this.shouldKeepAnimating || 0 !== this.ripples.length
              ? window.requestAnimationFrame(this._boundAnimate)
              : this.onAnimationComplete();
          }
        },
        animateRipple: function() {
          return this.animate();
        },
        _onEnterKeydown: function() {
          this.uiDownAction(), this.async(this.uiUpAction, 1);
        },
        _onSpaceKeydown: function() {
          this.uiDownAction();
        },
        _onSpaceKeyup: function() {
          this.uiUpAction();
        },
        _holdDownChanged: function(t, e) {
          void 0 !== e && (t ? this.downAction() : this.upAction());
        }
      });
    class Ar extends kr(xr(ct)) {
      static get properties() {
        return {
          elevation: { type: Number, reflect: !0 },
          emphasis: { type: String, reflect: !0 },
          noink: { type: Boolean },
          legacy: { type: Boolean },
          compatibility: { type: Boolean, reflect: !0 }
        };
      }
      get legacy() {
        return this.compatibility;
      }
      set legacy(t) {
        this.compatibility = t;
      }
      get emphasis() {
        return this._emphasis;
      }
      set emphasis(t) {
        this._setChanged('emphasis', t) && this._calculateElevation();
      }
      get toggles() {
        return this._toggles;
      }
      set toggles(t) {
        this._setChanged('toggles', t) && this._calculateElevation();
      }
      get compatibility() {
        return this._compatibility;
      }
      set compatibility(t) {
        this._setChanged('compatibility', t) && this._calculateElevation();
      }
      get elevation() {
        return this._elevation;
      }
      set elevation(t) {
        t || (t = 0), this._setChanged('elevation', t);
      }
      constructor() {
        super(), (this.emphasis = 'low');
      }
      async _calculateElevation() {
        let t = 0;
        'high' !== this.emphasis || this.compatibility || (t = this.toggles && this.active ? 2 : this.pressed ? 3 : 1),
          await this.updateComplete,
          (this.elevation = t);
      }
      _controlStateChanged() {
        super._controlStateChanged(), this._calculateElevation();
      }
      _buttonStateChanged() {
        this._calculateElevation();
      }
    }
    class Or extends Ar {
      static get styles() {
        return at`:host {
      display: inline-flex;
      justify-content: center;
      align-items: center;
      position: relative;
      box-sizing: border-box;
      min-width: 5.14em;
      margin: 0 0.29em;
      outline-width: 0;
      user-select: none;
      cursor: pointer;
      z-index: 0;
      padding: 0.7em 0.57em;
      font-size: var(--anypoint-button-font-size, 15px);
      background-color: var(--anypoint-button-background-color, inherit);
      color: var(--anypoint-button-color, var(--anypoint-color-primary));
      border-width: 1px;
      border-color: var(--anypoint-button-border-color, transparent);
      border-style: solid;
      border-radius: var(--anypoint-button-border-radius, 3px);
      text-transform: var(--anypoint-button-text-transform, uppercase);
      transition: box-shadow 0.28s cubic-bezier(0.4, 0, 0.2, 1), background-color 0.18s cubic-bezier(0.4, 0, 0.2, 1);
    }

    :host([hidden]) {
      display: none !important;
    }

    :host(:focus) {
      outline: none;
    }

    :host([disabled]) {
      cursor: auto;
      pointer-events: none;
    }

    :host([emphasis="low"]:not([compatibility])) {
      box-shadow: none !important;
    }

    :host([emphasis="low"][disabled]) {
      color: var(--anypoint-button-disabled-color, #a8a8a8);
    }

    :host(:not([pressed])[emphasis="low"]:hover) {
      background-color: var(--anypoint-button-emphasis-low-hover-background-color, rgba(0, 162, 223, .08));
    }

    :host(:not([pressed]):not([compatibility])[emphasis="low"][focused]) {
      background-color: var(--anypoint-button-emphasis-low-focus-background-color, rgba(0, 162, 223, .12));
      color: var(--anypoint-button-emphasis-low-focus-color, var(--anypoint-color-coreBlue4));
    }

    :host(:not([pressed])[emphasis="low"][active]) {
      background-color: var(--anypoint-button-emphasis-low-active-background-color, rgba(0, 162, 223, .16));
    }

    :host([emphasis="medium"]:not([compatibility])) {
      box-shadow: none !important;
    }

    :host([emphasis="medium"]) {
      border-color: var(--anypoint-button-emphasis-medium-focus-border-color, var(--anypoint-color-robustBlue1));
    }

    :host([emphasis="medium"][disabled]) {
      color: var(--anypoint-button-disabled-color, #a8a8a8);
      border-color: var(--anypoint-button-disabled-color, var(--anypoint-color-aluminum4));
    }

    :host(:not([pressed])[emphasis="medium"]:hover) {
      background-color: var(--anypoint-button-emphasis-medium-hover-background-color, rgba(0, 162, 223, .06));
    }

    :host(:not([pressed])[emphasis="medium"][focused]) {
      background-color: var(--anypoint-button-emphasis-medium-focus-background-color, rgba(0, 162, 223, .08));
      color: var(--anypoint-button-emphasis-low-focus-color, var(--anypoint-color-coreBlue4));
      border-color: var(--anypoint-button-emphasis-medium-focus-border-color, var(--anypoint-color-robustBlue2));
    }

    :host(:not([pressed])[emphasis="medium"][active]) {
      background-color: var(--anypoint-button-emphasis-low-active-background-color, rgba(94, 102, 249, 0.16));
    }

    :host([emphasis="high"]:not([compatibility])) {
      will-change: box-shadow;
      background-color: var(--anypoint-button-emphasis-high-background-color, var(--anypoint-color-primary));
      color: var(--anypoint-button-emphasis-high-color, var(--anypoint-color-tertiary));
    }

    :host([emphasis="high"][disabled]:not([compatibility])) {
      background: var(--anypoint-button-disabled-background-color, #eaeaea);
      color: var(--anypoint-button-disabled-color, #a8a8a8);
      box-shadow: none;
    }

    :host(:not([pressed]):not([compatibility])[emphasis="high"]:hover) {
      background-color: var(--anypoint-button-emphasis-high-hover-background-color, rgba(0, 162, 223, 0.87));
    }

    :host(:not([pressed]):not([compatibility])[emphasis="high"]:focus) {
      background-color: var(--anypoint-button-emphasis-high-focus-background-color, rgba(0, 162, 223, 0.87));
    }

    :host(:not([pressed]):not([compatibility])[emphasis="high"][active]) {
      background-color: var(--anypoint-button-emphasis-high-active-background-color, var(--anypoint-color-indigo3));
    }

    :host([elevation="1"]) {
      box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.14),
                  0 1px 5px 0 rgba(0, 0, 0, 0.12),
                  0 3px 1px -2px rgba(0, 0, 0, 0.2);
    }

    :host([elevation="2"]) {
      box-shadow: 0 4px 5px 0 rgba(0, 0, 0, 0.14),
                  0 1px 10px 0 rgba(0, 0, 0, 0.12),
                  0 2px 4px -1px rgba(0, 0, 0, 0.4);
    }

    :host([elevation="3"]) {
      box-shadow: 0 6px 10px 0 rgba(0, 0, 0, 0.14),
                  0 1px 18px 0 rgba(0, 0, 0, 0.12),
                  0 3px 5px -1px rgba(0, 0, 0, 0.4);
    }

    :host([emphasis="high"][compatibility]) {
      background-color: var(--anypoint-button-background-color, var(--anypoint-color-primary));
      color: var(--anypoint-button-color, var(--anypoint-color-tertiary));
      border-radius: var(--anypoint-button-border-radius, 2px);
      text-transform: var(--anypoint-button-text-transform, initial);
      height: 40px;
    }

    :host([emphasis="high"][compatibility]:hover) {
      background-color: var(--anypoint-button-hover-background-color, var(--anypoint-color-coreBlue4));
    }

    :host([compatibility][focused]) {
      box-shadow: var(--anypoint-button-foxus-box-shadow-color, 0 0 0 3px #abe2f5);
    }

    :host([emphasis="high"][compatibility][pressed]) {
      background-color: var(--anypoint-button-hover-background-color, var(--anypoint-color-coreBlue5));
    }

    :host([emphasis="high"][compatibility][active]) {
      background-color: var(--anypoint-button-active-background-color, var(--anypoint-color-coreBlue5));
    }

    :host([compatibility]) paper-ripple {
      display: none;
    }

    :host([compatibility][disabled]) {
      background: var(--anypoint-button-disabled-background-color, #eaeaea);
      color: var(--anypoint-button-disabled-color, #a8a8a8);
    }

    :host ::slotted(*) {
      margin: 0 4px;
    }
    `;
      }
      render() {
        const { noink: t, compatibility: e } = this;
        return M`<slot></slot><paper-ripple .noink="${!!t || !!e}"></paper-ripple>`;
      }
      get _ripple() {
        return this.shadowRoot.querySelector('paper-ripple');
      }
      connectedCallback() {
        this.hasAttribute('role') || this.setAttribute('role', 'button'),
          this.hasAttribute('tabindex') || this.setAttribute('tabindex', '0'),
          super.connectedCallback && super.connectedCallback();
      }
      _spaceKeyDownHandler(t) {
        super._spaceKeyDownHandler(t),
          this._calculateElevation(),
          this._ripple.animating || this._ripple.uiDownAction();
      }
      _spaceKeyUpHandler(t) {
        super._spaceKeyUpHandler(t), this._calculateElevation(), this._ripple.uiUpAction();
      }
    }
    const Nr = { STANDARD: 'Sign in', WIDE: 'Sign in with Anypoint Platform' },
      Ir = { STANDARD: 'standard', WIDE: 'wide' };
    window.customElements.define(
      'anypoint-signin',
      class extends Or {
        static get styles() {
          return [
            Or.styles,
            at`
        ${Sr}
      `
          ];
        }
        render() {
          const {
              authType: t,
              clientId: e,
              forceOauthEvents: n,
              labelSignin: i,
              labelSignout: s,
              redirectUri: o,
              scopes: r,
              signedIn: a,
              width: l
            } = this,
            c = this._computeSigninLabel(i, l);
          return M`
      <anypoint-signin-aware
        .clientId="${e}"
        .redirectUri="${o}"
        .scopes="${r}"
        .authType="${t}"
        .forceOauthEvents="${n}"
        @accesstoken-changed="${this._atHandler}"
        @signedin-changed="${this._signedinHandler}"
      ></anypoint-signin-aware>
      <div class="buttonText ${a ? 'signOut' : 'signIn'}">${a ? s : c}</div>
    `;
        }
        get signedIn() {
          return this._signedIn;
        }
        set signedIn(t) {
          const e = this._signedIn;
          e !== t &&
            ((this._signedIn = t),
            this.requestUpdate('signedIn', e),
            this.dispatchEvent(new CustomEvent('signedin-changed', { detail: { value: t } })));
        }
        get accessToken() {
          return this._accessToken;
        }
        set accessToken(t) {
          const e = this._accessToken;
          e !== t &&
            ((this._accessToken = t),
            this.requestUpdate('accessToken', e),
            this.dispatchEvent(new CustomEvent('accesstoken-changed', { detail: { value: t } })));
        }
        get onsignedin() {
          return this['_onsignedin-changed'];
        }
        set onsignedin(t) {
          this._registerCallback('signedin-changed', t);
        }
        get onaccesstoken() {
          return this['_onaccesstoken-changed'];
        }
        set onaccesstoken(t) {
          this._registerCallback('accesstoken-changed', t);
        }
        get material() {
          return this._material;
        }
        set material(t) {
          this._material !== t && ((this.compatibility = !t), (this._material = t));
        }
        static get properties() {
          return {
            clientId: { type: String },
            redirectUri: { type: String },
            signedIn: { type: Boolean },
            accessToken: { type: String },
            labelSignin: { type: String },
            labelSignout: { type: String },
            scopes: { type: String },
            authType: { type: String },
            width: { type: String },
            material: { type: Boolean },
            forceOauthEvents: { type: Boolean }
          };
        }
        get authAware() {
          return this.shadowRoot.querySelector('anypoint-signin-aware');
        }
        constructor() {
          super(),
            (this.emphasis = 'high'),
            (this.width = 'wide'),
            (this.labelSignout = 'Sign out'),
            (this.compatibility = !0),
            (this._keyDownHandler = this._keyDownHandler.bind(this)),
            (this._clickHandler = this._clickHandler.bind(this));
        }
        connectedCallback() {
          if (
            (super.connectedCallback && super.connectedCallback(),
            this.hasAttribute('tabindex') || this.setAttribute('tabindex', '0'),
            !this.hasAttribute('aria-labelledby') && !this.hasAttribute('aria-label'))
          ) {
            const t = 'Press the button to sign in with Anypoint Platform';
            this.setAttribute('aria-label', t);
          }
          this.addEventListener('keydown', this._keyDownHandler), this.addEventListener('click', this._clickHandler);
        }
        disconnectedCallback() {
          super.disconnectedCallback && super.disconnectedCallback(),
            this.removeEventListener('keydown', this._keyDownHandler),
            this.removeEventListener('click', this._clickHandler);
        }
        _registerCallback(t, e) {
          const n = `_on${t}`;
          this[n] && this.removeEventListener(t, this[n]),
            'function' == typeof e ? ((this[n] = e), this.addEventListener(t, e)) : (this[n] = null);
        }
        _computeSigninLabel(t, e) {
          if (t) return t;
          switch (e) {
            case Ir.WIDE:
              return Nr.WIDE;
            case Ir.STANDARD:
              return Nr.STANDARD;
            default:
              return Nr.WIDE;
          }
        }
        signIn() {
          this.authAware.signIn();
        }
        signOut() {
          this.dispatchEvent(new CustomEvent('anypoint-signout-attempted', { bubbles: !0, composed: !0 })),
            this.authAware.signOut();
        }
        _keyDownHandler(t) {
          ('Space' !== t.code && 'Enter' !== t.code && 'NumpadEnter' !== t.code) || this._handleActivateEvent(t);
        }
        _clickHandler() {
          this.signedIn ? this.signOut() : this.signIn();
        }
        _handleActivateEvent(t) {
          t.preventDefault(), this.signedIn ? this.signOut() : this.signIn();
        }
        _atHandler(t) {
          this.accessToken = t.detail.value;
        }
        _signedinHandler(t) {
          this.signedIn = t.detail.value;
        }
      }
    );
    const Rr = document.getElementById('b1');
    Rr.addEventListener('signedin-changed', (t) => {
      const { value: e } = t.detail;
      document.getElementById('signInStatus').innerText = String(e);
    }),
      Rr.addEventListener('accesstoken-changed', (t) => {
        let { value: e } = t.detail;
        (e = e ? String(e) : 'none'), (document.getElementById('atStatus').innerText = e);
      }),
      window.addEventListener('anypoint-signin-aware-error', (t) => {
        const { message: e } = t.detail,
          n = document.getElementById('errorToast');
        (n.text = e), (n.opened = !0);
      }),
      window.addEventListener('oauth2-code-response', (t) => {
        console.log('Code Info', t.detail),
          console.log('The authorization code is', t.detail.code),
          console.log(
            'You should exchange this code for an access token. Once exchanged, you can set the button signedIn attribute to true so that the button becomes a signout button.You can also just remove the button at this point or go to the next page in your flow.'
          ),
          (document.getElementById('authorizationCode').innerText = t.detail.code);
      });
  }
]);
