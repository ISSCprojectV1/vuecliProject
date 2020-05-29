<template>
    <div>
        <el-form :model="user" class="registry" :rules="rules" ref="userform" status-icon>
            <el-form-item label="用户名" prop="accountId" >
                <el-input v-model="user.accountId" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="姓名" prop="name" >
                <el-input v-model="user.name" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="密码" prop="pass">
                <el-input type="password" v-model="user.pass" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="确认密码" prop="checkPass">
                <el-input type="password" v-model="user.checkPass" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="联系电话" prop="telephone">
                <el-input v-model="user.telephone"></el-input>
            </el-form-item>
            <el-form-item label="邮箱地址" prop="email">
                <el-input v-model="user.email"></el-input>
            </el-form-item>
            <el-form-item label="身份" prop="type">
                <el-radio-group v-model="user.type">
                    <el-radio label="管理员"></el-radio>
                    <el-radio label="普通用户"></el-radio>
                </el-radio-group>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="submitForm(user)">注册</el-button>
                <el-button @click="resetForm(user)">重置</el-button>
            </el-form-item>

        </el-form>
    </div>
</template>

<script>
    import {register} from "@/api/part3";

    export default {
        name: "Registry",
        data(){
            let checkaccountId = (rule, value, callback) => {
                if (!value)
                    return callback(new Error('用户名不能为空'));
                else
                {
                    /*
                    let zg = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]*$/;
                    if (!zg.test(value)) {
                        return callback(new Error('用户名必须是数字和字母的组合'));
                    }
                     */
                    return callback();
                }
            };
            let checkName = (rule, value, callback) => {
                if (!value)
                    return callback(new Error('用户名不能为空'));
                else
                {
                    /*
                    let zg = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]*$/;
                    if (!zg.test(value)) {
                        return callback(new Error('用户名必须是数字和字母的组合'));
                    }
                     */
                    return callback();
                }
            };
            let checkpass = (rule, value, callback) => {
                if (!value)
                    return callback(new Error('请输入密码'));
                else
                    if (value.length<8)
                        return callback(new Error('密码不得少于8位'));
                    return callback();
            };
            let checkpass2 = (rule, value, callback) => {
                if (!value)
                    return callback(new Error('请再次输入密码'));
                else
                    if (value!==this.user.pass)
                        return callback('两次输入密码不一致!');
                    return callback();
            };
            let checktelephone = (rule, value, callback) => {
                if (!value)
                    return callback(new Error('请输入电话'));
                else{
                    let length = value.length;
                        if(length !=11 || isNaN(value)) {
                            return callback(new Error('请输入正确的电话号码'));
                        }
                return callback();
            }
            };

            let checkemail = (rule, value, callback) => {
                if (!value)
                    return callback(new Error('请输入邮箱'));
                else
                {
                    let pattern = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
                    if(!pattern.test(value))
                        return callback('请输入正确的邮箱地址!');
                    return callback();
                }
            };
            return {
                user:{
                    accountId:"",
                    name:"",
                    pass:"",
                    checkPass:"",
                    telephone:"",
                    email:"",
                    type:""
                },
                rules:{
                    accountId:[
                        {required:true,validator: checkaccountId,trigger:'blur'}
                    ],
                    name:[
                        {required:true,validator: checkName,trigger:'blur'}
                    ],
                    pass:[
                        {required:true,validator:checkpass,trigger:'blur'}
                    ],
                    checkPass:[
                        {required:true,validator:checkpass2,trigger:'blur'}
                    ],
                    telephone:[
                        {required:true,validator:checktelephone,trigger:'blur'}
                    ],
                    email:[
                        {required:true,validator:checkemail,trigger:'blur'}
                    ],
                    type:[
                        {required:true,message:"请至少选择一种身份",trigger:'blur'}
            ]
                }
            }
        },
        methods:
            {
                submitForm(user){
                    this.$refs['userform'].validate((valid) => {
                        if (valid) {
                            let data={}
                            data.name = user.name
                            data.password = user.pass
                            data.accountId = user.accountId
                            register(data).then(()=>{
                                console.log("register success!")
                                this.$router.push('/login')
                            }).catch(()=>{
                                console.log("register fail")
                            })
                        } else {
                            console.log('error submit!!');
                            return false;
                        }
                    });
                },
                resetForm(formName) {
                    this.$refs[formName].resetFields();
                }
            }
    }
</script>

<style scoped>
    .registry{
        width: 400px;
        height: 600px;
        margin:0px auto;
        box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
        border-radius: 30px;
        padding:20px 40px 40px 20px;
        opacity: 1;
    }
    .span-box{
        display:inline-block;
        position:relative;
    }
    .ico-pre{
        position:absolute;
        left:-21px;
        top:12px;
    }
</style>
