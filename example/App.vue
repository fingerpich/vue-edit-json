<template>
	<div class="demo-app">
		<div class="editor-w clearfix">
			<div class="w-2">
				<div class="editor">
					<JsonEditor :is-edit="false" v-model="jsonData"></JsonEditor>
				</div>
			</div>
			<div class="w-2 editable">
				<JsonEditor :is-edit="true" v-model="jsonData"></JsonEditor>
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


