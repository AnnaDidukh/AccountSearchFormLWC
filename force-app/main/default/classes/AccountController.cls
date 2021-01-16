public with sharing class AccountController {  
    @AuraEnabled(Cacheable = true)
    public static list<Account> retriveRecords(String strAcc) {
        strAcc = '%' + strAcc + '%';
        List<sObject> lstAccs = Database.query('SELECT Id, Name, Industry, Phone, Type From Account WHERE Name AND Industry AND Phone AND Type LIKE :strAcc');
        if(lstAccs.isEmpty()) {
            throw new AuraHandledException('No Record Found..');
        }
        return lstAccs; 
    }
 }