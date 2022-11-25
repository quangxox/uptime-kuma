<template>
      <div class="mb-3">
        <label for="chatops-channel" class="form-label">{{ $t("ChatOps API URL") }}</label>
        <input id="chatops-url" v-model="$parent.notification.chatOpsUrl" type="url" pattern="https?://.+" class="form-control" required>
    </div>

    <div class="mb-3">
        <label for="chatops-channel" class="form-label">{{ $t("ChatOps Channel") }}</label>
        <input id="chatops-channel" v-model="$parent.notification.chatOpsChannel" type="text" class="form-control" required>
    </div>

 <div class="mb-3">
        <label for="chatops-token" class="form-label">{{ $t("ChatOps Token") }}</label>
        <input id="chatops-token" v-model="$parent.notification.chatOpsToken" type="text" class="form-control" required>
    </div>

</template>
