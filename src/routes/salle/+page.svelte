<script lang="ts" setup>
  import { onMount } from "svelte";


    let jours = ["Lundi","Mardi","Mercredi","Jeudi","Vendredi"]
    let code = ""
    
    type sallestype = {
        jour:string,
        events:[number,number,string][]
    }            

    let data: sallestype[] = []
    let date = Math.floor(Date.now()/1000)

    onMount(async() => {

        code = decodeURIComponent ( window.location.hash.slice(0) ).slice(1)

        let day = ( new Date(date*1000).getDay() - 1 ) * 24 * 60 * 60
        let hours = ( new Date(date*1000).getHours() ) * 60 * 60
        let minutes = ( new Date(date*1000).getMinutes() ) * 60
        date = date - day - hours - minutes

        let inter2 = []
        for ( let i=0;i<5;i++){
            let inter:sallestype = {}
            let time = date+i*24*60*60

            let response = await salleEvents(code,time)
            if ( !response.error ){
                inter = {
                    jour : jours[i],
                    events : response
                }
            }
            else {
                inter = {
                    jour : jours[i],
                    events : []
                }
            }
            inter2.push(inter)
        }
        data = inter2;
    })

    
    const hours : number[] = [
        7,8,9,10,11,12,13,14,15,16,17,18,19,20,21
    ];

    function get_time(timestamp: number) : number{
        let date = new Date(timestamp*1000)
        return date.getHours() + date.getMinutes() / 60
    }
</script>

<h1>{code.replaceAll("_"," ")}</h1>

    <div-planning>

        <rowbody>
            {#each data as day}
            <column class="events-list">
                <titre>{day.jour}</titre>
                {#each day.events as event}
                <div style="top:calc( 66px + 50px * {get_time(event[0])-hours[0]});height: calc( 50px * {get_time(event[1])-get_time(event[0])})">
                    {event[2]}
                </div>
                {/each}
            </column>
            {/each}
        </rowbody>
        <row-legend>
            {#each hours as y}
            <div class="lines" style="left:70px; top:calc( 50px * {y-hours[0]})">
                <span class="text">{y%24}h00</span>
                <span class="line"></span>
            </div>
            {/each}
        </row-legend>
    </div-planning>

<style>

    h1 {
        text-align: center;
    }

    div-planning{
        padding-left: 70px !important;
        max-width: 1000px; 
        width: cacl( 100% - 70px);
        display: grid;
        position:relative;
        margin: auto;

        grid-template-columns: 1fr;
    }

    div-planning > * {
        --days : 5;
        width:100%;
        height: auto;
        display: grid;
        grid-auto-flow: column;
        grid-template-columns: repeat(5, 200px);
    }


    titre{
        /* margin: 20px 5px;
        width: calc(100% - 10px); */
        padding: 16px;
        text-align: center;
        display: block;
        font-size: 1.2em;
    }

    div-planning > row-legend{
        position: absolute;
        height: calc( 50px * var(--hours) );
        top:66px;
        z-index: -1;
    }

    div-planning > row-legend > .lines{
        position: absolute;
        right:0;
        width: 100%;
    }
    
    div-planning > row-legend > .lines > .text{
        transform: translate(-150%,-50%);
        position: absolute;
    }
    div-planning > row-legend > .lines > .line{
        border-top: 1px solid var(--text);
        top:0;
        display: block;
        width:calc(100% - 70px);
    }

    rowbody {
        width: 100%;
        overflow-x: auto;
        height:900px;
    }

    column > * {
        /* text-overflow: '..'; */
        overflow: hidden;
        
    }

    .events-list {
        position: relative;
        height: calc( 50px * var(--hours) );
    }
    .events-list > div {
        --decalage : 0.1em;
        border-radius: 0.6em;
        margin: 0 var(--decalage);
        width: calc(100% - var(--decalage)*2 - 16px);
        position: absolute;
        left:0;
        background: var(--blue);
        padding:0 8px ;

    }

</style>