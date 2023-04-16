<template>
	<div id="wrap" class="wrap-sign">
		<div class="page-sign">
			<div id="header"></div>
			<div class="login-register-unite">
				<div class="side-slide-box">
					<ul class="desc-list"></ul>
				</div>
				<div class="login-register-content">
					<div class="login-phone-wrapper">
						<h3 class="title">{{ registerStore.form.title }}</h3>
						<div class="loginform">
							<AppLoginform v-if="registerStore.formType == 'login'" />
							<AppRegisterForm v-else />
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script lang="ts" setup>
import AppLoginform from "./components/loginform/index.vue";
import AppRegisterForm from "./components/register/Register.vue";
import { useRegisterStore } from "@/stores/register/index";
const registerStore = useRegisterStore();
</script>

<style lang="scss" scoped>
#wrap {
	min-height: 100%;
	overflow: visible;
	overflow-x: hidden;
}
.wrap-sign {
	height: 100%;
}
.page-sign {
	width: 100vw;
	height: 100vh;
	background: #6979cb url(https://img.bosszhipin.com/static/file/2022/zlqc2m9fao1667185843533.png) bottom/100% auto no-repeat;
	#header {
		background: 0 0;
		box-shadow: none;
	}
}
.login-register-unite {
	position: absolute;
	top: 50%;
	left: 50%;
	z-index: 2;
	box-sizing: border-box;
	width: 728px;
	height: 580px;
	margin-top: -290px;
	margin-left: -364px;
	background: #ffffff;
	border-radius: 28px;
	box-shadow: 0 6px 13px 0 rgb(0 0 0 / 10%);
}
.side-slide-box {
	box-sizing: border-box;
	float: left;
	width: 240px;
	height: 100%;
	padding-left: 32px;
	font-size: 14px;
	background: linear-gradient(192deg, #697ecb, #edded2);
	border-radius: 28px 0 0 28px;
	.desc-list {
		overflow: hidden;
		li {
			margin-top: 50px;
		}
	}
}
.login-phone-wrapper {
	position: relative;
	width: 360px;
	margin: 0 auto;
}
.title {
	margin-top: 10%;
	font-size: 22px;
	font-weight: 500;
	line-height: 30px;
	color: #222222;
	text-align: center;
}
a,
b,
body,
button,
dd,
div,
dl,
em,
footer,
form,
h1,
h2,
h3,
h4,
h5,
h6,
i,
input,
label,
li,
nav,
p,
select,
span,
td,
textarea,
u,
ul {
	padding: 0;
	margin: 0;
	-webkit-tap-highlight-color: transparent;
	text-size-adjust: none;
}
ul {
	display: block;
	padding-inline-start: 40px;
	margin-block-start: 1em;
	margin-block-end: 1em;
	margin-inline-start: 0;
	margin-inline-end: 0;
	list-style-type: disc;
}
.loginform {
	margin-top: 10%;
	margin-left: 40%;
}
</style>
