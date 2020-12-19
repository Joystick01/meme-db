<script>
    import { each } from "svelte/internal";
    import { onMount } from 'svelte';
    import { db } from "./firebase"
    import Template from './Template.svelte'

    let templates = []
    let loader
    var options = {
            root: null,
            rootMargin: "20px",
            threshold: 1.0
    };
    const observer = new IntersectionObserver(handleObserver, options);

    onMount(() => {
		db.collection('templates').orderBy("id", "desc").limit(2).get()
            .then(querySnapshot => {
            querySnapshot.forEach(doc => {
                templates = [...templates, doc.data()]
            });
        })
        .catch(err => {
            console.log(err.message);
        });

        if (loader) {
            observer.observe(loader);
        }
	});

    function handleObserver(entities) {
        const target = entities[0];
        if (target.isIntersecting) {
            loadNextPage()
        }
    }

    function loadNextPage(){
        if(templates.length){
            db.collection('templates').orderBy("id", "desc").startAfter(templates[templates.length - 1].id).limit(2).get().then(querySnapshot => {
                if(querySnapshot.empty) observer.disconnect()
                querySnapshot.forEach(doc => {
                    templates = [...templates, doc.data()]
                });
                })
                .catch(err => {
                    console.log(err.message);
                });
        }
    }
    
</script>

{#each templates as template}
    <Template {...template}/>
{/each}
<div bind:this={loader}><h2>Load More</h2></div>