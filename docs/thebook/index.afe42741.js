const t={PRÓXIMA:2,VOY:1,PRIMERO:5,HAYA:1,VAYA:5,VA:2,ESPERA:4,RÁPIDO:3,MONITOR:5,ÚLTIMA:2,SÍ:5,DALE:3,HAY:3,OTRA:4,BIEN:4,PALABRA:5,NADA:3,BAYA:5,LISTO:3,OKAY:3,BUENO:0,NO:5,ALLÁ:4,EXPLOTÓ:3,AHÍ:2,HALLA:5,VALLA:1,OTRO:5},a=`
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
        </div>`;window.addEventListener("load",()=>{!function(e){let r=$(e);for(let[e,s]of Object.entries(t)){html=$.parseHTML(a),$(html).find(".primera-base-header").html(e),r.append(html);let t=$(html).find(".primera-base-row td");console.log(s),$(t[s]).html('<i class="fa fa-eye"></i>')}}("#primera-base")});
//# sourceMappingURL=index.afe42741.js.map
