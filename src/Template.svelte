<script>
    export let title
    export let image
    export let tags
</script>

<div>
    <h1>{title}</h1>
    <img src={image} alt="File not found"/>
    {#each tags as tag}
        <div>{tag}</div>
    {/each}
</div>

<style>
    div{
        background-color: #404050;
        width: 600px;
        text-align: center;
        margin-left: auto;
        margin-right: auto;
    }
    img{
        max-height: 800px;
        max-width: 400px;
    }
</style>