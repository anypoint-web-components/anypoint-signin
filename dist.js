!(function(e) {
  const t = {};
  function n(i) {
    if (t[i]) return t[i].exports;
    const s = (t[i] = { i: i, l: !1, exports: {} });
    return e[i].call(s.exports, s, s.exports, n), (s.l = !0), s.exports;
  }
  (n.m = e),
    (n.c = t),
    (n.d = function(e, t, i) {
      n.o(e, t) || Object.defineProperty(e, t, { enumerable: !0, get: i });
    }),
    (n.r = function(e) {
      'undefined' != typeof Symbol &&
        Symbol.toStringTag &&
        Object.defineProperty(e, Symbol.toStringTag, { value: 'Module' }),
        Object.defineProperty(e, '__esModule', { value: !0 });
    }),
    (n.t = function(e, t) {
      if ((1 & t && (e = n(e)), 8 & t)) return e;
      if (4 & t && 'object' == typeof e && e && e.__esModule) return e;
      const i = Object.create(null);
      if ((n.r(i), Object.defineProperty(i, 'default', { enumerable: !0, value: e }), 2 & t && 'string' != typeof e))
        for (const s in e)
          n.d(
            i,
            s,
            function(t) {
              return e[t];
            }.bind(null, s)
          );
      return i;
    }),
    (n.n = function(e) {
      const t =
        e && e.__esModule
          ? function() {
              return e.default;
            }
          : function() {
              return e;
            };
      return n.d(t, 'a', t), t;
    }),
    (n.o = function(e, t) {
      return Object.prototype.hasOwnProperty.call(e, t);
    }),
    (n.p = ''),
    n((n.s = 3));
})([
  function(e, t, n) {
    (function(t) {
      const n = (function(e) {
        const t = /\blang(?:uage)?-([\w-]+)\b/i;
        let n = 0;
        var i = {
          manual: e.Prism && e.Prism.manual,
          disableWorkerMessageHandler: e.Prism && e.Prism.disableWorkerMessageHandler,
          util: {
            encode: function(e) {
              return e instanceof s
                ? new s(e.type, i.util.encode(e.content), e.alias)
                : Array.isArray(e)
                ? e.map(i.util.encode)
                : e
                    .replace(/&/g, '&amp;')
                    .replace(/</g, '&lt;')
                    .replace(/\u00a0/g, ' ');
            },
            type: function(e) {
              return Object.prototype.toString.call(e).slice(8, -1);
            },
            objId: function(e) {
              return e.__id || Object.defineProperty(e, '__id', { value: ++n }), e.__id;
            },
            clone: function e(t, n) {
              let s;
              let o;
              const r = i.util.type(t);
              switch (((n = n || {}), r)) {
                case 'Object':
                  if (((o = i.util.objId(t)), n[o])) return n[o];
                  for (const a in ((s = {}), (n[o] = s), t)) t.hasOwnProperty(a) && (s[a] = e(t[a], n));
                  return s;
                case 'Array':
                  return (
                    (o = i.util.objId(t)),
                    n[o]
                      ? n[o]
                      : ((s = []),
                        (n[o] = s),
                        t.forEach(function(t, i) {
                          s[i] = e(t, n);
                        }),
                        s)
                  );
                default:
                  return t;
              }
            }
          },
          languages: {
            extend: function(e, t) {
              const n = i.util.clone(i.languages[e]);
              for (const s in t) n[s] = t[s];
              return n;
            },
            insertBefore: function(e, t, n, s) {
              const o = (s = s || i.languages)[e];
              const r = {};
              for (const a in o)
                if (o.hasOwnProperty(a)) {
                  if (a == t) for (const l in n) n.hasOwnProperty(l) && (r[l] = n[l]);
                  n.hasOwnProperty(a) || (r[a] = o[a]);
                }
              const c = s[e];
              return (
                (s[e] = r),
                i.languages.DFS(i.languages, function(t, n) {
                  n === c && t != e && (this[t] = r);
                }),
                r
              );
            },
            DFS: function e(t, n, s, o) {
              o = o || {};
              const r = i.util.objId;
              for (const a in t)
                if (t.hasOwnProperty(a)) {
                  n.call(t, a, t[a], s || a);
                  const l = t[a];
                  const c = i.util.type(l);
                  'Object' !== c || o[r(l)]
                    ? 'Array' !== c || o[r(l)] || ((o[r(l)] = !0), e(l, n, a, o))
                    : ((o[r(l)] = !0), e(l, n, null, o));
                }
            }
          },
          plugins: {},
          highlightAll: function(e, t) {
            i.highlightAllUnder(document, e, t);
          },
          highlightAllUnder: function(e, t, n) {
            const s = {
              callback: n,
              selector:
                'code[class*="language-"], [class*="language-"] code, code[class*="lang-"], [class*="lang-"] code'
            };
            i.hooks.run('before-highlightall', s);
            for (var o, r = e.querySelectorAll(s.selector), a = 0; (o = r[a++]); )
              i.highlightElement(o, !0 === t, s.callback);
          },
          highlightElement: function(n, s, o) {
            for (var r, a = 'none', l = n; l && !t.test(l.className); ) l = l.parentNode;
            l && ((a = (l.className.match(t) || [, 'none'])[1].toLowerCase()), (r = i.languages[a])),
              (n.className = n.className.replace(t, '').replace(/\s+/g, ' ') + ' language-' + a),
              n.parentNode &&
                ((l = n.parentNode),
                /pre/i.test(l.nodeName) &&
                  (l.className = l.className.replace(t, '').replace(/\s+/g, ' ') + ' language-' + a));
            const c = { element: n, language: a, grammar: r, code: n.textContent };
            const h = function(e) {
              (c.highlightedCode = e),
                i.hooks.run('before-insert', c),
                (c.element.innerHTML = c.highlightedCode),
                i.hooks.run('after-highlight', c),
                i.hooks.run('complete', c),
                o && o.call(c.element);
            };
            if ((i.hooks.run('before-sanity-check', c), c.code))
              if ((i.hooks.run('before-highlight', c), c.grammar))
                if (s && e.Worker) {
                  const d = new Worker(i.filename);
                  (d.onmessage = function(e) {
                    h(e.data);
                  }),
                    d.postMessage(JSON.stringify({ language: c.language, code: c.code, immediateClose: !0 }));
                } else h(i.highlight(c.code, c.grammar, c.language));
              else h(i.util.encode(c.code));
            else i.hooks.run('complete', c);
          },
          highlight: function(e, t, n) {
            const o = { code: e, grammar: t, language: n };
            return (
              i.hooks.run('before-tokenize', o),
              (o.tokens = i.tokenize(o.code, o.grammar)),
              i.hooks.run('after-tokenize', o),
              s.stringify(i.util.encode(o.tokens), o.language)
            );
          },
          matchGrammar: function(e, t, n, o, r, a, l) {
            for (const c in n)
              if (n.hasOwnProperty(c) && n[c]) {
                if (c == l) return;
                let h = n[c];
                h = 'Array' === i.util.type(h) ? h : [h];
                for (let d = 0; d < h.length; ++d) {
                  let u = h[d];
                  const p = u.inside;
                  const _ = !!u.lookbehind;
                  const f = !!u.greedy;
                  let m = 0;
                  const g = u.alias;
                  if (f && !u.pattern.global) {
                    const y = u.pattern.toString().match(/[imuy]*$/)[0];
                    u.pattern = RegExp(u.pattern.source, y + 'g');
                  }
                  u = u.pattern || u;
                  for (let b = o, v = r; b < t.length; v += t[b].length, ++b) {
                    let w = t[b];
                    if (t.length > e.length) return;
                    if (!(w instanceof s)) {
                      if (f && b != t.length - 1) {
                        if (((u.lastIndex = v), !(P = u.exec(e)))) break;
                        for (
                          var C = P.index + (_ ? P[1].length : 0),
                            S = P.index + P[0].length,
                            k = b,
                            x = v,
                            E = t.length;
                          k < E && (x < S || (!t[k].type && !t[k - 1].greedy));
                          ++k
                        )
                          C >= (x += t[k].length) && (++b, (v = x));
                        if (t[b] instanceof s) continue;
                        (T = k - b), (w = e.slice(v, x)), (P.index -= v);
                      } else {
                        u.lastIndex = 0;
                        var P = u.exec(w);
                        var T = 1;
                      }
                      if (P) {
                        _ && (m = P[1] ? P[1].length : 0);
                        S = (C = P.index + m) + (P = P[0].slice(m)).length;
                        const A = w.slice(0, C);
                        const O = w.slice(S);
                        const N = [b, T];
                        A && (++b, (v += A.length), N.push(A));
                        const I = new s(c, p ? i.tokenize(P, p) : P, g, P, f);
                        if (
                          (N.push(I),
                          O && N.push(O),
                          Array.prototype.splice.apply(t, N),
                          1 != T && i.matchGrammar(e, t, n, b, v, !0, c),
                          a)
                        )
                          break;
                      } else if (a) break;
                    }
                  }
                }
              }
          },
          tokenize: function(e, t) {
            const n = [e];
            const s = t.rest;
            if (s) {
              for (const o in s) t[o] = s[o];
              delete t.rest;
            }
            return i.matchGrammar(e, n, t, 0, 0, !1), n;
          },
          hooks: {
            all: {},
            add: function(e, t) {
              const n = i.hooks.all;
              (n[e] = n[e] || []), n[e].push(t);
            },
            run: function(e, t) {
              const n = i.hooks.all[e];
              if (n && n.length) for (var s, o = 0; (s = n[o++]); ) s(t);
            }
          },
          Token: s
        };
        function s(e, t, n, i, s) {
          (this.type = e),
            (this.content = t),
            (this.alias = n),
            (this.length = 0 | (i || '').length),
            (this.greedy = !!s);
        }
        if (
          ((e.Prism = i),
          (s.stringify = function(e, t) {
            if ('string' == typeof e) return e;
            if (Array.isArray(e))
              return e
                .map(function(e) {
                  return s.stringify(e, t);
                })
                .join('');
            const n = {
              type: e.type,
              content: s.stringify(e.content, t),
              tag: 'span',
              classes: ['token', e.type],
              attributes: {},
              language: t
            };
            if (e.alias) {
              const o = Array.isArray(e.alias) ? e.alias : [e.alias];
              Array.prototype.push.apply(n.classes, o);
            }
            i.hooks.run('wrap', n);
            const r = Object.keys(n.attributes)
              .map(function(e) {
                return e + '="' + (n.attributes[e] || '').replace(/"/g, '&quot;') + '"';
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
          !e.document)
        )
          return e.addEventListener
            ? (i.disableWorkerMessageHandler ||
                e.addEventListener(
                  'message',
                  function(t) {
                    const n = JSON.parse(t.data);
                    const s = n.language;
                    const o = n.code;
                    const r = n.immediateClose;
                    e.postMessage(i.highlight(o, i.languages[s], s)), r && e.close();
                  },
                  !1
                ),
              i)
            : i;
        const o = document.currentScript || [].slice.call(document.getElementsByTagName('script')).pop();
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
      e.exports && (e.exports = n),
        void 0 !== t && (t.Prism = n),
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
        n.hooks.add('wrap', function(e) {
          'entity' === e.type && (e.attributes.title = e.content.replace(/&amp;/, '&'));
        }),
        Object.defineProperty(n.languages.markup.tag, 'addInlined', {
          value: function(e, t) {
            const i = {};
            (i['language-' + t] = {
              pattern: /(^<!\[CDATA\[)[\s\S]+?(?=\]\]>$)/i,
              lookbehind: !0,
              inside: n.languages[t]
            }),
              (i.cdata = /^<!\[CDATA\[|\]\]>$/i);
            const s = { 'included-cdata': { pattern: /<!\[CDATA\[[\s\S]*?\]\]>/i, inside: i } };
            s['language-' + t] = { pattern: /[\s\S]+/, inside: n.languages[t] };
            const o = {};
            (o[e] = {
              pattern: RegExp(
                /(<__[\s\S]*?>)(?:<!\[CDATA\[[\s\S]*?\]\]>\s*|[\s\S])*?(?=<\/__>)/.source.replace(/__/g, e),
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
        (function(e) {
          const t = /("|')(?:\\(?:\r\n|[\s\S])|(?!\1)[^\\\r\n])*\1/;
          (e.languages.css = {
            comment: /\/\*[\s\S]*?\*\//,
            atrule: { pattern: /@[\w-]+[\s\S]*?(?:;|(?=\s*\{))/, inside: { rule: /@[\w-]+/ } },
            url: {
              pattern: RegExp('url\\((?:' + t.source + '|[^\n\r()]*)\\)', 'i'),
              inside: { function: /^url/i, punctuation: /^\(|\)$/ }
            },
            selector: RegExp('[^{}\\s](?:[^{};"\']|' + t.source + ')*?(?=\\s*\\{)'),
            string: { pattern: t, greedy: !0 },
            property: /[-_a-z\xA0-\uFFFF][-\w\xA0-\uFFFF]*(?=\s*:)/i,
            important: /!important\b/i,
            function: /[-a-z0-9]+(?=\()/i,
            punctuation: /[(){};:,]/
          }),
            (e.languages.css.atrule.inside.rest = e.languages.css);
          const n = e.languages.markup;
          n &&
            (n.tag.addInlined('style', 'css'),
            e.languages.insertBefore(
              'inside',
              'attr-value',
              {
                'style-attr': {
                  pattern: /\s*style=("|')(?:\\[\s\S]|(?!\1)[^\\])*\1/i,
                  inside: {
                    'attr-name': { pattern: /^\s*style/i, inside: n.tag.inside },
                    'punctuation': /^\s*=\s*['"]|['"]\s*$/,
                    'attr-value': { pattern: /.+/i, inside: e.languages.css }
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
          ((self.Prism.fileHighlight = function(e) {
            e = e || document;
            const t = {
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
            Array.prototype.slice.call(e.querySelectorAll('pre[data-src]')).forEach(function(e) {
              if (!e.hasAttribute('data-src-loaded')) {
                for (
                  var i, s = e.getAttribute('data-src'), o = e, r = /\blang(?:uage)?-([\w-]+)\b/i;
                  o && !r.test(o.className);

                )
                  o = o.parentNode;
                if ((o && (i = (e.className.match(r) || [, ''])[1]), !i)) {
                  const a = (s.match(/\.(\w+)$/) || [, ''])[1];
                  i = t[a] || a;
                }
                const l = document.createElement('code');
                (l.className = 'language-' + i), (e.textContent = ''), (l.textContent = 'Loading…'), e.appendChild(l);
                const c = new XMLHttpRequest();
                c.open('GET', s, !0),
                  (c.onreadystatechange = function() {
                    4 == c.readyState &&
                      (c.status < 400 && c.responseText
                        ? ((l.textContent = c.responseText),
                          n.highlightElement(l),
                          e.setAttribute('data-src-loaded', ''))
                        : c.status >= 400
                        ? (l.textContent = '✖ Error ' + c.status + ' while fetching file: ' + c.statusText)
                        : (l.textContent = '✖ Error: File does not exist or is empty'));
                  }),
                  c.send(null);
              }
            }),
              n.plugins.toolbar &&
                n.plugins.toolbar.registerButton('download-file', function(e) {
                  const t = e.element.parentNode;
                  if (
                    t &&
                    /pre/i.test(t.nodeName) &&
                    t.hasAttribute('data-src') &&
                    t.hasAttribute('data-download-link')
                  ) {
                    const n = t.getAttribute('data-src');
                    const i = document.createElement('a');
                    return (
                      (i.textContent = t.getAttribute('data-download-link-label') || 'Download'),
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
  function(e, t) {
    let n;
    n = (function() {
      return this;
    })();
    try {
      n = n || new Function('return this')();
    } catch (e) {
      'object' == typeof window && (n = window);
    }
    e.exports = n;
  },
  function(e, t) {
    !(function(e) {
      function t(e, t) {
        return (
          (e = e.replace(/<inner>/g, '(?:\\\\.|[^\\\\\\n\r]|(?:\r?\n|\r)(?!\r?\n|\r))')),
          t && (e = e + '|' + e.replace(/_/g, '\\*')),
          RegExp('((?:^|[^\\\\])(?:\\\\{2})*)(?:' + e + ')')
        );
      }
      const n = '(?:\\\\.|``.+?``|`[^`\r\\n]+`|[^\\\\|\r\\n`])+';
      const i = '\\|?__(?:\\|__)+\\|?(?:(?:\r?\n|\r)|$)'.replace(/__/g, n);
      const s = '\\|?[ \t]*:?-{3,}:?[ \t]*(?:\\|[ \t]*:?-{3,}:?[ \t]*)+\\|?(?:\r?\n|\r)';
      (e.languages.markdown = e.languages.extend('markup', {})),
        e.languages.insertBefore('markdown', 'prolog', {
          'blockquote': { pattern: /^>(?:[\t ]*>)*/m, alias: 'punctuation' },
          'table': {
            pattern: RegExp('^' + i + s + '(?:' + i + ')*', 'm'),
            inside: {
              'table-data-rows': {
                pattern: RegExp('^(' + i + s + ')(?:' + i + ')*$'),
                lookbehind: !0,
                inside: { 'table-data': { pattern: RegExp(n), inside: e.languages.markdown }, 'punctuation': /\|/ }
              },
              'table-line': {
                pattern: RegExp('^(' + i + ')' + s + '$'),
                lookbehind: !0,
                inside: { punctuation: /\||:?-{3,}:?/ }
              },
              'table-header-row': {
                pattern: RegExp('^' + i + '$'),
                inside: {
                  'table-header': { pattern: RegExp(n), alias: 'important', inside: e.languages.markdown },
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
            pattern: t('__(?:(?!_)<inner>|_(?:(?!_)<inner>)+_)+__', !0),
            lookbehind: !0,
            greedy: !0,
            inside: { content: { pattern: /(^..)[\s\S]+(?=..$)/, lookbehind: !0, inside: {} }, punctuation: /\*\*|__/ }
          },
          'italic': {
            pattern: t('_(?:(?!_)<inner>|__(?:(?!_)<inner>)+__)+_', !0),
            lookbehind: !0,
            greedy: !0,
            inside: { content: { pattern: /(^.)[\s\S]+(?=.$)/, lookbehind: !0, inside: {} }, punctuation: /[*_]/ }
          },
          'strike': {
            pattern: t('(~~?)(?:(?!~)<inner>)+?\\2', !1),
            lookbehind: !0,
            greedy: !0,
            inside: { content: { pattern: /(^~~?)[\s\S]+(?=\1$)/, lookbehind: !0, inside: {} }, punctuation: /~~?/ }
          },
          'url': {
            pattern: t(
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
        ['url', 'bold', 'italic', 'strike'].forEach(function(t) {
          ['url', 'bold', 'italic', 'strike'].forEach(function(n) {
            t !== n && (e.languages.markdown[t].inside.content.inside[n] = e.languages.markdown[n]);
          });
        }),
        e.hooks.add('after-tokenize', function(e) {
          ('markdown' !== e.language && 'md' !== e.language) ||
            (function e(t) {
              if (t && 'string' != typeof t)
                for (let n = 0, i = t.length; n < i; n++) {
                  const s = t[n];
                  if ('code' === s.type) {
                    const o = s.content[1];
                    const r = s.content[3];
                    if (
                      o &&
                      r &&
                      'code-language' === o.type &&
                      'code-block' === r.type &&
                      'string' == typeof o.content
                    ) {
                      const a =
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
                  } else e(s.content);
                }
            })(e.tokens);
        }),
        e.hooks.add('wrap', function(t) {
          if ('code-block' === t.type) {
            for (var n = '', i = 0, s = t.classes.length; i < s; i++) {
              const o = t.classes[i];
              const r = /language-(.+)/.exec(o);
              if (r) {
                n = r[1];
                break;
              }
            }
            const a = e.languages[n];
            if (a) {
              const l = t.content.replace(/&lt;/g, '<').replace(/&amp;/g, '&');
              t.content = e.highlight(l, a, n);
            } else if (n && 'none' !== n && e.plugins.autoloader) {
              const c = 'md-' + new Date().valueOf() + '-' + Math.floor(1e16 * Math.random());
              (t.attributes.id = c),
                e.plugins.autoloader.loadLanguages(n, function() {
                  const t = document.getElementById(c);
                  t && (t.innerHTML = e.highlight(t.textContent, e.languages[n], n));
                });
            }
          }
        }),
        (e.languages.md = e.languages.markdown);
    })(Prism);
  },
  function(e, t, n) {
    'use strict';
    n.r(t);
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
    const i = new WeakMap();
    const s = (e) => 'function' == typeof e && i.has(e);
    const o = void 0 !== window.customElements && void 0 !== window.customElements.polyfillWrapFlushCallback;
    const r = (e, t, n = null) => {
      for (; t !== n; ) {
        const n = t.nextSibling;
        e.removeChild(t), (t = n);
      }
    };
    const a = {};
    const l = {};
    const c = `{{lit-${String(Math.random()).slice(2)}}}`;
    const h = `\x3c!--${c}--\x3e`;
    const d = new RegExp(`${c}|${h}`);
    const u = '$lit$';
    class p {
      constructor(e, t) {
        (this.parts = []), (this.element = t);
        const n = [];
        const i = [];
        const s = document.createTreeWalker(t.content, 133, null, !1);
        let o = 0;
        let r = -1;
        let a = 0;
        const {
          strings: l,
          values: { length: h }
        } = e;
        for (; a < h; ) {
          const e = s.nextNode();
          if (null !== e) {
            if ((r++, 1 === e.nodeType)) {
              if (e.hasAttributes()) {
                const t = e.attributes;
                const { length: n } = t;
                let i = 0;
                for (let e = 0; e < n; e++) _(t[e].name, u) && i++;
                for (; i-- > 0; ) {
                  const t = l[a];
                  const n = g.exec(t)[2];
                  const i = n.toLowerCase() + u;
                  const s = e.getAttribute(i);
                  e.removeAttribute(i);
                  const o = s.split(d);
                  this.parts.push({ type: 'attribute', index: r, name: n, strings: o }), (a += o.length - 1);
                }
              }
              'TEMPLATE' === e.tagName && (i.push(e), (s.currentNode = e.content));
            } else if (3 === e.nodeType) {
              const t = e.data;
              if (t.indexOf(c) >= 0) {
                const i = e.parentNode;
                const s = t.split(d);
                const o = s.length - 1;
                for (let t = 0; t < o; t++) {
                  let n;
                  let o = s[t];
                  if ('' === o) n = m();
                  else {
                    const e = g.exec(o);
                    null !== e && _(e[2], u) && (o = o.slice(0, e.index) + e[1] + e[2].slice(0, -u.length) + e[3]),
                      (n = document.createTextNode(o));
                  }
                  i.insertBefore(n, e), this.parts.push({ type: 'node', index: ++r });
                }
                '' === s[o] ? (i.insertBefore(m(), e), n.push(e)) : (e.data = s[o]), (a += o);
              }
            } else if (8 === e.nodeType)
              if (e.data === c) {
                const t = e.parentNode;
                (null !== e.previousSibling && r !== o) || (r++, t.insertBefore(m(), e)),
                  (o = r),
                  this.parts.push({ type: 'node', index: r }),
                  null === e.nextSibling ? (e.data = '') : (n.push(e), r--),
                  a++;
              } else {
                let t = -1;
                for (; -1 !== (t = e.data.indexOf(c, t + 1)); ) this.parts.push({ type: 'node', index: -1 }), a++;
              }
          } else s.currentNode = i.pop();
        }
        for (const e of n) e.parentNode.removeChild(e);
      }
    }
    const _ = (e, t) => {
      const n = e.length - t.length;
      return n >= 0 && e.slice(n) === t;
    };
    const f = (e) => -1 !== e.index;
    const m = () => document.createComment('');
    const g = /([ \x09\x0a\x0c\x0d])([^\0-\x1F\x7F-\x9F "'>=\/]+)([ \x09\x0a\x0c\x0d]*=[ \x09\x0a\x0c\x0d]*(?:[^ \x09\x0a\x0c\x0d"'`<>=]*|"[^"]*|'[^']*))$/;
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
      constructor(e, t, n) {
        (this.__parts = []), (this.template = e), (this.processor = t), (this.options = n);
      }
      update(e) {
        let t = 0;
        for (const n of this.__parts) void 0 !== n && n.setValue(e[t]), t++;
        for (const e of this.__parts) void 0 !== e && e.commit();
      }
      _clone() {
        const e = o
          ? this.template.element.content.cloneNode(!0)
          : document.importNode(this.template.element.content, !0);
        const t = [];
        const n = this.template.parts;
        const i = document.createTreeWalker(e, 133, null, !1);
        let s;
        let r = 0;
        let a = 0;
        let l = i.nextNode();
        for (; r < n.length; )
          if (((s = n[r]), f(s))) {
            for (; a < s.index; )
              a++,
                'TEMPLATE' === l.nodeName && (t.push(l), (i.currentNode = l.content)),
                null === (l = i.nextNode()) && ((i.currentNode = t.pop()), (l = i.nextNode()));
            if ('node' === s.type) {
              const e = this.processor.handleTextExpression(this.options);
              e.insertAfterNode(l.previousSibling), this.__parts.push(e);
            } else this.__parts.push(...this.processor.handleAttributeExpressions(l, s.name, s.strings, this.options));
            r++;
          } else this.__parts.push(void 0), r++;
        return o && (document.adoptNode(e), customElements.upgrade(e)), e;
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
      constructor(e, t, n, i) {
        (this.strings = e), (this.values = t), (this.type = n), (this.processor = i);
      }
      getHTML() {
        const e = this.strings.length - 1;
        let t = '';
        let n = !1;
        for (let i = 0; i < e; i++) {
          const e = this.strings[i];
          const s = e.lastIndexOf('\x3c!--');
          n = (s > -1 || n) && -1 === e.indexOf('--\x3e', s + 1);
          const o = g.exec(e);
          t += null === o ? e + (n ? b : h) : e.substr(0, o.index) + o[1] + o[2] + u + o[3] + c;
        }
        return (t += this.strings[e]);
      }
      getTemplateElement() {
        const e = document.createElement('template');
        return (e.innerHTML = this.getHTML()), e;
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
    const w = (e) => null === e || !('object' == typeof e || 'function' == typeof e);
    const C = (e) => Array.isArray(e) || !(!e || !e[Symbol.iterator]);
    class S {
      constructor(e, t, n) {
        (this.dirty = !0), (this.element = e), (this.name = t), (this.strings = n), (this.parts = []);
        for (let e = 0; e < n.length - 1; e++) this.parts[e] = this._createPart();
      }
      _createPart() {
        return new k(this);
      }
      _getValue() {
        const e = this.strings;
        const t = e.length - 1;
        let n = '';
        for (let i = 0; i < t; i++) {
          n += e[i];
          const t = this.parts[i];
          if (void 0 !== t) {
            const e = t.value;
            if (w(e) || !C(e)) n += 'string' == typeof e ? e : String(e);
            else for (const t of e) n += 'string' == typeof t ? t : String(t);
          }
        }
        return (n += e[t]);
      }
      commit() {
        this.dirty && ((this.dirty = !1), this.element.setAttribute(this.name, this._getValue()));
      }
    }
    class k {
      constructor(e) {
        (this.value = void 0), (this.committer = e);
      }
      setValue(e) {
        e === a || (w(e) && e === this.value) || ((this.value = e), s(e) || (this.committer.dirty = !0));
      }
      commit() {
        for (; s(this.value); ) {
          const e = this.value;
          (this.value = a), e(this);
        }
        this.value !== a && this.committer.commit();
      }
    }
    class x {
      constructor(e) {
        (this.value = void 0), (this.__pendingValue = void 0), (this.options = e);
      }
      appendInto(e) {
        (this.startNode = e.appendChild(m())), (this.endNode = e.appendChild(m()));
      }
      insertAfterNode(e) {
        (this.startNode = e), (this.endNode = e.nextSibling);
      }
      appendIntoPart(e) {
        e.__insert((this.startNode = m())), e.__insert((this.endNode = m()));
      }
      insertAfterPart(e) {
        e.__insert((this.startNode = m())), (this.endNode = e.endNode), (e.endNode = this.startNode);
      }
      setValue(e) {
        this.__pendingValue = e;
      }
      commit() {
        for (; s(this.__pendingValue); ) {
          const e = this.__pendingValue;
          (this.__pendingValue = a), e(this);
        }
        const e = this.__pendingValue;
        e !== a &&
          (w(e)
            ? e !== this.value && this.__commitText(e)
            : e instanceof v
            ? this.__commitTemplateResult(e)
            : e instanceof Node
            ? this.__commitNode(e)
            : C(e)
            ? this.__commitIterable(e)
            : e === l
            ? ((this.value = l), this.clear())
            : this.__commitText(e));
      }
      __insert(e) {
        this.endNode.parentNode.insertBefore(e, this.endNode);
      }
      __commitNode(e) {
        this.value !== e && (this.clear(), this.__insert(e), (this.value = e));
      }
      __commitText(e) {
        const t = this.startNode.nextSibling;
        const n = 'string' == typeof (e = null == e ? '' : e) ? e : String(e);
        t === this.endNode.previousSibling && 3 === t.nodeType
          ? (t.data = n)
          : this.__commitNode(document.createTextNode(n)),
          (this.value = e);
      }
      __commitTemplateResult(e) {
        const t = this.options.templateFactory(e);
        if (this.value instanceof y && this.value.template === t) this.value.update(e.values);
        else {
          const n = new y(t, e.processor, this.options);
          const i = n._clone();
          n.update(e.values), this.__commitNode(i), (this.value = n);
        }
      }
      __commitIterable(e) {
        Array.isArray(this.value) || ((this.value = []), this.clear());
        const t = this.value;
        let n;
        let i = 0;
        for (const s of e)
          void 0 === (n = t[i]) &&
            ((n = new x(this.options)), t.push(n), 0 === i ? n.appendIntoPart(this) : n.insertAfterPart(t[i - 1])),
            n.setValue(s),
            n.commit(),
            i++;
        i < t.length && ((t.length = i), this.clear(n && n.endNode));
      }
      clear(e = this.startNode) {
        r(this.startNode.parentNode, e.nextSibling, this.endNode);
      }
    }
    class E {
      constructor(e, t, n) {
        if (((this.value = void 0), (this.__pendingValue = void 0), 2 !== n.length || '' !== n[0] || '' !== n[1]))
          throw new Error('Boolean attributes can only contain a single expression');
        (this.element = e), (this.name = t), (this.strings = n);
      }
      setValue(e) {
        this.__pendingValue = e;
      }
      commit() {
        for (; s(this.__pendingValue); ) {
          const e = this.__pendingValue;
          (this.__pendingValue = a), e(this);
        }
        if (this.__pendingValue === a) return;
        const e = !!this.__pendingValue;
        this.value !== e &&
          (e ? this.element.setAttribute(this.name, '') : this.element.removeAttribute(this.name), (this.value = e)),
          (this.__pendingValue = a);
      }
    }
    class P extends S {
      constructor(e, t, n) {
        super(e, t, n), (this.single = 2 === n.length && '' === n[0] && '' === n[1]);
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
    class T extends k {}
    let A = !1;
    try {
      const e = {
        get capture() {
          return (A = !0), !1;
        }
      };
      window.addEventListener('test', e, e), window.removeEventListener('test', e, e);
    } catch (e) {}
    class O {
      constructor(e, t, n) {
        (this.value = void 0),
          (this.__pendingValue = void 0),
          (this.element = e),
          (this.eventName = t),
          (this.eventContext = n),
          (this.__boundHandleEvent = (e) => this.handleEvent(e));
      }
      setValue(e) {
        this.__pendingValue = e;
      }
      commit() {
        for (; s(this.__pendingValue); ) {
          const e = this.__pendingValue;
          (this.__pendingValue = a), e(this);
        }
        if (this.__pendingValue === a) return;
        const e = this.__pendingValue;
        const t = this.value;
        const n = null == e || (null != t && (e.capture !== t.capture || e.once !== t.once || e.passive !== t.passive));
        const i = null != e && (null == t || n);
        n && this.element.removeEventListener(this.eventName, this.__boundHandleEvent, this.__options),
          i &&
            ((this.__options = N(e)),
            this.element.addEventListener(this.eventName, this.__boundHandleEvent, this.__options)),
          (this.value = e),
          (this.__pendingValue = a);
      }
      handleEvent(e) {
        'function' == typeof this.value
          ? this.value.call(this.eventContext || this.element, e)
          : this.value.handleEvent(e);
      }
    }
    const N = (e) => e && (A ? { capture: e.capture, passive: e.passive, once: e.once } : e.capture);
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
      handleAttributeExpressions(e, t, n, i) {
        const s = t[0];
        if ('.' === s) {
          return new P(e, t.slice(1), n).parts;
        }
        return '@' === s
          ? [new O(e, t.slice(1), i.eventContext)]
          : '?' === s
          ? [new E(e, t.slice(1), n)]
          : new S(e, t, n).parts;
      }
      handleTextExpression(e) {
        return new x(e);
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
     */ function R(e) {
      let t = L.get(e.type);
      void 0 === t && ((t = { stringsArray: new WeakMap(), keyString: new Map() }), L.set(e.type, t));
      let n = t.stringsArray.get(e.strings);
      if (void 0 !== n) return n;
      const i = e.strings.join(c);
      return (
        void 0 === (n = t.keyString.get(i)) && ((n = new p(e, e.getTemplateElement())), t.keyString.set(i, n)),
        t.stringsArray.set(e.strings, n),
        n
      );
    }
    const L = new Map();
    const z = new WeakMap();
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
    const M = (e, ...t) => new v(e, t, 'html', I);
    const F = 133;
    function D(e, t) {
      const {
        element: { content: n },
        parts: i
      } = e;
      const s = document.createTreeWalker(n, F, null, !1);
      let o = B(i);
      let r = i[o];
      let a = -1;
      let l = 0;
      const c = [];
      let h = null;
      for (; s.nextNode(); ) {
        a++;
        const e = s.currentNode;
        for (
          e.previousSibling === h && (h = null), t.has(e) && (c.push(e), null === h && (h = e)), null !== h && l++;
          void 0 !== r && r.index === a;

        )
          (r.index = null !== h ? -1 : r.index - l), (r = i[(o = B(i, o))]);
      }
      c.forEach((e) => e.parentNode.removeChild(e));
    }
    const H = (e) => {
      let t = 11 === e.nodeType ? 0 : 1;
      const n = document.createTreeWalker(e, F, null, !1);
      for (; n.nextNode(); ) t++;
      return t;
    };
    const B = (e, t = -1) => {
      for (let n = t + 1; n < e.length; n++) {
        const t = e[n];
        if (f(t)) return n;
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
    const U = (e, t) => `${e}--${t}`;
    let $ = !0;
    void 0 === window.ShadyCSS
      ? ($ = !1)
      : void 0 === window.ShadyCSS.prepareTemplateDom &&
        (console.warn(
          'Incompatible ShadyCSS version detected. Please update to at least @webcomponents/webcomponentsjs@2.0.2 and @webcomponents/shadycss@1.3.1.'
        ),
        ($ = !1));
    const q = (e) => (t) => {
      const n = U(t.type, e);
      let i = L.get(n);
      void 0 === i && ((i = { stringsArray: new WeakMap(), keyString: new Map() }), L.set(n, i));
      let s = i.stringsArray.get(t.strings);
      if (void 0 !== s) return s;
      const o = t.strings.join(c);
      if (void 0 === (s = i.keyString.get(o))) {
        const n = t.getTemplateElement();
        $ && window.ShadyCSS.prepareTemplateDom(n, e), (s = new p(t, n)), i.keyString.set(o, s);
      }
      return i.stringsArray.set(t.strings, s), s;
    };
    const j = ['html', 'svg'];
    const V = new Set();
    const K = (e, t, n) => {
      V.add(e);
      const i = n ? n.element : document.createElement('template');
      const s = t.querySelectorAll('style');
      const { length: o } = s;
      if (0 === o) return void window.ShadyCSS.prepareTemplateStyles(i, e);
      const r = document.createElement('style');
      for (let e = 0; e < o; e++) {
        const t = s[e];
        t.parentNode.removeChild(t), (r.textContent += t.textContent);
      }
      ((e) => {
        j.forEach((t) => {
          const n = L.get(U(t, e));
          void 0 !== n &&
            n.keyString.forEach((e) => {
              const {
                element: { content: t }
              } = e;
              const n = new Set();
              Array.from(t.querySelectorAll('style')).forEach((e) => {
                n.add(e);
              }),
                D(e, n);
            });
        });
      })(e);
      const a = i.content;
      n
        ? (function(e, t, n = null) {
            const {
              element: { content: i },
              parts: s
            } = e;
            if (null == n) return void i.appendChild(t);
            const o = document.createTreeWalker(i, F, null, !1);
            let r = B(s);
            let a = 0;
            let l = -1;
            for (; o.nextNode(); ) {
              for (
                l++, o.currentNode === n && ((a = H(t)), n.parentNode.insertBefore(t, n));
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
        window.ShadyCSS.prepareTemplateStyles(i, e);
      const l = a.querySelector('style');
      if (window.ShadyCSS.nativeShadow && null !== l) t.insertBefore(l.cloneNode(!0), t.firstChild);
      else if (n) {
        a.insertBefore(r, a.firstChild);
        const e = new Set();
        e.add(r), D(n, e);
      }
    };
    window.JSCompiler_renameProperty = (e, t) => e;
    const Y = {
      toAttribute(e, t) {
        switch (t) {
          case Boolean:
            return e ? '' : null;
          case Object:
          case Array:
            return null == e ? e : JSON.stringify(e);
        }
        return e;
      },
      fromAttribute(e, t) {
        switch (t) {
          case Boolean:
            return null !== e;
          case Number:
            return null === e ? null : Number(e);
          case Object:
          case Array:
            return JSON.parse(e);
        }
        return e;
      }
    };
    const W = (e, t) => t !== e && (t == t || e == e);
    const J = { attribute: !0, type: String, converter: Y, reflect: !1, hasChanged: W };
    const X = Promise.resolve(!0);
    const Z = 1;
    const G = 4;
    const Q = 8;
    const ee = 16;
    const te = 32;
    const ne = 'finalized';
    class ie extends HTMLElement {
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
        const e = [];
        return (
          this._classProperties.forEach((t, n) => {
            const i = this._attributeNameForProperty(n, t);
            void 0 !== i && (this._attributeToPropertyMap.set(i, n), e.push(i));
          }),
          e
        );
      }
      static _ensureClassProperties() {
        if (!this.hasOwnProperty(JSCompiler_renameProperty('_classProperties', this))) {
          this._classProperties = new Map();
          const e = Object.getPrototypeOf(this)._classProperties;
          void 0 !== e && e.forEach((e, t) => this._classProperties.set(t, e));
        }
      }
      static createProperty(e, t = J) {
        if (
          (this._ensureClassProperties(),
          this._classProperties.set(e, t),
          t.noAccessor || this.prototype.hasOwnProperty(e))
        )
          return;
        const n = 'symbol' == typeof e ? Symbol() : `__${e}`;
        Object.defineProperty(this.prototype, e, {
          get() {
            return this[n];
          },
          set(t) {
            const i = this[e];
            (this[n] = t), this._requestUpdate(e, i);
          },
          configurable: !0,
          enumerable: !0
        });
      }
      static finalize() {
        const e = Object.getPrototypeOf(this);
        if (
          (e.hasOwnProperty(ne) || e.finalize(),
          (this[ne] = !0),
          this._ensureClassProperties(),
          (this._attributeToPropertyMap = new Map()),
          this.hasOwnProperty(JSCompiler_renameProperty('properties', this)))
        ) {
          const e = this.properties;
          const t = [
            ...Object.getOwnPropertyNames(e),
            ...('function' == typeof Object.getOwnPropertySymbols ? Object.getOwnPropertySymbols(e) : [])
          ];
          for (const n of t) this.createProperty(n, e[n]);
        }
      }
      static _attributeNameForProperty(e, t) {
        const n = t.attribute;
        return !1 === n ? void 0 : 'string' == typeof n ? n : 'string' == typeof e ? e.toLowerCase() : void 0;
      }
      static _valueHasChanged(e, t, n = W) {
        return n(e, t);
      }
      static _propertyValueFromAttribute(e, t) {
        const n = t.type;
        const i = t.converter || Y;
        const s = 'function' == typeof i ? i : i.fromAttribute;
        return s ? s(e, n) : e;
      }
      static _propertyValueToAttribute(e, t) {
        if (void 0 === t.reflect) return;
        const n = t.type;
        const i = t.converter;
        return ((i && i.toAttribute) || Y.toAttribute)(e, n);
      }
      initialize() {
        this._saveInstanceProperties(), this._requestUpdate();
      }
      _saveInstanceProperties() {
        this.constructor._classProperties.forEach((e, t) => {
          if (this.hasOwnProperty(t)) {
            const e = this[t];
            delete this[t],
              this._instanceProperties || (this._instanceProperties = new Map()),
              this._instanceProperties.set(t, e);
          }
        });
      }
      _applyInstanceProperties() {
        this._instanceProperties.forEach((e, t) => (this[t] = e)), (this._instanceProperties = void 0);
      }
      connectedCallback() {
        (this._updateState = this._updateState | te),
          this._hasConnectedResolver && (this._hasConnectedResolver(), (this._hasConnectedResolver = void 0));
      }
      disconnectedCallback() {}
      attributeChangedCallback(e, t, n) {
        t !== n && this._attributeToProperty(e, n);
      }
      _propertyToAttribute(e, t, n = J) {
        const i = this.constructor;
        const s = i._attributeNameForProperty(e, n);
        if (void 0 !== s) {
          const e = i._propertyValueToAttribute(t, n);
          if (void 0 === e) return;
          (this._updateState = this._updateState | Q),
            null == e ? this.removeAttribute(s) : this.setAttribute(s, e),
            (this._updateState = this._updateState & ~Q);
        }
      }
      _attributeToProperty(e, t) {
        if (this._updateState & Q) return;
        const n = this.constructor;
        const i = n._attributeToPropertyMap.get(e);
        if (void 0 !== i) {
          const e = n._classProperties.get(i) || J;
          (this._updateState = this._updateState | ee),
            (this[i] = n._propertyValueFromAttribute(t, e)),
            (this._updateState = this._updateState & ~ee);
        }
      }
      _requestUpdate(e, t) {
        let n = !0;
        if (void 0 !== e) {
          const i = this.constructor;
          const s = i._classProperties.get(e) || J;
          i._valueHasChanged(this[e], t, s.hasChanged)
            ? (this._changedProperties.has(e) || this._changedProperties.set(e, t),
              !0 !== s.reflect ||
                this._updateState & ee ||
                (void 0 === this._reflectingProperties && (this._reflectingProperties = new Map()),
                this._reflectingProperties.set(e, s)))
            : (n = !1);
        }
        !this._hasRequestedUpdate && n && this._enqueueUpdate();
      }
      requestUpdate(e, t) {
        return this._requestUpdate(e, t), this.updateComplete;
      }
      async _enqueueUpdate() {
        let e;
        let t;
        this._updateState = this._updateState | G;
        const n = this._updatePromise;
        this._updatePromise = new Promise((n, i) => {
          (e = n), (t = i);
        });
        try {
          await n;
        } catch (e) {}
        this._hasConnected || (await new Promise((e) => (this._hasConnectedResolver = e)));
        try {
          const e = this.performUpdate();
          null != e && (await e);
        } catch (e) {
          t(e);
        }
        e(!this._hasRequestedUpdate);
      }
      get _hasConnected() {
        return this._updateState & te;
      }
      get _hasRequestedUpdate() {
        return this._updateState & G;
      }
      get hasUpdated() {
        return this._updateState & Z;
      }
      performUpdate() {
        this._instanceProperties && this._applyInstanceProperties();
        let e = !1;
        const t = this._changedProperties;
        try {
          (e = this.shouldUpdate(t)) && this.update(t);
        } catch (t) {
          throw ((e = !1), t);
        } finally {
          this._markUpdated();
        }
        e &&
          (this._updateState & Z || ((this._updateState = this._updateState | Z), this.firstUpdated(t)),
          this.updated(t));
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
      shouldUpdate(e) {
        return !0;
      }
      update(e) {
        void 0 !== this._reflectingProperties &&
          this._reflectingProperties.size > 0 &&
          (this._reflectingProperties.forEach((e, t) => this._propertyToAttribute(t, this[t], e)),
          (this._reflectingProperties = void 0));
      }
      updated(e) {}
      firstUpdated(e) {}
    }
    ie[ne] = !0;
    const se = 'adoptedStyleSheets' in Document.prototype && 'replace' in CSSStyleSheet.prototype;
    const oe = Symbol();
    class re {
      constructor(e, t) {
        if (t !== oe) throw new Error('CSSResult is not constructable. Use `unsafeCSS` or `css` instead.');
        this.cssText = e;
      }
      get styleSheet() {
        return (
          void 0 === this._styleSheet &&
            (se
              ? ((this._styleSheet = new CSSStyleSheet()), this._styleSheet.replaceSync(this.cssText))
              : (this._styleSheet = null)),
          this._styleSheet
        );
      }
      toString() {
        return this.cssText;
      }
    }
    const ae = (e, ...t) => {
      const n = t.reduce(
        (t, n, i) =>
          t +
          ((e) => {
            if (e instanceof re) return e.cssText;
            if ('number' == typeof e) return e;
            throw new Error(
              `Value passed to 'css' function must be a 'css' function result: ${e}. Use 'unsafeCSS' to pass non-literal values, but\n            take care to ensure page security.`
            );
          })(n) +
          e[i + 1],
        e[0]
      );
      return new re(n, oe);
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
    const le = (e) =>
      e.flat
        ? e.flat(1 / 0)
        : (function e(t, n = []) {
            for (let i = 0, s = t.length; i < s; i++) {
              const s = t[i];
              Array.isArray(s) ? e(s, n) : n.push(s);
            }
            return n;
          })(e);
    class ce extends ie {
      static finalize() {
        super.finalize.call(this),
          (this._styles = this.hasOwnProperty(JSCompiler_renameProperty('styles', this))
            ? this._getUniqueStyles()
            : this._styles || []);
      }
      static _getUniqueStyles() {
        const e = this.styles;
        const t = [];
        if (Array.isArray(e)) {
          le(e)
            .reduceRight((e, t) => (e.add(t), e), new Set())
            .forEach((e) => t.unshift(e));
        } else e && t.push(e);
        return t;
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
        const e = this.constructor._styles;
        0 !== e.length &&
          (void 0 === window.ShadyCSS || window.ShadyCSS.nativeShadow
            ? se
              ? (this.renderRoot.adoptedStyleSheets = e.map((e) => e.styleSheet))
              : (this._needsShimAdoptedStyleSheets = !0)
            : window.ShadyCSS.ScopingShim.prepareAdoptedCssText(e.map((e) => e.cssText), this.localName));
      }
      connectedCallback() {
        super.connectedCallback(), this.hasUpdated && void 0 !== window.ShadyCSS && window.ShadyCSS.styleElement(this);
      }
      update(e) {
        super.update(e);
        const t = this.render();
        t instanceof v &&
          this.constructor.render(t, this.renderRoot, { scopeName: this.localName, eventContext: this }),
          this._needsShimAdoptedStyleSheets &&
            ((this._needsShimAdoptedStyleSheets = !1),
            this.constructor._styles.forEach((e) => {
              const t = document.createElement('style');
              (t.textContent = e.cssText), this.renderRoot.appendChild(t);
            }));
      }
      render() {}
    }
    (ce.finalized = !0),
      (ce.render = (e, t, n) => {
        if (!n || 'object' != typeof n || !n.scopeName) throw new Error('The `scopeName` option is required.');
        const i = n.scopeName;
        const s = z.has(t);
        const o = $ && 11 === t.nodeType && !!t.host;
        const a = o && !V.has(i);
        const l = a ? document.createDocumentFragment() : t;
        if (
          (((e, t, n) => {
            let i = z.get(t);
            void 0 === i &&
              (r(t, t.firstChild), z.set(t, (i = new x(Object.assign({ templateFactory: R }, n)))), i.appendInto(t)),
              i.setValue(e),
              i.commit();
          })(e, l, Object.assign({ templateFactory: q(i) }, n)),
          a)
        ) {
          const e = z.get(l);
          z.delete(l);
          const n = e.value instanceof y ? e.value.template : void 0;
          K(i, l, n), r(t, t.firstChild), t.appendChild(l), z.set(t, e);
        }
        !s && o && window.ShadyCSS.styleElement(t.host);
      });
    const he = ae`
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
      document.adoptedStyleSheets = document.adoptedStyleSheets.concat(he.styleSheet);
    } catch (e) {
      {
        const e = document.createElement('style');
        (e.type = 'text/css'), (e.innerHTML = he.cssText), document.getElementsByTagName('head')[0].appendChild(e);
      }
    }
    const de = document.createElement('link');
    (de.rel = 'stylesheet'),
      (de.type = 'text/css'),
      (de.crossOrigin = 'anonymous'),
      (de.href =
        'https://fonts.googleapis.com/css?family=Roboto+Mono:400,700|Roboto:400,300,300italic,400italic,500,500italic,700,700italic'),
      document.head.appendChild(de);
    n(0), n(2);
    let ue = !1;
    let pe = !1;
    class _e extends ce {
      static get prismStyles() {
        return ae`/**
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
          ae`
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
          _e.prismStyles
        ];
      }
      set markdown(e) {
        (this._markdown = e), this._highlight(e);
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
        (ue = !0), this._registerSlotListener();
      }
      connectedCallback() {
        super.connectedCallback(), ue && !pe && this._registerSlotListener();
      }
      _registerSlotListener() {
        const e = this.shadowRoot.querySelector('#content');
        e && e.addEventListener('slotchange', this._slotChangeHandler);
      }
      disconnectedCallback() {
        super.disconnectedCallback(),
          this.shadowRoot.querySelector('#content').removeEventListener('slotchange', this._slotChangeHandler);
      }
      _slotChangeHandler() {
        this._updateContent();
      }
      _updateContent() {
        const e = this.shadowRoot.querySelector('#content');
        const t = e.assignedNodes().find((e) => 'TEMPLATE' === e.nodeName);
        if (!t) return;
        let n = this.unindent(t.innerHTML);
        (n = (n = n.replace(/ class=""/g, '')).replace(/=""/g, '')),
          (this.markdown = n),
          e.removeEventListener('slotchange', this._slotChangeHandler),
          this.appendChild(document.importNode(t.content, !0)),
          (pe = !0);
      }
      unindent(e) {
        if (!e) return e;
        const t = e.replace(/\t/g, '  ').split('\n');
        const n = t.reduce(function(e, t) {
          if (/^\s*$/.test(t)) return e;
          const n = t.match(/^(\s*)/)[0].length;
          return null === e ? n : n < e ? n : e;
        }, null);
        return t.map((e) => e.substr(n)).join('\n');
      }
      _highlight(e) {
        const t = Prism.languages.markdown;
        const n = { code: e, grammar: t, language: 'markdown' };
        Prism.hooks.run('before-highlight', n);
        const i = Prism.highlight(e, t, 'markdown');
        this.shadowRoot.querySelector('code').innerHTML = i;
      }
      _copyToClipboard() {
        const e = this.shadowRoot.querySelector('#copyButton');
        const t = document.createRange();
        t.selectNodeContents(this.shadowRoot.querySelector('.code'));
        const n = window.getSelection();
        n.removeAllRanges(), n.addRange(t);
        let i = !1;
        try {
          (i = document.execCommand('copy')), (e.textContent = 'done');
        } catch (t) {
          console.warn(t), (e.textContent = 'error');
        }
        return setTimeout(this._resetCopyButtonState.bind(this), 1e3), n.removeAllRanges(), i;
      }
      _resetCopyButtonState() {
        this.shadowRoot.querySelector('#copyButton').textContent = 'copy';
      }
    }
    window.customElements.define('arc-demo-helper', _e);
    /**
@license
Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/
    const fe = !(window.ShadyDOM && window.ShadyDOM.inUse);
    let me;
    let ge;
    function ye(e) {
      me =
        (!e || !e.shimcssproperties) &&
        (fe ||
          Boolean(
            !navigator.userAgent.match(/AppleWebKit\/601|Edge\/15/) &&
              window.CSS &&
              CSS.supports &&
              CSS.supports('box-shadow', '0 0 0 var(--foo)')
          ));
    }
    window.ShadyCSS && void 0 !== window.ShadyCSS.cssBuild && (ge = window.ShadyCSS.cssBuild);
    const be = Boolean(window.ShadyCSS && window.ShadyCSS.disableRuntime);
    window.ShadyCSS && void 0 !== window.ShadyCSS.nativeCss
      ? (me = window.ShadyCSS.nativeCss)
      : window.ShadyCSS
      ? (ye(window.ShadyCSS), (window.ShadyCSS = void 0))
      : ye(window.WebComponents && window.WebComponents.flags);
    const ve = me;
    /**
@license
Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/ class we {
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
    function Ce(e) {
      return (function e(t, n) {
        let i = n.substring(t.start, t.end - 1);
        t.parsedCssText = t.cssText = i.trim();
        if (t.parent) {
          const e = t.previous ? t.previous.end : t.parent.start;
          i = (i = (i = (function(e) {
            return e.replace(/\\([0-9a-f]{1,6})\s/gi, function() {
              let e = arguments[1];
              let t = 6 - e.length;
              for (; t--; ) e = '0' + e;
              return '\\' + e;
            });
          })((i = n.substring(e, t.start - 1)))).replace(Pe.multipleSpaces, ' ')).substring(i.lastIndexOf(';') + 1);
          const s = (t.parsedSelector = t.selector = i.trim());
          (t.atRule = 0 === s.indexOf(Oe)),
            t.atRule
              ? 0 === s.indexOf(Ae)
                ? (t.type = ke.MEDIA_RULE)
                : s.match(Pe.keyframesRule) &&
                  ((t.type = ke.KEYFRAMES_RULE), (t.keyframesName = t.selector.split(Pe.multipleSpaces).pop()))
              : 0 === s.indexOf(Te)
              ? (t.type = ke.MIXIN_RULE)
              : (t.type = ke.STYLE_RULE);
        }
        const s = t.rules;
        if (s) for (let t, i = 0, o = s.length; i < o && (t = s[i]); i++) e(t, n);
        return t;
      })(
        (function(e) {
          const t = new we();
          (t.start = 0), (t.end = e.length);
          let n = t;
          for (let i = 0, s = e.length; i < s; i++)
            if (e[i] === xe) {
              n.rules || (n.rules = []);
              const e = n;
              const t = e.rules[e.rules.length - 1] || null;
              ((n = new we()).start = i + 1), (n.parent = e), (n.previous = t), e.rules.push(n);
            } else e[i] === Ee && ((n.end = i + 1), (n = n.parent || t));
          return t;
        })((e = e.replace(Pe.comments, '').replace(Pe.port, ''))),
        e
      );
    }
    function Se(e, t, n = '') {
      let i = '';
      if (e.cssText || e.rules) {
        const n = e.rules;
        if (
          n &&
          !(function(e) {
            const t = e[0];
            return Boolean(t) && Boolean(t.selector) && 0 === t.selector.indexOf(Te);
          })(n)
        )
          for (let e, s = 0, o = n.length; s < o && (e = n[s]); s++) i = Se(e, t, i);
        else
          (i = (i = t
            ? e.cssText
            : (function(e) {
                return (function(e) {
                  return e.replace(Pe.mixinApply, '').replace(Pe.varApply, '');
                })(
                  (e = (function(e) {
                    return e.replace(Pe.customProp, '').replace(Pe.mixinProp, '');
                  })(e))
                );
              })(e.cssText)).trim()) && (i = '  ' + i + '\n');
      }
      return i && (e.selector && (n += e.selector + ' ' + xe + '\n'), (n += i), e.selector && (n += Ee + '\n\n')), n;
    }
    const ke = { STYLE_RULE: 1, KEYFRAMES_RULE: 7, MEDIA_RULE: 4, MIXIN_RULE: 1e3 };
    const xe = '{';
    const Ee = '}';
    const Pe = {
      comments: /\/\*[^*]*\*+([^\/*][^*]*\*+)*\//gim,
      port: /@import[^;]*;/gim,
      customProp: /(?:^[^;\-\s}]+)?--[^;{}]*?:[^{};]*?(?:[;\n]|$)/gim,
      mixinProp: /(?:^[^;\-\s}]+)?--[^;{}]*?:[^{};]*?{[^}]*?}(?:[;\n]|$)?/gim,
      mixinApply: /@apply\s*\(?[^);]*\)?\s*(?:[;\n]|$)?/gim,
      varApply: /[^;:]*?:[^;]*?var\([^;]*\)(?:[;\n]|$)?/gim,
      keyframesRule: /^@[^\s]*keyframes/,
      multipleSpaces: /\s+/g
    };
    const Te = '--';
    const Ae = '@media';
    const Oe = '@';
    const Ne = /(?:^|[;\s{]\s*)(--[\w-]*?)\s*:\s*(?:((?:'(?:\\'|.)*?'|"(?:\\"|.)*?"|\([^)]*?\)|[^};{])+)|\{([^}]*)\}(?:(?=[;\s}])|$))/gi;
    const Ie = /(?:^|\W+)@apply\s*\(?([^);\n]*)\)?/gi;
    const Re = /@media\s(.*)/;
    const Le = new Set();
    const ze = 'shady-unscoped';
    function Me(e) {
      const t = e.textContent;
      if (!Le.has(t)) {
        Le.add(t);
        const n = e.cloneNode(!0);
        document.head.appendChild(n);
      }
    }
    function Fe(e) {
      return e.hasAttribute(ze);
    }
    /**
@license
Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/ function De(
      e,
      t
    ) {
      return e ? ('string' == typeof e && (e = Ce(e)), t && Be(e, t), Se(e, ve)) : '';
    }
    function He(e) {
      return !e.__cssRules && e.textContent && (e.__cssRules = Ce(e.textContent)), e.__cssRules || null;
    }
    function Be(e, t, n, i) {
      if (!e) return;
      let s = !1;
      const o = e.type;
      if (i && o === ke.MEDIA_RULE) {
        const t = e.selector.match(Re);
        t && (window.matchMedia(t[1]).matches || (s = !0));
      }
      o === ke.STYLE_RULE ? t(e) : n && o === ke.KEYFRAMES_RULE ? n(e) : o === ke.MIXIN_RULE && (s = !0);
      const r = e.rules;
      if (r && !s) for (let e, s = 0, o = r.length; s < o && (e = r[s]); s++) Be(e, t, n, i);
    }
    function Ue(e, t) {
      let n = 0;
      for (let i = t, s = e.length; i < s; i++)
        if ('(' === e[i]) n++;
        else if (')' === e[i] && 0 == --n) return i;
      return -1;
    }
    window.ShadyDOM && window.ShadyDOM.wrap;
    const $e = 'css-build';
    function qe(e) {
      if (void 0 !== ge) return ge;
      if (void 0 === e.__cssBuild) {
        const t = e.getAttribute($e);
        if (t) e.__cssBuild = t;
        else {
          const t = (function(e) {
            const t = 'template' === e.localName ? e.content.firstChild : e.firstChild;
            if (t instanceof Comment) {
              const e = t.textContent.trim().split(':');
              if (e[0] === $e) return e[1];
            }
            return '';
          })(e);
          '' !== t &&
            (function(e) {
              const t = 'template' === e.localName ? e.content.firstChild : e.firstChild;
              t.parentNode.removeChild(t);
            })(
              /**
@license
Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/ e
            ),
            (e.__cssBuild = t);
        }
      }
      return e.__cssBuild || '';
    }
    function je(e) {
      return '' !== qe(e);
    }
    function Ve(e, t) {
      for (const n in t) null === n ? e.style.removeProperty(n) : e.style.setProperty(n, t[n]);
    }
    function Ke(e, t) {
      const n = window.getComputedStyle(e).getPropertyValue(t);
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
    const Ye = /;\s*/m;
    const We = /^\s*(initial)|(inherit)\s*$/;
    const Je = /\s*!important/;
    const Xe = '_-_';
    class Ze {
      constructor() {
        this._map = {};
      }
      set(e, t) {
        (e = e.trim()), (this._map[e] = { properties: t, dependants: {} });
      }
      get(e) {
        return (e = e.trim()), this._map[e] || null;
      }
    }
    let Ge = null;
    class Qe {
      constructor() {
        (this._currentElement = null), (this._measureElement = null), (this._map = new Ze());
      }
      detectMixin(e) {
        return (function(e) {
          const t = Ie.test(e) || Ne.test(e);
          return (Ie.lastIndex = 0), (Ne.lastIndex = 0), t;
        })(e);
      }
      gatherStyles(e) {
        const t = (function(e) {
          const t = [];
          const n = e.querySelectorAll('style');
          for (let e = 0; e < n.length; e++) {
            const i = n[e];
            Fe(i) ? fe || (Me(i), i.parentNode.removeChild(i)) : (t.push(i.textContent), i.parentNode.removeChild(i));
          }
          return t.join('').trim();
        })(e.content);
        if (t) {
          const n = document.createElement('style');
          return (n.textContent = t), e.content.insertBefore(n, e.content.firstChild), n;
        }
        return null;
      }
      transformTemplate(e, t) {
        void 0 === e._gatheredStyle && (e._gatheredStyle = this.gatherStyles(e));
        const n = e._gatheredStyle;
        return n ? this.transformStyle(n, t) : null;
      }
      transformStyle(e, t = '') {
        const n = He(e);
        return this.transformRules(n, t), (e.textContent = De(n)), n;
      }
      transformCustomStyle(e) {
        const t = He(e);
        return (
          Be(t, (e) => {
            ':root' === e.selector && (e.selector = 'html'), this.transformRule(e);
          }),
          (e.textContent = De(t)),
          t
        );
      }
      transformRules(e, t) {
        (this._currentElement = t),
          Be(e, (e) => {
            this.transformRule(e);
          }),
          (this._currentElement = null);
      }
      transformRule(e) {
        (e.cssText = this.transformCssText(e.parsedCssText, e)), ':root' === e.selector && (e.selector = ':host > *');
      }
      transformCssText(e, t) {
        return (
          (e = e.replace(Ne, (e, n, i, s) => this._produceCssProperties(e, n, i, s, t))),
          this._consumeCssProperties(e, t)
        );
      }
      _getInitialValueForProperty(e) {
        return (
          this._measureElement ||
            ((this._measureElement = document.createElement('meta')),
            this._measureElement.setAttribute('apply-shim-measure', ''),
            (this._measureElement.style.all = 'initial'),
            document.head.appendChild(this._measureElement)),
          window.getComputedStyle(this._measureElement).getPropertyValue(e)
        );
      }
      _fallbacksFromPreviousRules(e) {
        let t = e;
        for (; t.parent; ) t = t.parent;
        const n = {};
        let i = !1;
        return (
          Be(t, (t) => {
            (i = i || t === e) || (t.selector === e.selector && Object.assign(n, this._cssTextToMap(t.parsedCssText)));
          }),
          n
        );
      }
      _consumeCssProperties(e, t) {
        let n = null;
        for (; (n = Ie.exec(e)); ) {
          const i = n[0];
          const s = n[1];
          const o = n.index;
          const r = o + i.indexOf('@apply');
          const a = o + i.length;
          const l = e.slice(0, r);
          const c = e.slice(a);
          const h = t ? this._fallbacksFromPreviousRules(t) : {};
          Object.assign(h, this._cssTextToMap(l));
          const d = this._atApplyToCssProperties(s, h);
          (e = `${l}${d}${c}`), (Ie.lastIndex = o + d.length);
        }
        return e;
      }
      _atApplyToCssProperties(e, t) {
        e = e.replace(Ye, '');
        const n = [];
        let i = this._map.get(e);
        if ((i || (this._map.set(e, {}), (i = this._map.get(e))), i)) {
          let s;
          let o;
          let r;
          this._currentElement && (i.dependants[this._currentElement] = !0);
          const a = i.properties;
          for (s in a)
            (r = t && t[s]),
              (o = [s, ': var(', e, Xe, s]),
              r && o.push(',', r.replace(Je, '')),
              o.push(')'),
              Je.test(a[s]) && o.push(' !important'),
              n.push(o.join(''));
        }
        return n.join('; ');
      }
      _replaceInitialOrInherit(e, t) {
        const n = We.exec(t);
        return n && (t = n[1] ? this._getInitialValueForProperty(e) : 'apply-shim-inherit'), t;
      }
      _cssTextToMap(e, t = !1) {
        let n;
        let i;
        const s = e.split(';');
        const o = {};
        for (let e, r, a = 0; a < s.length; a++)
          (e = s[a]) &&
            (r = e.split(':')).length > 1 &&
            ((n = r[0].trim()), (i = r.slice(1).join(':')), t && (i = this._replaceInitialOrInherit(n, i)), (o[n] = i));
        return o;
      }
      _invalidateMixinEntry(e) {
        if (Ge) for (const t in e.dependants) t !== this._currentElement && Ge(t);
      }
      _produceCssProperties(e, t, n, i, s) {
        if (
          (n &&
            (function e(t, n) {
              const i = t.indexOf('var(');
              if (-1 === i) return n(t, '', '', '');
              const s = Ue(t, i + 3);
              const o = t.substring(i + 4, s);
              const r = t.substring(0, i);
              const a = e(t.substring(s + 1), n);
              const l = o.indexOf(',');
              return -1 === l ? n(r, o.trim(), '', a) : n(r, o.substring(0, l).trim(), o.substring(l + 1).trim(), a);
            })(n, (e, t) => {
              t && this._map.get(t) && (i = `@apply ${t};`);
            }),
          !i)
        )
          return e;
        const o = this._consumeCssProperties('' + i, s);
        let r = e.slice(0, e.indexOf('--'));
        const a = this._cssTextToMap(o, !0);
        let l = a;
        const c = this._map.get(t);
        const h = c && c.properties;
        h ? (l = Object.assign(Object.create(h), a)) : this._map.set(t, l);
        let d;
        let u;
        const p = [];
        let _ = !1;
        for (d in l) void 0 === (u = a[d]) && (u = 'initial'), !h || d in h || (_ = !0), p.push(`${t}${Xe}${d}: ${u}`);
        return (
          _ && this._invalidateMixinEntry(c), c && (c.properties = l), n && (r = `${e};${r}`), `${r}${p.join('; ')};`
        );
      }
    }
    (Qe.prototype.detectMixin = Qe.prototype.detectMixin),
      (Qe.prototype.transformStyle = Qe.prototype.transformStyle),
      (Qe.prototype.transformCustomStyle = Qe.prototype.transformCustomStyle),
      (Qe.prototype.transformRules = Qe.prototype.transformRules),
      (Qe.prototype.transformRule = Qe.prototype.transformRule),
      (Qe.prototype.transformTemplate = Qe.prototype.transformTemplate),
      (Qe.prototype._separator = Xe),
      Object.defineProperty(Qe.prototype, 'invalidCallback', {
        get: () => Ge,
        set(e) {
          Ge = e;
        }
      });
    const et = Qe;
    /**
@license
Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/ const tt = {};
    /**
@license
Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/ const nt =
      '_applyShimCurrentVersion';
    const it = '_applyShimNextVersion';
    const st = '_applyShimValidatingVersion';
    const ot = Promise.resolve();
    function rt(e) {
      const t = tt[e];
      t &&
        (function(e) {
          (e[nt] = e[nt] || 0), (e[st] = e[st] || 0), (e[it] = (e[it] || 0) + 1);
        })(t);
    }
    function at(e) {
      return e[nt] === e[it];
    }
    function lt(e) {
      return !at(e) && e[st] === e[it];
    }
    function ct(e) {
      (e[st] = e[it]),
        e._validating ||
          ((e._validating = !0),
          ot.then(function() {
            (e[nt] = e[it]), (e._validating = !1);
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
    let ht;
    let dt = null;
    const ut = (window.HTMLImports && window.HTMLImports.whenReady) || null;
    function pt(e) {
      requestAnimationFrame(function() {
        ut
          ? ut(e)
          : (dt ||
              ((dt = new Promise((e) => {
                ht = e;
              })),
              'complete' === document.readyState
                ? ht()
                : document.addEventListener('readystatechange', () => {
                    'complete' === document.readyState && ht();
                  })),
            dt.then(function() {
              e && e();
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
*/ const _t =
      '__seenByShadyCSS';
    const ft = '__shadyCSSCachedStyle';
    let mt = null;
    let gt = null;
    class yt {
      constructor() {
        (this.customStyles = []),
          (this.enqueued = !1),
          pt(() => {
            window.ShadyCSS.flushCustomStyles && window.ShadyCSS.flushCustomStyles();
          });
      }
      enqueueDocumentValidation() {
        !this.enqueued && gt && ((this.enqueued = !0), pt(gt));
      }
      addCustomStyle(e) {
        e[_t] || ((e[_t] = !0), this.customStyles.push(e), this.enqueueDocumentValidation());
      }
      getStyleForCustomStyle(e) {
        if (e[ft]) return e[ft];
        let t;
        return (t = e.getStyle ? e.getStyle() : e);
      }
      processStyles() {
        const e = this.customStyles;
        for (let t = 0; t < e.length; t++) {
          const n = e[t];
          if (n[ft]) continue;
          const i = this.getStyleForCustomStyle(n);
          if (i) {
            const e = i.__appliedElement || i;
            mt && mt(e), (n[ft] = e);
          }
        }
        return e;
      }
    }
    (yt.prototype.addCustomStyle = yt.prototype.addCustomStyle),
      (yt.prototype.getStyleForCustomStyle = yt.prototype.getStyleForCustomStyle),
      (yt.prototype.processStyles = yt.prototype.processStyles),
      Object.defineProperties(yt.prototype, {
        transformCallback: {
          get: () => mt,
          set(e) {
            mt = e;
          }
        },
        validateCallback: {
          get: () => gt,
          set(e) {
            let t = !1;
            gt || (t = !0), (gt = e), t && this.enqueueDocumentValidation();
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
    const bt = new et();
    class vt {
      constructor() {
        (this.customStyleInterface = null), (bt.invalidCallback = rt);
      }
      ensure() {
        this.customStyleInterface ||
          (window.ShadyCSS.CustomStyleInterface &&
            ((this.customStyleInterface = window.ShadyCSS.CustomStyleInterface),
            (this.customStyleInterface.transformCallback = (e) => {
              bt.transformCustomStyle(e);
            }),
            (this.customStyleInterface.validateCallback = () => {
              requestAnimationFrame(() => {
                this.customStyleInterface.enqueued && this.flushCustomStyles();
              });
            })));
      }
      prepareTemplate(e, t) {
        if ((this.ensure(), je(e))) return;
        tt[t] = e;
        const n = bt.transformTemplate(e, t);
        e._styleAst = n;
      }
      flushCustomStyles() {
        if ((this.ensure(), !this.customStyleInterface)) return;
        const e = this.customStyleInterface.processStyles();
        if (this.customStyleInterface.enqueued) {
          for (let t = 0; t < e.length; t++) {
            const n = e[t];
            const i = this.customStyleInterface.getStyleForCustomStyle(n);
            i && bt.transformCustomStyle(i);
          }
          this.customStyleInterface.enqueued = !1;
        }
      }
      styleSubtree(e, t) {
        if ((this.ensure(), t && Ve(e, t), e.shadowRoot)) {
          this.styleElement(e);
          const t = e.shadowRoot.children || e.shadowRoot.childNodes;
          for (let e = 0; e < t.length; e++) this.styleSubtree(t[e]);
        } else {
          const t = e.children || e.childNodes;
          for (let e = 0; e < t.length; e++) this.styleSubtree(t[e]);
        }
      }
      styleElement(e) {
        this.ensure();
        const { is: t } = (function(e) {
          const t = e.localName;
          let n = '';
          let i = '';
          return (
            t
              ? t.indexOf('-') > -1
                ? (n = t)
                : ((i = t), (n = (e.getAttribute && e.getAttribute('is')) || ''))
              : ((n = e.is), (i = e.extends)),
            { is: n, typeExtension: i }
          );
        })(e);
        const n = tt[t];
        if ((!n || !je(n)) && n && !at(n)) {
          lt(n) || (this.prepareTemplate(n, t), ct(n));
          const i = e.shadowRoot;
          if (i) {
            const e = i.querySelector('style');
            e && ((e.__cssRules = n._styleAst), (e.textContent = De(n._styleAst)));
          }
        }
      }
      styleDocument(e) {
        this.ensure(), this.styleSubtree(document.body, e);
      }
    }
    if (!window.ShadyCSS || !window.ShadyCSS.ScopingShim) {
      const e = new vt();
      const t = window.ShadyCSS && window.ShadyCSS.CustomStyleInterface;
      (window.ShadyCSS = {
        prepareTemplate(t, n, i) {
          e.flushCustomStyles(), e.prepareTemplate(t, n);
        },
        prepareTemplateStyles(e, t, n) {
          window.ShadyCSS.prepareTemplate(e, t, n);
        },
        prepareTemplateDom(e, t) {},
        styleSubtree(t, n) {
          e.flushCustomStyles(), e.styleSubtree(t, n);
        },
        styleElement(t) {
          e.flushCustomStyles(), e.styleElement(t);
        },
        styleDocument(t) {
          e.flushCustomStyles(), e.styleDocument(t);
        },
        getComputedStyleValue: (e, t) => Ke(e, t),
        flushCustomStyles() {
          e.flushCustomStyles();
        },
        nativeCss: ve,
        nativeShadow: fe,
        cssBuild: ge,
        disableRuntime: be
      }),
        t && (window.ShadyCSS.CustomStyleInterface = t);
    }
    (window.ShadyCSS.ApplyShim = bt),
      /**
@license
Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/
      (window.JSCompiler_renameProperty = function(e, t) {
        return e;
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
    let wt;
    let Ct;
    const St = /(url\()([^)]*)(\))/g;
    const kt = /(^\/[^\/])|(^#)|(^[\w-\d]*:)/;
    function xt(e, t) {
      if (e && kt.test(e)) return e;
      if ('//' === e) return e;
      if (void 0 === wt) {
        wt = !1;
        try {
          const e = new URL('b', 'http://a');
          (e.pathname = 'c%20d'), (wt = 'http://a/c%20d' === e.href);
        } catch (e) {}
      }
      if ((t || (t = document.baseURI || window.location.href), wt))
        try {
          return new URL(e, t).href;
        } catch (t) {
          return e;
        }
      return (
        Ct ||
          (((Ct = document.implementation.createHTMLDocument('temp')).base = Ct.createElement('base')),
          Ct.head.appendChild(Ct.base),
          (Ct.anchor = Ct.createElement('a')),
          Ct.body.appendChild(Ct.anchor)),
        (Ct.base.href = t),
        (Ct.anchor.href = e),
        Ct.anchor.href || e
      );
    }
    function Et(e, t) {
      return e.replace(St, function(e, n, i, s) {
        return n + "'" + xt(i.replace(/["']/g, ''), t) + "'" + s;
      });
    }
    function Pt(e) {
      return e.substring(0, e.lastIndexOf('/') + 1);
    }
    /**
@license
Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/ const Tt = !window.ShadyDOM;
    Boolean(!window.ShadyCSS || window.ShadyCSS.nativeCss), window.customElements.polyfillWrapFlushCallback;
    const At = Pt(document.baseURI || window.location.href);
    const Ot = (window.Polymer && window.Polymer.sanitizeDOMValue) || void 0;
    const Nt = !1;
    const It = !1;
    const Rt = !1;
    const Lt = !1;
    const zt = !1;
    const Mt = !0;
    /**
@license
Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/
    let Ft = 0;
    function Dt() {}
    Dt.prototype.__mixinApplications, Dt.prototype.__mixinSet;
    const Ht = function(e) {
      let t = e.__mixinApplications;
      t || ((t = new WeakMap()), (e.__mixinApplications = t));
      const n = Ft++;
      return function(i) {
        const s = i.__mixinSet;
        if (s && s[n]) return i;
        const o = t;
        let r = o.get(i);
        r || ((r = e(i)), o.set(i, r));
        const a = Object.create(r.__mixinSet || s || null);
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
*/ const Bt = {};
    const Ut = {};
    function $t(e, t) {
      Bt[e] = Ut[e.toLowerCase()] = t;
    }
    function qt(e) {
      return Bt[e] || Ut[e.toLowerCase()];
    }
    class jt extends HTMLElement {
      static get observedAttributes() {
        return ['id'];
      }
      static import(e, t) {
        if (e) {
          const n = qt(e);
          return n && t ? n.querySelector(t) : n;
        }
        return null;
      }
      attributeChangedCallback(e, t, n, i) {
        t !== n && this.register();
      }
      get assetpath() {
        if (!this.__assetpath) {
          const e =
            window.HTMLImports && HTMLImports.importForElement
              ? HTMLImports.importForElement(this) || document
              : this.ownerDocument;
          const t = xt(this.getAttribute('assetpath') || '', e.baseURI);
          this.__assetpath = Pt(t);
        }
        return this.__assetpath;
      }
      register(e) {
        if ((e = e || this.id)) {
          if (It && void 0 !== qt(e))
            throw ($t(e, null), new Error(`strictTemplatePolicy: dom-module ${e} re-registered`));
          (this.id = e),
            $t(e, this),
            (t = this).querySelector('style') && console.warn('dom-module %s has style outside template', t.id);
        }
        let t;
      }
    }
    (jt.prototype.modules = Bt), customElements.define('dom-module', jt);
    /**
@license
Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/
    const Vt = 'link[rel=import][type~=css]';
    const Kt = 'include';
    const Yt = 'shady-unscoped';
    function Wt(e) {
      return jt.import(e);
    }
    function Jt(e) {
      const t = Et((e.body ? e.body : e).textContent, e.baseURI);
      const n = document.createElement('style');
      return (n.textContent = t), n;
    }
    function Xt(e) {
      const t = e.trim().split(/\s+/);
      const n = [];
      for (let e = 0; e < t.length; e++) n.push(...Zt(t[e]));
      return n;
    }
    function Zt(e) {
      const t = Wt(e);
      if (!t) return console.warn('Could not find style data in module named', e), [];
      if (void 0 === t._styles) {
        const e = [];
        e.push(...Qt(t));
        const n = t.querySelector('template');
        n && e.push(...Gt(n, t.assetpath)), (t._styles = e);
      }
      return t._styles;
    }
    function Gt(e, t) {
      if (!e._styles) {
        const n = [];
        const i = e.content.querySelectorAll('style');
        for (let e = 0; e < i.length; e++) {
          const s = i[e];
          const o = s.getAttribute(Kt);
          o &&
            n.push(
              ...Xt(o).filter(function(e, t, n) {
                return n.indexOf(e) === t;
              })
            ),
            t && (s.textContent = Et(s.textContent, t)),
            n.push(s);
        }
        e._styles = n;
      }
      return e._styles;
    }
    function Qt(e) {
      const t = [];
      const n = e.querySelectorAll(Vt);
      for (let e = 0; e < n.length; e++) {
        const i = n[e];
        if (i.import) {
          const e = i.import;
          const n = i.hasAttribute(Yt);
          if (n && !e._unscopedStyle) {
            const t = Jt(e);
            t.setAttribute(Yt, ''), (e._unscopedStyle = t);
          } else e._style || (e._style = Jt(e));
          t.push(n ? e._unscopedStyle : e._style);
        }
      }
      return t;
    }
    function en(e) {
      const t = Wt(e);
      if (t && void 0 === t._cssText) {
        let e = tn(t);
        const n = t.querySelector('template');
        n &&
          (e += (function(e, t) {
            let n = '';
            const i = Gt(e, t);
            for (let e = 0; e < i.length; e++) {
              const t = i[e];
              t.parentNode && t.parentNode.removeChild(t), (n += t.textContent);
            }
            return n;
          })(n, t.assetpath)),
          (t._cssText = e || null);
      }
      return t || console.warn('Could not find style data in module named', e), (t && t._cssText) || '';
    }
    function tn(e) {
      let t = '';
      const n = Qt(e);
      for (let e = 0; e < n.length; e++) t += n[e].textContent;
      return t;
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
        ? (e) => ShadyDOM.patch(e)
        : (e) => e;
    /**
@license
Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/ function sn(
      e
    ) {
      return e.indexOf('.') >= 0;
    }
    function on(e) {
      const t = e.indexOf('.');
      return -1 === t ? e : e.slice(0, t);
    }
    function rn(e, t) {
      return 0 === e.indexOf(t + '.');
    }
    function an(e, t) {
      return 0 === t.indexOf(e + '.');
    }
    function ln(e, t, n) {
      return t + n.slice(e.length);
    }
    function cn(e) {
      if (Array.isArray(e)) {
        const t = [];
        for (let n = 0; n < e.length; n++) {
          const i = e[n].toString().split('.');
          for (let e = 0; e < i.length; e++) t.push(i[e]);
        }
        return t.join('.');
      }
      return e;
    }
    function hn(e) {
      return Array.isArray(e) ? cn(e).split('.') : e.toString().split('.');
    }
    function dn(e, t, n) {
      let i = e;
      const s = hn(t);
      for (let e = 0; e < s.length; e++) {
        if (!i) return;
        i = i[s[e]];
      }
      return n && (n.path = s.join('.')), i;
    }
    function un(e, t, n) {
      const i = e;
      const s = hn(t);
      const o = s[s.length - 1];
      if (s.length > 1) {
        for (let e = 0; e < s.length - 1; e++) {
          if (!(i = i[s[e]])) return;
        }
        i[o] = n;
      } else i[t] = n;
      return s.join('.');
    }
    const pn = {};
    const _n = /-[a-z]/g;
    const fn = /([A-Z])/g;
    /**
@license
Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/ function mn(
      e
    ) {
      return pn[e] || (pn[e] = e.indexOf('-') < 0 ? e : e.replace(_n, (e) => e[1].toUpperCase()));
    }
    function gn(e) {
      return pn[e] || (pn[e] = e.replace(fn, '-$1').toLowerCase());
    }
    /**
@license
Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/ let yn = 0;
    let bn = 0;
    const vn = [];
    let wn = 0;
    const Cn = document.createTextNode('');
    new window.MutationObserver(function() {
      const e = vn.length;
      for (let t = 0; t < e; t++) {
        const e = vn[t];
        if (e)
          try {
            e();
          } catch (e) {
            setTimeout(() => {
              throw e;
            });
          }
      }
      vn.splice(0, e), (bn += e);
    }).observe(Cn, { characterData: !0 });
    const Sn = {
      after: (e) => ({
        run: (t) => window.setTimeout(t, e),
        cancel(e) {
          window.clearTimeout(e);
        }
      }),
      run: (e, t) => window.setTimeout(e, t),
      cancel(e) {
        window.clearTimeout(e);
      }
    };
    const kn = {
      run: (e) => ((Cn.textContent = wn++), vn.push(e), yn++),
      cancel(e) {
        const t = e - bn;
        if (t >= 0) {
          if (!vn[t]) throw new Error('invalid async handle: ' + e);
          vn[t] = null;
        }
      }
    };
    const xn = kn;
    const En = Ht((e) => {
      return class extends e {
        static createProperties(e) {
          const t = this.prototype;
          for (const n in e) n in t || t._createPropertyAccessor(n);
        }
        static attributeNameForProperty(e) {
          return e.toLowerCase();
        }
        static typeForProperty(e) {}
        _createPropertyAccessor(e, t) {
          this._addPropertyToAttributeMap(e),
            this.hasOwnProperty('__dataHasAccessor') ||
              (this.__dataHasAccessor = Object.assign({}, this.__dataHasAccessor)),
            this.__dataHasAccessor[e] || ((this.__dataHasAccessor[e] = !0), this._definePropertyAccessor(e, t));
        }
        _addPropertyToAttributeMap(e) {
          if (
            (this.hasOwnProperty('__dataAttributes') ||
              (this.__dataAttributes = Object.assign({}, this.__dataAttributes)),
            !this.__dataAttributes[e])
          ) {
            const t = this.constructor.attributeNameForProperty(e);
            this.__dataAttributes[t] = e;
          }
        }
        _definePropertyAccessor(e, t) {
          Object.defineProperty(this, e, {
            get() {
              return this._getProperty(e);
            },
            set: t
              ? function() {}
              : function(t) {
                  this._setProperty(e, t);
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
          for (const e in this.__dataHasAccessor)
            this.hasOwnProperty(e) &&
              ((this.__dataInstanceProps = this.__dataInstanceProps || {}),
              (this.__dataInstanceProps[e] = this[e]),
              delete this[e]);
        }
        _initializeInstanceProperties(e) {
          Object.assign(this, e);
        }
        _setProperty(e, t) {
          this._setPendingProperty(e, t) && this._invalidateProperties();
        }
        _getProperty(e) {
          return this.__data[e];
        }
        _setPendingProperty(e, t, n) {
          const i = this.__data[e];
          const s = this._shouldPropertyChange(e, t, i);
          return (
            s &&
              (this.__dataPending || ((this.__dataPending = {}), (this.__dataOld = {})),
              !this.__dataOld || e in this.__dataOld || (this.__dataOld[e] = i),
              (this.__data[e] = t),
              (this.__dataPending[e] = t)),
            s
          );
        }
        _invalidateProperties() {
          !this.__dataInvalid &&
            this.__dataReady &&
            ((this.__dataInvalid = !0),
            xn.run(() => {
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
          const e = this.__data;
          const t = this.__dataPending;
          const n = this.__dataOld;
          this._shouldPropertiesChange(e, t, n) &&
            ((this.__dataPending = null), (this.__dataOld = null), this._propertiesChanged(e, t, n));
        }
        _shouldPropertiesChange(e, t, n) {
          return Boolean(t);
        }
        _propertiesChanged(e, t, n) {}
        _shouldPropertyChange(e, t, n) {
          return n !== t && (n == n || t == t);
        }
        attributeChangedCallback(e, t, n, i) {
          t !== n && this._attributeToProperty(e, n),
            super.attributeChangedCallback && super.attributeChangedCallback(e, t, n, i);
        }
        _attributeToProperty(e, t, n) {
          if (!this.__serializing) {
            const i = this.__dataAttributes;
            const s = (i && i[e]) || e;
            this[s] = this._deserializeValue(t, n || this.constructor.typeForProperty(s));
          }
        }
        _propertyToAttribute(e, t, n) {
          (this.__serializing = !0),
            (n = arguments.length < 3 ? this[e] : n),
            this._valueToNodeAttribute(this, n, t || this.constructor.attributeNameForProperty(e)),
            (this.__serializing = !1);
        }
        _valueToNodeAttribute(e, t, n) {
          const i = this._serializeValue(t);
          ('class' !== n && 'name' !== n && 'slot' !== n) || (e = nn(e)),
            void 0 === i ? e.removeAttribute(n) : e.setAttribute(n, i);
        }
        _serializeValue(e) {
          switch (typeof e) {
            case 'boolean':
              return e ? '' : void 0;
            default:
              return null != e ? e.toString() : void 0;
          }
        }
        _deserializeValue(e, t) {
          switch (t) {
            case Boolean:
              return null !== e;
            case Number:
              return Number(e);
            default:
              return e;
          }
        }
      };
    });
    const Pn = {};
    let Tn = HTMLElement.prototype;
    for (; Tn; ) {
      const e = Object.getOwnPropertyNames(Tn);
      for (let t = 0; t < e.length; t++) Pn[e[t]] = !0;
      Tn = Object.getPrototypeOf(Tn);
    }
    const An = Ht((e) => {
      const t = En(e);
      return class extends t {
        static createPropertiesForAttributes() {
          const e = this.observedAttributes;
          for (let t = 0; t < e.length; t++) this.prototype._createPropertyAccessor(mn(e[t]));
        }
        static attributeNameForProperty(e) {
          return gn(e);
        }
        _initializeProperties() {
          this.__dataProto && (this._initializeProtoProperties(this.__dataProto), (this.__dataProto = null)),
            super._initializeProperties();
        }
        _initializeProtoProperties(e) {
          for (const t in e) this._setProperty(t, e[t]);
        }
        _ensureAttribute(e, t) {
          const n = this;
          n.hasAttribute(e) || this._valueToNodeAttribute(n, t, e);
        }
        _serializeValue(e) {
          switch (typeof e) {
            case 'object':
              if (e instanceof Date) return e.toString();
              if (e)
                try {
                  return JSON.stringify(e);
                } catch (e) {
                  return '';
                }
            default:
              return super._serializeValue(e);
          }
        }
        _deserializeValue(e, t) {
          let n;
          switch (t) {
            case Object:
              try {
                n = JSON.parse(e);
              } catch (t) {
                n = e;
              }
              break;
            case Array:
              try {
                n = JSON.parse(e);
              } catch (t) {
                (n = null), console.warn(`Polymer::Attributes: couldn't decode Array as JSON: ${e}`);
              }
              break;
            case Date:
              (n = isNaN(e) ? String(e) : Number(e)), (n = new Date(n));
              break;
            default:
              n = super._deserializeValue(e, t);
          }
          return n;
        }
        _definePropertyAccessor(e, t) {
          !(function(e, t) {
            if (!Pn[t]) {
              const n = e[t];
              void 0 !== n &&
                (e.__data
                  ? e._setPendingProperty(t, n)
                  : (e.__dataProto
                      ? e.hasOwnProperty(JSCompiler_renameProperty('__dataProto', e)) ||
                        (e.__dataProto = Object.create(e.__dataProto))
                      : (e.__dataProto = {}),
                    (e.__dataProto[t] = n)));
            }
          })(this, e),
            super._definePropertyAccessor(e, t);
        }
        _hasAccessor(e) {
          return this.__dataHasAccessor && this.__dataHasAccessor[e];
        }
        _isPropertyPending(e) {
          return Boolean(this.__dataPending && e in this.__dataPending);
        }
      };
    });
    const On = { 'dom-if': !0, 'dom-repeat': !0 };
    /**
@license
Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/ function Nn(
      e
    ) {
      const t = e.getAttribute('is');
      if (t && On[t]) {
        const n = e;
        for (
          n.removeAttribute('is'),
            e = n.ownerDocument.createElement(t),
            n.parentNode.replaceChild(e, n),
            e.appendChild(n);
          n.attributes.length;

        )
          e.setAttribute(n.attributes[0].name, n.attributes[0].value), n.removeAttribute(n.attributes[0].name);
      }
      return e;
    }
    function In(e, t) {
      const n = t.parentInfo && In(e, t.parentInfo);
      if (!n) return e;
      for (let e = n.firstChild, i = 0; e; e = e.nextSibling) if (t.parentIndex === i++) return e;
    }
    function Rn(e, t, n, i) {
      i.id && (t[i.id] = n);
    }
    function Ln(e, t, n) {
      if (n.events && n.events.length)
        for (let i, s = 0, o = n.events; s < o.length && (i = o[s]); s++)
          e._addMethodEventListenerToNode(t, i.name, i.value, e);
    }
    function zn(e, t, n) {
      n.templateInfo && (t._templateInfo = n.templateInfo);
    }
    const Mn = Ht((e) => {
      return class extends e {
        static _parseTemplate(e, t) {
          if (!e._templateInfo) {
            const n = (e._templateInfo = {});
            (n.nodeInfoList = []),
              (n.stripWhiteSpace = (t && t.stripWhiteSpace) || e.hasAttribute('strip-whitespace')),
              this._parseTemplateContent(e, n, { parent: null });
          }
          return e._templateInfo;
        }
        static _parseTemplateContent(e, t, n) {
          return this._parseTemplateNode(e.content, t, n);
        }
        static _parseTemplateNode(e, t, n) {
          let i = !1;
          const s = e;
          return (
            'template' != s.localName || s.hasAttribute('preserve-content')
              ? 'slot' === s.localName && (t.hasInsertionPoint = !0)
              : (i = this._parseTemplateNestedTemplate(s, t, n) || i),
            s.firstChild && this._parseTemplateChildNodes(s, t, n),
            s.hasAttributes && s.hasAttributes() && (i = this._parseTemplateNodeAttributes(s, t, n) || i),
            i
          );
        }
        static _parseTemplateChildNodes(e, t, n) {
          if ('script' !== e.localName && 'style' !== e.localName)
            for (let i, s = e.firstChild, o = 0; s; s = i) {
              if (('template' == s.localName && (s = Nn(s)), (i = s.nextSibling), s.nodeType === Node.TEXT_NODE)) {
                let n = i;
                for (; n && n.nodeType === Node.TEXT_NODE; )
                  (s.textContent += n.textContent), (i = n.nextSibling), e.removeChild(n), (n = i);
                if (t.stripWhiteSpace && !s.textContent.trim()) {
                  e.removeChild(s);
                  continue;
                }
              }
              const r = { parentIndex: o, parentInfo: n };
              this._parseTemplateNode(s, t, r) && (r.infoIndex = t.nodeInfoList.push(r) - 1), s.parentNode && o++;
            }
        }
        static _parseTemplateNestedTemplate(e, t, n) {
          const i = e;
          const s = this._parseTemplate(i, t);
          return (
            (s.content = i.content.ownerDocument.createDocumentFragment()).appendChild(i.content),
            (n.templateInfo = s),
            !0
          );
        }
        static _parseTemplateNodeAttributes(e, t, n) {
          let i = !1;
          const s = Array.from(e.attributes);
          for (let o, r = s.length - 1; (o = s[r]); r--)
            i = this._parseTemplateNodeAttribute(e, t, n, o.name, o.value) || i;
          return i;
        }
        static _parseTemplateNodeAttribute(e, t, n, i, s) {
          return 'on-' === i.slice(0, 3)
            ? (e.removeAttribute(i), (n.events = n.events || []), n.events.push({ name: i.slice(3), value: s }), !0)
            : 'id' === i && ((n.id = s), !0);
        }
        static _contentForTemplate(e) {
          const t = e._templateInfo;
          return (t && t.content) || e.content;
        }
        _stampTemplate(e) {
          e &&
            !e.content &&
            window.HTMLTemplateElement &&
            HTMLTemplateElement.decorate &&
            HTMLTemplateElement.decorate(e);
          const t = this.constructor._parseTemplate(e);
          const n = t.nodeInfoList;
          const i = t.content || e.content;
          let s = document.importNode(i, !0);
          s.__noInsertionPoint = !t.hasInsertionPoint;
          const o = (s.nodeList = new Array(n.length));
          s.$ = {};
          for (let e, t = 0, i = n.length; t < i && (e = n[t]); t++) {
            const n = (o[t] = In(s, e));
            Rn(0, s.$, n, e), zn(0, n, e), Ln(this, n, e);
          }
          return (s = s);
        }
        _addMethodEventListenerToNode(e, t, n, i) {
          const s = (function(e, t, n) {
            return (
              (e = e._methodHost || e),
              function(t) {
                e[n] ? e[n](t, t.detail) : console.warn('listener method `' + n + '` not defined');
              }
            );
          })((i = i || e), 0, n);
          return this._addEventListenerToNode(e, t, s), s;
        }
        _addEventListenerToNode(e, t, n) {
          e.addEventListener(t, n);
        }
        _removeEventListenerFromNode(e, t, n) {
          e.removeEventListener(t, n);
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
    };
    const Hn = /[A-Z]/;
    function Bn(e, t) {
      let n = e[t];
      if (n) {
        if (!e.hasOwnProperty(t)) {
          n = e[t] = Object.create(e[t]);
          for (const e in n) {
            const t = n[e];
            const i = (n[e] = Array(t.length));
            for (let e = 0; e < t.length; e++) i[e] = t[e];
          }
        }
      } else n = e[t] = {};
      return n;
    }
    function Un(e, t, n, i, s, o) {
      if (t) {
        let r = !1;
        const a = Fn++;
        for (const l in n) $n(e, t, a, l, n, i, s, o) && (r = !0);
        return r;
      }
      return !1;
    }
    function $n(e, t, n, i, s, o, r, a) {
      let l = !1;
      const c = t[r ? on(i) : i];
      if (c)
        for (let t, h = 0, d = c.length; h < d && (t = c[h]); h++)
          (t.info && t.info.lastRun === n) ||
            (r && !qn(i, t.trigger)) ||
            (t.info && (t.info.lastRun = n), t.fn(e, i, s, o, t.info, r, a), (l = !0));
      return l;
    }
    function qn(e, t) {
      if (t) {
        const n = t.name;
        return n == e || !(!t.structured || !rn(n, e)) || !(!t.wildcard || !an(n, e));
      }
      return !0;
    }
    function jn(e, t, n, i, s) {
      const o = 'string' == typeof s.method ? e[s.method] : s.method;
      const r = s.property;
      o ? o.call(e, e.__data[r], i[r]) : s.dynamicFn || console.warn('observer method `' + s.method + '` not defined');
    }
    function Vn(e, t, n) {
      const i = on(t);
      if (i !== t) {
        return Kn(e, gn(i) + '-changed', n[t], t), !0;
      }
      return !1;
    }
    function Kn(e, t, n, i) {
      const s = { value: n, queueProperty: !0 };
      i && (s.path = i), nn(e).dispatchEvent(new CustomEvent(t, { detail: s }));
    }
    function Yn(e, t, n, i, s, o) {
      const r = (o ? on(t) : t) != t ? t : null;
      let a = r ? dn(e, r) : e.__data[t];
      r && void 0 === a && (a = n[t]), Kn(e, s.eventName, a, r);
    }
    function Wn(e, t, n, i, s) {
      let o = e.__data[t];
      Ot && (o = Ot(o, s.attrName, 'attribute', e)), e._propertyToAttribute(t, s.attrName, o);
    }
    function Jn(e, t, n, i, s) {
      const o = ni(e, t, n, i, s);
      const r = s.methodInfo;
      e.__dataHasAccessor && e.__dataHasAccessor[r] ? e._setPendingProperty(r, o, !0) : (e[r] = o);
    }
    function Xn(e, t, n, i, s, o, r) {
      n.bindings = n.bindings || [];
      const a = { kind: i, target: s, parts: o, literal: r, isCompound: 1 !== o.length };
      if (
        (n.bindings.push(a),
        (function(e) {
          return (
            Boolean(e.target) && 'attribute' != e.kind && 'text' != e.kind && !e.isCompound && '{' === e.parts[0].mode
          );
        })(a))
      ) {
        const { event: e, negate: t } = a.parts[0];
        (a.listenerEvent = e || gn(s) + '-changed'), (a.listenerNegate = t);
      }
      const l = t.nodeInfoList.length;
      for (let n = 0; n < a.parts.length; n++) {
        const i = a.parts[n];
        (i.compoundIndex = n), Zn(e, t, a, i, l);
      }
    }
    function Zn(e, t, n, i, s) {
      if (!i.literal)
        if ('attribute' === n.kind && '-' === n.target[0])
          console.warn('Cannot set attribute ' + n.target + ' because "-" is not a valid attribute starting character');
        else {
          const o = i.dependencies;
          const r = { index: s, binding: n, part: i, evaluator: e };
          for (let n = 0; n < o.length; n++) {
            let i = o[n];
            'string' == typeof i && ((i = ai(i)).wildcard = !0),
              e._addTemplatePropertyEffect(t, i.rootProperty, { fn: Gn, info: r, trigger: i });
          }
        }
    }
    function Gn(e, t, n, i, s, o, r) {
      const a = r[s.index];
      const l = s.binding;
      const c = s.part;
      if (
        o &&
        c.source &&
        t.length > c.source.length &&
        'property' == l.kind &&
        !l.isCompound &&
        a.__isPropertyEffectsClient &&
        a.__dataHasAccessor &&
        a.__dataHasAccessor[l.target]
      ) {
        const i = n[t];
        (t = ln(c.source, l.target, t)), a._setPendingPropertyOrPath(t, i, !1, !0) && e._enqueueClient(a);
      } else {
        !(function(e, t, n, i, s) {
          (s = (function(e, t, n, i) {
            if (n.isCompound) {
              const s = e.__dataCompoundStorage[n.target];
              (s[i.compoundIndex] = t), (t = s.join(''));
            }
            'attribute' !== n.kind &&
              (('textContent' !== n.target &&
                ('value' !== n.target || ('input' !== e.localName && 'textarea' !== e.localName))) ||
                (t = null == t ? '' : t));
            return t;
          })(t, s, n, i)),
            Ot && (s = Ot(s, n.target, n.kind, t));
          if ('attribute' == n.kind) e._valueToNodeAttribute(t, s, n.target);
          else {
            const i = n.target;
            t.__isPropertyEffectsClient && t.__dataHasAccessor && t.__dataHasAccessor[i]
              ? (t[Dn.READ_ONLY] && t[Dn.READ_ONLY][i]) || (t._setPendingProperty(i, s) && e._enqueueClient(t))
              : e._setUnmanagedPropertyToNode(t, i, s);
          }
        })(e, a, l, c, s.evaluator._evaluateBinding(e, c, t, n, i, o));
      }
    }
    function Qn(e, t) {
      if (t.isCompound) {
        const n = e.__dataCompoundStorage || (e.__dataCompoundStorage = {});
        const i = t.parts;
        const s = new Array(i.length);
        for (let e = 0; e < i.length; e++) s[e] = i[e].literal;
        const o = t.target;
        (n[o] = s), t.literal && 'property' == t.kind && ('className' === o && (e = nn(e)), (e[o] = t.literal));
      }
    }
    function ei(e, t, n) {
      if (n.listenerEvent) {
        const i = n.parts[0];
        e.addEventListener(n.listenerEvent, function(e) {
          !(function(e, t, n, i, s) {
            let o;
            const r = e.detail;
            const a = r && r.path;
            a ? ((i = ln(n, i, a)), (o = r && r.value)) : (o = e.currentTarget[n]),
              (o = s ? !o : o),
              (t[Dn.READ_ONLY] && t[Dn.READ_ONLY][i]) ||
                !t._setPendingPropertyOrPath(i, o, !0, Boolean(a)) ||
                (r && r.queueProperty) ||
                t._invalidateProperties();
          })(e, t, n.target, i.source, i.negate);
        });
      }
    }
    function ti(e, t, n, i, s, o) {
      o = t.static || (o && ('object' != typeof o || o[t.methodName]));
      const r = { methodName: t.methodName, args: t.args, methodInfo: s, dynamicFn: o };
      for (let s, o = 0; o < t.args.length && (s = t.args[o]); o++)
        s.literal || e._addPropertyEffect(s.rootProperty, n, { fn: i, info: r, trigger: s });
      o && e._addPropertyEffect(t.methodName, n, { fn: i, info: r });
    }
    function ni(e, t, n, i, s) {
      const o = e._methodHost || e;
      const r = o[s.methodName];
      if (r) {
        const i = e._marshalArgs(s.args, t, n);
        return r.apply(o, i);
      }
      s.dynamicFn || console.warn('method `' + s.methodName + '` not defined');
    }
    const ii = [];
    const si = new RegExp(
      '(\\[\\[|{{)\\s*(?:(!)\\s*)?((?:[a-zA-Z_$][\\w.:$\\-*]*)\\s*(?:\\(\\s*(?:(?:(?:((?:[a-zA-Z_$][\\w.:$\\-*]*)|(?:[-+]?[0-9]*\\.?[0-9]+(?:[eE][-+]?[0-9]+)?)|(?:(?:\'(?:[^\'\\\\]|\\\\.)*\')|(?:"(?:[^"\\\\]|\\\\.)*")))\\s*)(?:,\\s*(?:((?:[a-zA-Z_$][\\w.:$\\-*]*)|(?:[-+]?[0-9]*\\.?[0-9]+(?:[eE][-+]?[0-9]+)?)|(?:(?:\'(?:[^\'\\\\]|\\\\.)*\')|(?:"(?:[^"\\\\]|\\\\.)*")))\\s*))*)?)\\)\\s*)?)(?:]]|}})',
      'g'
    );
    function oi(e) {
      let t = '';
      for (let n = 0; n < e.length; n++) {
        t += e[n].literal || '';
      }
      return t;
    }
    function ri(e) {
      const t = e.match(/([^\s]+?)\(([\s\S]*)\)/);
      if (t) {
        const e = { methodName: t[1], static: !0, args: ii };
        if (t[2].trim()) {
          return (function(e, t) {
            return (
              (t.args = e.map(function(e) {
                const n = ai(e);
                return n.literal || (t.static = !1), n;
              }, this)),
              t
            );
          })(t[2].replace(/\\,/g, '&comma;').split(','), e);
        }
        return e;
      }
      return null;
    }
    function ai(e) {
      const t = e
        .trim()
        .replace(/&comma;/g, ',')
        .replace(/\\(.)/g, '$1');
      const n = { name: t, value: '', literal: !1 };
      let i = t[0];
      switch (('-' === i && (i = t[1]), i >= '0' && i <= '9' && (i = '#'), i)) {
        case "'":
        case '"':
          (n.value = t.slice(1, -1)), (n.literal = !0);
          break;
        case '#':
          (n.value = Number(t)), (n.literal = !0);
      }
      return (
        n.literal ||
          ((n.rootProperty = on(t)),
          (n.structured = sn(t)),
          n.structured && ((n.wildcard = '.*' == t.slice(-2)), n.wildcard && (n.name = t.slice(0, -2)))),
        n
      );
    }
    function li(e, t, n) {
      let i = dn(e, n);
      return void 0 === i && (i = t[n]), i;
    }
    function ci(e, t, n, i) {
      e.notifyPath(n + '.splices', { indexSplices: i }), e.notifyPath(n + '.length', t.length);
    }
    function hi(e, t, n, i, s, o) {
      ci(e, t, n, [{ index: i, addedCount: s, removed: o, object: t, type: 'splice' }]);
    }
    const di = Ht((e) => {
      const t = Mn(An(e));
      return class extends t {
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
        _initializeProtoProperties(e) {
          (this.__data = Object.create(e)), (this.__dataPending = Object.create(e)), (this.__dataOld = {});
        }
        _initializeInstanceProperties(e) {
          const t = this[Dn.READ_ONLY];
          for (const n in e)
            (t && t[n]) ||
              ((this.__dataPending = this.__dataPending || {}),
              (this.__dataOld = this.__dataOld || {}),
              (this.__data[n] = this.__dataPending[n] = e[n]));
        }
        _addPropertyEffect(e, t, n) {
          this._createPropertyAccessor(e, t == Dn.READ_ONLY);
          let i = Bn(this, t)[e];
          i || (i = this[t][e] = []), i.push(n);
        }
        _removePropertyEffect(e, t, n) {
          const i = Bn(this, t)[e];
          const s = i.indexOf(n);
          s >= 0 && i.splice(s, 1);
        }
        _hasPropertyEffect(e, t) {
          const n = this[t];
          return Boolean(n && n[e]);
        }
        _hasReadOnlyEffect(e) {
          return this._hasPropertyEffect(e, Dn.READ_ONLY);
        }
        _hasNotifyEffect(e) {
          return this._hasPropertyEffect(e, Dn.NOTIFY);
        }
        _hasReflectEffect(e) {
          return this._hasPropertyEffect(e, Dn.REFLECT);
        }
        _hasComputedEffect(e) {
          return this._hasPropertyEffect(e, Dn.COMPUTE);
        }
        _setPendingPropertyOrPath(e, t, n, i) {
          if (i || on(Array.isArray(e) ? e[0] : e) !== e) {
            if (!i) {
              const n = dn(this, e);
              if (!(e = un(this, e, t)) || !super._shouldPropertyChange(e, t, n)) return !1;
            }
            if (((this.__dataHasPaths = !0), this._setPendingProperty(e, t, n)))
              return (
                (function(e, t, n) {
                  const i = e.__dataLinkedPaths;
                  if (i) {
                    let s;
                    for (const o in i) {
                      const r = i[o];
                      an(o, t)
                        ? ((s = ln(o, r, t)), e._setPendingPropertyOrPath(s, n, !0, !0))
                        : an(r, t) && ((s = ln(r, o, t)), e._setPendingPropertyOrPath(s, n, !0, !0));
                    }
                  }
                })(this, e, t),
                !0
              );
          } else {
            if (this.__dataHasAccessor && this.__dataHasAccessor[e]) return this._setPendingProperty(e, t, n);
            this[e] = t;
          }
          return !1;
        }
        _setUnmanagedPropertyToNode(e, t, n) {
          (n === e[t] && 'object' != typeof n) || ('className' === t && (e = nn(e)), (e[t] = n));
        }
        _setPendingProperty(e, t, n) {
          const i = this.__dataHasPaths && sn(e);
          const s = i ? this.__dataTemp : this.__data;
          return (
            !!this._shouldPropertyChange(e, t, s[e]) &&
            (this.__dataPending || ((this.__dataPending = {}), (this.__dataOld = {})),
            e in this.__dataOld || (this.__dataOld[e] = this.__data[e]),
            i ? (this.__dataTemp[e] = t) : (this.__data[e] = t),
            (this.__dataPending[e] = t),
            (i || (this[Dn.NOTIFY] && this[Dn.NOTIFY][e])) &&
              ((this.__dataToNotify = this.__dataToNotify || {}), (this.__dataToNotify[e] = n)),
            !0)
          );
        }
        _setProperty(e, t) {
          this._setPendingProperty(e, t, !0) && this._invalidateProperties();
        }
        _invalidateProperties() {
          this.__dataReady && this._flushProperties();
        }
        _enqueueClient(e) {
          (this.__dataPendingClients = this.__dataPendingClients || []),
            e !== this && this.__dataPendingClients.push(e);
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
          const e = this.__dataPendingClients;
          if (e) {
            this.__dataPendingClients = null;
            for (let t = 0; t < e.length; t++) {
              const n = e[t];
              n.__dataEnabled ? n.__dataPending && n._flushProperties() : n._enableProperties();
            }
          }
        }
        _readyClients() {
          this.__enableOrFlushClients();
        }
        setProperties(e, t) {
          for (const n in e)
            (!t && this[Dn.READ_ONLY] && this[Dn.READ_ONLY][n]) || this._setPendingPropertyOrPath(n, e[n], !0);
          this._invalidateProperties();
        }
        ready() {
          this._flushProperties(),
            this.__dataClientsReady || this._flushClients(),
            this.__dataPending && this._flushProperties();
        }
        _propertiesChanged(e, t, n) {
          const i = this.__dataHasPaths;
          (this.__dataHasPaths = !1),
            (function(e, t, n, i) {
              const s = e[Dn.COMPUTE];
              if (s) {
                let o = t;
                for (; Un(e, s, o, n, i); )
                  Object.assign(n, e.__dataOld),
                    Object.assign(t, e.__dataPending),
                    (o = e.__dataPending),
                    (e.__dataPending = null);
              }
            })(this, t, n, i);
          const s = this.__dataToNotify;
          (this.__dataToNotify = null),
            this._propagatePropertyChanges(t, n, i),
            this._flushClients(),
            Un(this, this[Dn.REFLECT], t, n, i),
            Un(this, this[Dn.OBSERVE], t, n, i),
            s &&
              (function(e, t, n, i, s) {
                let o;
                let r;
                const a = e[Dn.NOTIFY];
                const l = Fn++;
                for (const r in t) t[r] && (a && $n(e, a, l, r, n, i, s) ? (o = !0) : s && Vn(e, r, n) && (o = !0));
                o && (r = e.__dataHost) && r._invalidateProperties && r._invalidateProperties();
              })(this, s, t, n, i),
            1 == this.__dataCounter && (this.__dataTemp = {});
        }
        _propagatePropertyChanges(e, t, n) {
          this[Dn.PROPAGATE] && Un(this, this[Dn.PROPAGATE], e, t, n);
          let i = this.__templateInfo;
          for (; i; ) Un(this, i.propertyEffects, e, t, n, i.nodeList), (i = i.nextTemplateInfo);
        }
        linkPaths(e, t) {
          (e = cn(e)),
            (t = cn(t)),
            (this.__dataLinkedPaths = this.__dataLinkedPaths || {}),
            (this.__dataLinkedPaths[e] = t);
        }
        unlinkPaths(e) {
          (e = cn(e)), this.__dataLinkedPaths && delete this.__dataLinkedPaths[e];
        }
        notifySplices(e, t) {
          const n = { path: '' };
          ci(this, dn(this, e, n), n.path, t);
        }
        get(e, t) {
          return dn(t || this, e);
        }
        set(e, t, n) {
          n
            ? un(n, e, t)
            : (this[Dn.READ_ONLY] && this[Dn.READ_ONLY][e]) ||
              (this._setPendingPropertyOrPath(e, t, !0) && this._invalidateProperties());
        }
        push(e, ...t) {
          const n = { path: '' };
          const i = dn(this, e, n);
          const s = i.length;
          const o = i.push(...t);
          return t.length && hi(this, i, n.path, s, t.length, []), o;
        }
        pop(e) {
          const t = { path: '' };
          const n = dn(this, e, t);
          const i = Boolean(n.length);
          const s = n.pop();
          return i && hi(this, n, t.path, n.length, 0, [s]), s;
        }
        splice(e, t, n, ...i) {
          let s;
          const o = { path: '' };
          const r = dn(this, e, o);
          return (
            t < 0 ? (t = r.length - Math.floor(-t)) : t && (t = Math.floor(t)),
            (s = 2 === arguments.length ? r.splice(t) : r.splice(t, n, ...i)),
            (i.length || s.length) && hi(this, r, o.path, t, i.length, s),
            s
          );
        }
        shift(e) {
          const t = { path: '' };
          const n = dn(this, e, t);
          const i = Boolean(n.length);
          const s = n.shift();
          return i && hi(this, n, t.path, 0, 0, [s]), s;
        }
        unshift(e, ...t) {
          const n = { path: '' };
          const i = dn(this, e, n);
          const s = i.unshift(...t);
          return t.length && hi(this, i, n.path, 0, t.length, []), s;
        }
        notifyPath(e, t) {
          let n;
          if (1 == arguments.length) {
            const i = { path: '' };
            (t = dn(this, e, i)), (n = i.path);
          } else n = Array.isArray(e) ? cn(e) : e;
          this._setPendingPropertyOrPath(n, t, !0, !0) && this._invalidateProperties();
        }
        _createReadOnlyProperty(e, t) {
          let n;
          this._addPropertyEffect(e, Dn.READ_ONLY),
            t &&
              (this['_set' + ((n = e), n[0].toUpperCase() + n.substring(1))] = function(t) {
                this._setProperty(e, t);
              });
        }
        _createPropertyObserver(e, t, n) {
          const i = { property: e, method: t, dynamicFn: Boolean(n) };
          this._addPropertyEffect(e, Dn.OBSERVE, { fn: jn, info: i, trigger: { name: e } }),
            n && this._addPropertyEffect(t, Dn.OBSERVE, { fn: jn, info: i, trigger: { name: t } });
        }
        _createMethodObserver(e, t) {
          const n = ri(e);
          if (!n) throw new Error("Malformed observer expression '" + e + "'");
          ti(this, n, Dn.OBSERVE, ni, null, t);
        }
        _createNotifyingProperty(e) {
          this._addPropertyEffect(e, Dn.NOTIFY, { fn: Yn, info: { eventName: gn(e) + '-changed', property: e } });
        }
        _createReflectedProperty(e) {
          const t = this.constructor.attributeNameForProperty(e);
          '-' === t[0]
            ? console.warn(
                'Property ' +
                  e +
                  ' cannot be reflected to attribute ' +
                  t +
                  ' because "-" is not a valid starting attribute name. Use a lowercase first letter for the property instead.'
              )
            : this._addPropertyEffect(e, Dn.REFLECT, { fn: Wn, info: { attrName: t } });
        }
        _createComputedProperty(e, t, n) {
          const i = ri(t);
          if (!i) throw new Error("Malformed computed expression '" + t + "'");
          ti(this, i, Dn.COMPUTE, Jn, e, n);
        }
        _marshalArgs(e, t, n) {
          const i = this.__data;
          const s = [];
          for (let o = 0, r = e.length; o < r; o++) {
            let { name: r, structured: a, wildcard: l, value: c, literal: h } = e[o];
            if (!h)
              if (l) {
                const e = an(r, t);
                const s = li(i, n, e ? t : r);
                c = { path: e ? t : r, value: s, base: e ? dn(i, r) : s };
              } else c = a ? li(i, n, r) : i[r];
            s[o] = c;
          }
          return s;
        }
        static addPropertyEffect(e, t, n) {
          this.prototype._addPropertyEffect(e, t, n);
        }
        static createPropertyObserver(e, t, n) {
          this.prototype._createPropertyObserver(e, t, n);
        }
        static createMethodObserver(e, t) {
          this.prototype._createMethodObserver(e, t);
        }
        static createNotifyingProperty(e) {
          this.prototype._createNotifyingProperty(e);
        }
        static createReadOnlyProperty(e, t) {
          this.prototype._createReadOnlyProperty(e, t);
        }
        static createReflectedProperty(e) {
          this.prototype._createReflectedProperty(e);
        }
        static createComputedProperty(e, t, n) {
          this.prototype._createComputedProperty(e, t, n);
        }
        static bindTemplate(e) {
          return this.prototype._bindTemplate(e);
        }
        _bindTemplate(e, t) {
          let n = this.constructor._parseTemplate(e);
          const i = this.__templateInfo == n;
          if (!i) for (const e in n.propertyEffects) this._createPropertyAccessor(e);
          if (t && (((n = Object.create(n)).wasPreBound = i), !i && this.__templateInfo)) {
            const e = this.__templateInfoLast || this.__templateInfo;
            return (this.__templateInfoLast = e.nextTemplateInfo = n), (n.previousTemplateInfo = e), n;
          }
          return (this.__templateInfo = n);
        }
        static _addTemplatePropertyEffect(e, t, n) {
          (e.hostProps = e.hostProps || {})[t] = !0;
          const i = (e.propertyEffects = e.propertyEffects || {});
          (i[t] = i[t] || []).push(n);
        }
        _stampTemplate(e) {
          ui.beginHosting(this);
          const t = super._stampTemplate(e);
          ui.endHosting(this);
          const n = this._bindTemplate(e, !0);
          if (((n.nodeList = t.nodeList), !n.wasPreBound)) {
            const e = (n.childNodes = []);
            for (let n = t.firstChild; n; n = n.nextSibling) e.push(n);
          }
          return (
            (t.templateInfo = n),
            (function(e, t) {
              const { nodeList: n, nodeInfoList: i } = t;
              if (i.length)
                for (let t = 0; t < i.length; t++) {
                  const s = i[t];
                  const o = n[t];
                  const r = s.bindings;
                  if (r)
                    for (let t = 0; t < r.length; t++) {
                      const n = r[t];
                      Qn(o, n), ei(o, e, n);
                    }
                  o.__dataHost = e;
                }
            })(this, n),
            this.__dataReady && Un(this, n.propertyEffects, this.__data, null, !1, n.nodeList),
            t
          );
        }
        _removeBoundDom(e) {
          const t = e.templateInfo;
          t.previousTemplateInfo && (t.previousTemplateInfo.nextTemplateInfo = t.nextTemplateInfo),
            t.nextTemplateInfo && (t.nextTemplateInfo.previousTemplateInfo = t.previousTemplateInfo),
            this.__templateInfoLast == t && (this.__templateInfoLast = t.previousTemplateInfo),
            (t.previousTemplateInfo = t.nextTemplateInfo = null);
          const n = t.childNodes;
          for (let e = 0; e < n.length; e++) {
            const t = n[e];
            t.parentNode.removeChild(t);
          }
        }
        static _parseTemplateNode(e, n, i) {
          let s = t._parseTemplateNode.call(this, e, n, i);
          if (e.nodeType === Node.TEXT_NODE) {
            const t = this._parseBindings(e.textContent, n);
            t && ((e.textContent = oi(t) || ' '), Xn(this, n, i, 'text', 'textContent', t), (s = !0));
          }
          return s;
        }
        static _parseTemplateNodeAttribute(e, n, i, s, o) {
          const r = this._parseBindings(o, n);
          if (r) {
            const t = s;
            let o = 'property';
            Hn.test(s) ? (o = 'attribute') : '$' == s[s.length - 1] && ((s = s.slice(0, -1)), (o = 'attribute'));
            let a = oi(r);
            return (
              a &&
                'attribute' == o &&
                ('class' == s && e.hasAttribute('class') && (a += ' ' + e.getAttribute(s)), e.setAttribute(s, a)),
              'input' === e.localName && 'value' === t && e.setAttribute(t, ''),
              e.removeAttribute(t),
              'property' === o && (s = mn(s)),
              Xn(this, n, i, o, s, r, a),
              !0
            );
          }
          return t._parseTemplateNodeAttribute.call(this, e, n, i, s, o);
        }
        static _parseTemplateNestedTemplate(e, n, i) {
          const s = t._parseTemplateNestedTemplate.call(this, e, n, i);
          const o = i.templateInfo.hostProps;
          for (const e in o) {
            Xn(this, n, i, 'property', '_host_' + e, [{ mode: '{', source: e, dependencies: [e] }]);
          }
          return s;
        }
        static _parseBindings(e, t) {
          let n;
          const i = [];
          let s = 0;
          for (; null !== (n = si.exec(e)); ) {
            n.index > s && i.push({ literal: e.slice(s, n.index) });
            const o = n[1][0];
            const r = Boolean(n[2]);
            let a = n[3].trim();
            let l = !1;
            let c = '';
            let h = -1;
            '{' == o && (h = a.indexOf('::')) > 0 && ((c = a.substring(h + 2)), (a = a.substring(0, h)), (l = !0));
            const d = ri(a);
            const u = [];
            if (d) {
              const { args: e, methodName: n } = d;
              for (let t = 0; t < e.length; t++) {
                const n = e[t];
                n.literal || u.push(n);
              }
              const i = t.dynamicFns;
              ((i && i[n]) || d.static) && (u.push(n), (d.dynamicFn = !0));
            } else u.push(a);
            i.push({ source: a, mode: o, negate: r, customEvent: l, signature: d, dependencies: u, event: c }),
              (s = si.lastIndex);
          }
          if (s && s < e.length) {
            const t = e.substring(s);
            t && i.push({ literal: t });
          }
          return i.length ? i : null;
        }
        static _evaluateBinding(e, t, n, i, s, o) {
          let r;
          return (
            (r = t.signature
              ? ni(e, n, i, 0, t.signature)
              : n != t.source
              ? dn(e, t.source)
              : o && sn(n)
              ? dn(e, n)
              : e.__data[n]),
            t.negate && (r = !r),
            r
          );
        }
      };
    });
    const ui = new (class {
      constructor() {
        this.stack = [];
      }
      registerHost(e) {
        if (this.stack.length) {
          this.stack[this.stack.length - 1]._enqueueClient(e);
        }
      }
      beginHosting(e) {
        this.stack.push(e);
      }
      endHosting(e) {
        const t = this.stack.length;
        t && this.stack[t - 1] == e && this.stack.pop();
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
    const _i = Ht((e) => {
      const t = En(e);
      function n(e) {
        const t = Object.getPrototypeOf(e);
        return t.prototype instanceof s ? t : null;
      }
      function i(e) {
        if (!e.hasOwnProperty(JSCompiler_renameProperty('__ownProperties', e))) {
          let t = null;
          if (e.hasOwnProperty(JSCompiler_renameProperty('properties', e))) {
            const n = e.properties;
            n &&
              (t =
                /**
@license
Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/
                (function(e) {
                  const t = {};
                  for (const n in e) {
                    const i = e[n];
                    t[n] = 'function' == typeof i ? { type: i } : i;
                  }
                  return t;
                })(n));
          }
          e.__ownProperties = t;
        }
        return e.__ownProperties;
      }
      class s extends t {
        static get observedAttributes() {
          if (!this.hasOwnProperty('__observedAttributes')) {
            (e = this.prototype), pi.push(e);
            const t = this._properties;
            this.__observedAttributes = t ? Object.keys(t).map((e) => this.attributeNameForProperty(e)) : [];
          }
          let e;
          return this.__observedAttributes;
        }
        static finalize() {
          if (!this.hasOwnProperty(JSCompiler_renameProperty('__finalized', this))) {
            const e = n(this);
            e && e.finalize(), (this.__finalized = !0), this._finalizeClass();
          }
        }
        static _finalizeClass() {
          const e = i(this);
          e && this.createProperties(e);
        }
        static get _properties() {
          if (!this.hasOwnProperty(JSCompiler_renameProperty('__properties', this))) {
            const e = n(this);
            this.__properties = Object.assign({}, e && e._properties, i(this));
          }
          return this.__properties;
        }
        static typeForProperty(e) {
          const t = this._properties[e];
          return t && t.type;
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
    });
    const fi = '3.3.0';
    const mi = window.ShadyCSS && window.ShadyCSS.cssBuild;
    const gi = Ht((e) => {
      const t = _i(di(e));
      function n(e, t, n, i) {
        if (!mi) {
          const s = t.content.querySelectorAll('style');
          const o = Gt(t);
          const r = (function(e) {
            const t = Wt(e);
            return t ? Qt(t) : [];
          })(n);
          const a = t.content.firstElementChild;
          for (let n = 0; n < r.length; n++) {
            const s = r[n];
            (s.textContent = e._processStyleText(s.textContent, i)), t.content.insertBefore(s, a);
          }
          let l = 0;
          for (let t = 0; t < o.length; t++) {
            let n = o[t];
            const r = s[l];
            r !== n ? ((n = n.cloneNode(!0)), r.parentNode.insertBefore(n, r)) : l++,
              (n.textContent = e._processStyleText(n.textContent, i));
          }
        }
        window.ShadyCSS && window.ShadyCSS.prepareTemplate(t, n);
      }
      return class extends t {
        static get polymerElementVersion() {
          return fi;
        }
        static _finalizeClass() {
          t._finalizeClass.call(this);
          const e =
            ((n = this).hasOwnProperty(JSCompiler_renameProperty('__ownObservers', n)) ||
              (n.__ownObservers = n.hasOwnProperty(JSCompiler_renameProperty('observers', n)) ? n.observers : null),
            n.__ownObservers);
          let n;
          e && this.createObservers(e, this._properties), this._prepareTemplate();
        }
        static _prepareTemplate() {
          let e = this.template;
          e &&
            ('string' == typeof e
              ? (console.error('template getter must return HTMLTemplateElement'), (e = null))
              : Lt || (e = e.cloneNode(!0))),
            (this.prototype._template = e);
        }
        static createProperties(e) {
          for (const o in e)
            (t = this.prototype),
              (n = o),
              (i = e[o]),
              (s = e),
              i.computed && (i.readOnly = !0),
              i.computed &&
                (t._hasReadOnlyEffect(n)
                  ? console.warn(`Cannot redefine computed property '${n}'.`)
                  : t._createComputedProperty(n, i.computed, s)),
              i.readOnly && !t._hasReadOnlyEffect(n)
                ? t._createReadOnlyProperty(n, !i.computed)
                : !1 === i.readOnly &&
                  t._hasReadOnlyEffect(n) &&
                  console.warn(`Cannot make readOnly property '${n}' non-readOnly.`),
              i.reflectToAttribute && !t._hasReflectEffect(n)
                ? t._createReflectedProperty(n)
                : !1 === i.reflectToAttribute &&
                  t._hasReflectEffect(n) &&
                  console.warn(`Cannot make reflected property '${n}' non-reflected.`),
              i.notify && !t._hasNotifyEffect(n)
                ? t._createNotifyingProperty(n)
                : !1 === i.notify &&
                  t._hasNotifyEffect(n) &&
                  console.warn(`Cannot make notify property '${n}' non-notify.`),
              i.observer && t._createPropertyObserver(n, i.observer, s[i.observer]),
              t._addPropertyToAttributeMap(n);
          let t;
          let n;
          let i;
          let s;
        }
        static createObservers(e, t) {
          const n = this.prototype;
          for (let i = 0; i < e.length; i++) n._createMethodObserver(e[i], t);
        }
        static get template() {
          return (
            this.hasOwnProperty(JSCompiler_renameProperty('_template', this)) ||
              (this._template = this.prototype.hasOwnProperty(JSCompiler_renameProperty('_template', this.prototype))
                ? this.prototype._template
                : (function(e) {
                    let t = null;
                    if (e && (!It || Rt) && ((t = jt.import(e, 'template')), It && !t))
                      throw new Error(`strictTemplatePolicy: expecting dom-module or null template for ${e}`);
                    return t;
                  })(this.is) || Object.getPrototypeOf(this.prototype).constructor.template),
            this._template
          );
        }
        static set template(e) {
          this._template = e;
        }
        static get importPath() {
          if (!this.hasOwnProperty(JSCompiler_renameProperty('_importPath', this))) {
            const e = this.importMeta;
            if (e) this._importPath = Pt(e.url);
            else {
              const e = jt.import(this.is);
              this._importPath = (e && e.assetpath) || Object.getPrototypeOf(this.prototype).constructor.importPath;
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
            (this.rootPath = At),
            (this.importPath = this.constructor.importPath);
          const e = (function(e) {
            if (!e.hasOwnProperty(JSCompiler_renameProperty('__propertyDefaults', e))) {
              e.__propertyDefaults = null;
              const t = e._properties;
              for (const n in t) {
                const i = t[n];
                'value' in i && ((e.__propertyDefaults = e.__propertyDefaults || {}), (e.__propertyDefaults[n] = i));
              }
            }
            return e.__propertyDefaults;
          })(this.constructor);
          if (e)
            for (const t in e) {
              const n = e[t];
              if (!this.hasOwnProperty(t)) {
                const e = 'function' == typeof n.value ? n.value.call(this) : n.value;
                this._hasAccessor(t) ? this._setPendingProperty(t, e, !0) : (this[t] = e);
              }
            }
        }
        static _processStyleText(e, t) {
          return Et(e, t);
        }
        static _finalizeTemplate(e) {
          const t = this.prototype._template;
          if (t && !t.__polymerFinalized) {
            t.__polymerFinalized = !0;
            const i = this.importPath;
            n(this, t, e, i ? xt(i) : ''), this.prototype._bindTemplate(t);
          }
        }
        connectedCallback() {
          window.ShadyCSS && this._template && window.ShadyCSS.styleElement(this), super.connectedCallback();
        }
        ready() {
          this._template && ((this.root = this._stampTemplate(this._template)), (this.$ = this.root.$)), super.ready();
        }
        _readyClients() {
          this._template && (this.root = this._attachDom(this.root)), super._readyClients();
        }
        _attachDom(e) {
          const t = nn(this);
          if (t.attachShadow)
            return e
              ? (t.shadowRoot ||
                  (t.attachShadow({ mode: 'open', shadyUpgradeFragment: e }), t.shadowRoot.appendChild(e)),
                zt && window.ShadyDOM && ShadyDOM.flushInitial(t.shadowRoot),
                t.shadowRoot)
              : null;
          throw new Error(
            'ShadowDOM not available. PolymerElement can create dom as children instead of in ShadowDOM by setting `this.root = this;` before `ready`.'
          );
        }
        updateStyles(e) {
          window.ShadyCSS && window.ShadyCSS.styleSubtree(this, e);
        }
        resolveUrl(e, t) {
          return !t && this.importPath && (t = xt(this.importPath)), xt(e, t);
        }
        static _parseTemplateContent(e, n, i) {
          return (n.dynamicFns = n.dynamicFns || this._properties), t._parseTemplateContent.call(this, e, n, i);
        }
        static _addTemplatePropertyEffect(e, n, i) {
          return (
            !Lt ||
              n in this._properties ||
              console.warn(
                `Property '${n}' used in template but not declared in 'properties'; ` +
                  'attribute will not be observed.'
              ),
            t._addTemplatePropertyEffect.call(this, e, n, i)
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
      setConfig(e, t) {
        (this._asyncModule = e),
          (this._callback = t),
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
      static debounce(e, t, n) {
        return e instanceof yi ? e._cancelAsync() : (e = new yi()), e.setConfig(t, n), e;
      }
    }
    const bi = new Set();
    const vi = function(e) {
      bi.add(e);
    };
    const wi = function() {
      const e = Boolean(bi.size);
      return (
        bi.forEach((e) => {
          try {
            e.flush();
          } catch (e) {
            setTimeout(() => {
              throw e;
            });
          }
        }),
        e
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
    const Ci = 'string' == typeof document.head.style.touchAction;
    const Si = '__polymerGestures';
    const ki = '__polymerGesturesHandled';
    const xi = '__polymerGesturesTouchAction';
    const Ei = 25;
    const Pi = 5;
    const Ti = 2500;
    const Ai = ['mousedown', 'mousemove', 'mouseup', 'click'];
    const Oi = [0, 1, 4, 2];
    const Ni = (function() {
      try {
        return 1 === new MouseEvent('test', { buttons: 1 }).buttons;
      } catch (e) {
        return !1;
      }
    })();
    function Ii(e) {
      return Ai.indexOf(e) > -1;
    }
    let Ri = !1;
    function Li(e) {
      if (!Ii(e) && 'touchend' !== e) return Ci && Ri && Nt ? { passive: !0 } : void 0;
    }
    !(function() {
      try {
        const e = Object.defineProperty({}, 'passive', {
          get() {
            Ri = !0;
          }
        });
        window.addEventListener('test', null, e), window.removeEventListener('test', null, e);
      } catch (e) {}
    })();
    const zi = navigator.userAgent.match(/iP(?:[oa]d|hone)|Android/);
    const Mi = [];
    const Fi = { button: !0, input: !0, keygen: !0, meter: !0, output: !0, textarea: !0, progress: !0, select: !0 };
    const Di = {
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
    function Hi(e) {
      let t = Array.prototype.slice.call(e.labels || []);
      if (!t.length) {
        t = [];
        const n = e.getRootNode();
        if (e.id) {
          const i = n.querySelectorAll(`label[for = ${e.id}]`);
          for (let e = 0; e < i.length; e++) t.push(i[e]);
        }
      }
      return t;
    }
    const Bi = function(e) {
      const t = e.sourceCapabilities;
      let n;
      if ((!t || t.firesTouchEvents) && ((e[ki] = { skip: !0 }), 'click' === e.type)) {
        let t = !1;
        const i = Ki(e);
        for (let e = 0; e < i.length; e++) {
          if (i[e].nodeType === Node.ELEMENT_NODE)
            if ('label' === i[e].localName) Mi.push(i[e]);
            else if (((n = i[e]), Fi[n.localName])) {
              const n = Hi(i[e]);
              for (let e = 0; e < n.length; e++) t = t || Mi.indexOf(n[e]) > -1;
            }
          if (i[e] === qi.mouse.target) return;
        }
        if (t) return;
        e.preventDefault(), e.stopPropagation();
      }
    };
    function Ui(e) {
      const t = zi ? ['click'] : Ai;
      for (let n, i = 0; i < t.length; i++)
        (n = t[i]),
          e ? ((Mi.length = 0), document.addEventListener(n, Bi, !0)) : document.removeEventListener(n, Bi, !0);
    }
    function $i(e) {
      const t = e.type;
      if (!Ii(t)) return !1;
      if ('mousemove' === t) {
        let t = void 0 === e.buttons ? 1 : e.buttons;
        return e instanceof window.MouseEvent && !Ni && (t = Oi[e.which] || 0), Boolean(1 & t);
      }
      return 0 === (void 0 === e.button ? 0 : e.button);
    }
    const qi = { mouse: { target: null, mouseIgnoreJob: null }, touch: { x: 0, y: 0, id: -1, scrollDecided: !1 } };
    function ji(e, t, n) {
      (e.movefn = t), (e.upfn = n), document.addEventListener('mousemove', t), document.addEventListener('mouseup', n);
    }
    function Vi(e) {
      document.removeEventListener('mousemove', e.movefn),
        document.removeEventListener('mouseup', e.upfn),
        (e.movefn = null),
        (e.upfn = null);
    }
    Mt &&
      document.addEventListener(
        'touchend',
        function(e) {
          if (!Mt) return;
          qi.mouse.mouseIgnoreJob || Ui(!0),
            (qi.mouse.target = Ki(e)[0]),
            (qi.mouse.mouseIgnoreJob = yi.debounce(qi.mouse.mouseIgnoreJob, Sn.after(Ti), function() {
              Ui(), (qi.mouse.target = null), (qi.mouse.mouseIgnoreJob = null);
            }));
        },
        !!Ri && { passive: !0 }
      );
    const Ki =
      window.ShadyDOM && window.ShadyDOM.noPatch
        ? window.ShadyDOM.composedPath
        : (e) => (e.composedPath && e.composedPath()) || [];
    const Yi = {};
    const Wi = [];
    function Ji(e) {
      const t = Ki(e);
      return t.length > 0 ? t[0] : e.target;
    }
    function Xi(e) {
      let t;
      const n = e.type;
      const i = e.currentTarget[Si];
      if (!i) return;
      const s = i[n];
      if (s) {
        if (!e[ki] && ((e[ki] = {}), 'touch' === n.slice(0, 5))) {
          const t = (e = e).changedTouches[0];
          if (
            ('touchstart' === n && 1 === e.touches.length && (qi.touch.id = t.identifier), qi.touch.id !== t.identifier)
          )
            return;
          Ci ||
            ('touchstart' !== n && 'touchmove' !== n) ||
            (function(e) {
              const t = e.changedTouches[0];
              const n = e.type;
              if ('touchstart' === n) (qi.touch.x = t.clientX), (qi.touch.y = t.clientY), (qi.touch.scrollDecided = !1);
              else if ('touchmove' === n) {
                if (qi.touch.scrollDecided) return;
                qi.touch.scrollDecided = !0;
                const n = (function(e) {
                  let t = 'auto';
                  const n = Ki(e);
                  for (let e, i = 0; i < n.length; i++)
                    if ((e = n[i])[xi]) {
                      t = e[xi];
                      break;
                    }
                  return t;
                })(e);
                let i = !1;
                const s = Math.abs(qi.touch.x - t.clientX);
                const o = Math.abs(qi.touch.y - t.clientY);
                e.cancelable && ('none' === n ? (i = !0) : 'pan-x' === n ? (i = o > s) : 'pan-y' === n && (i = s > o)),
                  i ? e.preventDefault() : ns('track');
              }
            })(e);
        }
        if (!(t = e[ki]).skip) {
          for (let n, i = 0; i < Wi.length; i++)
            s[(n = Wi[i]).name] && !t[n.name] && n.flow && n.flow.start.indexOf(e.type) > -1 && n.reset && n.reset();
          for (let i, o = 0; o < Wi.length; o++) s[(i = Wi[o]).name] && !t[i.name] && ((t[i.name] = !0), i[n](e));
        }
      }
    }
    function Zi(e, t, n) {
      return (
        !!Yi[t] &&
        ((function(e, t, n) {
          const i = Yi[t];
          const s = i.deps;
          const o = i.name;
          let r = e[Si];
          r || (e[Si] = r = {});
          for (let t, n, i = 0; i < s.length; i++)
            (t = s[i]),
              (zi && Ii(t) && 'click' !== t) ||
                ((n = r[t]) || (r[t] = n = { _count: 0 }),
                0 === n._count && e.addEventListener(t, Xi, Li(t)),
                (n[o] = (n[o] || 0) + 1),
                (n._count = (n._count || 0) + 1));
          e.addEventListener(t, n), i.touchAction && es(e, i.touchAction);
        })(e, t, n),
        !0)
      );
    }
    function Gi(e, t, n) {
      return (
        !!Yi[t] &&
        ((function(e, t, n) {
          const i = Yi[t];
          const s = i.deps;
          const o = i.name;
          const r = e[Si];
          if (r)
            for (let t, n, i = 0; i < s.length; i++)
              (t = s[i]),
                (n = r[t]) &&
                  n[o] &&
                  ((n[o] = (n[o] || 1) - 1),
                  (n._count = (n._count || 1) - 1),
                  0 === n._count && e.removeEventListener(t, Xi, Li(t)));
          e.removeEventListener(t, n);
        })(e, t, n),
        !0)
      );
    }
    function Qi(e) {
      Wi.push(e);
      for (let t = 0; t < e.emits.length; t++) Yi[e.emits[t]] = e;
    }
    function es(e, t) {
      Ci &&
        e instanceof HTMLElement &&
        kn.run(() => {
          e.style.touchAction = t;
        }),
        (e[xi] = t);
    }
    function ts(e, t, n) {
      const i = new Event(t, { bubbles: !0, cancelable: !0, composed: !0 });
      if (((i.detail = n), nn(e).dispatchEvent(i), i.defaultPrevented)) {
        const e = n.preventer || n.sourceEvent;
        e && e.preventDefault && e.preventDefault();
      }
    }
    function ns(e) {
      const t = (function(e) {
        for (let t, n = 0; n < Wi.length; n++) {
          t = Wi[n];
          for (let n, i = 0; i < t.emits.length; i++) if ((n = t.emits[i]) === e) return t;
        }
        return null;
      })(e);
      t.info && (t.info.prevent = !0);
    }
    function is(e, t, n, i) {
      t &&
        ts(t, e, {
          x: n.clientX,
          y: n.clientY,
          sourceEvent: n,
          preventer: i,
          prevent: function(e) {
            return ns(e);
          }
        });
    }
    function ss(e, t, n) {
      if (e.prevent) return !1;
      if (e.started) return !0;
      const i = Math.abs(e.x - t);
      const s = Math.abs(e.y - n);
      return i >= Pi || s >= Pi;
    }
    function os(e, t, n) {
      if (!t) return;
      let i;
      const s = e.moves[e.moves.length - 2];
      const o = e.moves[e.moves.length - 1];
      const r = o.x - e.x;
      const a = o.y - e.y;
      let l = 0;
      s && ((i = o.x - s.x), (l = o.y - s.y)),
        ts(t, 'track', {
          state: e.state,
          x: n.clientX,
          y: n.clientY,
          dx: r,
          dy: a,
          ddx: i,
          ddy: l,
          sourceEvent: n,
          hover: function() {
            return (function(e, t) {
              let n = document.elementFromPoint(e, t);
              let i = n;
              for (; i && i.shadowRoot && !window.ShadyDOM; ) {
                if (i === (i = i.shadowRoot.elementFromPoint(e, t))) break;
                i && (n = i);
              }
              return n;
            })(n.clientX, n.clientY);
          }
        });
    }
    function rs(e, t, n) {
      const i = Math.abs(t.clientX - e.x);
      const s = Math.abs(t.clientY - e.y);
      const o = Ji(n || t);
      !o ||
        (Di[o.localName] && o.hasAttribute('disabled')) ||
        ((isNaN(i) ||
          isNaN(s) ||
          (i <= Ei && s <= Ei) ||
          (function(e) {
            if ('click' === e.type) {
              if (0 === e.detail) return !0;
              const t = Ji(e);
              if (!t.nodeType || t.nodeType !== Node.ELEMENT_NODE) return !0;
              const n = t.getBoundingClientRect();
              const i = e.pageX;
              const s = e.pageY;
              return !(i >= n.left && i <= n.right && s >= n.top && s <= n.bottom);
            }
            return !1;
          })(t)) &&
          (e.prevent || ts(o, 'tap', { x: t.clientX, y: t.clientY, sourceEvent: t, preventer: n })));
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
      mousedown: function(e) {
        if (!$i(e)) return;
        const t = Ji(e);
        const n = this;
        ji(
          this.info,
          function(e) {
            $i(e) || (is('up', t, e), Vi(n.info));
          },
          function(e) {
            $i(e) && is('up', t, e), Vi(n.info);
          }
        ),
          is('down', t, e);
      },
      touchstart: function(e) {
        is('down', Ji(e), e.changedTouches[0], e);
      },
      touchend: function(e) {
        is('up', Ji(e), e.changedTouches[0], e);
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
          addMove: function(e) {
            this.moves.length > 2 && this.moves.shift(), this.moves.push(e);
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
        mousedown: function(e) {
          if (!$i(e)) return;
          const t = Ji(e);
          const n = this;
          const i = function(e) {
            const i = e.clientX;
            const s = e.clientY;
            ss(n.info, i, s) &&
              ((n.info.state = n.info.started ? ('mouseup' === e.type ? 'end' : 'track') : 'start'),
              'start' === n.info.state && ns('tap'),
              n.info.addMove({ x: i, y: s }),
              $i(e) || ((n.info.state = 'end'), Vi(n.info)),
              t && os(n.info, t, e),
              (n.info.started = !0));
          };
          ji(this.info, i, function(e) {
            n.info.started && i(e), Vi(n.info);
          }),
            (this.info.x = e.clientX),
            (this.info.y = e.clientY);
        },
        touchstart: function(e) {
          const t = e.changedTouches[0];
          (this.info.x = t.clientX), (this.info.y = t.clientY);
        },
        touchmove: function(e) {
          const t = Ji(e);
          const n = e.changedTouches[0];
          const i = n.clientX;
          const s = n.clientY;
          ss(this.info, i, s) &&
            ('start' === this.info.state && ns('tap'),
            this.info.addMove({ x: i, y: s }),
            os(this.info, t, n),
            (this.info.state = 'track'),
            (this.info.started = !0));
        },
        touchend: function(e) {
          const t = Ji(e);
          const n = e.changedTouches[0];
          this.info.started &&
            ((this.info.state = 'end'), this.info.addMove({ x: n.clientX, y: n.clientY }), os(this.info, t, n));
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
        mousedown: function(e) {
          $i(e) && ((this.info.x = e.clientX), (this.info.y = e.clientY));
        },
        click: function(e) {
          $i(e) && rs(this.info, e);
        },
        touchstart: function(e) {
          const t = e.changedTouches[0];
          (this.info.x = t.clientX), (this.info.y = t.clientY);
        },
        touchend: function(e) {
          rs(this.info, e.changedTouches[0], e);
        }
      });
    const as = Zi;
    const ls = Ht((e) => {
      return class extends e {
        _addEventListenerToNode(e, t, n) {
          Zi(e, t, n) || super._addEventListenerToNode(e, t, n);
        }
        _removeEventListenerFromNode(e, t, n) {
          Gi(e, t, n) || super._removeEventListenerFromNode(e, t, n);
        }
      };
    });
    const cs = /:host\(:dir\((ltr|rtl)\)\)/g;
    const hs = ':host([dir="$1"])';
    const ds = /([\s\w-#\.\[\]\*]*):dir\((ltr|rtl)\)/g;
    const us = ':host([dir="$2"]) $1';
    const ps = /:dir\((?:ltr|rtl)\)/;
    const _s = Boolean(window.ShadyDOM && window.ShadyDOM.inUse);
    const fs = [];
    let ms = null;
    let gs = '';
    function ys() {
      gs = document.documentElement.getAttribute('dir');
    }
    function bs(e) {
      if (!e.__autoDirOptOut) {
        e.setAttribute('dir', gs);
      }
    }
    function vs() {
      ys(), (gs = document.documentElement.getAttribute('dir'));
      for (let e = 0; e < fs.length; e++) bs(fs[e]);
    }
    const ws = Ht((e) => {
      _s ||
        ms ||
        (ys(),
        (ms = new MutationObserver(vs)).observe(document.documentElement, {
          attributes: !0,
          attributeFilter: ['dir']
        }));
      const t = An(e);
      class n extends t {
        static _processStyleText(e, n) {
          return (
            (e = t._processStyleText.call(this, e, n)),
            !_s && ps.test(e) && ((e = this._replaceDirInCssText(e)), (this.__activateDir = !0)),
            e
          );
        }
        static _replaceDirInCssText(e) {
          let t = e;
          return (t = (t = t.replace(cs, hs)).replace(ds, us));
        }
        constructor() {
          super(), (this.__autoDirOptOut = !1);
        }
        ready() {
          super.ready(), (this.__autoDirOptOut = this.hasAttribute('dir'));
        }
        connectedCallback() {
          t.prototype.connectedCallback && super.connectedCallback(),
            this.constructor.__activateDir && (ms && ms.takeRecords().length && vs(), fs.push(this), bs(this));
        }
        disconnectedCallback() {
          if ((t.prototype.disconnectedCallback && super.disconnectedCallback(), this.constructor.__activateDir)) {
            const e = fs.indexOf(this);
            e > -1 && fs.splice(e, 1);
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
    function Ss(e, t, n) {
      return { index: e, removed: t, addedCount: n };
    }
    'interactive' === document.readyState || 'complete' === document.readyState
      ? Cs()
      : window.addEventListener('DOMContentLoaded', Cs);
    const ks = 0;
    const xs = 1;
    const Es = 2;
    const Ps = 3;
    function Ts(e, t, n, i, s, o) {
      let r;
      let a = 0;
      let l = 0;
      const c = Math.min(n - t, o - s);
      if (
        (0 == t &&
          0 == s &&
          (a = (function(e, t, n) {
            for (let i = 0; i < n; i++) if (!Os(e[i], t[i])) return i;
            return n;
          })(e, i, c)),
        n == e.length &&
          o == i.length &&
          (l = (function(e, t, n) {
            let i = e.length;
            let s = t.length;
            let o = 0;
            for (; o < n && Os(e[--i], t[--s]); ) o++;
            return o;
          })(e, i, c - a)),
        (s += a),
        (o -= l),
        (n -= l) - (t += a) == 0 && o - s == 0)
      )
        return [];
      if (t == n) {
        for (r = Ss(t, [], 0); s < o; ) r.removed.push(i[s++]);
        return [r];
      }
      if (s == o) return [Ss(t, [], n - t)];
      const h = (function(e) {
        let t = e.length - 1;
        let n = e[0].length - 1;
        let i = e[t][n];
        const s = [];
        for (; t > 0 || n > 0; ) {
          if (0 == t) {
            s.push(Es), n--;
            continue;
          }
          if (0 == n) {
            s.push(Ps), t--;
            continue;
          }
          let o;
          const r = e[t - 1][n - 1];
          const a = e[t - 1][n];
          const l = e[t][n - 1];
          (o = a < l ? (a < r ? a : r) : l < r ? l : r) == r
            ? (r == i ? s.push(ks) : (s.push(xs), (i = r)), t--, n--)
            : o == a
            ? (s.push(Ps), t--, (i = a))
            : (s.push(Es), n--, (i = l));
        }
        return s.reverse(), s;
      })(
        (function(e, t, n, i, s, o) {
          const r = o - s + 1;
          const a = n - t + 1;
          const l = new Array(r);
          for (let e = 0; e < r; e++) (l[e] = new Array(a)), (l[e][0] = e);
          for (let e = 0; e < a; e++) l[0][e] = e;
          for (let n = 1; n < r; n++)
            for (let o = 1; o < a; o++)
              if (Os(e[t + o - 1], i[s + n - 1])) l[n][o] = l[n - 1][o - 1];
              else {
                const e = l[n - 1][o] + 1;
                const t = l[n][o - 1] + 1;
                l[n][o] = e < t ? e : t;
              }
          return l;
        })(e, t, n, i, s, o)
      );
      r = void 0;
      const d = [];
      let u = t;
      let p = s;
      for (let e = 0; e < h.length; e++)
        switch (h[e]) {
          case ks:
            r && (d.push(r), (r = void 0)), u++, p++;
            break;
          case xs:
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
    function As(e, t) {
      return Ts(e, 0, e.length, t, 0, t.length);
    }
    function Os(e, t) {
      return e === t;
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
      e
    ) {
      return 'slot' === e.localName;
    }
    const Is = class {
      static getFlattenedNodes(e) {
        const t = nn(e);
        return Ns(e)
          ? ((e = e), t.assignedNodes({ flatten: !0 }))
          : Array.from(t.childNodes)
              .map((e) => (Ns(e) ? nn((e = e)).assignedNodes({ flatten: !0 }) : [e]))
              .reduce((e, t) => e.concat(t), []);
      }
      constructor(e, t) {
        (this._shadyChildrenObserver = null),
          (this._nativeChildrenObserver = null),
          (this._connected = !1),
          (this._target = e),
          (this.callback = t),
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
              ? (this._shadyChildrenObserver = ShadyDOM.observeChildren(this._target, (e) => {
                  this._processMutations(e);
                }))
              : ((this._nativeChildrenObserver = new MutationObserver((e) => {
                  this._processMutations(e);
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
        this._scheduled || ((this._scheduled = !0), kn.run(() => this.flush()));
      }
      _processMutations(e) {
        this._processSlotMutations(e), this.flush();
      }
      _processSlotMutations(e) {
        if (e)
          for (let t = 0; t < e.length; t++) {
            const n = e[t];
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
        const e = { target: this._target, addedNodes: [], removedNodes: [] };
        const t = this.constructor.getFlattenedNodes(this._target);
        const n = As(t, this._effectiveNodes);
        for (let t, i = 0; i < n.length && (t = n[i]); i++)
          for (let n, i = 0; i < t.removed.length && (n = t.removed[i]); i++) e.removedNodes.push(n);
        for (let i, s = 0; s < n.length && (i = n[s]); s++)
          for (let n = i.index; n < i.index + i.addedCount; n++) e.addedNodes.push(t[n]);
        this._effectiveNodes = t;
        let i = !1;
        return (e.addedNodes.length || e.removedNodes.length) && ((i = !0), this.callback.call(this._target, e)), i;
      }
      _listenSlots(e) {
        for (let t = 0; t < e.length; t++) {
          const n = e[t];
          Ns(n) && n.addEventListener('slotchange', this._boundSchedule);
        }
      }
      _unlistenSlots(e) {
        for (let t = 0; t < e.length; t++) {
          const n = e[t];
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
      let e;
      let t;
      do {
        (e = window.ShadyDOM && ShadyDOM.flush()),
          window.ShadyCSS && window.ShadyCSS.ScopingShim && window.ShadyCSS.ScopingShim.flush(),
          (t = wi());
      } while (e || t);
    };
    const Ls = Element.prototype;
    const zs =
      Ls.matches ||
      Ls.matchesSelector ||
      Ls.mozMatchesSelector ||
      Ls.msMatchesSelector ||
      Ls.oMatchesSelector ||
      Ls.webkitMatchesSelector;
    const Ms = function(e, t) {
      return zs.call(e, t);
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
      constructor(e) {
        window.ShadyDOM && window.ShadyDOM.inUse && window.ShadyDOM.patch(e), (this.node = e);
      }
      observeNodes(e) {
        return new Is(this.node, e);
      }
      unobserveNodes(e) {
        e.disconnect();
      }
      notifyObserver() {}
      deepContains(e) {
        if (nn(this.node).contains(e)) return !0;
        let t = e;
        const n = e.ownerDocument;
        for (; t && t !== n && t !== this.node; ) t = nn(t).parentNode || nn(t).host;
        return t === this.node;
      }
      getOwnerRoot() {
        return nn(this.node).getRootNode();
      }
      getDistributedNodes() {
        return 'slot' === this.node.localName ? nn(this.node).assignedNodes({ flatten: !0 }) : [];
      }
      getDestinationInsertionPoints() {
        const e = [];
        let t = nn(this.node).assignedSlot;
        for (; t; ) e.push(t), (t = nn(t).assignedSlot);
        return e;
      }
      importNode(e, t) {
        const n = this.node instanceof Document ? this.node : this.node.ownerDocument;
        return nn(n).importNode(e, t);
      }
      getEffectiveChildNodes() {
        return Is.getFlattenedNodes(this.node);
      }
      queryDistributedElements(e) {
        const t = this.getEffectiveChildNodes();
        const n = [];
        for (let i, s = 0, o = t.length; s < o && (i = t[s]); s++)
          i.nodeType === Node.ELEMENT_NODE && Ms(i, e) && n.push(i);
        return n;
      }
      get activeElement() {
        const e = this.node;
        return void 0 !== e._activeElement ? e._activeElement : e.activeElement;
      }
    }
    function Ds(e, t) {
      for (let n = 0; n < t.length; n++) {
        const i = t[n];
        Object.defineProperty(e, i, {
          get: function() {
            return this.node[i];
          },
          configurable: !0
        });
      }
    }
    class Hs {
      constructor(e) {
        this.event = e;
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
      class e extends window.ShadyDOM.Wrapper {}
      Object.getOwnPropertyNames(Fs.prototype).forEach((t) => {
        'activeElement' != t && (e.prototype[t] = Fs.prototype[t]);
      }),
        Ds(e.prototype, ['classList']),
        (Bs = e),
        Object.defineProperties(Hs.prototype, {
          localTarget: {
            get() {
              const e = this.event.currentTarget;
              const t = e && Us(e).getOwnerRoot();
              const n = this.path;
              for (let e = 0; e < n.length; e++) {
                const i = n[e];
                if (Us(i).getOwnerRoot() === t) return i;
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
      !(function(e, t) {
        for (let n = 0; n < t.length; n++) {
          const i = t[n];
          e[i] = function() {
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
        (function(e, t) {
          for (let n = 0; n < t.length; n++) {
            const i = t[n];
            Object.defineProperty(e, i, {
              get: function() {
                return this.node[i];
              },
              set: function(e) {
                this.node[i] = e;
              },
              configurable: !0
            });
          }
        })(Fs.prototype, ['textContent', 'innerHTML', 'className']);
    const Us = function(e) {
      if ((e = e || document) instanceof Bs) return e;
      if (e instanceof Hs) return e;
      let t = e.__domApi;
      return t || ((t = e instanceof Event ? new Hs(e) : new Bs(e)), (e.__domApi = t)), t;
    };
    const $s = window.ShadyDOM;
    const qs = window.ShadyCSS;
    function js(e, t) {
      return nn(e).getRootNode() === t;
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
    const Vs = window.ShadyCSS;
    const Ks = Ht((e) => {
      const t = ws(ls(gi(e)));
      const n = { x: 'pan-x', y: 'pan-y', none: 'none', all: 'auto' };
      class i extends t {
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
        attributeChangedCallback(e, t, n, i) {
          t !== n && (super.attributeChangedCallback(e, t, n, i), this.attributeChanged(e, t, n));
        }
        attributeChanged(e, t, n) {}
        _initializeProperties() {
          const e = Object.getPrototypeOf(this);
          e.hasOwnProperty('__hasRegisterFinished') || (this._registered(), (e.__hasRegisterFinished = !0)),
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
        serialize(e) {
          return this._serializeValue(e);
        }
        deserialize(e, t) {
          return this._deserializeValue(e, t);
        }
        reflectPropertyToAttribute(e, t, n) {
          this._propertyToAttribute(e, t, n);
        }
        serializeValueToAttribute(e, t, n) {
          this._valueToNodeAttribute(n || this, e, t);
        }
        extend(e, t) {
          if (!e || !t) return e || t;
          const n = Object.getOwnPropertyNames(t);
          for (let i, s = 0; s < n.length && (i = n[s]); s++) {
            const n = Object.getOwnPropertyDescriptor(t, i);
            n && Object.defineProperty(e, i, n);
          }
          return e;
        }
        mixin(e, t) {
          for (const n in t) e[n] = t[n];
          return e;
        }
        chainObject(e, t) {
          return e && t && e !== t && (e.__proto__ = t), e;
        }
        instanceTemplate(e) {
          const t = this.constructor._contentForTemplate(e);
          return document.importNode(t, !0);
        }
        fire(e, t, n) {
          (n = n || {}), (t = null == t ? {} : t);
          const i = new Event(e, {
            bubbles: void 0 === n.bubbles || n.bubbles,
            cancelable: Boolean(n.cancelable),
            composed: void 0 === n.composed || n.composed
          });
          i.detail = t;
          const s = n.node || this;
          return nn(s).dispatchEvent(i), i;
        }
        listen(e, t, n) {
          e = e || this;
          const i = this.__boundListeners || (this.__boundListeners = new WeakMap());
          let s = i.get(e);
          s || ((s = {}), i.set(e, s));
          const o = t + n;
          s[o] || (s[o] = this._addMethodEventListenerToNode(e, t, n, this));
        }
        unlisten(e, t, n) {
          e = e || this;
          const i = this.__boundListeners && this.__boundListeners.get(e);
          const s = t + n;
          const o = i && i[s];
          o && (this._removeEventListenerFromNode(e, t, o), (i[s] = null));
        }
        setScrollDirection(e, t) {
          es(t || this, n[e] || 'auto');
        }
        $$(e) {
          return this.root.querySelector(e);
        }
        get domHost() {
          const e = nn(this).getRootNode();
          return e instanceof DocumentFragment ? e.host : e;
        }
        distributeContent() {
          const e = Us(this);
          window.ShadyDOM && e.shadowRoot && ShadyDOM.flush();
        }
        getEffectiveChildNodes() {
          return Us(this).getEffectiveChildNodes();
        }
        queryDistributedElements(e) {
          return Us(this).queryDistributedElements(e);
        }
        getEffectiveChildren() {
          return this.getEffectiveChildNodes().filter(function(e) {
            return e.nodeType === Node.ELEMENT_NODE;
          });
        }
        getEffectiveTextContent() {
          const e = this.getEffectiveChildNodes();
          const t = [];
          for (let n, i = 0; (n = e[i]); i++) n.nodeType !== Node.COMMENT_NODE && t.push(n.textContent);
          return t.join('');
        }
        queryEffectiveChildren(e) {
          const t = this.queryDistributedElements(e);
          return t && t[0];
        }
        queryAllEffectiveChildren(e) {
          return this.queryDistributedElements(e);
        }
        getContentChildNodes(e) {
          const t = this.root.querySelector(e || 'slot');
          return t ? Us(t).getDistributedNodes() : [];
        }
        getContentChildren(e) {
          return this.getContentChildNodes(e).filter(function(e) {
            return e.nodeType === Node.ELEMENT_NODE;
          });
        }
        isLightDescendant(e) {
          return this !== e && nn(this).contains(e) && nn(this).getRootNode() === nn(e).getRootNode();
        }
        isLocalDescendant(e) {
          return this.root === nn(e).getRootNode();
        }
        scopeSubtree(e, t = !1) {
          return (function(e, t = !1) {
            if (!$s || !qs) return null;
            if (!$s.handlesDynamicScoping) return null;
            const n = qs.ScopingShim;
            if (!n) return null;
            const i = n.scopeForNode(e);
            const s = nn(e).getRootNode();
            const o = (e) => {
              if (!js(e, s)) return;
              const t = Array.from($s.nativeMethods.querySelectorAll.call(e, '*'));
              t.push(e);
              for (let e = 0; e < t.length; e++) {
                const o = t[e];
                if (!js(o, s)) continue;
                const r = n.currentScopeForNode(o);
                r !== i && ('' !== r && n.unscopeNode(o, r), n.scopeNode(o, i));
              }
            };
            if ((o(e), t)) {
              const t = new MutationObserver((e) => {
                for (let t = 0; t < e.length; t++) {
                  const n = e[t];
                  for (let e = 0; e < n.addedNodes.length; e++) {
                    const t = n.addedNodes[e];
                    t.nodeType === Node.ELEMENT_NODE && o(t);
                  }
                }
              });
              return t.observe(e, { childList: !0, subtree: !0 }), t;
            }
            return null;
          })(e, t);
        }
        getComputedStyleValue(e) {
          return Vs.getComputedStyleValue(this, e);
        }
        debounce(e, t, n) {
          return (
            (this._debouncers = this._debouncers || {}),
            (this._debouncers[e] = yi.debounce(this._debouncers[e], n > 0 ? Sn.after(n) : kn, t.bind(this)))
          );
        }
        isDebouncerActive(e) {
          this._debouncers = this._debouncers || {};
          const t = this._debouncers[e];
          return !(!t || !t.isActive());
        }
        flushDebouncer(e) {
          this._debouncers = this._debouncers || {};
          const t = this._debouncers[e];
          t && t.flush();
        }
        cancelDebouncer(e) {
          this._debouncers = this._debouncers || {};
          const t = this._debouncers[e];
          t && t.cancel();
        }
        async(e, t) {
          return t > 0 ? Sn.run(e.bind(this), t) : ~kn.run(e.bind(this));
        }
        cancelAsync(e) {
          e < 0 ? kn.cancel(~e) : Sn.cancel(e);
        }
        create(e, t) {
          const n = document.createElement(e);
          if (t)
            if (n.setProperties) n.setProperties(t);
            else for (const e in t) n[e] = t[e];
          return n;
        }
        elementMatches(e, t) {
          return Ms(t || this, e);
        }
        toggleAttribute(e, t) {
          let n = this;
          return (
            3 === arguments.length && (n = arguments[2]),
            1 == arguments.length && (t = !n.hasAttribute(e)),
            t ? (nn(n).setAttribute(e, ''), !0) : (nn(n).removeAttribute(e), !1)
          );
        }
        toggleClass(e, t, n) {
          (n = n || this),
            1 == arguments.length && (t = !n.classList.contains(e)),
            t ? n.classList.add(e) : n.classList.remove(e);
        }
        transform(e, t) {
          ((t = t || this).style.webkitTransform = e), (t.style.transform = e);
        }
        translate3d(e, t, n, i) {
          (i = i || this), this.transform('translate3d(' + e + ',' + t + ',' + n + ')', i);
        }
        arrayDelete(e, t) {
          let n;
          if (Array.isArray(e)) {
            if ((n = e.indexOf(t)) >= 0) return e.splice(n, 1);
          } else {
            if ((n = dn(this, e).indexOf(t)) >= 0) return this.splice(e, n, 1);
          }
          return null;
        }
        _logger(e, t) {
          switch ((Array.isArray(t) && 1 === t.length && Array.isArray(t[0]) && (t = t[0]), e)) {
            case 'log':
            case 'warn':
            case 'error':
              console[e](...t);
          }
        }
        _log(...e) {
          this._logger('log', e);
        }
        _warn(...e) {
          this._logger('warn', e);
        }
        _error(...e) {
          this._logger('error', e);
        }
        _logf(e, ...t) {
          return ['[%s::%s]', this.is, e, ...t];
        }
      }
      return (i.prototype.is = ''), i;
    });
    const Ys = {
      attached: !0,
      detached: !0,
      ready: !0,
      created: !0,
      beforeRegister: !0,
      registered: !0,
      attributeChanged: !0,
      listeners: !0,
      hostAttributes: !0
    };
    const Ws = {
      attached: !0,
      detached: !0,
      ready: !0,
      created: !0,
      beforeRegister: !0,
      registered: !0,
      attributeChanged: !0,
      behaviors: !0,
      _noAccessors: !0
    };
    const Js = Object.assign({ listeners: !0, hostAttributes: !0, properties: !0, observers: !0 }, Ws);
    /**
@license
Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/ function Xs(
      e,
      t,
      n,
      i
    ) {
      !(function(e, t, n) {
        const i = e._noAccessors;
        const s = Object.getOwnPropertyNames(e);
        for (let o = 0; o < s.length; o++) {
          const r = s[o];
          if (!(r in n))
            if (i) t[r] = e[r];
            else {
              const n = Object.getOwnPropertyDescriptor(e, r);
              n && ((n.configurable = !0), Object.defineProperty(t, r, n));
            }
        }
      })(t, e, i);
      for (const e in Ys) t[e] && ((n[e] = n[e] || []), n[e].push(t[e]));
    }
    function Zs(e, t) {
      for (const n in t) {
        const i = e[n];
        const s = t[n];
        e[n] = !('value' in s) && i && 'value' in i ? Object.assign({ value: i.value }, s) : s;
      }
    }
    function Gs(e, t, n) {
      let i;
      const s = {};
      class o extends t {
        static _finalizeClass() {
          if (this.hasOwnProperty(JSCompiler_renameProperty('generatedFrom', this))) {
            if (i)
              for (let e, t = 0; t < i.length; t++)
                (e = i[t]).properties && this.createProperties(e.properties),
                  e.observers && this.createObservers(e.observers, e.properties);
            e.properties && this.createProperties(e.properties),
              e.observers && this.createObservers(e.observers, e.properties),
              this._prepareTemplate();
          } else t._finalizeClass.call(this);
        }
        static get properties() {
          const t = {};
          if (i) for (let e = 0; e < i.length; e++) Zs(t, i[e].properties);
          return Zs(t, e.properties), t;
        }
        static get observers() {
          let t = [];
          if (i) for (let e, n = 0; n < i.length; n++) (e = i[n]).observers && (t = t.concat(e.observers));
          return e.observers && (t = t.concat(e.observers)), t;
        }
        created() {
          super.created();
          const e = s.created;
          if (e) for (let t = 0; t < e.length; t++) e[t].call(this);
        }
        _registered() {
          const e = o.prototype;
          if (!e.hasOwnProperty('__hasRegisterFinished')) {
            (e.__hasRegisterFinished = !0), super._registered(), Lt && r(e);
            const t = Object.getPrototypeOf(this);
            let n = s.beforeRegister;
            if (n) for (let e = 0; e < n.length; e++) n[e].call(t);
            if ((n = s.registered)) for (let e = 0; e < n.length; e++) n[e].call(t);
          }
        }
        _applyListeners() {
          super._applyListeners();
          const e = s.listeners;
          if (e)
            for (let t = 0; t < e.length; t++) {
              const n = e[t];
              if (n) for (const e in n) this._addMethodEventListenerToNode(this, e, n[e]);
            }
        }
        _ensureAttributes() {
          const e = s.hostAttributes;
          if (e)
            for (let t = e.length - 1; t >= 0; t--) {
              const n = e[t];
              for (const e in n) this._ensureAttribute(e, n[e]);
            }
          super._ensureAttributes();
        }
        ready() {
          super.ready();
          const e = s.ready;
          if (e) for (let t = 0; t < e.length; t++) e[t].call(this);
        }
        attached() {
          super.attached();
          const e = s.attached;
          if (e) for (let t = 0; t < e.length; t++) e[t].call(this);
        }
        detached() {
          super.detached();
          const e = s.detached;
          if (e) for (let t = 0; t < e.length; t++) e[t].call(this);
        }
        attributeChanged(e, t, n) {
          super.attributeChanged();
          const i = s.attributeChanged;
          if (i) for (let s = 0; s < i.length; s++) i[s].call(this, e, t, n);
        }
      }
      if (n) {
        Array.isArray(n) || (n = [n]);
        const e = t.prototype.behaviors;
        (i = (function e(t, n, i) {
          n = n || [];
          for (let s = t.length - 1; s >= 0; s--) {
            const o = t[s];
            o
              ? Array.isArray(o)
                ? e(o, n)
                : n.indexOf(o) < 0 && (!i || i.indexOf(o) < 0) && n.unshift(o)
              : console.warn('behavior is null, check for missing or 404 import');
          }
          return n;
        })(n, null, e)),
          (o.prototype.behaviors = e ? e.concat(n) : i);
      }
      const r = (t) => {
        i &&
          (function(e, t, n) {
            for (let i = 0; i < t.length; i++) Xs(e, t[i], n, Js);
          })(t, i, s),
          Xs(t, e, s, Ws);
      };
      return Lt || r(o.prototype), (o.generatedFrom = e), o;
    }
    const Qs = function(e) {
      let t;
      return (t = 'function' == typeof e ? e : Qs.Class(e)), customElements.define(t.is, t), t;
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
    function eo(e, t, n, i, s) {
      let o;
      s && (o = 'object' == typeof n && null !== n) && (i = e.__dataTemp[t]);
      const r = i !== n && (i == i || n == n);
      return o && r && (e.__dataTemp[t] = n), r;
    }
    Qs.Class = function(e, t) {
      e || console.warn('Polymer.Class requires `info` argument');
      let n = t ? t(Ks(HTMLElement)) : Ks(HTMLElement);
      return ((n = Gs(e, n, e.behaviors)).is = n.prototype.is = e.is), n;
    };
    const to = Ht((e) => {
      return class extends e {
        _shouldPropertyChange(e, t, n) {
          return eo(this, e, t, n, !0);
        }
      };
    });
    const no = Ht((e) => {
      return class extends e {
        static get properties() {
          return { mutableData: Boolean };
        }
        _shouldPropertyChange(e, t, n) {
          return eo(this, e, t, n, this.mutableData);
        }
      };
    });
    to._mutablePropertyChange = eo;
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
    const oo = di(so);
    const ro = to(oo);
    const ao = di(class {});
    class lo extends ao {
      constructor(e) {
        super(), this._configureProperties(e), (this.root = this._stampTemplate(this.__dataHost));
        const t = [];
        this.children = t;
        for (let e = this.root.firstChild; e; e = e.nextSibling) t.push(e), (e.__templatizeInstance = this);
        this.__templatizeOwner && this.__templatizeOwner.__hideTemplateChildren__ && this._showHideChildren(!0);
        const n = this.__templatizeOptions;
        ((e && n.instanceProps) || !n.instanceProps) && this._enableProperties();
      }
      _configureProperties(e) {
        if (this.__templatizeOptions.forwardHostProp)
          for (const e in this.__hostProps) this._setPendingProperty(e, this.__dataHost['_host_' + e]);
        for (const t in e) this._setPendingProperty(t, e[t]);
      }
      forwardHostProp(e, t) {
        this._setPendingPropertyOrPath(e, t, !1, !0) && this.__dataHost._enqueueClient(this);
      }
      _addEventListenerToNode(e, t, n) {
        if (this._methodHost && this.__templatizeOptions.parentModel)
          this._methodHost._addEventListenerToNode(e, t, (e) => {
            (e.model = this), n(e);
          });
        else {
          const i = this.__dataHost.__dataHost;
          i && i._addEventListenerToNode(e, t, n);
        }
      }
      _showHideChildren(e) {
        const t = this.children;
        for (let n = 0; n < t.length; n++) {
          const i = t[n];
          if (Boolean(e) != Boolean(i.__hideTemplateChildren__))
            if (i.nodeType === Node.TEXT_NODE)
              e
                ? ((i.__polymerTextContent__ = i.textContent), (i.textContent = ''))
                : (i.textContent = i.__polymerTextContent__);
            else if ('slot' === i.localName)
              if (e)
                (i.__polymerReplaced__ = document.createComment('hidden-slot')),
                  nn(nn(i).parentNode).replaceChild(i.__polymerReplaced__, i);
              else {
                const e = i.__polymerReplaced__;
                e && nn(nn(e).parentNode).replaceChild(i, e);
              }
            else
              i.style &&
                (e
                  ? ((i.__polymerDisplay__ = i.style.display), (i.style.display = 'none'))
                  : (i.style.display = i.__polymerDisplay__));
          (i.__hideTemplateChildren__ = e), i._showHideChildren && i._showHideChildren(e);
        }
      }
      _setUnmanagedPropertyToNode(e, t, n) {
        e.__hideTemplateChildren__ && e.nodeType == Node.TEXT_NODE && 'textContent' == t
          ? (e.__polymerTextContent__ = n)
          : super._setUnmanagedPropertyToNode(e, t, n);
      }
      get parentModel() {
        let e = this.__parentModel;
        if (!e) {
          let t;
          e = this;
          do {
            e = e.__dataHost.__dataHost;
          } while ((t = e.__templatizeOptions) && !t.parentModel);
          this.__parentModel = e;
        }
        return e;
      }
      dispatchEvent(e) {
        return !0;
      }
    }
    lo.prototype.__dataHost,
      lo.prototype.__templatizeOptions,
      lo.prototype._methodHost,
      lo.prototype.__templatizeOwner,
      lo.prototype.__hostProps;
    const co = to(lo);
    function ho(e) {
      const t = e.__dataHost;
      return (t && t._methodHost) || t;
    }
    function uo(e, t, n) {
      let i = n.mutableData ? co : lo;
      mo.mixin && (i = mo.mixin(i));
      const s = class extends i {};
      return (
        (s.prototype.__templatizeOptions = n),
        s.prototype._bindTemplate(e),
        (function(e, t, n, i) {
          const s = n.hostProps || {};
          for (const t in i.instanceProps) {
            delete s[t];
            const n = i.notifyInstanceProp;
            n && e.prototype._addPropertyEffect(t, e.prototype.PROPERTY_EFFECT_TYPES.NOTIFY, { fn: fo(t, n) });
          }
          if (i.forwardHostProp && t.__dataHost)
            for (const t in s)
              n.hasHostProps || (n.hasHostProps = !0),
                e.prototype._addPropertyEffect(t, e.prototype.PROPERTY_EFFECT_TYPES.NOTIFY, {
                  fn: function(e, t, n) {
                    e.__dataHost._setPendingPropertyOrPath('_host_' + t, n[t], !0, !0);
                  }
                });
        })(s, e, t, n),
        s
      );
    }
    function po(e, t, n) {
      const i = n.forwardHostProp;
      if (i && t.hasHostProps) {
        let s = t.templatizeTemplateClass;
        if (!s) {
          const e = n.mutableData ? ro : oo;
          s = t.templatizeTemplateClass = class extends e {};
          const o = t.hostProps;
          for (const e in o)
            s.prototype._addPropertyEffect('_host_' + e, s.prototype.PROPERTY_EFFECT_TYPES.PROPAGATE, { fn: _o(e, i) }),
              s.prototype._createNotifyingProperty('_host_' + e);
        }
        !(function(e, t) {
          (io = e), Object.setPrototypeOf(e, t.prototype), new t(), (io = null);
        })(e, s),
          e.__dataProto && Object.assign(e.__data, e.__dataProto),
          (e.__dataTemp = {}),
          (e.__dataPending = null),
          (e.__dataOld = null),
          e._enableProperties();
      }
    }
    function _o(e, t) {
      return function(e, n, i) {
        t.call(e.__templatizeOwner, n.substring('_host_'.length), i[n]);
      };
    }
    function fo(e, t) {
      return function(e, n, i) {
        t.call(e.__templatizeOwner, e, n, i[n]);
      };
    }
    function mo(e, t, n) {
      if (It && !ho(e)) throw new Error('strictTemplatePolicy: template owner not trusted');
      if (((n = n || {}), e.__templatizeOwner)) throw new Error('A <template> can only be templatized once');
      e.__templatizeOwner = t;
      const i = (t ? t.constructor : lo)._parseTemplate(e);
      let s = i.templatizeInstanceClass;
      s || ((s = uo(e, i, n)), (i.templatizeInstanceClass = s)), po(e, i, n);
      let o = class extends s {};
      return (
        (o.prototype._methodHost = ho(e)),
        (o.prototype.__dataHost = e),
        (o.prototype.__templatizeOwner = t),
        (o.prototype.__hostProps = i.hostProps),
        (o = o)
      );
    }
    function go(e, t) {
      let n;
      for (; t; )
        if ((n = t.__templatizeInstance)) {
          if (n.__dataHost == e) return n;
          t = n.__dataHost;
        } else t = nn(t).parentNode;
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
      if (Lt && !Tt) {
        if (!yo) {
          yo = !0;
          const e = document.createElement('style');
          (e.textContent = 'dom-bind,dom-if,dom-repeat{display:none;}'), document.head.appendChild(e);
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
          if ((super(), It)) throw new Error('strictTemplatePolicy: dom-bind not allowed');
          (this.root = null), (this.$ = null), (this.__children = null);
        }
        attributeChangedCallback(e, t, n, i) {
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
            for (let e = 0; e < this.__children.length; e++) this.root.appendChild(this.__children[e]);
        }
        render() {
          let e;
          if (!this.__children) {
            if (!(e = e || this.querySelector('template'))) {
              const t = new MutationObserver(() => {
                if (!(e = this.querySelector('template'))) throw new Error('dom-bind requires a <template> child');
                t.disconnect(), this.render();
              });
              return void t.observe(this, { childList: !0 });
            }
            (this.root = this._stampTemplate(e)), (this.$ = this.root.$), (this.__children = []);
            for (let e = this.root.firstChild; e; e = e.nextSibling) this.__children[this.__children.length] = e;
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
      constructor(e) {
        this.value = e.toString();
      }
      toString() {
        return this.value;
      }
    }
    function Co(e) {
      if (e instanceof wo) return e.value;
      throw new Error(`non-literal value passed to Polymer's htmlLiteral function: ${e}`);
    }
    const So = function(e, ...t) {
      const n = document.createElement('template');
      return (
        (n.innerHTML = t.reduce(
          (t, n, i) =>
            t +
            (function(e) {
              if (e instanceof HTMLTemplateElement) return e.innerHTML;
              if (e instanceof wo) return Co(e);
              throw new Error(`non-template value passed to Polymer's html function: ${e}`);
            })(n) +
            e[i + 1],
          e[0]
        )),
        n
      );
    };
    const ko = gi(HTMLElement);
    const xo = no(ko);
    class Eo extends xo {
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
        for (let e = 0; e < this.__instances.length; e++) this.__detachInstance(e);
      }
      connectedCallback() {
        if ((super.connectedCallback(), bo() || (this.style.display = 'none'), this.__isDetached)) {
          this.__isDetached = !1;
          const e = nn(nn(this).parentNode);
          for (let t = 0; t < this.__instances.length; t++) this.__attachInstance(t, e);
        }
      }
      __ensureTemplatized() {
        if (!this.__ctor) {
          const e = (this.template = this.querySelector('template'));
          if (!e) {
            const e = new MutationObserver(() => {
              if (!this.querySelector('template')) throw new Error('dom-repeat requires a <template> child');
              e.disconnect(), this.__render();
            });
            return e.observe(this, { childList: !0 }), !1;
          }
          const t = {};
          (t[this.as] = !0),
            (t[this.indexAs] = !0),
            (t[this.itemsIndexAs] = !0),
            (this.__ctor = mo(e, this, {
              mutableData: this.mutableData,
              parentModel: !0,
              instanceProps: t,
              forwardHostProp: function(e, t) {
                const n = this.__instances;
                for (let i, s = 0; s < n.length && (i = n[s]); s++) i.forwardHostProp(e, t);
              },
              notifyInstanceProp: function(e, t, n) {
                if ((i = this.as) === (s = t) || rn(i, s) || an(i, s)) {
                  const i = e[this.itemsIndexAs];
                  t == this.as && (this.items[i] = n);
                  const s = ln(this.as, `${JSCompiler_renameProperty('items', this)}.${i}`, t);
                  this.notifyPath(s, n);
                }
                let i;
                let s;
              }
            }));
        }
        return !0;
      }
      __getMethodHost() {
        return this.__dataHost._methodHost || this.__dataHost;
      }
      __functionFromPropertyValue(e) {
        if ('string' == typeof e) {
          const t = e;
          const n = this.__getMethodHost();
          return function() {
            return n[t].apply(n, arguments);
          };
        }
        return e;
      }
      __sortChanged(e) {
        (this.__sortFn = this.__functionFromPropertyValue(e)), this.items && this.__debounceRender(this.__render);
      }
      __filterChanged(e) {
        (this.__filterFn = this.__functionFromPropertyValue(e)), this.items && this.__debounceRender(this.__render);
      }
      __computeFrameTime(e) {
        return Math.ceil(1e3 / e);
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
        const e = performance.now();
        const t = this._targetFrameTime / (e - this.__lastChunkTime);
        (this.__chunkCount = Math.round(this.__chunkCount * t) || 1),
          (this.__limit += this.__chunkCount),
          (this.__lastChunkTime = e),
          this.__debounceRender(this.__render);
      }
      __observeChanged() {
        this.__observePaths = this.observe && this.observe.replace('.*', '.').split(' ');
      }
      __itemsChanged(e) {
        this.items &&
          !Array.isArray(this.items) &&
          console.warn('dom-repeat expected array for `items`, found', this.items),
          this.__handleItemPath(e.path, e.value) || (this.__initializeChunking(), this.__debounceRender(this.__render));
      }
      __handleObservedPaths(e) {
        if (this.__sortFn || this.__filterFn)
          if (e) {
            if (this.__observePaths) {
              const t = this.__observePaths;
              for (let n = 0; n < t.length; n++)
                0 === e.indexOf(t[n]) && this.__debounceRender(this.__render, this.delay);
            }
          } else this.__debounceRender(this.__render, this.delay);
      }
      __debounceRender(e, t = 0) {
        (this.__renderDebouncer = yi.debounce(this.__renderDebouncer, t > 0 ? Sn.after(t) : kn, e.bind(this))),
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
        const e = this.items || [];
        let t = new Array(e.length);
        for (let n = 0; n < e.length; n++) t[n] = n;
        this.__filterFn && (t = t.filter((t, n, i) => this.__filterFn(e[t], n, i))),
          this.__sortFn && t.sort((t, n) => this.__sortFn(e[t], e[n]));
        const n = (this.__itemsIdxToInstIdx = {});
        let i = 0;
        const s = Math.min(t.length, this.__limit);
        for (; i < s; i++) {
          const s = this.__instances[i];
          const o = t[i];
          const r = e[o];
          (n[o] = i),
            s
              ? (s._setPendingProperty(this.as, r),
                s._setPendingProperty(this.indexAs, i),
                s._setPendingProperty(this.itemsIndexAs, o),
                s._flushProperties())
              : this.__insertInstance(r, i, o);
        }
        for (let e = this.__instances.length - 1; e >= i; e--) this.__detachAndRemoveInstance(e);
      }
      __detachInstance(e) {
        const t = this.__instances[e];
        const n = nn(t.root);
        for (let e = 0; e < t.children.length; e++) {
          const i = t.children[e];
          n.appendChild(i);
        }
        return t;
      }
      __attachInstance(e, t) {
        const n = this.__instances[e];
        t.insertBefore(n.root, this);
      }
      __detachAndRemoveInstance(e) {
        const t = this.__detachInstance(e);
        t && this.__pool.push(t), this.__instances.splice(e, 1);
      }
      __stampInstance(e, t, n) {
        const i = {};
        return (i[this.as] = e), (i[this.indexAs] = t), (i[this.itemsIndexAs] = n), new this.__ctor(i);
      }
      __insertInstance(e, t, n) {
        let i = this.__pool.pop();
        i
          ? (i._setPendingProperty(this.as, e),
            i._setPendingProperty(this.indexAs, t),
            i._setPendingProperty(this.itemsIndexAs, n),
            i._flushProperties())
          : (i = this.__stampInstance(e, t, n));
        const s = this.__instances[t + 1];
        const o = s ? s.children[0] : this;
        return nn(nn(this).parentNode).insertBefore(i.root, o), (this.__instances[t] = i), i;
      }
      _showHideChildren(e) {
        for (let t = 0; t < this.__instances.length; t++) this.__instances[t]._showHideChildren(e);
      }
      __handleItemPath(e, t) {
        const n = e.slice(6);
        const i = n.indexOf('.');
        const s = i < 0 ? n : n.substring(0, i);
        if (s == parseInt(s, 10)) {
          const e = i < 0 ? '' : n.substring(i + 1);
          this.__handleObservedPaths(e);
          const o = this.__itemsIdxToInstIdx[s];
          const r = this.__instances[o];
          if (r) {
            const n = this.as + (e ? '.' + e : '');
            r._setPendingPropertyOrPath(n, t, !1, !0), r._flushProperties();
          }
          return !0;
        }
      }
      itemForElement(e) {
        const t = this.modelForElement(e);
        return t && t[this.as];
      }
      indexForElement(e) {
        const t = this.modelForElement(e);
        return t && t[this.indexAs];
      }
      modelForElement(e) {
        return go(this.template, e);
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
    class Po extends ko {
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
        (this.__renderDebouncer = yi.debounce(this.__renderDebouncer, kn, () => this.__render())),
          vi(this.__renderDebouncer);
      }
      disconnectedCallback() {
        super.disconnectedCallback();
        const e = nn(this).parentNode;
        (e && (e.nodeType != Node.DOCUMENT_FRAGMENT_NODE || nn(e).host)) || this.__teardownInstance();
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
        const e = nn(this).parentNode;
        if (e) {
          if (!this.__ctor) {
            const e = nn(this).querySelector('template');
            if (!e) {
              const e = new MutationObserver(() => {
                if (!nn(this).querySelector('template')) throw new Error('dom-if requires a <template> child');
                e.disconnect(), this.__render();
              });
              return e.observe(this, { childList: !0 }), !1;
            }
            this.__ctor = mo(e, this, {
              mutableData: !0,
              forwardHostProp: function(e, t) {
                this.__instance &&
                  (this.if
                    ? this.__instance.forwardHostProp(e, t)
                    : ((this.__invalidProps = this.__invalidProps || Object.create(null)),
                      (this.__invalidProps[on(e)] = !0)));
              }
            });
          }
          if (this.__instance) {
            this.__syncHostProperties();
            const t = this.__instance.children;
            if (t && t.length) {
              if (nn(this).previousSibling !== t[t.length - 1])
                for (let n, i = 0; i < t.length && (n = t[i]); i++) nn(e).insertBefore(n, this);
            }
          } else (this.__instance = new this.__ctor()), nn(e).insertBefore(this.__instance.root, this);
        }
        return !0;
      }
      __syncHostProperties() {
        const e = this.__invalidProps;
        if (e) {
          for (const t in e) this.__instance._setPendingProperty(t, this.__dataHost[t]);
          (this.__invalidProps = null), this.__instance._flushProperties();
        }
      }
      __teardownInstance() {
        if (this.__instance) {
          const e = this.__instance.children;
          if (e && e.length) {
            let t = nn(e[0]).parentNode;
            if (t) {
              t = nn(t);
              for (let n, i = 0; i < e.length && (n = e[i]); i++) t.removeChild(n);
            }
          }
          (this.__instance = null), (this.__invalidProps = null);
        }
      }
      _showHideChildren() {
        const e = this.__hideTemplateChildren__ || !this.if;
        this.__instance && this.__instance._showHideChildren(e);
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
    const To = Ht((e) => {
      const t = gi(e);
      return class extends t {
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
        __updateSelection(e, t) {
          const n = t.path;
          if (n == JSCompiler_renameProperty('items', this)) {
            const n = t.base || [];
            const i = this.__lastItems;
            if ((e !== this.__lastMulti && this.clearSelection(), i)) {
              const e = As(n, i);
              this.__applySplices(e);
            }
            (this.__lastItems = n), (this.__lastMulti = e);
          } else if (t.path == `${JSCompiler_renameProperty('items', this)}.splices`)
            this.__applySplices(t.value.indexSplices);
          else {
            const e = n.slice(`${JSCompiler_renameProperty('items', this)}.`.length);
            const t = parseInt(e, 10);
            e.indexOf('.') < 0 && e == t && this.__deselectChangedIdx(t);
          }
        }
        __applySplices(e) {
          const t = this.__selectedMap;
          for (let n = 0; n < e.length; n++) {
            const i = e[n];
            t.forEach((e, n) => {
              e < i.index ||
                (e >= i.index + i.removed.length ? t.set(n, e + i.addedCount - i.removed.length) : t.set(n, -1));
            });
            for (let e = 0; e < i.addedCount; e++) {
              const n = i.index + e;
              t.has(this.items[n]) && t.set(this.items[n], n);
            }
          }
          this.__updateLinks();
          let n = 0;
          t.forEach((e, i) => {
            e < 0
              ? (this.multi
                  ? this.splice(JSCompiler_renameProperty('selected', this), n, 1)
                  : (this.selected = this.selectedItem = null),
                t.delete(i))
              : n++;
          });
        }
        __updateLinks() {
          if (((this.__dataLinkedPaths = {}), this.multi)) {
            let e = 0;
            this.__selectedMap.forEach((t) => {
              t >= 0 &&
                this.linkPaths(
                  `${JSCompiler_renameProperty('items', this)}.${t}`,
                  `${JSCompiler_renameProperty('selected', this)}.${e++}`
                );
            });
          } else
            this.__selectedMap.forEach((e) => {
              this.linkPaths(
                JSCompiler_renameProperty('selected', this),
                `${JSCompiler_renameProperty('items', this)}.${e}`
              ),
                this.linkPaths(
                  JSCompiler_renameProperty('selectedItem', this),
                  `${JSCompiler_renameProperty('items', this)}.${e}`
                );
            });
        }
        clearSelection() {
          (this.__dataLinkedPaths = {}),
            (this.__selectedMap = new Map()),
            (this.selected = this.multi ? [] : null),
            (this.selectedItem = null);
        }
        isSelected(e) {
          return this.__selectedMap.has(e);
        }
        isIndexSelected(e) {
          return this.isSelected(this.items[e]);
        }
        __deselectChangedIdx(e) {
          const t = this.__selectedIndexForItemIndex(e);
          if (t >= 0) {
            let e = 0;
            this.__selectedMap.forEach((n, i) => {
              t == e++ && this.deselect(i);
            });
          }
        }
        __selectedIndexForItemIndex(e) {
          const t = this.__dataLinkedPaths[`${JSCompiler_renameProperty('items', this)}.${e}`];
          if (t) return parseInt(t.slice(`${JSCompiler_renameProperty('selected', this)}.`.length), 10);
        }
        deselect(e) {
          const t = this.__selectedMap.get(e);
          if (t >= 0) {
            let n;
            this.__selectedMap.delete(e),
              this.multi && (n = this.__selectedIndexForItemIndex(t)),
              this.__updateLinks(),
              this.multi
                ? this.splice(JSCompiler_renameProperty('selected', this), n, 1)
                : (this.selected = this.selectedItem = null);
          }
        }
        deselectIndex(e) {
          this.deselect(this.items[e]);
        }
        select(e) {
          this.selectIndex(this.items.indexOf(e));
        }
        selectIndex(e) {
          const t = this.items[e];
          this.isSelected(t)
            ? this.toggle && this.deselectIndex(e)
            : (this.multi || this.__selectedMap.clear(),
              this.__selectedMap.set(t, e),
              this.__updateLinks(),
              this.multi
                ? this.push(JSCompiler_renameProperty('selected', this), t)
                : (this.selected = this.selectedItem = t));
        }
      };
    })(ko);
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
    const Oo = new yt();
    window.ShadyCSS ||
      (window.ShadyCSS = {
        prepareTemplate(e, t, n) {},
        prepareTemplateDom(e, t) {},
        prepareTemplateStyles(e, t, n) {},
        styleSubtree(e, t) {
          Oo.processStyles(), Ve(e, t);
        },
        styleElement(e) {
          Oo.processStyles();
        },
        styleDocument(e) {
          Oo.processStyles(), Ve(document.body, e);
        },
        getComputedStyleValue: (e, t) => Ke(e, t),
        flushCustomStyles() {},
        nativeCss: ve,
        nativeShadow: fe,
        cssBuild: ge,
        disableRuntime: be
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
    const No = 'include';
    const Io = window.ShadyCSS.CustomStyleInterface;
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
          const e = this.querySelector('style');
          if (!e) return null;
          this._style = e;
          const t = e.getAttribute(No);
          return (
            t &&
              (e.removeAttribute(No),
              (e.textContent =
                (function(e) {
                  const t = e.trim().split(/\s+/);
                  let n = '';
                  for (let e = 0; e < t.length; e++) n += en(t[e]);
                  return n;
                })(t) + e.textContent)),
            this.ownerDocument !== window.document && window.document.head.appendChild(this),
            this._style
          );
        }
      }
    ),
      (Ro = to._mutablePropertyChange);
    Boolean;
    const Lo = Ks(HTMLElement).prototype;
    const zo = Qs({
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
        zo.instance || (zo.instance = this),
          document.body.addEventListener('iron-announce', this._onIronAnnounce.bind(this));
      },
      announce: function(e) {
        (this._text = ''),
          this.async(function() {
            this._text = e;
          }, 100);
      },
      _onIronAnnounce: function(e) {
        e.detail && e.detail.text && this.announce(e.detail.text);
      }
    });
    (zo.instance = null),
      (zo.requestAvailability = function() {
        zo.instance || (zo.instance = document.createElement('iron-a11y-announcer')),
          document.body.appendChild(zo.instance);
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
        let e = Us(this).parentNode;
        return e && e.nodeType === Node.DOCUMENT_FRAGMENT_NODE && (e = e.host), e;
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
          const e = window.getComputedStyle(this);
          const t = window.getComputedStyle(this.sizingTarget);
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
              vertically: 'auto' !== e.top ? 'top' : 'auto' !== e.bottom ? 'bottom' : null,
              horizontally: 'auto' !== e.left ? 'left' : 'auto' !== e.right ? 'right' : null
            },
            sizedBy: {
              height: 'none' !== t.maxHeight,
              width: 'none' !== t.maxWidth,
              minWidth: parseInt(t.minWidth, 10) || 0,
              minHeight: parseInt(t.minHeight, 10) || 0
            },
            margin: {
              top: parseInt(e.marginTop, 10) || 0,
              right: parseInt(e.marginRight, 10) || 0,
              bottom: parseInt(e.marginBottom, 10) || 0,
              left: parseInt(e.marginLeft, 10) || 0
            }
          };
        }
      },
      resetFit: function() {
        const e = this._fitInfo || {};
        for (var t in e.sizerInlineStyle) this.sizingTarget.style[t] = e.sizerInlineStyle[t];
        for (var t in e.inlineStyle) this.style[t] = e.inlineStyle[t];
        this._fitInfo = null;
      },
      refit: function() {
        const e = this.sizingTarget.scrollLeft;
        const t = this.sizingTarget.scrollTop;
        this.resetFit(), this.fit(), (this.sizingTarget.scrollLeft = e), (this.sizingTarget.scrollTop = t);
      },
      position: function() {
        if (this.__shouldPosition) {
          this._discoverInfo(),
            (this.style.position = 'fixed'),
            (this.sizingTarget.style.boxSizing = 'border-box'),
            (this.style.left = '0px'),
            (this.style.top = '0px');
          const e = this.getBoundingClientRect();
          const t = this.__getNormalizedRect(this.positionTarget);
          const n = this.__getNormalizedRect(this.fitInto);
          const i = this._fitInfo.margin;
          const s = { width: e.width + i.left + i.right, height: e.height + i.top + i.bottom };
          const o = this.__getPosition(this._localeHorizontalAlign, this.verticalAlign, s, e, t, n);
          let r = o.left + i.left;
          let a = o.top + i.top;
          const l = Math.min(n.right - i.right, r + e.width);
          const c = Math.min(n.bottom - i.bottom, a + e.height);
          (r = Math.max(n.left + i.left, Math.min(r, l - this._fitInfo.sizedBy.minWidth))),
            (a = Math.max(n.top + i.top, Math.min(a, c - this._fitInfo.sizedBy.minHeight))),
            (this.sizingTarget.style.maxWidth = Math.max(l - r, this._fitInfo.sizedBy.minWidth) + 'px'),
            (this.sizingTarget.style.maxHeight = Math.max(c - a, this._fitInfo.sizedBy.minHeight) + 'px'),
            (this.style.left = r - e.left + 'px'),
            (this.style.top = a - e.top + 'px');
        }
      },
      constrain: function() {
        if (!this.__shouldPosition) {
          this._discoverInfo();
          const e = this._fitInfo;
          e.positionedBy.vertically || ((this.style.position = 'fixed'), (this.style.top = '0px')),
            e.positionedBy.horizontally || ((this.style.position = 'fixed'), (this.style.left = '0px')),
            (this.sizingTarget.style.boxSizing = 'border-box');
          const t = this.getBoundingClientRect();
          e.sizedBy.height || this.__sizeDimension(t, e.positionedBy.vertically, 'top', 'bottom', 'Height'),
            e.sizedBy.width || this.__sizeDimension(t, e.positionedBy.horizontally, 'left', 'right', 'Width');
        }
      },
      _sizeDimension: function(e, t, n, i, s) {
        this.__sizeDimension(e, t, n, i, s);
      },
      __sizeDimension: function(e, t, n, i, s) {
        const o = this._fitInfo;
        const r = this.__getNormalizedRect(this.fitInto);
        const a = 'Width' === s ? r.width : r.height;
        const l = t === i;
        const c = l ? a - e[i] : e[n];
        const h = o.margin[l ? n : i];
        const d = 'offset' + s;
        const u = this[d] - this.sizingTarget[d];
        this.sizingTarget.style['max' + s] = a - h - c - u + 'px';
      },
      center: function() {
        if (!this.__shouldPosition) {
          this._discoverInfo();
          const e = this._fitInfo.positionedBy;
          if (!e.vertically || !e.horizontally) {
            (this.style.position = 'fixed'),
              e.vertically || (this.style.top = '0px'),
              e.horizontally || (this.style.left = '0px');
            const t = this.getBoundingClientRect();
            const n = this.__getNormalizedRect(this.fitInto);
            if (!e.vertically) {
              const i = n.top - t.top + (n.height - t.height) / 2;
              this.style.top = i + 'px';
            }
            if (!e.horizontally) {
              const s = n.left - t.left + (n.width - t.width) / 2;
              this.style.left = s + 'px';
            }
          }
        }
      },
      __getNormalizedRect: function(e) {
        return e === document.documentElement || e === window
          ? {
              top: 0,
              left: 0,
              width: window.innerWidth,
              height: window.innerHeight,
              right: window.innerWidth,
              bottom: window.innerHeight
            }
          : e.getBoundingClientRect();
      },
      __getOffscreenArea: function(e, t, n) {
        const i = Math.min(0, e.top) + Math.min(0, n.bottom - (e.top + t.height));
        const s = Math.min(0, e.left) + Math.min(0, n.right - (e.left + t.width));
        return Math.abs(i) * t.width + Math.abs(s) * t.height;
      },
      __getPosition: function(e, t, n, i, s, o) {
        let r;
        const a = [
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
            const h = {};
            for (const d in a[l]) h[d] = a[l][d];
            a.push(h);
          }
          (a[0].top = a[1].top += s.height),
            (a[2].top = a[3].top -= s.height),
            (a[4].left = a[6].left += s.width),
            (a[5].left = a[7].left -= s.width);
        }
        (t = 'auto' === t ? null : t),
          ((e = 'auto' === e ? null : e) && 'center' !== e) ||
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
          (t && 'middle' !== t) ||
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
          'middle' === t &&
            'center' === e &&
            a.push({
              verticalAlign: 'middle',
              horizontalAlign: 'center',
              top: s.top - i.height / 2 + s.height / 2 + this.verticalOffset,
              left: s.left - i.width / 2 + s.width / 2 + this.horizontalOffset
            });
        for (l = 0; l < a.length; l++) {
          const u = a[l];
          const p = u.verticalAlign === t;
          const _ = u.horizontalAlign === e;
          if (!this.dynamicAlign && !this.noOverlap && p && _) {
            r = u;
            break;
          }
          const f = (!t || p) && (!e || _);
          if (this.dynamicAlign || f) {
            if (((u.offscreenArea = this.__getOffscreenArea(u, n, o)), 0 === u.offscreenArea && f)) {
              r = u;
              break;
            }
            r = r || u;
            const m = u.offscreenArea - r.offscreenArea;
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
*/ const Fo = new Set();
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
          (this._interestedResizables.forEach(function(e) {
            this.resizerShouldNotify(e) && this._notifyDescendant(e);
          }, this),
          this._fireResize());
      },
      assignParentResizable: function(e) {
        this._parentResizable && this._parentResizable.stopResizeNotificationsFor(this),
          (this._parentResizable = e),
          e &&
            -1 === e._interestedResizables.indexOf(this) &&
            (e._interestedResizables.push(this), e._subscribeIronResize(this));
      },
      stopResizeNotificationsFor: function(e) {
        const t = this._interestedResizables.indexOf(e);
        t > -1 && (this._interestedResizables.splice(t, 1), this._unsubscribeIronResize(e));
      },
      _subscribeIronResize: function(e) {
        e.addEventListener('iron-resize', this._boundOnDescendantIronResize);
      },
      _unsubscribeIronResize: function(e) {
        e.removeEventListener('iron-resize', this._boundOnDescendantIronResize);
      },
      resizerShouldNotify: function(e) {
        return !0;
      },
      _onDescendantIronResize: function(e) {
        this._notifyingDescendant ? e.stopPropagation() : Tt || this._fireResize();
      },
      _fireResize: function() {
        this.fire('iron-resize', null, { node: this, bubbles: !1 });
      },
      _onIronRequestResizeNotifications: function(e) {
        const t = Us(e).rootTarget;
        t !== this && (t.assignParentResizable(this), this._notifyDescendant(t), e.stopPropagation());
      },
      _parentResizableChanged: function(e) {
        e && window.removeEventListener('resize', this._boundNotifyResize);
      },
      _notifyDescendant: function(e) {
        this.isAttached && ((this._notifyingDescendant = !0), e.notifyResize(), (this._notifyingDescendant = !1));
      },
      _requestResizeNotifications: function() {
        if (this.isAttached)
          if ('loading' === document.readyState) {
            const e = this._requestResizeNotifications.bind(this);
            document.addEventListener('readystatechange', function t() {
              document.removeEventListener('readystatechange', t), e();
            });
          } else
            this._findParent(),
              this._parentResizable
                ? this._parentResizable._interestedResizables.forEach(function(e) {
                    e !== this && e._findParent();
                  }, this)
                : (Fo.forEach(function(e) {
                    e !== this && e._findParent();
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
*/ const Ho =
      Element.prototype;
    const Bo =
      Ho.matches ||
      Ho.matchesSelector ||
      Ho.mozMatchesSelector ||
      Ho.msMatchesSelector ||
      Ho.oMatchesSelector ||
      Ho.webkitMatchesSelector;
    const Uo = {
      getTabbableNodes: function(e) {
        const t = [];
        return this._collectTabbableNodes(e, t) ? this._sortByTabIndex(t) : t;
      },
      isFocusable: function(e) {
        return Bo.call(e, 'input, select, textarea, button, object')
          ? Bo.call(e, ':not([disabled])')
          : Bo.call(e, 'a[href], area[href], iframe, [tabindex], [contentEditable]');
      },
      isTabbable: function(e) {
        return this.isFocusable(e) && Bo.call(e, ':not([tabindex="-1"])') && this._isVisible(e);
      },
      _normalizedTabIndex: function(e) {
        if (this.isFocusable(e)) {
          const t = e.getAttribute('tabindex') || 0;
          return Number(t);
        }
        return -1;
      },
      _collectTabbableNodes: function(e, t) {
        if (e.nodeType !== Node.ELEMENT_NODE || !this._isVisible(e)) return !1;
        let n;
        const i = e;
        const s = this._normalizedTabIndex(i);
        let o = s > 0;
        s >= 0 && t.push(i),
          (n =
            'content' === i.localName || 'slot' === i.localName
              ? Us(i).getDistributedNodes()
              : Us(i.root || i).children);
        for (let r = 0; r < n.length; r++) o = this._collectTabbableNodes(n[r], t) || o;
        return o;
      },
      _isVisible: function(e) {
        let t = e.style;
        return (
          'hidden' !== t.visibility &&
          'none' !== t.display &&
          ('hidden' !== (t = window.getComputedStyle(e)).visibility && 'none' !== t.display)
        );
      },
      _sortByTabIndex: function(e) {
        const t = e.length;
        if (t < 2) return e;
        const n = Math.ceil(t / 2);
        const i = this._sortByTabIndex(e.slice(0, n));
        const s = this._sortByTabIndex(e.slice(n));
        return this._mergeSortByTabIndex(i, s);
      },
      _mergeSortByTabIndex: function(e, t) {
        for (var n = []; e.length > 0 && t.length > 0; )
          this._hasLowerTabOrder(e[0], t[0]) ? n.push(t.shift()) : n.push(e.shift());
        return n.concat(e, t);
      },
      _hasLowerTabOrder: function(e, t) {
        const n = Math.max(e.tabIndex, 0);
        const i = Math.max(t.tabIndex, 0);
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
        _onTransitionend: function(e) {
          e && e.target === this && this.complete();
        },
        _openedChanged: function(e) {
          if (e) this.prepare();
          else {
            const t = window.getComputedStyle(this);
            ('0s' !== t.transitionDuration && 0 != t.opacity) || this.complete();
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
    const $o = { 'U+0008': 'backspace', 'U+0009': 'tab', 'U+001B': 'esc', 'U+0020': 'space', 'U+007F': 'del' };
    const qo = {
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
    };
    const jo = { shift: 'shiftKey', ctrl: 'ctrlKey', alt: 'altKey', meta: 'metaKey' };
    const Vo = /[a-z0-9*]/;
    const Ko = /U\+/;
    const Yo = /^arrow/;
    const Wo = /^space(bar)?/;
    const Jo = /^escape$/;
    function Xo(e, t) {
      let n = '';
      if (e) {
        const i = e.toLowerCase();
        ' ' === i || Wo.test(i)
          ? (n = 'space')
          : Jo.test(i)
          ? (n = 'esc')
          : 1 == i.length
          ? (t && !Vo.test(i)) || (n = i)
          : (n = Yo.test(i) ? i.replace('arrow', '') : 'multiply' == i ? '*' : i);
      }
      return n;
    }
    function Zo(e, t) {
      return e.key
        ? Xo(e.key, t)
        : e.detail && e.detail.key
        ? Xo(e.detail.key, t)
        : ((n = e.keyIdentifier),
          (i = ''),
          n &&
            (n in $o
              ? (i = $o[n])
              : Ko.test(n)
              ? ((n = parseInt(n.replace('U+', '0x'), 16)), (i = String.fromCharCode(n).toLowerCase()))
              : (i = n.toLowerCase())),
          i ||
            (function(e) {
              let t = '';
              return (
                Number(e) &&
                  (t =
                    e >= 65 && e <= 90
                      ? String.fromCharCode(32 + e)
                      : e >= 112 && e <= 123
                      ? 'f' + (e - 112 + 1)
                      : e >= 48 && e <= 57
                      ? String(e - 48)
                      : e >= 96 && e <= 105
                      ? String(e - 96)
                      : qo[e]),
                t
              );
            })(e.keyCode) ||
            '');
      let n;
      let i;
    }
    function Go(e, t) {
      return (
        Zo(t, e.hasModifiers) === e.key &&
        (!e.hasModifiers ||
          (!!t.shiftKey == !!e.shiftKey &&
            !!t.ctrlKey == !!e.ctrlKey &&
            !!t.altKey == !!e.altKey &&
            !!t.metaKey == !!e.metaKey))
      );
    }
    function Qo(e) {
      return e
        .trim()
        .split(' ')
        .map(function(e) {
          return (function(e) {
            return 1 === e.length
              ? { combo: e, key: e, event: 'keydown' }
              : e.split('+').reduce(
                  function(e, t) {
                    const n = t.split(':');
                    const i = n[0];
                    const s = n[1];
                    return (
                      i in jo ? ((e[jo[i]] = !0), (e.hasModifiers = !0)) : ((e.key = i), (e.event = s || 'keydown')), e
                    );
                  },
                  { combo: e.split(':').shift() }
                );
          })(e);
        });
    }
    const er = {
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
      addOwnKeyBinding: function(e, t) {
        (this._imperativeKeyBindings[e] = t), this._prepKeyBindings(), this._resetKeyEventListeners();
      },
      removeOwnKeyBindings: function() {
        (this._imperativeKeyBindings = {}), this._prepKeyBindings(), this._resetKeyEventListeners();
      },
      keyboardEventMatchesKeys: function(e, t) {
        for (let n = Qo(t), i = 0; i < n.length; ++i) if (Go(n[i], e)) return !0;
        return !1;
      },
      _collectKeyBindings: function() {
        const e = this.behaviors.map(function(e) {
          return e.keyBindings;
        });
        return -1 === e.indexOf(this.keyBindings) && e.push(this.keyBindings), e;
      },
      _prepKeyBindings: function() {
        for (const e in ((this._keyBindings = {}),
        this._collectKeyBindings().forEach(function(e) {
          for (const t in e) this._addKeyBinding(t, e[t]);
        }, this),
        this._imperativeKeyBindings))
          this._addKeyBinding(e, this._imperativeKeyBindings[e]);
        for (const t in this._keyBindings)
          this._keyBindings[t].sort(function(e, t) {
            const n = e[0].hasModifiers;
            return n === t[0].hasModifiers ? 0 : n ? -1 : 1;
          });
      },
      _addKeyBinding: function(e, t) {
        Qo(e).forEach(function(e) {
          (this._keyBindings[e.event] = this._keyBindings[e.event] || []), this._keyBindings[e.event].push([e, t]);
        }, this);
      },
      _resetKeyEventListeners: function() {
        this._unlistenKeyEventListeners(), this.isAttached && this._listenKeyEventListeners();
      },
      _listenKeyEventListeners: function() {
        this.keyEventTarget &&
          Object.keys(this._keyBindings).forEach(function(e) {
            const t = this._keyBindings[e];
            const n = this._onKeyBindingEvent.bind(this, t);
            this._boundKeyHandlers.push([this.keyEventTarget, e, n]), this.keyEventTarget.addEventListener(e, n);
          }, this);
      },
      _unlistenKeyEventListeners: function() {
        for (var e, t, n, i; this._boundKeyHandlers.length; )
          (t = (e = this._boundKeyHandlers.pop())[0]), (n = e[1]), (i = e[2]), t.removeEventListener(n, i);
      },
      _onKeyBindingEvent: function(e, t) {
        if ((this.stopKeyboardEventPropagation && t.stopPropagation(), !t.defaultPrevented))
          for (let n = 0; n < e.length; n++) {
            const i = e[n][0];
            const s = e[n][1];
            if (Go(i, t) && (this._triggerKeyHandler(i, s, t), t.defaultPrevented)) return;
          }
      },
      _triggerKeyHandler: function(e, t, n) {
        const i = Object.create(e);
        i.keyboardEvent = n;
        const s = new CustomEvent(e.event, { detail: i, cancelable: !0 });
        this[t].call(this, s), s.defaultPrevented && n.preventDefault();
      }
    };
    const tr = function() {
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
*/ tr.prototype = {
      constructor: tr,
      get backdropElement() {
        return (
          this._backdropElement || (this._backdropElement = document.createElement('iron-overlay-backdrop')),
          this._backdropElement
        );
      },
      get deepActiveElement() {
        let e = document.activeElement;
        for ((e && e instanceof Element != !1) || (e = document.body); e.root && Us(e.root).activeElement; )
          e = Us(e.root).activeElement;
        return e;
      },
      _bringOverlayAtIndexToFront: function(e) {
        const t = this._overlays[e];
        if (t) {
          let n = this._overlays.length - 1;
          const i = this._overlays[n];
          if ((i && this._shouldBeBehindOverlay(t, i) && n--, !(e >= n))) {
            const s = Math.max(this.currentOverlayZ(), this._minimumZ);
            for (this._getZ(t) <= s && this._applyOverlayZ(t, s); e < n; )
              (this._overlays[e] = this._overlays[e + 1]), e++;
            this._overlays[n] = t;
          }
        }
      },
      addOrRemoveOverlay: function(e) {
        e.opened ? this.addOverlay(e) : this.removeOverlay(e);
      },
      addOverlay: function(e) {
        const t = this._overlays.indexOf(e);
        if (t >= 0) return this._bringOverlayAtIndexToFront(t), void this.trackBackdrop();
        let n = this._overlays.length;
        const i = this._overlays[n - 1];
        let s = Math.max(this._getZ(i), this._minimumZ);
        const o = this._getZ(e);
        if (i && this._shouldBeBehindOverlay(e, i)) {
          this._applyOverlayZ(i, s), n--;
          const r = this._overlays[n - 1];
          s = Math.max(this._getZ(r), this._minimumZ);
        }
        o <= s && this._applyOverlayZ(e, s), this._overlays.splice(n, 0, e), this.trackBackdrop();
      },
      removeOverlay: function(e) {
        const t = this._overlays.indexOf(e);
        -1 !== t && (this._overlays.splice(t, 1), this.trackBackdrop());
      },
      currentOverlay: function() {
        const e = this._overlays.length - 1;
        return this._overlays[e];
      },
      currentOverlayZ: function() {
        return this._getZ(this.currentOverlay());
      },
      ensureMinimumZ: function(e) {
        this._minimumZ = Math.max(this._minimumZ, e);
      },
      focusOverlay: function() {
        const e = this.currentOverlay();
        e && e._applyFocus();
      },
      trackBackdrop: function() {
        const e = this._overlayWithBackdrop();
        (e || this._backdropElement) &&
          ((this.backdropElement.style.zIndex = this._getZ(e) - 1),
          (this.backdropElement.opened = !!e),
          this.backdropElement.prepare());
      },
      getBackdrops: function() {
        for (var e = [], t = 0; t < this._overlays.length; t++)
          this._overlays[t].withBackdrop && e.push(this._overlays[t]);
        return e;
      },
      backdropZ: function() {
        return this._getZ(this._overlayWithBackdrop()) - 1;
      },
      _overlayWithBackdrop: function() {
        for (let e = this._overlays.length - 1; e >= 0; e--)
          if (this._overlays[e].withBackdrop) return this._overlays[e];
      },
      _getZ: function(e) {
        let t = this._minimumZ;
        if (e) {
          const n = Number(e.style.zIndex || window.getComputedStyle(e).zIndex);
          n == n && (t = n);
        }
        return t;
      },
      _setZ: function(e, t) {
        e.style.zIndex = t;
      },
      _applyOverlayZ: function(e, t) {
        this._setZ(e, t + 2);
      },
      _overlayInPath: function(e) {
        e = e || [];
        for (let t = 0; t < e.length; t++) if (e[t]._manager === this) return e[t];
      },
      _onCaptureClick: function(e) {
        let t = this._overlays.length - 1;
        if (-1 !== t)
          for (
            var n, i = Us(e).path;
            (n = this._overlays[t]) && this._overlayInPath(i) !== n && (n._onCaptureClick(e), n.allowClickThrough);

          )
            t--;
      },
      _onCaptureFocus: function(e) {
        const t = this.currentOverlay();
        t && t._onCaptureFocus(e);
      },
      _onCaptureKeyDown: function(e) {
        const t = this.currentOverlay();
        t &&
          (er.keyboardEventMatchesKeys(e, 'esc')
            ? t._onCaptureEsc(e)
            : er.keyboardEventMatchesKeys(e, 'tab') && t._onCaptureTab(e));
      },
      _shouldBeBehindOverlay: function(e, t) {
        return !e.alwaysOnTop && t.alwaysOnTop;
      }
    };
    const nr = new tr();
    /**
@license
Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at
http://polymer.github.io/LICENSE.txt The complete set of authors may be found at
http://polymer.github.io/AUTHORS.txt The complete set of contributors may be
found at http://polymer.github.io/CONTRIBUTORS.txt Code distributed by Google as
part of the polymer project is also subject to an additional IP rights grant
found at http://polymer.github.io/PATENTS.txt
*/ let ir;
    let sr;
    const or = { pageX: 0, pageY: 0 };
    let rr = null;
    let ar = [];
    const lr = ['wheel', 'mousewheel', 'DOMMouseScroll', 'touchstart', 'touchmove'];
    function cr(e) {
      dr.indexOf(e) >= 0 ||
        (0 === dr.length &&
          (function() {
            ir =
              ir ||
              function(e) {
                e.cancelable &&
                  (function(e) {
                    const t = Us(e).rootTarget;
                    'touchmove' !== e.type &&
                      rr !== t &&
                      ((rr = t),
                      (ar = (function(e) {
                        for (var t = [], n = e.indexOf(sr), i = 0; i <= n; i++)
                          if (e[i].nodeType === Node.ELEMENT_NODE) {
                            const s = e[i];
                            let o = s.style;
                            'scroll' !== o.overflow && 'auto' !== o.overflow && (o = window.getComputedStyle(s)),
                              ('scroll' !== o.overflow && 'auto' !== o.overflow) || t.push(s);
                          }
                        return t;
                      })(Us(e).path)));
                    if (!ar.length) return !0;
                    if ('touchstart' === e.type) return !1;
                    const n = (function(e) {
                      const t = { deltaX: e.deltaX, deltaY: e.deltaY };
                      if ('deltaX' in e);
                      else if ('wheelDeltaX' in e && 'wheelDeltaY' in e)
                        (t.deltaX = -e.wheelDeltaX), (t.deltaY = -e.wheelDeltaY);
                      else if ('wheelDelta' in e) (t.deltaX = 0), (t.deltaY = -e.wheelDelta);
                      else if ('axis' in e)
                        (t.deltaX = 1 === e.axis ? e.detail : 0), (t.deltaY = 2 === e.axis ? e.detail : 0);
                      else if (e.targetTouches) {
                        const n = e.targetTouches[0];
                        (t.deltaX = or.pageX - n.pageX), (t.deltaY = or.pageY - n.pageY);
                      }
                      return t;
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
*/ e
                    );
                    return !(function(e, t, n) {
                      if (!t && !n) return;
                      for (let i = Math.abs(n) >= Math.abs(t), s = 0; s < e.length; s++) {
                        const o = e[s];
                        if (
                          i
                            ? n < 0
                              ? o.scrollTop > 0
                              : o.scrollTop < o.scrollHeight - o.clientHeight
                            : t < 0
                            ? o.scrollLeft > 0
                            : o.scrollLeft < o.scrollWidth - o.clientWidth
                        )
                          return o;
                      }
                    })(ar, n.deltaX, n.deltaY);
                  })(e) &&
                  e.preventDefault();
                if (e.targetTouches) {
                  const t = e.targetTouches[0];
                  (or.pageX = t.pageX), (or.pageY = t.pageY);
                }
              }.bind(void 0);
            for (let e = 0, t = lr.length; e < t; e++)
              document.addEventListener(lr[e], ir, { capture: !0, passive: !1 });
          })(),
        dr.push(e),
        (sr = dr[dr.length - 1]),
        (ur = []),
        (pr = []));
    }
    function hr(e) {
      const t = dr.indexOf(e);
      -1 !== t &&
        (dr.splice(t, 1),
        (sr = dr[dr.length - 1]),
        (ur = []),
        (pr = []),
        0 === dr.length &&
          (function() {
            for (let e = 0, t = lr.length; e < t; e++)
              document.removeEventListener(lr[e], ir, { capture: !0, passive: !1 });
          })());
    }
    const dr = [];
    let ur = null;
    let pr = null;
    const _r = {
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
        for (const e in (Us(this).unobserveNodes(this._observer), (this._observer = null), this.__rafs))
          null !== this.__rafs[e] && cancelAnimationFrame(this.__rafs[e]);
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
      cancel: function(e) {
        this.fire('iron-overlay-canceled', e, { cancelable: !0 }).defaultPrevented ||
          (this._setCanceled(!0), (this.opened = !1));
      },
      invalidateTabbables: function() {
        this.__firstFocusableNode = this.__lastFocusableNode = null;
      },
      _ensureSetup: function() {
        this._overlaySetup || ((this._overlaySetup = !0), (this.style.outline = 'none'), (this.style.display = 'none'));
      },
      _openedChanged: function(e) {
        e ? this.removeAttribute('aria-hidden') : this.setAttribute('aria-hidden', 'true'),
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
            const e = this._manager.deepActiveElement;
            (e === document.body || Us(this).deepContains(e)) && this.__restoreFocusNode.focus();
          }
          (this.__restoreFocusNode = null), this._focusNode.blur(), (this._focusedChild = null);
        }
      },
      _onCaptureClick: function(e) {
        this.noCancelOnOutsideClick || this.cancel(e);
      },
      _onCaptureFocus: function(e) {
        if (this.withBackdrop) {
          const t = Us(e).path;
          -1 === t.indexOf(this) ? (e.stopPropagation(), this._applyFocus()) : (this._focusedChild = t[0]);
        }
      },
      _onCaptureEsc: function(e) {
        this.noCancelOnEscKey || this.cancel(e);
      },
      _onCaptureTab: function(e) {
        if (this.withBackdrop) {
          this.__ensureFirstLastFocusables();
          const t = e.shiftKey;
          const n = t ? this.__firstFocusableNode : this.__lastFocusableNode;
          const i = t ? this.__lastFocusableNode : this.__firstFocusableNode;
          let s = !1;
          if (n === i) s = !0;
          else {
            const o = this._manager.deepActiveElement;
            s = o === n || o === this;
          }
          s && (e.preventDefault(), (this._focusedChild = i), this._applyFocus());
        }
      },
      _onIronResize: function() {
        this.opened && !this.__isAnimating && this.__deraf('refit', this.refit);
      },
      _onNodesChange: function() {
        this.opened && !this.__isAnimating && (this.invalidateTabbables(), this.notifyResize());
      },
      __ensureFirstLastFocusables: function() {
        const e = this._focusableNodes;
        (this.__firstFocusableNode = e[0]), (this.__lastFocusableNode = e[e.length - 1]);
      },
      __openedChanged: function() {
        this.opened
          ? (this._prepareRenderOpened(), this._manager.addOverlay(this), this._applyFocus(), this._renderOpened())
          : (this._manager.removeOverlay(this), this._applyFocus(), this._renderClosed());
      },
      __deraf: function(e, t) {
        const n = this.__rafs;
        null !== n[e] && cancelAnimationFrame(n[e]),
          (n[e] = requestAnimationFrame(
            function() {
              (n[e] = null), t.call(this);
            }.bind(this)
          ));
      },
      __updateScrollObservers: function(e, t, n) {
        e && t && this.__isValidScrollAction(n)
          ? ('lock' === n && (this.__saveScrollPosition(), cr(this)), this.__addScrollListeners())
          : (hr(this), this.__removeScrollListeners());
      },
      __addScrollListeners: function() {
        if (!this.__rootNodes) {
          if (((this.__rootNodes = []), Tt))
            for (let e = this; e; )
              e.nodeType === Node.DOCUMENT_FRAGMENT_NODE && e.host && this.__rootNodes.push(e),
                (e = e.host || e.assignedSlot || e.parentNode);
          this.__rootNodes.push(document);
        }
        this.__rootNodes.forEach(function(e) {
          e.addEventListener('scroll', this.__onCaptureScroll, { capture: !0, passive: !0 });
        }, this);
      },
      __removeScrollListeners: function() {
        this.__rootNodes &&
          this.__rootNodes.forEach(function(e) {
            e.removeEventListener('scroll', this.__onCaptureScroll, { capture: !0, passive: !0 });
          }, this),
          this.isAttached || (this.__rootNodes = null);
      },
      __isValidScrollAction: function(e) {
        return 'lock' === e || 'refit' === e || 'cancel' === e;
      },
      __onCaptureScroll: function(e) {
        if (!(this.__isAnimating || Us(e).path.indexOf(this) >= 0))
          switch (this.scrollAction) {
            case 'lock':
              this.__restoreScrollPosition();
              break;
            case 'refit':
              this.__deraf('refit', this.refit);
              break;
            case 'cancel':
              this.cancel(e);
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
    let fr = null;
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
      behaviors: [[Mo, Do, _r]],
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
        return Lo._warn('`visible` is deprecated, use `opened` instead'), this.opened;
      },
      get _canAutoClose() {
        return this.duration > 0 && this.duration !== 1 / 0;
      },
      created: function() {
        (this._autoClose = null), zo.requestAvailability();
      },
      show: function(e) {
        for (const t in ('string' == typeof e && (e = { text: e }), e))
          0 === t.indexOf('_')
            ? Lo._warn('The property "' + t + '" is private and was not set.')
            : t in this
            ? (this[t] = e[t])
            : Lo._warn('The property "' + t + '" is not valid.');
        this.open();
      },
      hide: function() {
        this.close();
      },
      __onTransitionEnd: function(e) {
        e &&
          e.target === this &&
          'opacity' === e.propertyName &&
          (this.opened ? this._finishRenderOpened() : this._finishRenderClosed());
      },
      _openedChanged: function() {
        null !== this._autoClose && (this.cancelAsync(this._autoClose), (this._autoClose = null)),
          this.opened
            ? (fr && fr !== this && fr.close(),
              (fr = this),
              this.fire('iron-announce', { text: this.text }),
              this._canAutoClose && (this._autoClose = this.async(this.close, this.duration)))
            : fr === this && (fr = null),
          _r._openedChanged.apply(this, arguments);
      },
      _renderOpened: function() {
        this.classList.add('paper-toast-open');
      },
      _renderClosed: function() {
        this.classList.remove('paper-toast-open');
      },
      _onFitIntoChanged: function(e) {
        this.positionTarget = e;
      }
    });
    const mr = ae`
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
      document.adoptedStyleSheets = document.adoptedStyleSheets.concat(mr.styleSheet);
    } catch (e) {
      {
        const e = document.createElement('style');
        (e.type = 'text/css'), (e.innerHTML = mr.cssText), document.getElementsByTagName('head')[0].appendChild(e);
      }
    }
    const gr = ae`
  html {
    @font-face {
      font-family: 'DIN Pro';
      src: url('https://d2mrfksxwk2en8.cloudfront.net/fonts/DINPro-Light.eot');
      src: url('https://d2mrfksxwk2en8.cloudfront.net/fonts/DINPro-Light.eot?#iefix')
          format('embedded-opentype'),
        url('https://d2mrfksxwk2en8.cloudfront.net/fonts/DINPro-Light.woff2') format('woff2'),
        url('https://d2mrfksxwk2en8.cloudfront.net/fonts/DINPro-Light.woff') format('woff'),
        url('https://d2mrfksxwk2en8.cloudfront.net/fonts/DINPro-Light.ttf') format('truetype'),
        url('https://d2mrfksxwk2en8.cloudfront.net/fonts/DINPro-Light.svg') format('svg');
      font-weight: 300;
      font-style: normal;
    }
    /* Regular - OpenSans */
    @font-face {
      font-family: 'Open Sans';
      src: url('https://d2mrfksxwk2en8.cloudfront.net/fonts/OpenSans-Regular.eot');
      src: url('https://d2mrfksxwk2en8.cloudfront.net/fonts/OpenSans-Regular.eot?#iefix')
          format('embedded-opentype'),
        url('https://d2mrfksxwk2en8.cloudfront.net/fonts/OpenSans-Regular.woff2') format('woff2'),
        url('https://d2mrfksxwk2en8.cloudfront.net/fonts/OpenSans-Regular.woff') format('woff'),
        url('https://d2mrfksxwk2en8.cloudfront.net/fonts/OpenSans-Regular.ttf') format('truetype'),
        url('https://d2mrfksxwk2en8.cloudfront.net/fonts/OpenSans-Regular.svg') format('svg');
      font-weight: 400;
      font-style: normal;
    }
    /* Semibold - OpenSansSemiBold */
    @font-face {
      font-family: 'Open Sans';
      src: url('https://d2mrfksxwk2en8.cloudfront.net/fonts/OpenSans-Semibold.eot');
      src: url('https://d2mrfksxwk2en8.cloudfront.net/fonts/OpenSans-Semibold.eot?#iefix')
          format('embedded-opentype'),
        url('https://d2mrfksxwk2en8.cloudfront.net/fonts/OpenSans-Semibold.woff2') format('woff2'),
        url('https://d2mrfksxwk2en8.cloudfront.net/fonts/OpenSans-Semibold.woff') format('woff'),
        url('https://d2mrfksxwk2en8.cloudfront.net/fonts/OpenSans-Semibold.ttf') format('truetype'),
        url('https://d2mrfksxwk2en8.cloudfront.net/fonts/OpenSans-Semibold.svg') format('svg');
      font-weight: 600;
      font-style: normal;
    }
    /* Bold - OpenSansBold */
    @font-face {
      font-family: 'Open Sans';
      src: url('https://d2mrfksxwk2en8.cloudfront.net/fonts/OpenSans-Bold.eot');
      src: url('https://d2mrfksxwk2en8.cloudfront.net/fonts/OpenSans-Bold.eot?#iefix')
          format('embedded-opentype'),
        url('https://d2mrfksxwk2en8.cloudfront.net/fonts/OpenSans-Bold.woff2') format('woff2'),
        url('https://d2mrfksxwk2en8.cloudfront.net/fonts/OpenSans-Bold.woff') format('woff'),
        url('https://d2mrfksxwk2en8.cloudfront.net/fonts/OpenSans-Bold.ttf') format('truetype'),
        url('https://d2mrfksxwk2en8.cloudfront.net/fonts/OpenSans-Bold.svg') format('svg');
      font-weight: 700;
      font-style: normal;
    }
    /* Light - OpenSansLight */
    @font-face {
      font-family: 'Open Sans';
      src: url('https://d2mrfksxwk2en8.cloudfront.net/fonts/OpenSans-Light.eot');
      src: url('https://d2mrfksxwk2en8.cloudfront.net/fonts/OpenSans-Light.eot?#iefix')
          format('embedded-opentype'),
        url('https://d2mrfksxwk2en8.cloudfront.net/fonts/OpenSans-Light.woff2') format('woff2'),
        url('https://d2mrfksxwk2en8.cloudfront.net/fonts/OpenSans-Light.woff') format('woff'),
        url('https://d2mrfksxwk2en8.cloudfront.net/fonts/OpenSans-Light.ttf') format('truetype'),
        url('https://d2mrfksxwk2en8.cloudfront.net/fonts/OpenSans-Light.svg') format('svg');
      font-weight: 200;
      font-style: normal;
    }
    /* Light Italic - OpenSansLightItalic */
    @font-face {
      font-family: 'Open Sans';
      src: url('https://d2mrfksxwk2en8.cloudfront.net/fonts/OpenSans-LightItalic.eot');
      src: url('https://d2mrfksxwk2en8.cloudfront.net/fonts/OpenSans-LightItalic.eot?#iefix')
          format('embedded-opentype'),
        url('https://d2mrfksxwk2en8.cloudfront.net/fonts/OpenSans-LightItalic.woff2')
          format('woff2'),
        url('https://d2mrfksxwk2en8.cloudfront.net/fonts/OpenSans-LightItalic.woff') format('woff'),
        url('https://d2mrfksxwk2en8.cloudfront.net/fonts/OpenSans-LightItalic.ttf')
          format('truetype'),
        url('https://d2mrfksxwk2en8.cloudfront.net/fonts/OpenSans-LightItalic.svg') format('svg');
      font-weight: 200;
      font-style: italic;
    }
    /* Monospaced (for code examples, logs, etc) */
    @font-face {
      font-family: 'Source Code Pro';
      src: url('https://d2mrfksxwk2en8.cloudfront.net/fonts/SourceCodePro-Regular.eot');
      src: url('https://d2mrfksxwk2en8.cloudfront.net/fonts/SourceCodePro-Regular.eot?#iefix')
          format('embedded-opentype'),
        url('https://d2mrfksxwk2en8.cloudfront.net/fonts/SourceCodePro-Regular.woff2')
          format('woff2'),
        url('https://d2mrfksxwk2en8.cloudfront.net/fonts/SourceCodePro-Regular.woff') format('woff'),
        url('https://d2mrfksxwk2en8.cloudfront.net/fonts/SourceCodePro-Regular.ttf')
          format('truetype'),
        url('https://d2mrfksxwk2en8.cloudfront.net/fonts/SourceCodePro-Regular.svg') format('svg');
      font-weight: 400;
      font-style: normal;
    }
  }
`;
    try {
      document.adoptedStyleSheets = document.adoptedStyleSheets.concat(gr.styleSheet);
    } catch (e) {
      {
        const e = document.createElement('style');
        (e.type = 'text/css'), (e.innerHTML = gr.cssText), document.getElementsByTagName('head')[0].appendChild(e);
      }
    }
    const yr = ae`
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
      document.adoptedStyleSheets = document.adoptedStyleSheets.concat(yr.styleSheet);
    } catch (e) {
      {
        const e = document.createElement('style');
        (e.type = 'text/css'), (e.innerHTML = yr.cssText), document.getElementsByTagName('head')[0].appendChild(e);
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
        _tokenRequestedHandler(e) {
          e.preventDefault(), e.stopPropagation(), e.stopImmediatePropagation(), this.authorize(e.detail);
        }
        authorize(e) {
          (this._tokenInfo = void 0),
            (this._type = e.type),
            (this._state = e.state || this.randomString(6)),
            (this._settings = e),
            (this._errored = !1),
            (this._overrideExchangeCodeFlow = e.overrideExchangeCodeFlow);
          try {
            this._sanityCheck(e);
          } catch (t) {
            throw (this._dispatchError({
              message: t.message,
              code: 'oauth_error',
              state: this._state,
              interactive: e.interactive
            }),
            t);
          }
          switch (e.type) {
            case 'implicit':
              this._authorize(this._constructPopupUrl(e, 'token'), e);
              break;
            case 'authorization_code':
              this._authorize(this._constructPopupUrl(e, 'code'), e);
              break;
            case 'client_credentials':
              this.authorizeClientCredentials(e).catch(() => {});
              break;
            case 'password':
              this.authorizePassword(e).catch(() => {});
              break;
            default:
              this.authorizeCustomGrant(e).catch(() => {});
          }
        }
        _sanityCheck(e) {
          if ('implicit' === e.type || 'authorization_code' === e.type) {
            try {
              this._checkUrl(e.authorizationUri);
            } catch (e) {
              throw new Error(`authorizationUri: ${e.message}`);
            }
            if (e.accessTokenUri)
              try {
                this._checkUrl(e.accessTokenUri);
              } catch (e) {
                throw new Error(`accessTokenUri: ${e.message}`);
              }
          } else if (e.accessTokenUri && e.accessTokenUri)
            try {
              this._checkUrl(e.accessTokenUri);
            } catch (e) {
              throw new Error(`accessTokenUri: ${e.message}`);
            }
        }
        _checkUrl(e) {
          if (!e) throw new TypeError('the value is missing');
          if ('string' != typeof e) throw new TypeError('the value is not a string');
          if (-1 === e.indexOf('http://') && -1 === e.indexOf('https://'))
            throw new Error('the value has invalid scheme');
        }
        _authorize(e, t) {
          (this._settings = t),
            (this._errored = !1),
            !1 === t.interactive ? this._authorizeTokenNonInteractive(e) : this._authorizePopup(e);
        }
        _authorizePopup(e) {
          (this._popup = window.open(
            e,
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
        _authorizeTokenNonInteractive(e) {
          const t = document.createElement('iframe');
          (t.style.border = '0'),
            (t.style.width = '0'),
            (t.style.height = '0'),
            (t.style.overflow = 'hidden'),
            t.addEventListener('error', this._frameLoadErrorHandler),
            t.addEventListener('load', this._frameLoadHandler),
            (t.id = 'oauth2-authorization-frame'),
            t.setAttribute('data-owner', 'arc-oauth-authorization'),
            document.body.appendChild(t),
            (t.src = e),
            (this._iframe = t);
        }
        _cleanupFrame() {
          if (this._iframe) {
            this._iframe.removeEventListener('error', this._frameLoadErrorHandler),
              this._iframe.removeEventListener('load', this._frameLoadHandler);
            try {
              document.body.removeChild(this._iframe);
            } catch (e) {}
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
        _constructPopupUrl(e, t) {
          let n = e.authorizationUri;
          if (
            (-1 === n.indexOf('?') ? (n += '?') : (n += '&'),
            (n += 'response_type=' + t),
            (n += '&client_id=' + encodeURIComponent(e.clientId || '')),
            e.redirectUri && (n += '&redirect_uri=' + encodeURIComponent(e.redirectUri)),
            e.scopes && e.scopes.length && (n += '&scope=' + this._computeScope(e.scopes)),
            (n += '&state=' + encodeURIComponent(this._state)),
            e.includeGrantedScopes && (n += '&include_granted_scopes=true'),
            e.loginHint && (n += '&login_hint=' + encodeURIComponent(e.loginHint)),
            !1 === e.interactive && (n += '&prompt=none'),
            e.customData)
          ) {
            const i = 'token' === t ? 'auth' : 'token';
            const s = e.customData[i];
            s && (n = this._applyCustomSettingsQuery(n, s));
          }
          return n;
        }
        _computeScope(e) {
          if (!e) return '';
          const t = e.join(' ');
          return encodeURIComponent(t);
        }
        _popupMessageHandler(e) {
          (this._popup || this._iframe) && this._processPopupData(e);
        }
        _processPopupData(e) {
          const t = e.data;
          !(this._overrideExchangeCodeFlow || (t && t.oauth2response)) ||
            (this._settings || (this._settings = {}),
            t.state !== this._state
              ? (this._dispatchError({
                  message: 'Invalid state returned by the OAuth server.',
                  code: 'invalid_state',
                  state: this._state,
                  serverState: t.state,
                  interactive: this._settings.interactive
                }),
                (this._errored = !0),
                this._clearIframeTimeout(),
                this.clear())
              : 'error' in t
              ? (this._dispatchError({
                  message: t.errorDescription || 'The request is invalid.',
                  code: t.error || 'oauth_error',
                  state: this._state,
                  interactive: this._settings.interactive
                }),
                (this._errored = !0),
                this._clearIframeTimeout(),
                this.clear())
              : 'implicit' === this._type
              ? (this._handleTokenInfo(t), this.clear())
              : 'authorization_code' === this._type &&
                (this._overrideExchangeCodeFlow
                  ? this._dispatchCodeResponse(t)
                  : ((this._exchangeCodeValue = t.code),
                    this._exchangeCode(t.code).catch(() => {}),
                    this._clearIframeTimeout())));
        }
        _clearIframeTimeout() {
          this.__frameLoadTimeout && (clearTimeout(this.__frameLoadTimeout), (this.__frameLoadTimeout = void 0));
        }
        randomString(e) {
          return Math.round(Math.pow(36, e + 1) - Math.random() * Math.pow(36, e))
            .toString(36)
            .slice(1);
        }
        _beforePopupUnloadHandler() {
          if (this.tokenInfo || ('authorization_code' === this._type && this._exchangeCodeValue)) return;
          const e = this._settings || {};
          this._dispatchError({
            message: 'No response has been recorded.',
            code: 'no_response',
            state: this._state,
            interactive: e.interactive
          }),
            this.clear();
        }
        async _exchangeCode(e) {
          const t = this._settings.accessTokenUri;
          const n = this._getCodeEchangeBody(this._settings, e);
          try {
            const e = await this._requestToken(t, n, this._settings);
            const i = this._handleTokenInfo(e);
            return this.clear(), i;
          } catch (e) {
            this._handleTokenCodeError(e);
          }
        }
        _getCodeEchangeBody(e, t) {
          let n = 'grant_type=authorization_code';
          return (
            (n += '&client_id=' + encodeURIComponent(e.clientId)),
            e.redirectUri && (n += '&redirect_uri=' + encodeURIComponent(e.redirectUri)),
            (n += '&code=' + encodeURIComponent(t)),
            e.clientSecret ? (n += '&client_secret=' + encodeURIComponent(e.clientSecret)) : (n += '&client_secret='),
            n
          );
        }
        _requestToken(e, t, n) {
          if (n.customData) {
            const i = n.customData.token;
            i && (e = this._applyCustomSettingsQuery(e, i)), (t = this._applyCustomSettingsBody(t, n.customData));
          }
          return new Promise((i, s) => {
            const o = new XMLHttpRequest();
            o.addEventListener('load', (e) => this._processTokenResponseHandler(e, i, s)),
              o.addEventListener('error', (e) => this._processTokenResponseErrorHandler(e, s)),
              o.open('POST', e),
              o.setRequestHeader('content-type', 'application/x-www-form-urlencoded'),
              n.customData && this._applyCustomSettingsHeaders(o, n.customData);
            try {
              o.send(t);
            } catch (e) {
              s(new Error('Client request error: ' + e.message));
            }
          });
        }
        _processTokenResponseHandler(e, t, n) {
          const i = e.target.status;
          const s = e.target.response;
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
            o = this._processCodeResponse(s, e.target.getResponseHeader('content-type'));
          } catch (e) {
            return void n(new Error(e.message));
          }
          t(o);
        }
        _processTokenResponseErrorHandler(e, t) {
          const n = e.target.status;
          let i = 'The request to the authorization server failed.';
          n && (i += ' Response code is: ' + n), t(new Error(i));
        }
        _processCodeResponse(e, t) {
          if (!e) throw new Error('Code response body is empty.');
          let n;
          return (
            -1 !== t.indexOf('json')
              ? ((n = JSON.parse(e)),
                Object.keys(n).forEach((e) => {
                  const t = this._camel(e);
                  t && (n[t] = n[e]);
                }))
              : ((n = {}),
                e.split('&').forEach((e) => {
                  const t = e.split('=');
                  const i = t[0];
                  const s = this._camel(i);
                  const o = decodeURIComponent(t[1]);
                  (n[i] = o), (n[s] = o);
                })),
            n
          );
        }
        _handleTokenInfo(e) {
          return (
            (this._tokenInfo = e),
            (e.interactive = this._settings.interactive),
            'error' in e
              ? this._dispatchError({
                  message: e.errorDescription || 'The request is invalid.',
                  code: e.error,
                  state: this._state,
                  interactive: this._settings.interactive
                })
              : this._dispatchResponse(e),
            this.__frameLoadTimeout && (clearTimeout(this.__frameLoadTimeout), (this.__frameLoadTimeout = void 0)),
            (this._settings = void 0),
            (this._exchangeCodeValue = void 0),
            e
          );
        }
        _handleTokenCodeError(e) {
          throw (this._dispatchError({
            message: "Couldn't connect to the server. " + e.message,
            code: 'request_error',
            state: this._state,
            interactive: this._settings.interactive
          }),
          this.clear(),
          e);
        }
        _camel(e) {
          let t;
          let n = 0;
          let i = !1;
          for (; (t = e[n]); )
            ('_' === t || '-' === t) &&
              n + 1 < e.length &&
              ((e = e.substr(0, n) + e[n + 1].toUpperCase() + e.substr(n + 2)), (i = !0)),
              n++;
          return i ? e : void 0;
        }
        async authorizePassword(e) {
          this._settings = e;
          const t = e.accessTokenUri;
          const n = this._getPasswordBody(e);
          try {
            const i = await this._requestToken(t, n, e);
            const s = this._handleTokenInfo(i);
            return this.clear(), s;
          } catch (e) {
            this._handleTokenCodeError(e);
          }
        }
        _getPasswordBody(e) {
          let t = 'grant_type=password';
          return (
            (t += '&username=' + encodeURIComponent(e.username)),
            (t += '&password=' + encodeURIComponent(e.password)),
            e.clientId && (t += '&client_id=' + encodeURIComponent(e.clientId)),
            e.scopes && e.scopes.length && (t += '&scope=' + encodeURIComponent(e.scopes.join(' '))),
            t
          );
        }
        async authorizeClientCredentials(e) {
          this._settings = e;
          const t = e.accessTokenUri;
          const n = this._getClientCredentialsBody(e);
          try {
            const i = await this._requestToken(t, n, e);
            const s = this._handleTokenInfo(i);
            return this.clear(), s;
          } catch (e) {
            this._handleTokenCodeError(e);
          }
        }
        _getClientCredentialsBody(e) {
          let t = 'grant_type=client_credentials';
          return (
            e.clientId && (t += '&client_id=' + encodeURIComponent(e.clientId)),
            e.clientSecret && (t += '&client_secret=' + encodeURIComponent(e.clientSecret)),
            e.scopes && e.scopes.length && (t += '&scope=' + this._computeScope(e.scopes)),
            t
          );
        }
        async authorizeCustomGrant(e) {
          this._settings = e;
          const t = e.accessTokenUri;
          const n = this._getCustomGrantBody(e);
          try {
            const i = await this._requestToken(t, n, e);
            const s = this._handleTokenInfo(i);
            return this.clear(), s;
          } catch (e) {
            this._handleTokenCodeError(e);
          }
        }
        _getCustomGrantBody(e) {
          const t = ['grant_type=' + encodeURIComponent(e.type)];
          return (
            e.clientId && (t[t.length] = 'client_id=' + encodeURIComponent(e.clientId)),
            e.clientSecret && (t[t.length] = 'client_secret=' + encodeURIComponent(e.clientSecret)),
            e.scopes && e.scopes.length && (t[t.length] = 'scope=' + this._computeScope(e.scopes)),
            e.redirectUri && (t[t.length] = 'redirect_uri=' + encodeURIComponent(e.redirectUri)),
            e.username && (t[t.length] = 'username=' + encodeURIComponent(e.username)),
            e.password && (t[t.length] = 'password=' + encodeURIComponent(e.password)),
            t.join('&')
          );
        }
        _applyCustomSettingsQuery(e, t) {
          return t && t.parameters
            ? ((e += -1 === e.indexOf('?') ? '?' : '&'),
              (e += t.parameters
                .map((e) => {
                  let t = e.value;
                  return t && (t = encodeURIComponent(t)), encodeURIComponent(e.name) + '=' + t;
                })
                .join('&')))
            : e;
        }
        _applyCustomSettingsHeaders(e, t) {
          t &&
            t.token &&
            t.token.headers &&
            t.token.headers.forEach((t) => {
              try {
                e.setRequestHeader(t.name, t.value);
              } catch (e) {}
            });
        }
        _applyCustomSettingsBody(e, t) {
          return t && t.token && t.token.body
            ? (e +=
                '&' +
                t.token.body
                  .map(function(e) {
                    let t = e.value;
                    return t && (t = encodeURIComponent(t)), encodeURIComponent(e.name) + '=' + t;
                  })
                  .join('&'))
            : e;
        }
        _dispatchError(e) {
          const t = new CustomEvent('oauth2-error', { bubbles: !0, composed: !0, detail: e });
          this.dispatchEvent(t);
        }
        _dispatchCodeResponse(e) {
          const t = new CustomEvent('oauth2-code-response', { bubbles: !0, composed: !0, detail: e });
          this.dispatchEvent(t), this.clear();
        }
        _dispatchResponse(e) {
          const t = new CustomEvent('oauth2-token-response', { bubbles: !0, composed: !0, detail: e });
          this.dispatchEvent(t);
        }
        get ontokenerror() {
          return this['_onoauth2-error'];
        }
        set ontokenerror(e) {
          this._registerCallback('oauth2-error', e);
        }
        get ontokenresponse() {
          return this['_onoauth2-token-response'];
        }
        set ontokenresponse(e) {
          this._registerCallback('oauth2-token-response', e);
        }
        _registerCallback(e, t) {
          const n = `_on${e}`;
          this[n] && this.removeEventListener(e, this[n]),
            'function' == typeof t ? ((this[n] = t), this.addEventListener(e, t)) : (this[n] = null);
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
    const br = 'https://anypoint.mulesoft.com';
    const vr = 'authorization_code';
    const wr = {
      _clientId: null,
      get clientId() {
        return wr._clientId;
      },
      set clientId(e) {
        e && e !== wr._clientId ? ((wr._clientId = e), wr.initAuth2()) : (wr._clientId = e);
      },
      _redirectUri: null,
      get redirectUri() {
        return wr._redirectUri;
      },
      set redirectUri(e) {
        e && e !== wr._redirectUri ? ((wr._redirectUri = e), wr.initAuth2()) : (wr._redirectUri = e);
      },
      _authType: vr,
      get authType() {
        return wr._authType;
      },
      set authType(e) {
        e && e !== wr._authType ? ((wr._authType = e), wr.initAuth2()) : (wr._authType = e);
      },
      authorizationUri: `${br}/accounts/api/v2/oauth2/authorize`,
      accessTokenUri: `${br}/accounts/api/v2/oauth2/token`,
      logoutUri: `${br}/accounts/api/logout/`,
      _signedIn: !1,
      get signedIn() {
        return wr._signedIn;
      },
      set signedIn(e) {
        if (e !== wr._signedIn) {
          wr._signedIn = e;
          for (let t = 0; t < wr.signinAwares.length; t++) wr.signinAwares[t]._signedIn = e;
        }
      },
      _accessToken: null,
      get accessToken() {
        return wr._accessToken;
      },
      set accessToken(e) {
        if (e !== wr._accessToken) {
          wr._accessToken = e;
          for (let t = 0; t < wr.signinAwares.length; t++) wr.signinAwares[t]._accessToken = e;
        }
      },
      signinAwares: [],
      _forceOauthEvents: null,
      get forceOauthEvents() {
        return wr._forceOauthEvents;
      },
      set forceOauthEvents(e) {
        wr._forceOauthEvents !== e &&
          ((wr._forceOauthEvents = e),
          e
            ? (wr._clearOauthAuthorization(), wr._observeWindowEvents())
            : (wr._setOauthAuthorization(), wr._unobserveWindowEvents()));
      },
      init: function(e) {
        wr.forceOauthEvents || wr._setOauthAuthorization(), wr.initAuth2(e);
      },
      _setOauthAuthorization() {
        let e;
        if (wr._oauthFactory) e = wr._oauthFactory;
        else {
          const t = 'oauth2-authorization[data-owner="anypoint-signin-aware"]';
          e = document.body.querySelector(t);
        }
        e ||
          ((wr._oauthFactory = document.createElement('oauth2-authorization')),
          (wr._oauthFactory.dataset.owner = 'anypoint-signin-aware'),
          wr._oauthFactory.addEventListener('oauth2-error', wr._oauth2ErrorHandler),
          wr._oauthFactory.addEventListener('oauth2-token-response', wr._oauth2TokenHandler),
          document.body.appendChild(wr._oauthFactory));
      },
      _clearOauthAuthorization: function() {
        wr._oauthFactory &&
          (wr._oauthFactory.removeEventListener('oauth2-error', wr._oauth2ErrorHandler),
          wr._oauthFactory.removeEventListener('oauth2-token-response', wr._oauth2TokenHandler),
          document.body.removeChild(wr._oauthFactory),
          (wr._oauthFactory = void 0));
      },
      _observeWindowEvents() {
        window.addEventListener('oauth2-error', wr._oauth2ErrorHandler),
          window.addEventListener('oauth2-token-response', wr._oauth2TokenHandler);
      },
      _unobserveWindowEvents() {
        window.removeEventListener('oauth2-error', wr._oauth2ErrorHandler),
          window.removeEventListener('oauth2-token-response', wr._oauth2TokenHandler);
      },
      initAuth2: function(e) {
        wr._initSignIn(e);
      },
      generateState: function() {
        let e = '';
        const t = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
        for (let n = 0; n < 6; n++) e += t.charAt(Math.floor(Math.random() * t.length));
        return e;
      },
      _initSignIn: function(e) {
        wr.clientId && wr.redirectUri && wr.signIn(!1, e);
      },
      assertAuthInitialized: function() {
        if (!wr.clientId) throw new Error('AuthEngine not initialized. clientId has not been configured.');
        if (!wr.redirectUri) throw new Error('AuthEngine not initialized. redirectUri has not been configured.');
      },
      oauth2Config: function() {
        wr._lastState = wr.generateState();
        const e = {
          type: wr.authType,
          authorizationUri: wr.authorizationUri,
          clientId: wr.clientId,
          redirectUri: wr.redirectUri,
          state: wr._lastState,
          scopes: wr.scopes
        };
        return wr.authType === vr && ((e.accessTokenUri = wr.accessTokenUri), (e.overrideExchangeCodeFlow = !0)), e;
      },
      signIn: function(e, t) {
        if (!wr._oauthFactory && !wr.forceOauthEvents) return;
        wr.assertAuthInitialized();
        const n = wr.oauth2Config();
        if ((!1 === e && (n.interactive = e), wr.forceOauthEvents)) {
          const e = new CustomEvent('oauth2-token-requested', { bubbles: !0, composed: !0, detail: n });
          (t || document.body).dispatchEvent(e);
        } else wr._oauthFactory.authorize(n);
      },
      signOut: function() {
        return wr
          ._logout()
          .catch(() => {})
          .then(() => wr.setAuthData());
      },
      _oauth2TokenHandler: function(e) {
        const t = e.detail;
        t && wr._lastState === e.detail.state && (t.accessToken ? wr.setAuthData(t.accessToken) : wr.setAuthData());
      },
      _oauth2ErrorHandler: function(e) {
        if (wr._lastState !== e.detail.state) return;
        const t = e.detail.message;
        (wr.accessToken = null), (wr.signedIn = !1);
        for (let n = 0; n < wr.signinAwares.length; n++)
          wr.signinAwares[n]._updateStatus(),
            !1 !== e.detail.interactive && wr.signinAwares[n].errorNotify({ message: t });
      },
      setAuthData: function(e) {
        (wr.accessToken = e), (wr.signedIn = !!e);
        for (let e = 0; e < wr.signinAwares.length; e++) wr.signinAwares[e]._updateStatus();
      },
      _logout: function() {
        const e = wr.logoutUri;
        return new Promise(function(t, n) {
          const i = new XMLHttpRequest();
          i.open('GET', e),
            wr.accessToken && i.setRequestHeader('Authorization', 'bearer ' + wr.accessToken),
            i.addEventListener('load', function(e) {
              if (e.target.status > 299) return n(new Error('Delete token request failed.'));
              t();
            }),
            i.addEventListener('error', function(e) {
              const t = e.target.status;
              let i = 'Unable to delete the token.';
              t && (i += ' Response code is: ' + t), n(new Error(i));
            });
          try {
            i.send();
          } catch (e) {
            n(new Error('Unable to send the request.'));
          }
        });
      },
      attachSigninAware: function(e) {
        -1 === wr.signinAwares.indexOf(e) &&
          (wr.signinAwares.push(e),
          void 0 !== e.forceOauthEvents && (wr.forceOauthEvents = e.forceOauthEvents),
          (e._signedIn = wr.signedIn),
          (e._accessToken = wr.accessToken)),
          wr._initialized || (wr.init(e), (wr._initialized = !0));
      },
      detachSigninAware: function(e) {
        const t = wr.signinAwares.indexOf(e);
        -1 !== t && wr.signinAwares.splice(t, 1);
      },
      notifyError: function(e) {
        for (let t = 0; t < wr.signinAwares.length; t++) wr.signinAwares[t].errorNotify({ message: e });
      }
    };
    window.customElements.define(
      'anypoint-signin-aware',
      class extends ce {
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
        set _accessToken(e) {
          this.__accessToken !== e &&
            ((this.__accessToken = e),
            this.dispatchEvent(new CustomEvent('accesstoken-changed', { detail: { value: e } })));
        }
        get signedIn() {
          return this._signedIn;
        }
        get _signedIn() {
          return this.__signedIn;
        }
        set _signedIn(e) {
          this.__signedIn !== e &&
            ((this.__signedIn = e), this.dispatchEvent(new CustomEvent('signedin-changed', { detail: { value: e } })));
        }
        get redirectUri() {
          return this._redirectUri;
        }
        set redirectUri(e) {
          this._redirectUri !== e &&
            (e && -1 === (e = String(e)).indexOf('http') && (e = void 0),
            (this._redirectUri = e),
            this._redirectUriChanged(e));
        }
        get clientId() {
          return this._clientId;
        }
        set clientId(e) {
          this._clientId !== e && (e && (e = String(e)), (this._clientId = e), this._clientIdChanged(e));
        }
        get authType() {
          return this._authType;
        }
        set authType(e) {
          this._authType !== e && (e && (e = String(e)), (this._authType = e), this._authTypeChanged(e));
        }
        get scopes() {
          return this._scopes;
        }
        set scopes(e) {
          this._scopes !== e && (e && (e = String(e)), (this._scopes = e), this._scopesChanged(e));
        }
        connectedCallback() {
          super.connectedCallback && super.connectedCallback(),
            this.setAttribute('aria-hidden', 'true'),
            wr.attachSigninAware(this);
        }
        disconnectedCallback() {
          super.disconnectedCallback && super.disconnectedCallback(), wr.detachSigninAware(this);
        }
        signIn() {
          wr.signIn(!0, this);
        }
        signOut() {
          return wr.signOut();
        }
        errorNotify(e) {
          this.dispatchEvent(new CustomEvent('anypoint-signin-aware-error', { bubbles: !0, composed: !0, detail: e }));
        }
        _clientIdChanged(e) {
          wr.clientId = e;
        }
        _authTypeChanged(e) {
          wr.authType = e;
        }
        _scopesChanged(e) {
          const t = e && e.split(' ');
          wr.scopes = t;
        }
        _redirectUriChanged(e) {
          wr.redirectUri = e;
        }
        _updateStatus() {
          let e;
          (e = this.signedIn ? 'anypoint-signin-aware-success' : 'anypoint-signin-aware-signed-out'),
            this.dispatchEvent(new CustomEvent(e, { bubbles: !0, composed: !0, detail: this.user }));
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
*/ const Cr = ae`
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
*/ Ht((e) => {
      return class extends e {
        get hovered() {
          return this._hovered;
        }
        get _hovered() {
          return this.__hovered || !1;
        }
        set _hovered(e) {
          const t = this.__hovered;
          e !== t &&
            ((this.__hovered = e),
            this.requestUpdate && this.requestUpdate('hovered', t),
            e ? this.setAttribute('hovered', '') : this.removeAttribute('hovered'),
            this.dispatchEvent(new CustomEvent('hovered-changed', { composed: !0, detail: { value: e } })));
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
*/ const Sr = Ht((e) => {
      return class extends e {
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
        set _pressed(e) {
          this._setChanged('_pressed', e) &&
            (e ? this.setAttribute('pressed', '') : this.removeAttribute('pressed'),
            this.dispatchEvent(new CustomEvent('pressed-changed', { composed: !0, detail: { value: e } })),
            this._pressedChanged(e));
        }
        get active() {
          return this._active || !1;
        }
        set active(e) {
          this._setChanged('active', e) &&
            (e ? this.setAttribute('active', '') : this.removeAttribute('active'),
            this.dispatchEvent(new CustomEvent('active-changed', { composed: !0, detail: { value: e } })),
            this._activeChanged());
        }
        get pointerDown() {
          return this._pointerDown;
        }
        get _pointerDown() {
          return this.__pointerDown || !1;
        }
        set _pointerDown(e) {
          this._setChanged('_pointerDown', e);
        }
        get receivedFocusFromKeyboard() {
          return this._receivedFocusFromKeyboard || !1;
        }
        get _receivedFocusFromKeyboard() {
          return this.__receivedFocusFromKeyboard || !1;
        }
        set _receivedFocusFromKeyboard(e) {
          this._setChanged('_receivedFocusFromKeyboard', e);
        }
        get ariaActiveAttribute() {
          return this._ariaActiveAttribute;
        }
        set ariaActiveAttribute(e) {
          const t = this._ariaActiveAttribute;
          this._setChanged('ariaActiveAttribute', e) &&
            (t && this.hasAttribute(t) && this.removeAttribute(t), this._activeChanged());
        }
        _setChanged(e, t) {
          const n = `_${e}`;
          const i = this[n];
          return t !== i && ((this[n] = t), this.requestUpdate && this.requestUpdate(e, i), !0);
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
        _keyDownHandler(e) {
          'Enter' === e.code || 'NumpadEnter' === e.code || 13 === e.keyCode
            ? this._asyncClick(e)
            : ('Space' !== e.code && 32 !== e.keyCode) || this._spaceKeyDownHandler(e);
        }
        _keyUpHandler(e) {
          ('Space' !== e.code && 32 !== e.keyCode) || this._spaceKeyUpHandler(e);
        }
        _blurHandler() {
          this._detectKeyboardFocus(!1), (this._pressed = !1);
        }
        _focusHandler() {
          this._detectKeyboardFocus(!0);
        }
        _detectKeyboardFocus(e) {
          this._receivedFocusFromKeyboard = !this.pointerDown && e;
        }
        _isLightDescendant(e) {
          return e !== this && this.contains(e);
        }
        _spaceKeyDownHandler(e) {
          const t = e.target;
          t && !this._isLightDescendant(t) && (e.preventDefault(), e.stopImmediatePropagation(), (this._pressed = !0));
        }
        _spaceKeyUpHandler(e) {
          const t = e.target;
          t && !this._isLightDescendant(t) && (this.pressed && this._asyncClick(), (this._pressed = !1));
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
          const { active: e, ariaActiveAttribute: t } = this;
          this.toggles ? this.setAttribute(t, e ? 'true' : 'false') : this.removeAttribute(t),
            this._changedButtonState();
        }
        _controlStateChanged() {
          this.disabled ? (this._pressed = !1) : this._changedButtonState();
        }
      };
    });
    const kr = Ht((e) => {
      return class extends e {
        static get properties() {
          return { disabled: { type: Boolean }, focused: { type: Boolean } };
        }
        get focused() {
          return this._focused;
        }
        set focused(e) {
          this._setChanged('focused', e) &&
            (e ? this.setAttribute('focused', '') : this.removeAttribute('focused'),
            this.dispatchEvent(new CustomEvent('focused-changed', { composed: !0, detail: { value: e } })),
            this._changedControlState());
        }
        get disabled() {
          return this._disabled;
        }
        set disabled(e) {
          this._setChanged('disabled', e) &&
            (e ? this.setAttribute('disabled', '') : this.removeAttribute('disabled'),
            this.dispatchEvent(new CustomEvent('disabled-changed', { composed: !0, detail: { value: e } })),
            this._disabledChanged(e),
            this._changedControlState());
        }
        _setChanged(e, t) {
          const n = `_${e}`;
          const i = this[n];
          return t !== i && ((this[n] = t), this.requestUpdate && this.requestUpdate(e, i), !0);
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
        _focusBlurHandler(e) {
          this.disabled ? this.focused && ((this.focused = !1), this.blur()) : (this.focused = 'focus' === e.type);
        }
        _disabledChanged(e) {
          this.setAttribute('aria-disabled', e ? 'true' : 'false'),
            (this.style.pointerEvents = e ? 'none' : ''),
            e
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
    const xr = {
      distance: function(e, t, n, i) {
        const s = e - n;
        const o = t - i;
        return Math.sqrt(s * s + o * o);
      },
      now: window.performance && window.performance.now ? window.performance.now.bind(window.performance) : Date.now
    };
    function Er(e) {
      (this.element = e),
        (this.width = this.boundingRect.width),
        (this.height = this.boundingRect.height),
        (this.size = Math.max(this.width, this.height));
    }
    function Pr(e) {
      (this.element = e),
        (this.color = window.getComputedStyle(e).color),
        (this.wave = document.createElement('div')),
        (this.waveContainer = document.createElement('div')),
        (this.wave.style.backgroundColor = this.color),
        this.wave.classList.add('wave'),
        this.waveContainer.classList.add('wave-container'),
        Us(this.waveContainer).appendChild(this.wave),
        this.resetInteractionState();
    }
    (Er.prototype = {
      get boundingRect() {
        return this.element.getBoundingClientRect();
      },
      furthestCornerDistanceFrom: function(e, t) {
        const n = xr.distance(e, t, 0, 0);
        const i = xr.distance(e, t, this.width, 0);
        const s = xr.distance(e, t, 0, this.height);
        const o = xr.distance(e, t, this.width, this.height);
        return Math.max(n, i, s, o);
      }
    }),
      (Pr.MAX_RADIUS = 300),
      (Pr.prototype = {
        get recenters() {
          return this.element.recenters;
        },
        get center() {
          return this.element.center;
        },
        get mouseDownElapsed() {
          let e;
          return this.mouseDownStart
            ? ((e = xr.now() - this.mouseDownStart), this.mouseUpStart && (e -= this.mouseUpElapsed), e)
            : 0;
        },
        get mouseUpElapsed() {
          return this.mouseUpStart ? xr.now() - this.mouseUpStart : 0;
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
          const e = this.containerMetrics.width * this.containerMetrics.width;
          const t = this.containerMetrics.height * this.containerMetrics.height;
          const n = 1.1 * Math.min(Math.sqrt(e + t), Pr.MAX_RADIUS) + 5;
          const i = 1.1 - (n / Pr.MAX_RADIUS) * 0.2;
          const s = this.mouseInteractionSeconds / i;
          const o = n * (1 - Math.pow(80, -s));
          return Math.abs(o);
        },
        get opacity() {
          return this.mouseUpStart
            ? Math.max(0, this.initialOpacity - this.mouseUpElapsedSeconds * this.opacityDecayVelocity)
            : this.initialOpacity;
        },
        get outerOpacity() {
          const e = 0.3 * this.mouseUpElapsedSeconds;
          const t = this.opacity;
          return Math.max(0, Math.min(e, t));
        },
        get isOpacityFullyDecayed() {
          return this.opacity < 0.01 && this.radius >= Math.min(this.maxRadius, Pr.MAX_RADIUS);
        },
        get isRestingAtMaxRadius() {
          return this.opacity >= this.initialOpacity && this.radius >= Math.min(this.maxRadius, Pr.MAX_RADIUS);
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
            (this.containerMetrics = new Er(this.element));
        },
        draw: function() {
          let e;
          let t;
          let n;
          (this.wave.style.opacity = this.opacity),
            (e = this.radius / (this.containerMetrics.size / 2)),
            (t = this.xNow - this.containerMetrics.width / 2),
            (n = this.yNow - this.containerMetrics.height / 2),
            (this.waveContainer.style.webkitTransform = 'translate(' + t + 'px, ' + n + 'px)'),
            (this.waveContainer.style.transform = 'translate3d(' + t + 'px, ' + n + 'px, 0)'),
            (this.wave.style.webkitTransform = 'scale(' + e + ',' + e + ')'),
            (this.wave.style.transform = 'scale3d(' + e + ',' + e + ',1)');
        },
        downAction: function(e) {
          const t = this.containerMetrics.width / 2;
          const n = this.containerMetrics.height / 2;
          this.resetInteractionState(),
            (this.mouseDownStart = xr.now()),
            this.center
              ? ((this.xStart = t),
                (this.yStart = n),
                (this.slideDistance = xr.distance(this.xStart, this.yStart, this.xEnd, this.yEnd)))
              : ((this.xStart = e
                  ? e.detail.x - this.containerMetrics.boundingRect.left
                  : this.containerMetrics.width / 2),
                (this.yStart = e
                  ? e.detail.y - this.containerMetrics.boundingRect.top
                  : this.containerMetrics.height / 2)),
            this.recenters &&
              ((this.xEnd = t),
              (this.yEnd = n),
              (this.slideDistance = xr.distance(this.xStart, this.yStart, this.xEnd, this.yEnd))),
            (this.maxRadius = this.containerMetrics.furthestCornerDistanceFrom(this.xStart, this.yStart)),
            (this.waveContainer.style.top = (this.containerMetrics.height - this.containerMetrics.size) / 2 + 'px'),
            (this.waveContainer.style.left = (this.containerMetrics.width - this.containerMetrics.size) / 2 + 'px'),
            (this.waveContainer.style.width = this.containerMetrics.size + 'px'),
            (this.waveContainer.style.height = this.containerMetrics.size + 'px');
        },
        upAction: function(e) {
          this.isMouseDown && (this.mouseUpStart = xr.now());
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
        behaviors: [er],
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
          const e = this.keyEventTarget;
          this.listen(e, 'up', 'uiUpAction'), this.listen(e, 'down', 'uiDownAction');
        },
        detached: function() {
          this.unlisten(this.keyEventTarget, 'up', 'uiUpAction'),
            this.unlisten(this.keyEventTarget, 'down', 'uiDownAction'),
            (this.keyEventTarget = null);
        },
        get shouldKeepAnimating() {
          for (let e = 0; e < this.ripples.length; ++e) if (!this.ripples[e].isAnimationComplete) return !0;
          return !1;
        },
        simulatedRipple: function() {
          this.downAction(null),
            this.async(function() {
              this.upAction();
            }, 1);
        },
        uiDownAction: function(e) {
          this.noink || this.downAction(e);
        },
        downAction: function(e) {
          (this.holdDown && this.ripples.length > 0) ||
            (this.addRipple().downAction(e), this._animating || ((this._animating = !0), this.animate()));
        },
        uiUpAction: function(e) {
          this.noink || this.upAction(e);
        },
        upAction: function(e) {
          this.holdDown ||
            (this.ripples.forEach(function(t) {
              t.upAction(e);
            }),
            (this._animating = !0),
            this.animate());
        },
        onAnimationComplete: function() {
          (this._animating = !1), (this.$.background.style.backgroundColor = null), this.fire('transitionend');
        },
        addRipple: function() {
          const e = new Pr(this);
          return (
            Us(this.$.waves).appendChild(e.waveContainer),
            (this.$.background.style.backgroundColor = e.color),
            this.ripples.push(e),
            this._setAnimating(!0),
            e
          );
        },
        removeRipple: function(e) {
          const t = this.ripples.indexOf(e);
          t < 0 || (this.ripples.splice(t, 1), e.remove(), this.ripples.length || this._setAnimating(!1));
        },
        animate: function() {
          if (this._animating) {
            let e;
            let t;
            for (e = 0; e < this.ripples.length; ++e)
              (t = this.ripples[e]).draw(),
                (this.$.background.style.opacity = t.outerOpacity),
                t.isOpacityFullyDecayed && !t.isRestingAtMaxRadius && this.removeRipple(t);
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
        _holdDownChanged: function(e, t) {
          void 0 !== t && (e ? this.downAction() : this.upAction());
        }
      });
    class Tr extends kr(Sr(ce)) {
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
      set legacy(e) {
        this.compatibility = e;
      }
      get emphasis() {
        return this._emphasis;
      }
      set emphasis(e) {
        this._setChanged('emphasis', e) && this._calculateElevation();
      }
      get toggles() {
        return this._toggles;
      }
      set toggles(e) {
        this._setChanged('toggles', e) && this._calculateElevation();
      }
      get compatibility() {
        return this._compatibility;
      }
      set compatibility(e) {
        this._setChanged('compatibility', e) && this._calculateElevation();
      }
      get elevation() {
        return this._elevation;
      }
      set elevation(e) {
        e || (e = 0), this._setChanged('elevation', e);
      }
      constructor() {
        super(), (this.emphasis = 'low');
      }
      async _calculateElevation() {
        let e = 0;
        'high' !== this.emphasis || this.compatibility || (e = this.toggles && this.active ? 2 : this.pressed ? 3 : 1),
          await this.updateComplete,
          (this.elevation = e);
      }
      _controlStateChanged() {
        super._controlStateChanged(), this._calculateElevation();
      }
      _buttonStateChanged() {
        this._calculateElevation();
      }
    }
    class Ar extends Tr {
      static get styles() {
        return ae`:host {
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
        const { noink: e, compatibility: t } = this;
        return M`<slot></slot><paper-ripple .noink="${!!e || !!t}"></paper-ripple>`;
      }
      get _ripple() {
        return this.shadowRoot.querySelector('paper-ripple');
      }
      connectedCallback() {
        this.hasAttribute('role') || this.setAttribute('role', 'button'),
          this.hasAttribute('tabindex') || this.setAttribute('tabindex', '0'),
          super.connectedCallback && super.connectedCallback();
      }
      _spaceKeyDownHandler(e) {
        super._spaceKeyDownHandler(e),
          this._calculateElevation(),
          this._ripple.animating || this._ripple.uiDownAction();
      }
      _spaceKeyUpHandler(e) {
        super._spaceKeyUpHandler(e), this._calculateElevation(), this._ripple.uiUpAction();
      }
    }
    const Or = { STANDARD: 'Sign in', WIDE: 'Sign in with Anypoint Platform' };
    const Nr = { STANDARD: 'standard', WIDE: 'wide' };
    window.customElements.define(
      'anypoint-signin',
      class extends Ar {
        static get styles() {
          return [
            Ar.styles,
            ae`
        ${Cr}
      `
          ];
        }
        render() {
          const {
            authType: e,
            clientId: t,
            forceOauthEvents: n,
            labelSignin: i,
            labelSignout: s,
            redirectUri: o,
            scopes: r,
            signedIn: a,
            width: l
          } = this;
          const c = this._computeSigninLabel(i, l);
          return M`
      <anypoint-signin-aware
        .clientId="${t}"
        .redirectUri="${o}"
        .scopes="${r}"
        .authType="${e}"
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
        set signedIn(e) {
          const t = this._signedIn;
          t !== e &&
            ((this._signedIn = e),
            this.requestUpdate('signedIn', t),
            this.dispatchEvent(new CustomEvent('signedin-changed', { detail: { value: e } })));
        }
        get accessToken() {
          return this._accessToken;
        }
        set accessToken(e) {
          const t = this._accessToken;
          t !== e &&
            ((this._accessToken = e),
            this.requestUpdate('accessToken', t),
            this.dispatchEvent(new CustomEvent('accesstoken-changed', { detail: { value: e } })));
        }
        get onsignedin() {
          return this['_onsignedin-changed'];
        }
        set onsignedin(e) {
          this._registerCallback('signedin-changed', e);
        }
        get onaccesstoken() {
          return this['_onaccesstoken-changed'];
        }
        set onaccesstoken(e) {
          this._registerCallback('accesstoken-changed', e);
        }
        get material() {
          return this._material;
        }
        set material(e) {
          this._material !== e && ((this.compatibility = !e), (this._material = e));
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
            const e = 'Press the button to sign in with Anypoint Platform';
            this.setAttribute('aria-label', e);
          }
          this.addEventListener('keydown', this._keyDownHandler), this.addEventListener('click', this._clickHandler);
        }
        disconnectedCallback() {
          super.disconnectedCallback && super.disconnectedCallback(),
            this.removeEventListener('keydown', this._keyDownHandler),
            this.removeEventListener('click', this._clickHandler);
        }
        _registerCallback(e, t) {
          const n = `_on${e}`;
          this[n] && this.removeEventListener(e, this[n]),
            'function' == typeof t ? ((this[n] = t), this.addEventListener(e, t)) : (this[n] = null);
        }
        _computeSigninLabel(e, t) {
          if (e) return e;
          switch (t) {
            case Nr.WIDE:
              return Or.WIDE;
            case Nr.STANDARD:
              return Or.STANDARD;
            default:
              return Or.WIDE;
          }
        }
        signIn() {
          this.authAware.signIn();
        }
        signOut() {
          this.dispatchEvent(new CustomEvent('anypoint-signout-attempted', { bubbles: !0, composed: !0 })),
            this.authAware.signOut();
        }
        _keyDownHandler(e) {
          ('Space' !== e.code && 'Enter' !== e.code && 'NumpadEnter' !== e.code) || this._handleActivateEvent(e);
        }
        _clickHandler() {
          this.signedIn ? this.signOut() : this.signIn();
        }
        _handleActivateEvent(e) {
          e.preventDefault(), this.signedIn ? this.signOut() : this.signIn();
        }
        _atHandler(e) {
          this.accessToken = e.detail.value;
        }
        _signedinHandler(e) {
          this.signedIn = e.detail.value;
        }
      }
    );
    const Ir = document.getElementById('b1');
    Ir.addEventListener('signedin-changed', (e) => {
      const { value: t } = e.detail;
      document.getElementById('signInStatus').innerText = String(t);
    }),
      Ir.addEventListener('accesstoken-changed', (e) => {
        let { value: t } = e.detail;
        (t = t ? String(t) : 'none'), (document.getElementById('atStatus').innerText = t);
      }),
      window.addEventListener('anypoint-signin-aware-error', (e) => {
        const { message: t } = e.detail;
        const n = document.getElementById('errorToast');
        (n.text = t), (n.opened = !0);
      }),
      window.addEventListener('oauth2-code-response', (e) => {
        console.log('Code Info', e.detail),
          console.log('The authorization code is', e.detail.code),
          console.log(
            'You should exchange this code for an access token. Once exchanged, you can set the button signedIn attribute to true so that the button becomes a signout button.You can also just remove the button at this point or go to the next page in your flow.'
          ),
          (document.getElementById('authorizationCode').innerText = e.detail.code);
      });
  }
]);
