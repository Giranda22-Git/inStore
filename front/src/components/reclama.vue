<template>
    <div class="reclama">
        <div class = "reclamaContent" v-for="(i) in number" :key=i>
            Реклама
        </div>
    </div>
</template>

<script>
export default {
    props:{
        number: Number
    }
}
</script>

<style scoped>
.reclama{
    width: 100%;
    min-height: 300px;
    display: flex;
    flex-direction: row;
    justify-content: space-around;
}
.reclamaContent{
    color: black;
    font-size: 1em;
    letter-spacing: 0.4em;;
    padding: 250px 0 0 5px;
    width: calc(100% - 25px);
    margin: 10px;
    border-radius: 10px;
    background: linear-gradient(20deg, rgba(180,177,176,1) 0%, rgba(255,255,255,1) 100%);
}
@media (max-width: 900px) {
    .reclama{
        flex-direction: column;
    }
}
</style>