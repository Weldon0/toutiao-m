<template>
  <van-datetime-picker
    v-model="currentDate"
    type="date"
    title="修改生日"
    :min-date="minDate"
    :max-date="maxDate"
    @cancel="$emit('close')"
    @confirm="confirm"
  />
</template>

<script>
import { updateUserProfile } from "@/api/user";
import dayjs from "dayjs";

export default {
  name: "UpdateBirthday",
  data() {
    return {
      currentDate: new Date(this.value),
      minDate: new Date(1970, 0, 1),
      maxDate: new Date(),
    };
  },
  props: {
    value: [String, Date],
  },
  methods: {
    async confirm(value) {
      this.$toast.loading({
        message: "保存中",
        duration: 0,
        forbidClick: true,
      });
      try {
        const currentDate = dayjs(value).format("YYYY-MM-DD");
        await updateUserProfile({
          birthday: currentDate,
        });
        this.$toast.success("修改生日成功");
        this.$emit("input", currentDate);
        this.$emit("close");
      } catch (e) {
        this.$toast.fail("修改生日失败");
      }
    },
  },
};
</script>
