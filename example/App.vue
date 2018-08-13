<template>
	<div class="j-w">
		<h1 class="t">Vue-edit-json</h1>
		<div class="editor-w clearfix">
			<div class="w-2">
				<div class="editor">
					<JsonEditor :is-edit="false" :objData="jsonData" v-model="jsonData" ></JsonEditor>
				</div>
			</div>
			<div class="w-2">
				<JsonEditor :is-edit="true" :objData="jsonData" v-model="jsonData" ></JsonEditor>
			</div>
		</div>
	</div>
</template>

<script>
import pkgJson from '../package.json'

export default {
	name: 'app',
	data: function() {
		return {
			jsonData: pkgJson
		}
	},

	methods: {
	},
}
</script>

<style>

</style>


