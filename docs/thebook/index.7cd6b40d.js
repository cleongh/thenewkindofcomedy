const O={PRÓXIMA:2,VOY:1,PRIMERO:5,HAYA:1,VAYA:5,VA:2,ESPERA:4,RÁPIDO:3,MONITOR:5,ÚLTIMA:2,SÍ:5,DALE:3,HAY:3,OTRA:4,BIEN:4,PALABRA:5,NADA:3,BAYA:5,LISTO:3,OKAY:3,BUENO:0,NO:5,ALLÁ:4,EXPLOTÓ:3,AHÍ:2,HALLA:5,VALLA:1,OTRO:5},E={ESPERA:["LISTO","VA","¿ÉSTA?","VALE","NO ESTÁ","¿ESA?","OKAY","OTRO","ESPERA","NO","¿QUÉ?","ESTA","¿CÓMO?","NO ES"],"¿QUÉ?":["NO ESTÁ","VA","LISTO","VALE","NO","OKAY","¿CÓMO?","ESTA","NO ES","ESPERA","OTRO","¿ÉSTA?","¿ESA?","¿QUÉ?"],NO:["OTRO","ESTA","NO ES","¿QUÉ?","¿ÉSTA?","ESPERA","OKAY","LISTO","¿CÓMO?","NO ESTÁ","¿ESA?","VA","NO","VALE"],OTRO:["NO ES","OKAY","VA","VALE","OTRO","¿ESA?","ESPERA","¿CÓMO?","NO","¿ÉSTA?","NO ESTÁ","ESTA","LISTO","¿QUÉ?"],"¿CÓMO?":["ESTA","OKAY","VA","VALE","LISTO","OTRO","NO","¿ESA?","NO ESTÁ","¿ÉSTA?","NO ES","¿QUÉ?","¿CÓMO?","ESPERA"],LISTO:["VA","OKAY","ESTA","VALE","¿QUÉ?","¿ÉSTA?","¿ESA?","ESPERA","¿CÓMO?","LISTO","NO ESTÁ","OTRO","NO","NO ES"],"¿ÉSTA?":["ESTA","¿ÉSTA?","NO ESTÁ","¿CÓMO?","ESPERA","OTRO","VALE","NO","VA","¿QUÉ?","NO ES","LISTO","¿ESA?","OKAY"],ESTA:["ESPERA","¿CÓMO?","NO ESTÁ","¿ÉSTA?","VA","LISTO","OKAY","NO","¿ESA?","OTRO","ESTA","VALE","NO ES","¿QUÉ?"],"NO ESTÁ":["OKAY","NO ESTÁ","¿QUÉ?","NO","VALE","LISTO","OTRO","¿ÉSTA?","ESTA","NO ES","¿ESA?","ESPERA","VA","¿CÓMO?"],OKAY:["LISTO","¿CÓMO?","ESPERA","¿ESA?","NO","NO ES","¿ÉSTA?","OKAY","VALE","NO ESTÁ","ESTA","OTRO","VA","¿QUÉ?"],VALE:["OTRO","ESPERA","VA","¿ÉSTA?","¿CÓMO?","¿ESA?","NO","NO ES","NO ESTÁ","VALE","OKAY","¿QUÉ?","ESTA","LISTO"],VA:["VALE","NO","¿QUÉ?","LISTO","ESTA","¿CÓMO?","NO ES","VA","NO ESTÁ","ESPERA","OTRO","¿ESA?","¿ÉSTA?","OKAY"],"NO ES":["ESTA","NO","OTRO","VA","LISTO","NO ESTÁ","¿QUÉ?","¿ESA?","¿ÉSTA?","NO ES","¿CÓMO?","ESPERA","OKAY","VALE"],"¿ESA?":["OKAY","VALE","LISTO","ESPERA","¿ESA?","VA","¿CÓMO?","ESTA","OTRO","NO ESTÁ","¿QUÉ?","¿ÉSTA?","NO","NO ES"],OK:["DALE","¿DÓNDE?","BUENO","ÉSTA","BIEN","RÁPIDO","ESTÁ","YA ESTÁ","SÍ","OK","¿CUÁL?","¿SEGURO?","OTRA","NO SÉ"],"¿DÓNDE?":["BUENO","BIEN","¿SEGURO?","RÁPIDO","SÍ","OTRA","¿CUÁL?","YA ESTÁ","OK","NO SÉ","ÉSTA","DALE","ESTÁ","¿DÓNDE?"],BUENO:["¿CUÁL?","¿DÓNDE?","RÁPIDO","BUENO","BIEN","ESTÁ","DALE","NO SÉ","ÉSTA","OK","SÍ","YA ESTÁ","¿SEGURO?","OTRA"],ÉSTA:["OK","ÉSTA","ESTÁ","BIEN","¿CUÁL?","¿DÓNDE?","NO SÉ","BUENO","SÍ","RÁPIDO","DALE","OTRA","¿SEGURO?","YA ESTÁ"],ESTÁ:["OTRA","NO SÉ","ESTÁ","RÁPIDO","SÍ","DALE","BUENO","YA ESTÁ","ÉSTA","¿SEGURO?","BIEN","¿CUÁL?","¿DÓNDE?","OK"],"NO SÉ":["RÁPIDO","DALE","BIEN","SÍ","ÉSTA","ESTÁ","¿CUÁL?","OTRA","NO SÉ","OK","¿SEGURO?","YA ESTÁ","¿DÓNDE?","BUENO"],RÁPIDO:["RÁPIDO","BUENO","¿DÓNDE?","OK","OTRA","YA ESTÁ","¿CUÁL?","BIEN","DALE","¿SEGURO?","ÉSTA","ESTÁ","NO SÉ","SÍ"],"¿CUÁL?":["ESTÁ","NO SÉ","¿DÓNDE?","ÉSTA","BIEN","¿CUÁL?","OTRA","OK","RÁPIDO","¿SEGURO?","BUENO","DALE","YA ESTÁ","SÍ"],SÍ:["OK","YA ESTÁ","ÉSTA","BUENO","NO SÉ","OTRA","¿CUÁL?","¿SEGURO?","¿DÓNDE?","RÁPIDO","ESTÁ","BIEN","SÍ","DALE"],OTRA:["DALE","RÁPIDO","BIEN","SÍ","BUENO","ESTÁ","ÉSTA","YA ESTÁ","¿SEGURO?","OK","NO SÉ","¿DÓNDE?","¿CUÁL?","OTRA"],BIEN:["SÍ","RÁPIDO","¿CUÁL?","BUENO","YA ESTÁ","DALE","BIEN","¿SEGURO?","OTRA","¿DÓNDE?","ESTÁ","ÉSTA","NO SÉ","OK"],"YA ESTÁ":["¿DÓNDE?","NO SÉ","OTRA","¿CUÁL?","OK","ESTÁ","DALE","SÍ","ÉSTA","BIEN","YA ESTÁ","RÁPIDO","BUENO","¿SEGURO?"],DALE:["¿DÓNDE?","OTRA","¿SEGURO?","ÉSTA","OK","YA ESTÁ","RÁPIDO","ESTÁ","DALE","NO SÉ","SÍ","BIEN","BUENO","¿CUÁL?"],"¿SEGURO?":["ÉSTA","BIEN","NO SÉ","ESTÁ","YA ESTÁ","OTRA","¿CUÁL?","SÍ","RÁPIDO","OK","¿SEGURO?","DALE","¿DÓNDE?","BUENO"]},S=`
        <div class="col-2">
        <table class="table table-bordered border border-dark">
            <thead>
                <tr>
                <td class="primera-base-header col-2" colspan="2">Cabecera</td>
                </tr>
            </thead>
            <tbody>
                <tr class="primera-base-row">
                <td class="col-6"></td>
                <td class="col-6"></td>
                </tr>
                <tr class="primera-base-row">
                <td class="col-6"></td>
                <td class="col-6"></td>
                </tr>
                <tr class="primera-base-row">
                <td class="col-6"></td>
                <td class="col-6"></td>
                </tr>
            </tbody>
        </table>
        </div>`,A=`
        <div class="col">
        <table class="table table-bordered border border-dark">
            <tbody>
            </tbody>
        </table>
        </div>`;window.addEventListener("load",()=>{!function(E){let A=$(E);for(let[E,T]of Object.entries(O)){html=$.parseHTML(S),$(html).find(".primera-base-header").html(E),A.append(html);let O=$(html).find(".primera-base-row td");console.log(T),$(O[T]).html('<i class="fa fa-eye"></i>')}}("#primera-base-paso1"),function(O){let S=$(O),T=$.parseHTML(A);for(let[O,S]of Object.entries(E)){let E=S.join(", "),A=`<tr class="primera-base-row">
        <td class="word col-2">${O}</td>
        <td class="sequence col-10">${E}</td>
        </tr>`;$("tbody",T).append($.parseHTML(A))}$(S).append(T)}("#primera-base-paso2")});
//# sourceMappingURL=index.7cd6b40d.js.map
