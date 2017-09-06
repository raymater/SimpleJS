/*
	Bibliothèque JavaScript SimpleJS
	par raymater
*/

window.document.onreadystatechange = function()
{
	if(document.readyState === "complete")
	{
		window.simpleJS = (function()
		{
			// Personnalisation du log console en JS ( https://github.com/adamschwartz/log ) //
			(function(){var a,b,c,d,e,f,g,h,i,j,k,l,m,n,o;window.console&&window.console.log&&(j=function(){var a;return a=[],k(arguments).forEach(function(b){return"string"==typeof b?a=a.concat(n(b)):a.push(b)}),o.apply(window,a)},o=function(){return Function.prototype.apply.call(console.log,console,k(arguments))},k=function(a){return Array.prototype.slice.call(a)},c=[{regex:/\*([^\*]+)\*/,replacer:function(a,b){return"%c"+b+"%c"},styles:function(){return["font-style: italic",""]}},{regex:/\_([^\_]+)\_/,replacer:function(a,b){return"%c"+b+"%c"},styles:function(){return["font-weight: bold",""]}},{regex:/\`([^\`]+)\`/,replacer:function(a,b){return"%c"+b+"%c"},styles:function(){return["background: rgb(255, 255, 219); padding: 1px 5px; border: 1px solid rgba(0, 0, 0, 0.1)",""]}},{regex:/\[c\=(?:\"|\')?((?:(?!(?:\"|\')\]).)*)(?:\"|\')?\]((?:(?!\[c\]).)*)\[c\]/,replacer:function(a,b,c){return"%c"+c+"%c"},styles:function(a){return[a[1],""]}}],e=function(a){var b;return b=!1,c.forEach(function(c){return c.regex.test(a)?b=!0:void 0}),b},d=function(a){var b;return b=[],c.forEach(function(c){var d;return d=a.match(c.regex),d?b.push({format:c,match:d}):void 0}),b.sort(function(a,b){return a.match.index-b.match.index})},n=function(a){var b,c,f;for(f=[];e(a);)c=d(a),b=c[0],a=a.replace(b.format.regex,b.format.replacer),f=f.concat(b.format.styles(b.match));return[a].concat(f)},i=function(){return/Safari/.test(navigator.userAgent)&&/Apple Computer/.test(navigator.vendor)},h=function(){return/OPR/.test(navigator.userAgent)&&/Opera/.test(navigator.vendor)},f=function(){return/Firefox/.test(navigator.userAgent)},g=function(){return/MSIE/.test(navigator.userAgent)},m=function(){var a;return a=navigator.userAgent.match(/AppleWebKit\/(\d+)\.(\d+)(\.|\+|\s)/),a?537.38<=parseInt(a[1],10)+parseInt(a[2],10)/100:!1},l=function(){var a;return a=navigator.userAgent.match(/OPR\/(\d+)\./),a?15<=parseInt(a[1],10):!1},b=function(){return window.console.firebug||window.console.exception},a=g()||f()&&!b()||h()&&!l()||i()&&!m()?o:j,a.l=o,"function"==typeof define&&define.amd?define(function(){return a}):"undefined"!=typeof exports?module.exports=a:window.log=a)}).call(this);
			
			// Mode debug : mettre ce paramètre à true pour afficher les informations de debug sur toutes les méthodes
			var Debug = false;
			
			if(Debug == true)
			{
				log('[c="font-family: \'Helvetica Neue\', Helvetica, Arial, sans-serif; color: #fff; font-size: 20px; padding: 15px 20px; background: #444; border-radius: 4px; line-height: 100px; text-shadow: 0 1px #000"]SimpleJS[c]');
				log("[c=\"color: blue\"]●[c] _[SimpleJS]_ Mode Debug activé ! (╯°□°）╯︵ ┻━┻");
			}
			
			// Méthodes :
			return {
				/*
					Fonction permettant d'activer ou désactiver le mode Debug
					
					Paramètre :
						- setting (type bool) : Force la valeur à définir pour la variable Debug
				*/
				"debug" : function (setting)
				{
					if(typeof setting === 'undefined')
					{
						if(Debug == true)
						{
							Debug = false;
							log("[c=\"color: blue\"]●[c] _[SimpleJS]_ Mode Debug désactivé ! ┬─┬﻿ ノ( ゜-゜ノ)");
						}
						else
						{
							Debug = true;
							log("[c=\"color: blue\"]●[c] _[SimpleJS]_ Mode Debug activé ! (╯°□°）╯︵ ┻━┻");
						}
					}
					else
					{
						Debug = setting;
						if(Debug == true)
						{
							log("[c=\"color: blue\"]●[c] _[SimpleJS]_ Mode Debug activé ! (╯°□°）╯︵ ┻━┻");
						}
						else
						{
							log("[c=\"color: blue\"]●[c] _[SimpleJS]_ Mode Debug désactivé ! ┬─┬﻿ ノ( ゜-゜ノ)");
						}
					}
				},
				
				/*
					Fonction permettant d'exécuter une requête AJAX
					
					Paramètres :
						- url (type string) : Adresse URL permettant d'accéder à une ressource demandée (par défaut : "")
						- action (type function) : Fonction associant une action à exécuter dès que la requête HTTP a été exécuté avec succès (par défaut : fonction vide)
						- method (type string) : Méthode HTTP à exécuter (par défaut : "GET")
						- data (type string) : Données à envoyer dans la requête (utilisable pour les méthodes "POST" uniquement) (par défaut : null)
						- async (type bool) : Spécifie si la requête est synchrone (false) ou asynchrone (true) (par défaut asynchrone : true)
						- user (type string) : Nom d'utilisateur dans le cas d'une connexion authentifiée HTTP (par défaut : null)
						- password (type string) : Mot de passe dans le cas d'une connexion authentifiée HTTP (par défaut : null)
						- timeout (type int) : Défini un temps en millisecondes avant abandon de la connexion (par défaut : 0)
						- retry (type bool) : Défini si la requête doit être retentée en cas d'échec après la fin du temps imparti (par défaut : false)
						- debug (type bool) : Affiche (true) ou non (false) les informations relatives aux états HTTP de la requête envoyée dans la console JavaScript (par défaut : false)
				*/
				"ajax" : function (url, method, action, data, async, user, password, timeout, retry, debug)
				{
					if (typeof url === 'undefined') { url = ""; }
					if (typeof action === 'undefined') { action = function(){}; }
					if (typeof method === 'undefined') { method = "GET"; }
					if (typeof data === 'undefined') { data = null; }
					if (typeof async === 'undefined') { async = true; }
					if (typeof user === 'undefined') { user = null; }
					if (typeof password === 'undefined') { password = null; }
					if (typeof timeout === 'undefined') { timeout = 0; }
					if (typeof retry === 'undefined') { retry = false; }
					if (typeof debug === 'undefined') { debug = Debug; }
					
					if(method != "GET" && method != "HEAD" && method != "POST" && method != "OPTIONS" && method != "PUT" && method != "DELETE")
					{
						method = "GET";
					}
					
					xhr = null;
					if (window.XMLHttpRequest || window.ActiveXObject)
					{
						if (window.ActiveXObject)
						{
							try
							{
								xhr = new ActiveXObject("Msxml2.XMLHTTP");
								if(xhr != null && debug == true)
								{
									log("[c=\"color: blue\"]●[c] _[AJAX]_ Objet AJAX instancié via Msxml2.XMLHTTP.");
								}
							}
							catch(e)
							{
								xhr = new ActiveXObject("Microsoft.XMLHTTP");
								if(xhr != null && debug == true)
								{
									log("[c=\"color: blue\"]●[c] _[AJAX]_ Objet AJAX instancié via Microsoft.XMLHTTP.");
								}
							}
						}
						else
						{
							xhr = new XMLHttpRequest(); 
							if(xhr != null && debug == true)
							{
								log("[c=\"color: blue\"]●[c] _[AJAX]_ Objet AJAX instancié via XMLHttpRequest.");
							}
						}
					}
					else
					{
						log("[c=\"color: red\"]●[c] _[AJAX]_ Votre navigateur ne supporte pas AJAX.");
						alert("Votre navigateur ne supporte pas AJAX.");
						return;
					}
					
					xhr.onreadystatechange = function()
					{
						if(debug == true)
						{
							switch(this.readyState)
							{
								case 1:
									log("[c=\"color: green\"]●[c] _[AJAX]_ Connexion au serveur établie.");
									break;
								case 2:
									log("[c=\"color: green\"]●[c] _[AJAX]_ Requête reçue.");
									break;
								case 3:
									log("[c=\"color: green\"]●[c] _[AJAX]_ En attente du traitement de la requête...");
									break;
							}
							
							if(this.readyState == this.HEADERS_RECEIVED)
							{
								log("[c=\"color: blue\"]●[c] _[AJAX]_ Entêtes HTTP :\n`" + xhr.getAllResponseHeaders() + "`");
							}
						}
						if (this.readyState == 4)
						{
							if(debug == true)
							{
								log("[c=\"color: green\"]●[c] _[AJAX]_ Requête terminée, réponse reçue.\n" + "Code HTTP : `" + this.status + "`\nRéponse : `" + this.responseText + "`");
							}
							if(this.status == 200 || this.status == 201 || this.status == 204)
							{
								action();
							}
						}
					};
					
					xhr.ontimeout = function (e) {
						log("[c=\"color: red\"]●[c] _[AJAX]_ Temps imparti écoulé.");
						if(retry == true)
						{
							if(debug == true)
							{
								log("[c=\"color: blue\"]●[c] _[AJAX]_ Nouvelle tentative d'envoi en cours...");
							}
							if(data != null)
							{
								xhr.send(data);
							}
							else
							{
								xhr.send();
							}
						}
					};
					
					xhr.open(method, url, async, user, password);
					
					xhr.timeout = timeout;
					
					if(data != null)
					{
						xhr.send(data);
					}
					else
					{
						xhr.send();
					}
				},



				/*
					Fonction permettant d'exécuter un script JavaScript en arrière plan.
					
					Paramètres :
						- script (type string) : Nom de fichier de script JavaScript à exécuter (par défaut : "script.js")
						- debug (type bool) : Affiche (true) ou non (false) les informations relatives à l'état de l'objet Worker dans la console JavaScript (par défaut : false)
				*/
				"background" : function (script, debug)
				{
					if (typeof script === 'undefined') { script = "script.js"; }
					if (typeof debug === 'undefined') { debug = Debug; }
					
					if(typeof(Worker) !== "undefined")
					{
						if(typeof(w) == "undefined")
						{
							w = new Worker(script);
							log("[c=\"color: blue\"]●[c] _[Worker]_ Script *" + script + "* exécuté.");
						}
						w.onmessage = function(event)
						{
							if(debug == true)
							{
								log("[c=\"color: green\"]●[c] _[Worker]_ Message de *" + script + "* : `" + event.data + "`");
							}
							return event.data;
						};
					}
					else
					{
						if(debug == true)
						{
							log("[c=\"color: red\"]●[c] _[Worker]_ Votre navigateur ne supporte pas Web Worker.");
						}
						alert("Votre navigateur ne supporte pas AJAX.");
						return;
					}
				},



				/*
					Fonction permettant d'ouvrir un WebSocket.
					
					Paramètres :
						- url (type string) : Adresse du WebSocket distant (par défaut : "ws://example.com:10081/").
						- message (type string) : Information à envoyer au WebSocket distant (par défaut : "").
						- action (type function) : Fonction à exécuter une fois la réponse du serveur reçue (par défaut : fonction vide).
						- protocol (type string) : Protocoles à utiliser. Il est possible d'utiliser plusieurs protocoles avec un tableau de chaines de caractères (exemple : ["protocole1", "protocole2"]) (par défaut : null).
						- debug (type bool) : Affiche (true) ou non (false) les informations relatives à l'état de l'objet WebSocket dans la console JavaScript (par défaut : false).
				*/
				"socket" : function (url, message, action, protocol, debug)
				{
					if (typeof url === 'undefined') { url = "ws://example.com:10081/"; }
					if (typeof message === 'undefined') { message = ""; }
					if (typeof action === 'undefined') { action = function(){}; }
					if (typeof protocol === 'undefined') { protocol = null; }
					if (typeof debug === 'undefined') { debug = Debug; }
					
					if(window.WebSocket)
					{
						var ws = new window.WebSocket(url, protocol);
						
						ws.onopen = function()
						{
							ws.send(message);
							if(debug == true)
							{
								log("[c=\"color: blue\"]●[c] _[WebSocket]_ Ouverture d'un WebSocket vers *" + url + "*...");
							}
						};
						
						ws.onmessage = function(e)
						{
							if(debug == true)
							{
								log("[c=\"color: green\"]●[c] _[WebSocket]_ Réponse du WebSocket vers *" + url + "* : \n`" + e.data + "`");
							}
							action();
						};
						
						ws.onerror = function(e)
						{
							if(debug == true)
							{
								log("[c=\"color: red\"]●[c] _[WebSocket]_ Erreur : \n`" + e.data + "`");
							}
						};
						
						ws.onclose = function()
						{
							if(debug == true)
							{
								log("[c=\"color: blue\"]●[c] _[WebSocket]_ WebSocket *" + url + "* cloturé.");
							}
						};
					}
					else
					{
						if(debug == true)
						{
							log("[c=\"color: red\"]●[c] _[WebSocket]_ Votre navigateur ne supporte pas les WebSockets.");
						}
						alert("Votre navigateur ne supporte pas les WebSockets.");
						return;
					}
				}
			};
		})();
		
		// Alias
		window.SimpleJS = simpleJS;
	}
}