<template>
  <div>
    <template>
      <el-dialog
        :title="title"
        width="600px"
        height="300px"
        :visible.sync="visible"
        :before-close="handleClsoe"
      >
        <el-form
          ref="roleDialogForm"
          :model="formDate"
          style="padding:20px 0"
          label-width="80px"
        >
          <el-form-item
            prop="name"
            label="点位名称"
            :rules="[{required:true,message:'名字不能为空',trigger:'blur'}, { min: 1, max: 15, message: '区域名称长度1--15', trigger: 'blur' }]"
          >
            <el-input v-model.trim="formDate.name" />
          </el-form-item>
          <el-form-item label="所在区域">
            <el-select v-model="formDate.regionId" placeholder="所在区域">
              <el-option v-for="item in theregionallist" :key="item.id" :label="item.name" :value="item.id" />
              <!-- <el-option label="区域一" value="shanghai" />
            <el-option label="区域二" value="beijing" /> -->
            </el-select>
          </el-form-item>
          <el-form-item label="所在商圈">
            <el-select v-model="formDate.Business" placeholder="所在商圈">
              <el-option v-for="item in Businesscircle" :key="item.id" :label="item.name" :value="item.id" />
              <!-- <el-option label="区域一" value="shanghai" />
            <el-option label="区域二" value="beijing" /> -->
            </el-select>
          </el-form-item>
          <el-form-item label="归属合作商ID">
            <el-select v-model="formDate.ownerId" placeholder="归属合作商ID">
              <el-option v-for="item in partnersList" :key="item.id" :label="item.name" :value="item.id" />
              <!-- <el-option label="区域一" value="shanghai" />
            <el-option label="区域二" value="beijing" /> -->
            </el-select>
          </el-form-item>
          <el-form-item label="归属合作商">
            <el-select v-model="formDate.ownerName" placeholder="归属合作商">
              <el-option v-for="item in partnersList" :key="item.id" :label="item.name" :value="item.name" />
              <!-- <el-option label="区域一" value="shanghai" />
            <el-option label="区域二" value="beijing" /> -->
            </el-select>
          </el-form-item>
          <el-form-item label="详细地址">
            <el-cascader
              v-model="formDate.selectedOptions"
              size="large"
              :options="options"
              @change="handleChange"
            />
          </el-form-item>
          <el-form-item
            prop="addr"
            :rules="[{required:true,message:'备注不能为空',trigger:'blur'}, { min: 1, max: 50, message: '备注长度1--50', trigger: 'blur' }]"
          >
            <el-input v-model.trim="formDate.addr" type="textarea" row="3" />
          </el-form-item>
        </el-form>
        <el-row slot="footer" type="flex" justify="center" align="middle" class="dialog-footer">
          <el-button @click="handleClsoe">取 消</el-button>
          <el-button type="primary" :loading="loading" @click="getBtn">确 定</el-button>
        </el-row>
      </el-dialog>
    </template>
  </div>
</template>
<script>
import { postpointAPI, putpointAPI } from '@/api/point'
import { regionData, CodeToText } from 'element-china-area-data'
export default {
  name: 'NewRegionsss',
  components: {
  },
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    theregionallist: {
      type: Array,
      required: true
    },
    partnersList: {
      type: Array,
      required: true
    },
    createUserId: {
      type: [String, Number],
      required: true

    }
  },
  data() {
    return {
      formDate: {
        name: '',
        regionId: '',
        Business: '',
        ownerId: '',
        ownerName: '',
        addr: '',
        selectedOptions: ''
      },
      Businesscircle: [
        { id: 1, name: '学校' },
        { id: 2, name: '工厂' },
        { id: 3, name: '写字楼' },
        { id: 4, name: '交通枢纽' }
      ],
      options: regionData,
      rules: {
        name: [
          { required: true, message: '区域名称不能为空', trigger: 'blur' }

        ],
        addr: [{ required: true, message: '备注说明不能为空', trigger: 'blur' }

        ]
      },
      loading: false

    }
  },
  computed: {
    title() {
      return this.formDate.id ? '编辑角色' : '新增角色'
    }
  },
  methods: {
    handleClsoe() {
      this.$emit('update:visible', false)
      this.$refs.roleDialogForm.resetFields()
      // this.$refs.roleDialogForm.resetFields()

      this.formDate = {}
    },
    async getBtn() {
      this.loading = true
      try {
        this.formDate.id ? await putpointAPI(this.formDate.id, {
          name: this.formDate.name,
          addr: this.formDate.addr,
          regionId: this.formDate.regionId,
          businessId: this.formDate.Business,
          ownerId: this.formDate.ownerId,
          ownerName: this.formDate.ownerName,
          // eslint-disable-next-line no-dupe-keys
          addr: this.formDate.addr,
          areaCode: this.formDate.selectedOptions[2],
          createUserId: this.createUserId }) : await postpointAPI(
          {
            name: this.formDate.name,
            addr: this.formDate.addr,
            regionId: this.formDate.regionId,
            businessId: this.formDate.Business,
            ownerId: this.formDate.ownerId,
            ownerName: this.formDate.ownerName,
            // eslint-disable-next-line no-dupe-keys
            addr: this.formDate.addr,
            areaCode: this.formDate.selectedOptions[2],
            createUserId: this.createUserId
          }
        )
        this.$refs.roleDialogForm.resetFields()
        this.$message.success(this.formDate.id ? '编辑成功' : '创建成功')
        this.handleClsoe()
        console.log(123)
        this.$emit('postLevelManagement')
      } catch (error) {
        this.$message.error('创建失败')
      } finally {
        this.loading = false
      }
    },
    handleChange(value) {
      this.formDate.addr = (CodeToText[value[0]] + CodeToText[value[1]] + CodeToText[value[2]])
    //   console.log(Code)
    //   this.selectedOptionsList = [CodeToText[value[0]], CodeToText[value[1]], CodeToText[value[2]]]
    }

  }
}
</script>

    <style scoped lang="scss">

    </style>

