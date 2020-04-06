<template>
  <div>
    <h2>Search</h2>
    <p>query参数:{{$route.query.keyword}}</p>
    <p>params参数:{{$route.params.keyword}}</p>
  </div>
</template>

<script>
export default {
 name: 'Search',
 data(){
   return{}
 }
}
</script>

<style lang = "less" scoped>

</style>
