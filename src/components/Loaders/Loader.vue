<template>
    <div>
       <p style="font-weight:500;font-size:20px;" class="ml-12 text-left">Loading...</p>
        <p class="display-2 count text-md-center text-sm-center text-xs-center count-container">
            <v-progress-circular :size="50" class="mt-n5" color="primary" indeterminate/>
        </p>
    </div>
</template>

<script>
    export default {
        name: "loading",
        components: {},
        data: () => ({})
    };
</script>
<style>
    .header-text {
        text-transform: uppercase;
        font-weight: bold;
    }

    .header-bar {
        background-color: #1aa8da;
        height: 5px;
    }

    .header-container,
    .count-container {
        padding-top: 12px !important;
        padding-left: 16px !important;
    }

    .count {
        /* color: #1AA8DA; */
        font-weight: bold;
        align-items: center;
    }

    .align-end {
        text-align: end;
    }

    .percent-bold {
        font-weight: bold;
    }
</style>
