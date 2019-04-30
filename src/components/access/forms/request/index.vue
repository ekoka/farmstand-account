<template>
<div>
    <p class="content is-size-5">
        If you wish to view the catalog you must be granted access. Some information from your Productlist profile will be used to make the introductions.
    </p>

    <div class="field">
        <div class="control">
            <label class="label">
                Name: <span class="has-text-weight-normal"> Michael Ekoka </span>
            </label>
        </div>
        <div class="control">
            <label class="label">
                Email: <span class="has-text-weight-normal"> verysimple@gmail.com </span>
            </label>
        </div>
        <div class="control">
            <label class="label">
                Telephone: <span class="has-text-weight-normal"> 514.335.7783 </span>
                <input type="checkbox">
            </label>
        </div>
        <div class="control">
            <label class="label">
                Company:<span class="has-text-weight-normal"> Coffeast </span>
                <input type="checkbox">
            </label>
        </div>
        <div class="control">
            <label class="label">
                City: <span class="has-text-weight-normal">Montreal
                </span>
                <input type="checkbox">
            </label>
        </div>
        <div class="control">
            <label class="label">
                Country: <span class="has-text-weight-normal">Canada
                </span>
                <input type="checkbox">
            </label>
        </div>
        <label class="label"> Would you like to include a personal message? <span class="is-size-7">(optional)</span>
            <textarea class="textarea">
            </textarea>
        </label>
    </div>
    <div class="control"><button class="button">Send</button></div>
</div>
</template>
<script>
export default{
    props: ['domain'],
    computed:{
        companyName(){
            if(this.domain){
                return this.domain.data.label
            }
        }
    },
}
</script>
