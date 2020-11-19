<template>
  <b-container fluid class="text-center bg-info p-5">
    <b-row>
      <b-col>
        <slot name="title" />
        <EntryHeaderBreadcrumb />
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
export default {}
</script>
