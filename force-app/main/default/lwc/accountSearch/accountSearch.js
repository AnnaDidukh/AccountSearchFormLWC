import { LightningElement, track } from 'lwc';
import retriveRecords from '@salesforce/apex/AccountController.retriveRecords';
// datatable columns
const columns = [{
        label: 'Name',
        fieldName: 'Name',
        type: 'text'
    }, {
        label: 'Industry',
        fieldName: 'Industry',
        type: 'text'
    }, {
        label: 'Phone',
        fieldName: 'Phone',
        type: 'phone',
    }, {
        label: 'Type',
        fieldName: 'Type',
        type: 'text'
    },];
export default class AccountSearch extends LightningElement {
    @track searchData;
    @track columns = columns;
    @track errorMsg = '';
    strSearchAcc = ''; 
    handleAccount(event) {
        this.strSearchAcc = event.detail.value;
    }
    handleSearch() {
        if(!this.strSearchAcc) {
            this.errorMsg = 'Please enter account name to search.';
            this.searchData = undefined;
            return;
        }
        retriveRecords({strAcc : this.strSearchAcc})
        .then(result => {
            this.searchData = result;
        })
        .catch(error => {
            this.searchData = undefined;
            window.console.log('error =====> '+JSON.stringify(error));
            if(error) {
                this.errorMsg = error.body.message;
            }
        }) 
    }
}
