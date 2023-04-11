<template>
    <div>
        <!--注册页面-->
        <div>
            <div class="register">
                <div class="register-title">
                    <h1 v-show="accountType ==='1'">学生注册</h1>
                    <h1 v-show="accountType ==='2'">企业注册</h1>
                </div>
                <div class="register-form">
                    <el-form 
                    ref="registerFormRef"
                    :model= form
                    :rules="rules"
                    label-width="130px">
                        <el-form-item label="用户名：" prop="username">
                            <el-input v-model="form.username" />
                        </el-form-item>
                        <el-form-item label="密码：" prop="password">
                            <el-input v-model="form.password" />
                        </el-form-item>
                        <div v-if="accountType ==='2'">
                            <el-form-item label="企业名称：" prop="companyName" :rules="[{ required: true, message: '企业名称不能为空！', trigger: 'blur' }]">
                                <el-input v-model="form.companyName" />
                            </el-form-item>
                            <el-form-item label="企业地址：" prop="companyAddress" :rules="[{ required: true, message: '企业地址不能为空！', trigger: 'blur' }]">
                                <el-input v-model="form.companyAddress" />
                            </el-form-item>
                            <el-form-item label="企业联系人：" prop="contact" :rules="[{ required: true, message: '企业联系人不能为空！', trigger: 'blur' }]">
                                <el-input v-model="form.contact" />
                            </el-form-item>
                            <el-form-item label="企业联系人电话：" prop="contactPhone" :rules="[{ required: true, message: '企业联系人电话不能为空！', trigger: 'blur' }]">
                                <el-input v-model="form.contactPhone" />
                            </el-form-item>
                            <el-form-item label="工商注册号：" prop="businessLicense" :rules="[{ required: true, message: '工商注册号不能为空！', trigger: 'blur' }]">
                                <el-input v-model="form.businessLicense" />
                            </el-form-item>
                        </div>
                    </el-form>
                    <n-grid :x-gap="12" :y-gap="8" :cols="1">
                        <n-grid-item>
                            <n-button block type="primary" ghost color="#6979cb" round @click="submitForm(registerFormRef)">注册</n-button>
                            <n-button block type="primary" ghost color="#6979cb" round @click="restForm()">重置</n-button>
                        </n-grid-item>
                    </n-grid>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import {useUserStore} from "@/store/user";
import {useRegisterStore} from "@/store/register";
import {type FormInstance } from 'element-plus'

const registerFormRef = ref<FormInstance>()

const loginStore = useUserStore();
console.log(loginStore.$state.accountType)
const accountType = loginStore.accountType
const registerStore = useRegisterStore();
const form = registerStore.$state.form;
const rules = registerStore.$state.rules;

const submitForm = async (formEl: FormInstance | undefined) => {
  if (!formEl) return
  await formEl.validate((valid, fields) => {
    if (valid) {
        registerStore.register().then((res: any) => {
            console.log(res)
        })
    } else {
      console.log('error submit!', fields)
    }
  })
}
const restForm = ()=>{
    registerFormRef.value?.resetFields()
}
</script>

<style scoped>

</style>