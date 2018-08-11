<template>
	<div class="j-w">
		<h1 class="t">Vue-edit-json</h1>
		<div class="editor-w clearfix">
			<div class="w-2">
				<div class="editor">
					<JsonEditor :objData="jsonData" v-model="jsonData" ></JsonEditor>
				</div>
			</div>
			<div class="w-2">
				<div class="code-pre">
					<div slot="content">
						<pre>
							<code class="json" id="res_code"></code>
						</pre>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import package from '../package.js'

export default {
	name: 'app',
	data: function() {
		return {
			jsonData: package
		}
	},

	methods: {
	},
}
</script>

<style>

</style>


