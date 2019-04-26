<template>
<div class="navbar-end">
    <a @click="logOut" class="navbar-item">
        <div class="content">
                <!--<i class="iconify mdi" data-icon="mdi-logout"></i>-->
                <span style="display:inline-block;vertical-align:middle;">
                    <svg class="mdi" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" width="24" height="24" viewBox="0 0 24 24"><path d="M16,17V14H9V10H16V7L21,12L16,17M14,2C15.1,2 16,2.9 16,4V6H14V4H5V20H14V18H16V20C16,21.1 15.1,22 14,22H5C3.9,22 3,21.1 3,20V4C3,2.9 3.9,2 5,2H14Z" />
                    </svg>
                </span>
            <span>Log out</span>
        </div>
    </a>
</div><!-- navbar-end -->
</template>

<script>
import cookies from '@/utils/cookies'
export default {
    methods:{
        logOut(){
            this.$store.dispatch('logOut')
        },
    }
}

</script>
