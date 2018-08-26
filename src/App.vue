<template>
  <v-app v-resize="toBottom">
    <v-navigation-drawer
      :clipped="$vuetify.breakpoint.lgAndUp"
      v-model="drawer"
      fixed
      app
    >
      <v-list dense>
        <template v-for="item in items">
          <v-layout
            v-if="item.heading"
            :key="item.heading"
            row
            align-center
          >
            <v-flex xs6>
              <v-subheader v-if="item.heading">
                {{ item.heading }}
              </v-subheader>
            </v-flex>
            <v-flex xs6 class="text-xs-center">
              <a href="#!" class="body-2 black--text">EDIT</a>
            </v-flex>
          </v-layout>
          <v-list-group
            v-else-if="item.children"
            v-model="item.model"
            :key="item.text"
            :prepend-icon="item.model ? item.icon : item['icon-alt']"
            append-icon=""
          >
            <v-list-tile slot="activator">
              <v-list-tile-content>
                <v-list-tile-title>
                  {{ item.text }}
                </v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
            <v-list-tile
              v-for="(child, i) in item.children"
              :key="i"
            >
              <v-list-tile-action v-if="child.icon">
                <v-icon>{{ child.icon }}</v-icon>
              </v-list-tile-action>
              <v-list-tile-content>
                <v-list-tile-title>
                  {{ child.text }}
                </v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
          </v-list-group>
          <v-list-tile v-else :key="item.text">
            <v-list-tile-action>
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title>
                {{ item.text }}
              </v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
        </template>
      </v-list>
      
    </v-navigation-drawer>
    
    <v-toolbar
      :clipped-left="$vuetify.breakpoint.lgAndUp"
      color="blue darken-3"
      dark
      app
      fixed
    >

      <v-toolbar-title style="width: 300px" class="ml-0 pl-3">
        <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
        <span class="hidden-sm-and-down">物联网聊天室</span>
      </v-toolbar-title>

      <v-spacer></v-spacer>
      <v-btn icon>
        <v-icon>apps</v-icon>
      </v-btn>
      <v-btn icon>
        <v-icon>notifications</v-icon>
      </v-btn>
    </v-toolbar>
    
    <v-content>
      <v-container wrap fluid fill-height>
        <v-layout column>
          <v-flex xs11>
            <v-container grid-list-lg :class="{'fill-height':msgs.length==0}">
                <v-layout v-if="msgs.length==0" justify-center align-center>
                  <v-progress-circular
                    indeterminate
                    color="primary"
                    :size="100"
                  >
                  连接中
                  </v-progress-circular>
                </v-layout>
                <v-layout
                v-for="(msg,i) in msgs"
                :class="{'justify-end':msg.sendBy=='sun'}"
                :key="i">
                  <v-flex xs8 md7 lg5>
                    <v-card>
                      <v-card-title class="py-1">
                          <div class="font-weight-light">{{msg.sendBy}}</div>
                      </v-card-title>
                      <v-card-text class="pt-0">
                        <h2 class="font-weight-regular">{{msg.content}}</h2>
                      </v-card-text>
                    </v-card>
                  </v-flex>
                </v-layout>
            </v-container>
          </v-flex>
          <v-flex>
             <v-text-field
              id="textField"
              v-bind="{'disabled':msgs.length==0}"
              v-model="message"
              append-outer-icon="send"
              prepend-icon="create"
              box
              clearable
              :error="messageNull"
              :error-messages="!messageNull? '': '信息不能为空'"
              label="发送信息"
              @input="typingMessage"
              @keyup.enter.native="sendMessage"
              @click:append-outer="sendMessage"
              @click:clear="clearMessage"
            ></v-text-field>
          </v-flex>
        </v-layout>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
/* eslint-disable */

export default {
  data: () => ({
    id: "sun",
    message: "",
    messageNull: false,
    drawer: null,
    items: [
      { icon: "contacts", text: "Contacts" },
      { icon: "history", text: "Frequently contacted" },
      { icon: "content_copy", text: "Duplicates" },
      {
        icon: "keyboard_arrow_up",
        "icon-alt": "keyboard_arrow_down",
        text: "Labels",
        model: true,
        children: [{ icon: "add", text: "Create label" }]
      },
      {
        icon: "keyboard_arrow_up",
        "icon-alt": "keyboard_arrow_down",
        text: "More",
        model: false,
        children: [
          { text: "Import" },
          { text: "Export" },
          { text: "Print" },
          { text: "Undo changes" },
          { text: "Other contacts" }
        ]
      },
      { icon: "settings", text: "Settings" },
      { icon: "chat_bubble", text: "Send feedback" },
      { icon: "help", text: "Help" },
      { icon: "phonelink", text: "App downloads" },
      { icon: "keyboard", text: "Go to the old version" }
    ],
    msgs: [
      // {
      //   sendBy: "sun",
      //   content: "大家吃饭了吗,我快饿死了啊，一整天没吃饭，救命啊啊啊"
      // },
      // { sendBy: "cqh", content: "没啊，你请吗" },
      // { sendBy: "me", content: "都在等你请" },
      // { sendBy: "大哥", content: "我也饿了" },
      // { sendBy: "sun", content: "我还在等你们请呢" },
      // { sendBy: "小黑", content: "哈哈哈" },
      // { sendBy: "小黑", content: "哈哈哈" },
      // { sendBy: "小黑", content: "哈哈哈" }
    ]
  }),
  computed: {},
  methods: {
    sendMessage() {
      if (!this.message) {
        this.messageNull = true;
        return;
      }
      this.msgs.push({ sendBy: "sun", content: this.message });
      this.clearMessage();
      document.getElementById('textField').focus();//手机端发送时会自动收起键盘，需要加这句
    },
    clearMessage() {
      this.message = "";
      // 滚到底部
      this.$nextTick(function() {
        this.toBottom();
      });
    },
    typingMessage() {
      if (this.message) {
        this.messageNull = false;
      }
    },
    // 滚到底部
    toBottom() {
      scrollTo(0, parseInt(document.body.scrollHeight));
    }
  },
  props: {
    source: String
  },
  mounted() {
    console.log(this.$vuetify.breakpoint);
  },
  watch: {
    msgs: function() {}
  }
};
</script>

<style scoped>
.myMsg {
  color: red;
}
</style>
