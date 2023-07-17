<template>
  <div
    @click="onClickDetail"
    class="cursor-pointer flex justify-start flex-col items-start w-full p-3 border rounded"
  >
    <a-modal
      :footer="null"
      maskClosable
      centered
      v-model="showDialogDetail"
      title="Detail Transaksi"
    >
      <div v-if="productDetail !== null" class="flex w-full flex-col">
        <div class="w-full flex flex-col">
          <span class="text-sm">Status</span>
          <span
            :class="[
              'font-medium text-base',
              productTransactionStatusMapper.get(
                productDetail.productTransactionStatus
                  .productTransactionStatusId
              )?.color,
            ]"
            >{{
              productDetail.productTransactionStatus
                .productTransactionStatusName
            }}</span
          >
        </div>
        <a-divider class="my-3"></a-divider>
        <div class="w-full flex flex-row justify-between">
          <span class="text-sm">Id transaksi</span>
          <span class="font-bold text-sm"
            >#{{ productDetail.productTransactionId }}</span
          >
        </div>
        <div class="w-full mt-1 flex flex-row justify-between">
          <span class="text-sm">Tanggal transaksi</span>
          <span class="font-bold text-sm">{{
            $helpers.fullDate(productDetail.createDate)
          }}</span>
        </div>
        <div
          v-if="
            productDetail.productTransactionStatus
              .productTransactionStatusId === 6
          "
          class="w-full mt-1 flex flex-row justify-between"
        >
          <span class="text-sm">Tanggal pembatalan</span>
          <span class="font-bold text-sm">{{
            $helpers.fullDate(productDetail.cancelDate)
          }}</span>
        </div>
        <div
          v-if="
            productDetail.productTransactionStatus
              .productTransactionStatusId === 6
          "
          class="w-full mt-1 flex flex-row justify-between"
        >
          <span class="text-sm">Dibatalkan oleh</span>
          <span class="font-bold text-sm">
            {{
              productDetail.canceledBy.userType.userTypeId === 3
                ? productDetail.client.fullname
                : productDetail.product.seller.fullname
            }}
          </span>
        </div>
        <a-divider class="my-3"></a-divider>
        <span class="font-bold text-base">Detail Produk</span>
        <div class="w-full mt-3 flex flex-row justify-between">
          <span class="text-sm">Mentor</span>
          <div class="flex justify-center items-center flex-row">
            <a-avatar
              class="cursor-pointer"
              size="small"
              style="background-color: #e31e52"
            >
              <span class="text-base font-semibold">{{
                $helpers.intialString(productDetail.product.seller.fullname)
              }}</span>
            </a-avatar>
            <span class="ml-2 font-semibold text-black text-sm">{{
              productDetail.product.seller.fullname
            }}</span>
          </div>
        </div>
        <div
          @click="$router.push('/product/' + productDetail.product.productId)"
          class="w-full mt-3 cursor-pointer grid grid-cols-12 py-4 px-3 gap-4 justify-between border rounded-md"
        >
          <div class="col-span-8 flex flex-row justify-start items-start">
            <img
              :src="productDetail.product.image"
              v-if="productDetail.product.image !== null"
              alt="Img product"
              class="h-[40px] object-cover"
            />
            <i
              v-if="productDetail.product.image === null"
              class="ri-image-fill mx-2 text-[40px] text-gray-300"
            ></i>
            <div class="w-full ml-3 flex flex-col items-start justify-start">
              <span class="text-sm font-semibold text-black">{{
                productDetail.product.productName
              }}</span>
              <span class="text-xs mt-1"
                >Rp.{{
                  $helpers.currencyFormat(productDetail.product.productPrice)
                }}</span
              >
            </div>
          </div>
          <div class="col-span-4 flex flex-row justify-start items-start">
            <div
              class="w-full border-l h-full flex flex-col items-end text-end justify-center"
            >
              <span class="text-sm">Total pembayaran</span>
              <span class="text-xs font-semibold text-black mt-1"
                >Rp.{{
                  $helpers.currencyFormat(productDetail.product.productPrice)
                }}</span
              >
            </div>
          </div>
        </div>
        <div
          v-if="
            productDetail.productTransactionStatus
              .productTransactionStatusId === 2 ||
            productDetail.productTransactionStatus
              .productTransactionStatusId === 4 ||
            productDetail.productTransactionStatus
              .productTransactionStatusId === 3
          "
          class="w-full flex flex-col mt-4"
        >
          <span class="font-bold text-base">Bukti pembayaran</span>
          <a-alert
            class="mt-4"
            message="Catatan"
            :description="productDetail.note"
            type="info"
            banner
            show-icon
          />
          <a-upload-dragger
            v-if="productDetail.proof === null"
            class="mt-3"
            name="file"
            :showUploadList="false"
            accept=".jpg, .jpeg, .png"
            :customRequest="onUpload"
            :multiple="false"
          >
            <p class="ant-upload-drag-icon">
              <a-icon type="inbox" />
            </p>
            <p
              v-if="
                productDetail.productTransactionStatus
                  .productTransactionStatusId === 3
              "
              class="text-sm"
            >
              Upload ulang bukti pembayaran
            </p>
            <p class="ant-upload-text">
              Klik atau seret file di area ini untuk upload
            </p>
            <p class="ant-upload-hint">
              Hanya mendukung file gambar dengan format (png,jpg,jpeg)
            </p>
          </a-upload-dragger>
          <div
            class="w-full flex justify-center flex-col items-center border border-dashed rounded py-5 mt-3"
            v-if="productDetail.proof !== null"
          >
            <img
              :src="productDetail.proof"
              alt="Img product"
              class="cursor-pointer h-[140px]"
              @click="onClickProof"
            />
          </div>
          <div v-if="productDetail.proof !== null">
            <a-divider class="mb-4"></a-divider>
            <a-button type="primary" @click="productDetail.proof = null" block
              >Upload ulang</a-button
            >
          </div>
          <div
            v-if="
              productDetail.proof === null &&
              productDetail.productTransactionStatus
                .productTransactionStatusId === 3
            "
          >
            <a-divider class="mb-4"></a-divider>
            <a-button type="secondary" @click="onClickDetail" block
              >Batal</a-button
            >
          </div>
        </div>
        <div
          v-if="
            productDetail.productTransactionStatus
              .productTransactionStatusId === 1 ||
            productDetail.productTransactionStatus
              .productTransactionStatusId === 2 ||
            productDetail.productTransactionStatus
              .productTransactionStatusId === 4
          "
        >
          <a-divider class="mb-4"></a-divider>
          <a-button
            :disabled="isLoadingCancel"
            :loading="isLoadingCancel"
            @click="onClickCancel"
            type="primary"
            block
            >Batalkan transaksi</a-button
          >
        </div>
        <div
          v-if="
            productDetail.productTransactionStatus
              .productTransactionStatusId === 5
          "
          class="w-full flex mt-4 flex-col"
        >
          <span class="font-bold text-base">Penilaian</span>
          <div class="w-full flex justify-center flex-col items-center">
            <div
              v-if="productDetail.rating === 0"
              class="w-full items-center flex flex-col"
            >
              <a-rate v-model="formRating.rating" />
              <a-textarea
                v-model="formRating.ratingDescription"
                class="w-full mt-3"
                placeholder="Catatan (opsional)"
              ></a-textarea>
            </div>
            <div
              v-if="productDetail.rating !== 0"
              class="w-full items-center flex flex-col"
            >
              <a-rate v-model="productDetail.rating" />
              <a-textarea
                v-model="productDetail.ratingDesctiption"
                class="w-full mt-3"
                disabled
                placeholder="Catatan (opsional)"
              ></a-textarea>
            </div>
            <a-button
              class="mt-4"
              v-if="productDetail.rating === 0"
              block
              type="primary"
              :disabled="formRating.rating === 0 || isLoadingUpdateRating"
              :loading="isLoadingUpdateRating"
              @click="onClickUpdateRating"
              >Kirim Penilaian</a-button
            >
          </div>
        </div>
      </div>
    </a-modal>
    <div class="flex justify-start items-center flex-row">
      <span class="text-xs">{{ $helpers.fullDate(createDate) }}</span>
      <div
        :class="[
          'px-2 ml-2 py rounded',
          productTransactionStatusMapper.get(productTransactionStatusId)?.bg,
        ]"
      >
        <span class="font-semibold text-xs">{{
          productTransactionStatusName
        }}</span>
      </div>
      <span class="text-xs ml-2">#{{ productTransactionId }}</span>
    </div>
    <div class="flex mt-2 justify-start items-center flex-row">
      <a-avatar
        class="cursor-pointer"
        size="small"
        style="background-color: #e31e52"
      >
        <span class="text-base font-semibold">{{
          $helpers.intialString(sellerName)
        }}</span>
      </a-avatar>
      <span class="ml-2 font-medium text-sm text-black">{{ sellerName }}</span>
    </div>
    <div class="w-full grid items-center mt-2 grid-cols-12 gap-4">
      <div class="flex col-span-8 justify-start items-center flex-row">
        <img
          :src="productImage"
          v-if="productImage !== null"
          alt="Img product"
          class="h-[40px] object-cover"
        />
        <i
          v-if="productImage === null"
          class="ri-image-fill m-2 text-[40px] text-gray-300"
        ></i>
        <div class="flex justify-center flex flex-col ml-2">
          <span class="ml-2 font-medium text-sm text-black">{{
            productName
          }}</span>
          <span class="ml-2 mt-1 text-sm"
            >Rp.{{ $helpers.currencyFormat(productPrice) }}</span
          >
        </div>
      </div>
      <div class="border-l flex flex-col px-5 py-4 col-span-4">
        <span class="font-semibold">Total Pembayaran</span>
        <span>Rp.{{ $helpers.currencyFormat(amount) }}</span>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { Component, Prop } from "vue-property-decorator";
import { ProductTransactionStatusMapper } from "@/types/mapper";
import { ProductTransactionApi } from "@/api/product-transaction.api";
import { getApp } from "firebase/app";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";

@Component
export default class CommonCardProductTransaction extends Vue {
  @Prop()
  productName!: string;

  @Prop()
  productPrice!: number;

  @Prop()
  sellerName!: string;

  @Prop()
  createDate!: string;

  @Prop()
  productTransactionStatusId!: number;

  @Prop()
  productTransactionStatusName!: string;

  @Prop()
  productTransactionId!: number;

  @Prop()
  productImage!: string;

  @Prop()
  amount!: any;

  $helpers: any;

  productTransactionStatusMapper = ProductTransactionStatusMapper;

  productTransactionApi = new ProductTransactionApi();

  showDialogDetail = false;

  productDetail = null as any;

  formRating = {
    rating: 0,
    ratingDescription: null,
  };

  async onClickDetail() {
    try {
      const resp = await this.productTransactionApi.getDetail(
        this.productTransactionId
      );
      if (resp.data.status !== "SUCCESS") {
        this.$message.error(resp.data.message);
        return;
      }
      this.productDetail = resp.data.data;
      this.showDialogDetail = true;
    } catch (error: any) {
      const errorMessage = error.response
        ? error.response.message
        : "System Error, please contact our team";
      this.$message.error(errorMessage);
    }
  }

  isLoadingCancel = false;

  async onClickCancel() {
    this.isLoadingCancel = true;
    try {
      const resp = await this.productTransactionApi.delete(
        this.productDetail.productTransactionId
      );
      if (resp.data.status !== "SUCCESS") {
        this.$message.error(resp.data.message);
        return;
      }
      this.showDialogDetail = false;
    } catch (error: any) {
      const errorMessage = error.response
        ? error.response.message
        : "System Error, please contact our team";
      this.$message.error(errorMessage);
    } finally {
      this.isLoadingCancel = false;
    }
  }

  isLoadingUpdateRating = false;

  async onClickUpdateRating() {
    this.isLoadingUpdateRating = true;
    try {
      const resp = await this.productTransactionApi.updateRating(
        this.productDetail.productTransactionId,
        this.formRating
      );
      if (resp.data.status !== "SUCCESS") {
        this.$message.error(resp.data.message);
        return;
      }
      this.$message.success("Berhasil mengirim penilaian");
      this.onClickDetail();
    } catch (error: any) {
      const errorMessage = error.response
        ? error.response.message
        : "System Error, please contact our team";
      this.$message.error(errorMessage);
    } finally {
      this.isLoadingUpdateRating = false;
    }
  }

  async onUpload(event: any) {
    return new Promise(async (resolve, reject) => {
      try {
        const app = getApp();
        const storage = getStorage(app, "gs://p2p-commerce.appspot.com");
        const storageRef = ref(storage, `${this.$helpers.generateUUID()}`);
        await uploadBytes(storageRef, event.file);
        const cb = await getDownloadURL(storageRef);
        const resp = await this.productTransactionApi.updateProof(
          this.productDetail.productTransactionId,
          {
            proof: cb,
          }
        );
        if (resp.data.status !== "SUCCESS") {
          this.$message.error(resp.data.message);
          return;
        }
        this.$message.success("Berhasil mengunggah bukti pembayaran!");
        this.onClickDetail();
        resolve(cb);
      } catch (error: any) {
        const errorMessage = error.response
          ? error.response.message
          : "System Error, please contact our team";
        this.$message.error(errorMessage);
        reject(error);
      }
    });
  }
  onClickProof() {
    window.open(this.productDetail.proof, "_blank");
  }
}
</script>
