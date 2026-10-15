
var temp = {
    leng: ko.observable(0),
    title: ko.observable([
        { text: "先生 Mr", value: "mr" },
        { text: "女士 Mrs", value: "mrs" },
        { text: "小姐 Ms", value: "ms" },
    ]),
    edit: ko.observable(model.ID() != undefined ? model.ID : ""),
    data_lookup: ko.observableArray([]),
    statuslooup: ko.observable(0),
    datapage: ko.observable(0),
    viewStatus: ko.observable(false),
    tempCountry: ko.observableArray([]),
    dataLookupConf: ko.observableArray([]),
    isBack: ko.observable(false),
    isUploadDeposit: ko.observable(false),
    successUploadDeposit: ko.observable(false),
    check_dk_RPQ: ko.observable(false),
    tax_delete: ko.observableArray([]),
    IdentityFileName: ko.observable(""),
    IDFileName: ko.observable(""),
    AddressFileName: ko.observable(""),
    BankAccFileName: ko.observable(""),
    DepositFileName: ko.observable(""),
    data_selectionID_type: ko.observableArray([
        { text: (model.lang() != undefined) ? model.lang().identity_card() : '', value: "NRIC" },
        { text: (model.lang() != undefined) ? model.lang().passport() : '', value: "Passport" },
    ]),
    backToW8: ko.observable(false),
    hkIDType: ko.observable(""),
    minIDLength: ko.observable(0),
    maxIDLength: ko.observable(0),
    sugestionEmail: ko.observableArray(email_domain_list)

}

var tax = {
    edit: ko.observable(false),
    index: ko.observable(0),
    country: ko.observable({}),
    jurisdiction: ko.observable(""),
    tin: ko.observable(""),
    tin_reason: ko.observable(""),
    tax_arr: ko.observableArray([]),
    tax_value_name: ko.observable(""),
}

var deriv = {
    q1: ko.observable(""),
    q2: ko.observable(""),
    q3: ko.observable(""),
    q4: ko.observable(""),
    q5: ko.observable(""),
    q6: ko.observable(""),
}

var md = setInterval(function () {
    backcounting();
    if (panel14.count() == 0) {
        clearInterval(md);
    }
}, 1000);

populateCountry = function () {
    ////////////////////////alert("mamama")
    data = [];
    $.each(countrydataList, function (i, dt) {
        phone_code = _.find(countryPhoneCode, function (o) { return o.name === dt.name });
        if (phone_code !== undefined) {
            data.push({ "Country_Code": dt.code, "Country_Name": dt.name, "Currency_Code": dt.currency.code, "Currency_Name": dt.currency.name, "Currency_Symbol": dt.currency.code, "Phone_Code": phone_code.code });
        }
        //console.log("----------------- data ", data);
    });
    return data;
}

getAllData = function () {
    //urlParam("paramid");
    if (temp.edit() !== "") {
        ////////////////////////alert("masuk")
        param = {
            data: temp.edit(),
        }
        $.ajax({
            url: urlGetPanel,
            type: "POST",
            data: JSON.stringify(param),
            contentType: ' application/json',
            success: function (res) {
                dataform = res.data.form;
                tabpage(res.data.panel.Panel_Location + 2);
                //nextPanel()
                panel1.isMaindLandClient((dataform.ISMAINLAND).toString());
                panel1.email(dataform.Email);
                panel1.ID_Form(dataform.ID_Form);
                panel1.phoneNumber(dataform.Phone_Number);
                panel1.phoneCode(dataform.Phone_Code);
                panel3.promotion_code(dataform.Promotion_Code);
                panel3.title(dataform.Title);
                panel3.surename(dataform.Surname);
                panel3.firstName(dataform.First_Name);
                panel3.fullName(dataform.HKIDROtherName);
                panel3.nationality(dataform.Nationality);
                panel3.idCard(dataform.ID_Card);
                panel3.placeIssue(dataform.Place_of_Issue);
                panel3.countryBirth(dataform.Country_of_Birth);
                panel3.age(dataform.Age);
                panel3.dateOfBirth(kendo.toString(new Date(populate_date(dataform.Date_of_Birth)), "dd MMM yyyy"));
                panel3.homeNumber(dataform.Home_Number);
                panel3.officeNumber(dataform.Office_Number);
                panel3.wechat(dataform.Wechat_ID);
                panel3.homeAreaCode(dataform.Home_Area_Number);
                panel3.officeAreaCode(dataform.Office_Area_Number);
                panel3.is_aecode(dataform.AECODE !== "" || dataform.AECODE !== null ? true : false);
                panel3.aecode(dataform.AECODE);
                panel3.is_aename(dataform.AENAME !== "" || dataform.AENAME !== null ? true : false);
                panel3.aename(dataform.AENAME);
                panel3.is_preferred_trading(dataform.AECODE !== "" || dataform.AENAME !== "" || dataform.AENAME !== null || dataform.AECODE !== null ? true : false);
                panel4.country(dataform.Residential_Country);
                panel4.residentialAddress(dataform.Residential_Address);
                panel4.ownershipResidence(dataform.Ownershio_of_Residence);
                panel4.employmentType(dataform.Employment_Type);
                panel4.industry(dataform.Industry);
                panel4.occupation(dataform.Occupation);
                panel4.company_name(dataform.Employer_Company_Name);
                panel4.office_address1(dataform.Office_Address1);
                panel4.office_address2(dataform.Office_Address2);
                panel4.office_address3(dataform.Office_Address3);
                panel4.office_region(dataform.Office_Region);
                panel4.years_of_service(dataform.Years_of_Service);
                panel4.other_occupation(dataform.Other_Occupation);

                panel5.annual_income(dataform.Annual_Income);
                panel5.liquid_assets(dataform.LIquid_Assets);
                panel5.net_worth(dataform.Net_Worth);
                panel5.other_net_worth(dataform.Other_Net_Worth);
                panel5.previouse_job(dataform.Is_Previouse_Job === 1 ? true : false);
                if (dataform.Previouse_Job_ !== null) {
                    panel5.previouse_job_industry(parseInt(dataform.Previouse_Job_.Industry));
                    panel5.previouse_job_occupation(dataform.Previouse_Job_.Occupation);
                    panel5.previouse_job_annual_income(dataform.Previouse_Job_.Annual_Income);
                    panel5.previouse_job_company_name(dataform.Previouse_Job_.Employer_Company_Name);
                    panel5.previouse_job_other_industry(dataform.Previouse_Job_.Other_Industry);
                    panel5.previouse_job_other_occupation(dataform.Previouse_Job_.Other_Occupation);
                    panel5.years_of_service(dataform.Previouse_Job_.Year_of_Service);
                }
                panel5.provided_family(dataform.Is_Provided_Family === 1 ? true : false);
                if (dataform.Provided_Family_ !== null) {
                    panel5.provided_family_industry(parseInt(dataform.Provided_Family_.Family_Industry));
                    panel5.provided_family_Other_industry(dataform.Provided_Family_.Other_Industry);
                    panel5.provided_family_occupation(parseInt(dataform.Provided_Family_.Family_Occupation));
                    panel5.provided_family_Other_occupation(dataform.Provided_Family_.Other_Occupation);
                    panel5.provided_family_relation(dataform.Provided_Family_.Relation_Family);
                }
                panel5.investments_earning(dataform.Is_Investment_Earning === 1 ? true : false);
                if (dataform.investment_Earning_ !== null) {
                    panel5.investment_earning_type(dataform.investment_Earning_.Investment_Type);
                    panel5.investment_earning_other_type(dataform.investment_Earning_.Other_Investment_Type);
                    panel5.investment_earning_capital(dataform.investment_Earning_.Investment_Capital);
                    panel5.investment_earning_profit(dataform.investment_Earning_.Investment_Profit);
                    panel5.investment_earning_fund_source(parseInt(dataform.investment_Earning_.Investment_Fund_Source));
                }
                panel5.rental_income(dataform.Is_Rental_Income === 1 ? true : false);
                if (dataform.Rental_Income_ !== null) {
                    panel5.rental_income_holding_period(dataform.Rental_Income_.Holding_Period_Properties);
                    panel5.rental_income_fund_source(dataform.Rental_Income_.FundSource_Property_Acquisition);
                    panel5.rental_income_annual(dataform.Rental_Income_.Annual_Rental_Income);
                }
                panel5.other(dataform.Other !== "" ? true : false);
                panel5.other_value(dataform.Other);
                if (dataform.Investments_Objective_ !== null) {
                    panel6.is_capital_appreciation(dataform.Investments_Objective_.Is_Capital_Appreciation === 1 ? true : false);
                    panel6.is_generating_income(dataform.Investments_Objective_.Is_Generating_Income === 1 ? true : false);
                    panel6.is_hedging(dataform.Investments_Objective_.Is_Hedging === 1 ? true : false);
                    panel6.is_speculation(dataform.Investments_Objective_.Is_Speculation === 1 ? true : false);
                }
                panel6.Investment_Objective()
                panel6.listed_securities(dataform.Listed_Securities);
                panel6.ccbc_warant(dataform.CBBC_Warrants);
                panel6.futures_option(dataform.Future_Options);
                panel6.leverage_foreign_exchange(dataform.Leverage_Foreign_Exchange);
                panel6.unit_trust_bonds(dataform.Unit_Trust_Bonds);
                panel6.structure_products(dataform.Structured_Product);
                panel6.leverage_inverse_product(dataform.Leveraged_Inverse_Product);

                //page 7
                //if()

                model.loader(false);

            }
        });
    } else {
        model.loader(false);
    }

    //getAllInput();

}

tmp = {
    data_country: ko.observableArray([]),
    data_industry: ko.observableArray([]),
    data_ownership: ko.observableArray([]),
    data_occupation: ko.observableArray([]),
    data_employment: ko.observableArray([]),
    //data_annual_income: ko.observableArray([
    //    { text: "HKD 0 – 200,000", value: "HKD 1 – 200,000" },
    //    { text: "HKD 200,001 – 500,000", value: "HKD 200,001 – 500,000" },
    //    { text: "HKD 500,001 – 1,000,000", value: "HKD 500,001 – 1,000,000" },
    //    { text: "> HKD 1,000,000", value: "> HKD 1,000,000" },
    //]),
    //data_liquid_assets: ko.observableArray([
    //    { text: "HKD 0 – 200,000", value: "HKD 1 – 200,000" },
    //    { text: "HKD 200,001 – 500,000", value: "HKD 200,001 – 500,000" },
    //    { text: "HKD 500,001 – 1,000,000", value: "HKD 500,001 – 1,000,000" },
    //    { text: "> HKD 1,000,000", value: "> HKD 1,000,000" },
    //]),
    //data_net_worth: ko.observableArray([
    //    { text: "HKD 0 – 200,000", value: "HKD 1 – 200,000" },
    //    { text: "HKD 200,001 – 500,000", value: "HKD 200,001 – 500,000" },
    //    { text: "HKD 500,001 – 1,000,000", value: "HKD 500,001 – 1,000,000" },
    //    { text: "Other", value: "Other" },

    //]),
    data_annual_income: ko.observableArray([
        { text: "HKD 0", value: "HKD 0" },
        { text: "<HKD200,000", value: "<HKD200,000" },
        { text: "HKD200,000 – HKD500,000", value: "HKD200,000 – HKD500,000" },
        { text: "HKD500,001 – HKD1,000,000", value: "HKD500,001 – HKD1,000,000" },
        { text: ">HKD$1,000,000", value: ">HKD$1,000,000" },
    ]),
    data_liquid_assets: ko.observableArray([
        { text: "HKD 0 – 200,000", value: "HKD 1 – 200,000" },
        { text: "HKD 200,001 – 500,000", value: "HKD 200,001 – 500,000" },
        { text: "HKD 500,001 – 1,000,000", value: "HKD 500,001 – 1,000,000" },
        { text: "> HKD 1,000,000", value: "> HKD 1,000,000" },
    ]),
    data_net_worth: ko.observableArray([
        { text: "HKD 0 – 200,000", value: "HKD 1 – 200,000" },
        { text: "HKD 200,001 – 500,000", value: "HKD 200,001 – 500,000" },
        { text: "HKD 500,001 – 1,000,000", value: "HKD 500,001 – 1,000,000" },
        { text: "Other", value: "Other" },

    ]),
    data_family_relations: ko.observableArray([]),
    data_investment_type: ko.observableArray([]),
    data_investment_fund_source: ko.observableArray([]),
    data_experience: ko.observableArray([
        { text: (model.lang() != undefined) ? model.lang().years13() : '', value: "1TO3" },
        { text: (model.lang() != undefined) ? model.lang().years35() : '', value: "3TO5" },
        { text: (model.lang() != undefined) ? model.lang().years510() : '', value: "5TO10" },
        { text: (model.lang() != undefined) ? model.lang().more10years() : '', value: "MT10" },
        { text: (model.lang() != undefined) ? model.lang().less1years() : '', value: "LT1" },
        { text: (model.lang() != undefined) ? model.lang().no_experience() : '', value: "NOEXP" },
    ]),
    data_BankName: ko.observableArray([]),
    data_derivative: ko.observableArray([]),
    data_selectionID_type: ko.observableArray([
        { text: (model.lang() != undefined) ? model.lang().identity_card() : '', value: "NRIC" },
        { text: (model.lang() != undefined) ? model.lang().passport() : '', value: "Passport" },
    ]),
}


getAllInput = function () {
    //model.loader(false)
    getlookup();
    //$.ajax({
    //    url: "/Master/GetAllData",
    //    type: "POST",
    //    contentType: ' application/json',
    //    success: function (res) {
    //        tmp.data_country(res.data_country);
    //        tmp.data_industry(res.data_industry);
    //        tmp.data_ownership(res.data_ownership);
    //        tmp.data_occupation(res.data_occupation);
    //        tmp.data_employment(res.data_employment);
    //        tmp.data_annual_income(res.data_income);
    //        tmp.data_net_worth(res.data_net_woth);
    //        tmp.data_family_relations(res.data_family_relationships);
    //        tmp.data_investment_type(res.data_investment_type);
    //        tmp.data_investment_fund_source(res.data_investment_fund_source);
    //        tmp.data_experience(res.data_year_experience);
    //        getAllData();

    //    }
    //})
}

loadPage = function () {
    //$("#dateofbirth").kendoDatePicker({
    //    format: "dd MMM yyyy",
    //    change: function (e) {
    //        if (panel3.dateOfBirth() != "") {
    //            nyear = new Date().getFullYear();
    //            date = new Date(panel3.dateOfBirth());
    //            byear = date.getFullYear()
    //            age = nyear - byear;
    //            if (age != "NaN") {
    //                if (age < 17) {
    //                    $("#dateofbirth").val("");
    //                    Swal.fire("Warning!", "Invalid Date", "warning")
    //                } else {
    //                    panel3.age(age);
    //                }

    //            } else {
    //                panel3.age(0);
    //            }
    //        } else {
    //            panel3.age(0);
    //        }


    //    }
    //});
    $('#dateofbirth').datetimepicker({
        format: 'DD MMMM YYYY',
        date: new Date(),
    }).on('dp.change', function (e) {
        var data = $('#dateofbirth').val()
        if (data != '') {
            var stDate = kendo.toString(new Date(data), "yyyy-MM-dd")
            panel3.dateOfBirth()
            nyear = new Date().getFullYear();
            date = new Date(stDate);
            byear = date.getFullYear()
            age = nyear - byear;
            //console.log("------------ 1 " + age)
            if (data != '') {
                if (age > 0 && age < 17) {
                    //$("#dateofbirth").val("");
                    //console.log("------------ 3 " + age)
                    Swal.fire("Warning!", "Invalid Birth Date", "warning")
                } else {
                    panel3.age(age);
                }

            } else {
                panel3.age(0);
            }
        } else {
            panel3.age(0);
        }
    });
    //$("#dateofbirth").click(function () {
    //    var data = $("#dateofbirth").data('kendoDatePicker')
    //    if ($('#dateofbirth_dateview').css('display') == 'none') {
    //        data.open();
    //    } else {
    //        data.close();
    //    }

    //})
    //$("[name=date_birth]").kendoDatePicker({
    //    format: "dd MMM yyyy",
    //    value: panel13.birth(),

    //});
    model.loader(true);
    getAllInput();
}

var loginpanel = {
    emaillogin: ko.observable(""),
    HP: ko.observable("")
}

var panel1 = {
    ID_Form: ko.observable(0),
    status: ko.observable(true),
    email: ko.observable(""),
    phoneCode: ko.observable(model.countryCode() != undefined ? model.countryCode() : ""),
    phoneNumber: ko.observable(model.mobileNumber() != undefined ? model.mobileNumber() : ""),
    isMaindLandClient: ko.observable("0"),
}

var panel2 = {
    status: ko.observable(false),
    CashAccount: ko.observable(false),
    MarginAccount: ko.observable(false),
    StockOptionAccount: ko.observable(false),
    OnlineTrading: ko.observable(true),
    Chinaconnect: ko.observable(false),
    HKIDR: ko.observable(true),

    Acknowledgement1: ko.observable(false),
    Acknowledgement2: ko.observable(false),
    Acknowledgement3: ko.observable(false),
    Acknowledgement4: ko.observable(false),

    Declaration1: ko.observable(0),
    DeclareAcc1: ko.observable(""),
    Declaration2: ko.observable(0),
    DeclareAcc2: ko.observable(""),
    Declaration3: ko.observable(0),
    DeclareAcc3: ko.observable(""),
    Declaration4: ko.observable(0),
    DeclareAcc4: ko.observable(""),

    isAustralia: ko.observable(false),
    isCanada: ko.observable(false),
    isFinland: ko.observable(false),
    isTaiwan: ko.observable(false),
    isJapan: ko.observable(false),
    isKorea: ko.observable(false),

}

onclickMarginAccount = function () {
    panel2.CashAccount(false)
}
onclickCashAccount = function () {
    panel2.MarginAccount(false)
    $("#cashaccount").prop('checked', true);
}

var panel3 = {
    status: ko.observable(false),
    is_preferred_trading: ko.observable(model.AeCode() != "" || model.AeName() != "" ? true : false),
    is_aecode: ko.observable(model.AeCode() != true),
    is_aename: ko.observable(model.AeName() != ""),

    promotion_code: ko.observable(model.PromotionCode()),
    title: ko.observable(""),
    aecode: ko.observable(model.AeCode()),
    aename: ko.observable(model.AeName()),
    firstName: ko.observable(""),
    fullName: ko.observable(""),
    //---------------------------- modify 7/25/2022 ----------------
    eng_name: ko.observable(""),
    eng_surename: ko.observable(""),
    NonEnglishSurname: ko.observable(""),
    NoneEnglishName: ko.observable(""),
    //---------------------------- modify 7/25/2022 ----------------
    nationality: ko.observable(""),
    //---------------- modify 2024/03/14 ----------------------
    idCardType: ko.observable(""),
    //---------------- modify 2024/03/14 ----------------------
    idCard: ko.observable(""),
    placeIssue: ko.observable(""),
    dateOfBirth: ko.observable(""),
    surename: ko.observable(""),
    homeAreaCode: ko.observable(""),
    homeNumber: ko.observable(""),
    officeAreaCode: ko.observable(""),
    officeNumber: ko.observable(""),
    wechat: ko.observable(""),
    age: ko.observable(0),
    countryBirth: ko.observable(""),
    occupation: ko.observable(""),

}



var panel4 = {
    status: ko.observable(false),
    country: ko.observable(""),
    residentialAddress: ko.observable(""),
    residentialAddress2: ko.observable(""),
    residentialAddress3: ko.observable(""),
    ownershipResidence: ko.observable(""),
    employmentType: ko.observable(""),
    industry: ko.observable(""),
    other_industries: ko.observable(""),
    occupation: ko.observable(""),
    other_occupation: ko.observable(""),
    company_name: ko.observable(""),
    office_address1: ko.observable(""),
    office_address2: ko.observable(""),
    office_address3: ko.observable(""),
    office_region: ko.observable(""),
    years_of_service: ko.observable(0),
}

var panel5 = {
    status: ko.observable(false),
    annual_income: ko.observable(""),
    liquid_assets: ko.observable(""),
    net_worth: ko.observable(""),
    other_net_worth: ko.observable(""),
    saving_from_salary: ko.observable(false),
    previouse_job: ko.observable(false),
    previouse_job_industry: ko.observable(""),
    previouse_job_other_industry: ko.observable(""),
    previouse_job_occupation: ko.observable(""),
    previouse_job_other_occupation: ko.observable(""),
    previouse_job_company_name: ko.observable(""),
    previouse_job_annual_income: ko.observable(""),
    provided_family: ko.observable(false),
    investments_earning: ko.observable(false),
    investment_earning_type: ko.observable(""),
    investment_earning_other_type: ko.observable(""),
    investment_earning_capital: ko.observable(""),
    investment_earning_profit: ko.observable(""),
    investment_earning_industry: ko.observable(""),
    investment_earning_fund_source: ko.observable(""),
    provided_family_relation: ko.observable(""),
    provided_family_industry: ko.observable(""),
    provided_family_Other_industry: ko.observable(""),
    provided_family_occupation: ko.observable(""),
    provided_family_Other_occupation: ko.observable(""),
    other: ko.observable(false),
    other_value: ko.observable(""),
    rental_income: ko.observable(false),
    rental_income_holding_period: ko.observable(""),
    rental_income_annual: ko.observable(""),
    rental_income_fund_source: ko.observable(""),
    industry: ko.observable(""),
    occupation: ko.observable(""),
    companyName: ko.observable(""),
    years_of_service: ko.observable(""),
}

var panel6 = {
    status: ko.observable(false),
    Investment_Objective: ko.observableArray([]),
    Investment_Objective_temp: ko.observableArray([]),
    listed_securities: ko.observable(""),
    ccbc_warant: ko.observable(""),
    futures_option: ko.observable(""),
    leverage_foreign_exchange: ko.observable(""),
    unit_trust_bonds: ko.observable(""),
    structure_products: ko.observable(""),
    leverage_inverse_product: ko.observable(""),
    is_generating_income: ko.observable(false),
    is_capital_appreciation: ko.observable(false),
    is_hedging: ko.observable(false),
    is_speculation: ko.observable(false),
}

var panel7 = {
    status: ko.observable(false),
}

var panel8 = {
    status: ko.observable(false),
    question1: ko.observable(""),
    question2: ko.observable(""),
    question3: ko.observable(""),
    question4: ko.observable([]),
    question5: ko.observable(""),
    question6: ko.observable(""),
    question7: ko.observable(""),
    question8: ko.observable(""),
    RpqLevel: ko.observable(""),
    score: ko.observable(""),
    RpqLvl: ko.observable(""),


}

var panel9 = {
    status: ko.observable(false),
}

var panel10 = {
    status: ko.observable(false),
    acquired_knowledge: ko.observable(0),
    knowledge: ko.observable(""),
    AcquireFrom2: ko.observable(""),
    no_knowledge: ko.observable(false),
    confirm: ko.observable(false),
}

var panel11 = {
    status: ko.observable(false),
    hk_tax: ko.observable(false),
    other_tax: ko.observable(false),
    acknowledge: ko.observable(false),
    tax_detail: ko.observableArray([]),
}

var panel12 = {
    status: ko.observable(false),
    q1_name: ko.observable(""),
    q2_country: ko.observable(""),

    q3_address_street: ko.observable(""),
    q3_address_unitnumber: ko.observable(""),
    q3_address_building: ko.observable(""),
    q3_address_city: ko.observable(""),
    q3_address_state: ko.observable(""),
    q3_address_postalcode: ko.observable(""),
    q3_address_country: ko.observable(""),

    q4_mail_sameabove: ko.observable(""),
    q4_mail_street: ko.observable(""),
    q4_mail_unitnumber: ko.observable(""),
    q4_mail_building: ko.observable(""),
    q4_mail_city: ko.observable(""),
    q4_mail_state: ko.observable(""),
    q4_mail_postalcode: ko.observable(""),
    q4_mail_country: ko.observable(""),

    q5_taxpayer: ko.observable(""),
    q6_foreign_tax: ko.observable(""),
    q7_refrence_number: ko.observable(""),
    q8_date_birth: ko.observable(""),
}

var panel13 = {
    status: ko.observable(false),
    name: ko.observable(""),
    country_citizen: ko.observable(""),
    residence_street: ko.observable(""),
    residence_number: ko.observable(""),
    residence_building: ko.observable(""),
    residence_city: ko.observable(""),
    residence_state: ko.observable(""),
    residence_postal_code: ko.observable(""),
    residence_country: ko.observable(""),
    isSameAbove: ko.observable(true),
    mailing_street: ko.observable(""),
    mailing_number: ko.observable(""),
    mailing_building: ko.observable(""),
    mailing_city: ko.observable(""),
    mailing_state: ko.observable(""),
    mailing_postal_code: ko.observable(""),
    mailing_country: ko.observable(""),
    taxpayer: ko.observable(""),
    foreign_tax_ID: ko.observable(""),
    birth: ko.observable(""),
    reffrence_number: ko.observable(""),

    part2_nationality: ko.observable(""),
    part2_specialrate: ko.observable(""),
    part2_treatyrates: ko.observable(""),
    part2_income: ko.observable(""),
    part2_additional: ko.observable(""),

    part3_q1: ko.observable(""),
    part3_q2: ko.observable(""),
    part3_income_: ko.observable(""),
    part3_income_relate: ko.observable(""),

    confirm_name: ko.observable(""),
    ChecknotLegallyFTIN: ko.observable(false),
    checkFTIN: ko.observable(false),

}

//enable_checkFTIN = function () {
//    if (panel13.ChecknotLegallyFTIN() == true) {
//        panel13.checkFTIN("");
//    }
//}

var panel14 = {
    status: ko.observable(false),
    enable_button: ko.observable(false),
    count: ko.observable(133),
}

var panel15 = {
    client_name: ko.observable(""),
    status: ko.observable(false),
    confirmed_watch: ko.observable(""),
    confirmed_name: ko.observable(""),
    q1: ko.observable(false),
    acc1: ko.observable(""),
    q2: ko.observable(false),
    acc2: ko.observable(""),
    q3: ko.observable(false),
    acc3: ko.observable(""),
    q4: ko.observable(false),
    acc4: ko.observable(""),
}

var panel16 = {
    status: ko.observable(false),
    BankName: ko.observable(""),
    OtherBankName: ko.observable(""),
    HolderName: ko.observable(""),
    HolderAcct: ko.observable(""),
    oaofao_checked: ko.observable(""),
}

var panel17 = {
    status: ko.observable(false),
    edited: ko.observable(false),
    uploadID: ko.observable(false),
    uploadFileID: ko.observableArray([]),
    uploadIdentity: ko.observable(false),
    uploadFileIdentity: ko.observableArray([]),
    uploadAddress: ko.observable(false),
    uploadFileAddress: ko.observableArray([]),
    uploadBankAcc: ko.observable(false),
    uploadFileBankAcc: ko.observableArray([]),
    uploadIDGuid: ko.observable("00000000-0000-0000-0000-000000000000"),
    uploadIdentityGuid: ko.observable("00000000-0000-0000-0000-000000000000"),
    uploadAddressGuid: ko.observable("00000000-0000-0000-0000-000000000000"),
    uploadBankAccGuid: ko.observable("00000000-0000-0000-0000-000000000000"),
    uploadIDErr: ko.observable(false),
    uploadIdentityErr: ko.observable(false),
    uploadAddressErr: ko.observable(false),
    uploadBankAccErr: ko.observable(false),

}

var panel18 = {
    status: ko.observable(false),
    isFps: ko.observable("0"),
    useFPS: ko.observable("0"),
    uploadFileID_Card: ko.observable("0"),
    File_ID: ko.observable("00000000-0000-0000-0000-000000000000"),
    uploadDeposit: ko.observable([]),
    uploadFileDeposit: ko.observableArray([]),
    uploadDepositGuid: ko.observable("00000000-0000-0000-0000-000000000000"),
    uploadDepositErr: ko.observable(false),
    isConfirmation: ko.observable(false),
    applicationMode: ko.observable(""),
    HomeAddress: ko.observable(""),
    MailingAddress: ko.observable(""),
    bankName: ko.observable(""),
    ListedSecurities: ko.observable(""),
    CCBC: ko.observable(""),
    future_option: ko.observable(""),
    leveraged_foreign: ko.observable(""),
    unit_trust: ko.observable(""),
    structured_product: ko.observable(""),
    leveraged_inverse: ko.observable(""),
    certificate: ko.observable(),
}

var file = {
    IdCard: ko.observable(""),
    ByteIdCard: ko.observableArray([]),
    BackID: ko.observable(""),
    ByteBackID: ko.observableArray([]),
    AddressProof: ko.observable(""),
    ByteAddressProof: ko.observableArray([]),
    BankAccountProof: ko.observable(""),
    ByteBankAccountProof: ko.observableArray([]),
    DepositSlip: ko.observable(""),
    ByteDepositSlip: ko.observableArray([]),
}

playVideo = function () {
    $("#pnl11vid").html("");
    switch (model.urlLang()) {
        case "en-us":
            panel14.count(130);
            //$("#pnl11vid").append('<source src="./Content/video/EN-no face.mp4" type="video/mp4" muted="muted">')
            $("#pnl11vid").append('<div class="wistia_responsive_padding" style="padding:56.25% 0 0 0;position:relative;"><div class="wistia_responsive_wrapper" style="height:100%;left:0;position:absolute;top:0;width:100%;"><iframe src="https://fast.wistia.net/embed/iframe/i1pwafviwt?videoFoam=true" title="EN-no face Video" allowtransparency="true" frameborder="0" scrolling="no" class="wistia_embed" name="wistia_embed" allowfullscreen mozallowfullscreen webkitallowfullscreen oallowfullscreen msallowfullscreen width="100%" height="100%"></iframe></div></div><script src="https://fast.wistia.net/assets/external/E-v1.js" async></script>')
            break;
        case "zh-cn":
            panel14.count(120);
            //$("#pnl11vid").append('<source src="./Content/video/SIM-no face.mp4" muted="muted">')
            $("#pnl11vid").append('<div class="wistia_responsive_padding" style="padding:56.25% 0 0 0;position:relative;"><div class="wistia_responsive_wrapper" style="height:100%;left:0;position:absolute;top:0;width:100%;"><iframe src="https://fast.wistia.net/embed/iframe/fwg13497j8?videoFoam=true" title="SIM-no face Video" allowtransparency="true" frameborder="0" scrolling="no" class="wistia_embed" name="wistia_embed" allowfullscreen mozallowfullscreen webkitallowfullscreen oallowfullscreen msallowfullscreen width="100%" height="100%"></iframe></div></div>')

            break;
        case "zh-hk":
            panel14.count(100);
            //$("#pnl11vid").append('<source src="./Content/video/ZH-no face.mp4" type="video/mp4" muted="muted">');
            $("#pnl11vid").append('<div class="wistia_responsive_padding" style="padding:56.25% 0 0 0;position:relative;"><div class="wistia_responsive_wrapper" style="height:100%;left:0;position:absolute;top:0;width:100%;"><iframe src="https://fast.wistia.net/embed/iframe/rd57qisjty?videoFoam=true" title="ZH-no face Video" allowtransparency="true" frameborder="0" scrolling="no" class="wistia_embed" name="wistia_embed" allowfullscreen mozallowfullscreen webkitallowfullscreen oallowfullscreen msallowfullscreen width="100%" height="100%"></iframe></div></div>');

            break;
    }

    //$("#pnl11vid").get(0).currentTime = 0;
    ////console.log("------- sini")
    setTimeout(function () {
        //$("#pnl11vid").get(0).play()
        if (panel14.count() >= 0) {
            md = setInterval(function () {
                backcounting();
                if (panel14.count() == 0) {
                    clearInterval(md);
                }
            }, 1000);
        }

    }, 200)
}

nextPanel = function (currentPanel) {
    ////////alert("--------- " + currentPanel)
    ////////alert("---------------- current panel " + model.page())
    var nxt = currentPanel;
    if (nxt <= temp.leng()) {
        switch (nxt) {
            case 1:

                resetPanel();
                panel3.status(true);
                break;
            case 2:
                resetPanel();
                panel2.status(true);
                var tab = $("#tab3");
                $("#mytabs").kendoTabStrip().data("kendoTabStrip").activateTab(tab);
                break;
            case 3:
                resetPanel();
                panel4.status(true);
                var tab = $("#tab4");
                $("#mytabs").kendoTabStrip().data("kendoTabStrip").activateTab(tab);
                break;
            case 4:
                resetPanel();
                panel5.status(true);
                var tab = $("#tab5");
                $("#mytabs").kendoTabStrip().data("kendoTabStrip").activateTab(tab);
                break;
            case 5:
                resetPanel();
                panel6.status(true);
                var tab = $("#tab6");
                $("#mytabs").kendoTabStrip().data("kendoTabStrip").activateTab(tab);

                break;
            case 6:
                ////alert("masuk")
                //resetPanel();
                //panel8.status(true);
                //var tab = $("#tab7");
                //$("#mytabs").kendoTabStrip().data("kendoTabStrip").activateTab(tab);
                if (model.data().data_rpq != null) {
                    window.location.href = RPQ_SingleForm_URL + "&lang=" + lang_sf + "&RPQID=" + model.data().data_rpq.ID + "&FormID=" + model.data().data_form.ID + "&backBtn=1";
                } else {
                    window.location.href = RPQ_SingleForm_URL + "&lang=" + lang_sf + "&FormID=" + model.data().data_form.ID + "&backBtn=1";
                }
                break;
            case 7:
                resetPanel();
                panel9.status(true);
                var tab = $("#tab8");
                $("#mytabs").kendoTabStrip().data("kendoTabStrip").activateTab(tab);
                break;
            case 8:
                resetPanel();
                //panel10.status(true);
                var tab = $("#tab8");
                $("#mytabs").kendoTabStrip().data("kendoTabStrip").activateTab(tab);
                break;
            case 9:

                //////////////////////////alert("----------- masuk")
                //if (model.data().data_clientInfo.AcknowledgementStockOptAcct == true && panel8.RpqLevel() == "High Risk") {
                //    var param = {
                //        ID: panel1.ID_Form(),
                //        StockOption: false,
                //    }
                //    Swal.fire({
                //        title: (model.lang() != undefined) ? model.lang().are_you_sure() : '',
                //        html: (model.lang() != undefined) ? model.lang().pop_up8() : '',
                //        icon: 'warning',
                //        showCancelButton: true,
                //        confirmButtonColor: '#3085d6',
                //        cancelButtonColor: '#d33',
                //        confirmButtonText: 'OK'
                //    }).then(function (result) {
                //        if (result.isConfirmed) {
                //            resetPanel();
                //            model.loader(true);
                //            $.ajax({
                //                url: urlSaveUpdatePanel8,
                //                data: JSON.stringify(param),
                //                type: "POST",
                //                contentType: 'application/json',
                //                success: function (res) {
                //                    //var pg = res.data.page;
                //                    //if (pg != null) {
                //                    //    temp.datapage(pg);
                //                    //}
                //                    //data = res.data;
                //                    if (res.success == true) {
                //                        ////console.log(res);
                //                        nextPanel(10);
                //                        getBack();
                //                        //model.loader(false);
                //                    } else {
                //                        Swal.fire(
                //                            'Warning!',
                //                            res.message,
                //                            'warning'
                //                        )
                //                        model.loader(false);
                //                    }

                //                }
                //            });
                //        } else {
                //            model.loader(false);
                //        }
                //    });

                //} else
                if (model.data().data_clientInfo.AcknowledgementStockOptAcct == true && model.data().data_rpq.RPQScore < 71) {

                    var param = {
                        ID: panel1.ID_Form(),
                        StockOption: false,
                    }
                    Swal.fire({
                        title: (model.lang() != undefined) ? model.lang().are_you_sure() : '',
                        html: (model.lang() != undefined) ? model.lang().pop_up81() : '',
                        icon: 'warning',
                        showCancelButton: true,
                        confirmButtonColor: '#3085d6',
                        cancelButtonColor: '#d33',
                        confirmButtonText: 'OK',
                        allowOutsideClick: false,
                    }).then(function (result) {
                        if (result.isConfirmed) {
                            resetPanel();
                            model.loader(true);
                            $.ajax({
                                url: urlSaveUpdatePanel8,
                                data: JSON.stringify(param),
                                type: "POST",
                                contentType: 'application/json',
                                success: function (res) {
                                    //var pg = res.data.page;
                                    //if (pg != null) {
                                    //    temp.datapage(pg);
                                    //}
                                    //data = res.data;
                                    if (res.success == true) {
                                        //resetPanel();
                                        model.loader(false);
                                        if (model.data().data_dkQuestionaire != null) {
                                            window.location.href = DK_SingleForm_URL + "&lang=" + lang_sf + "&DKID=" + model.data().data_dkQuestionaire.ID + "&FormID=" + model.data().data_form.ID + "&backBtn=1";
                                        } else {
                                            window.location.href = DK_SingleForm_URL + "&lang=" + lang_sf + "&FormID=" + model.data().data_form.ID + "&backBtn=1";
                                        }
                                        //model.page(9);
                                        //panel10.status(true);
                                        //var tab = $("#tab9");
                                        //$("#mytabs").kendoTabStrip().data("kendoTabStrip").activateTab(tab);
                                        //getBack(false);
                                        //model.loader(false);
                                    } else {
                                        Swal.fire(
                                            'Warning!',
                                            res.message,
                                            'warning'
                                        )
                                        model.loader(false);
                                    }

                                }
                            });
                        } else {
                            model.loader(false);
                        }
                    })

                } else {

                    model.loader(true);
                    var param = {
                        ID: panel1.ID_Form(),
                        StockOption: true,
                    }
                    $.ajax({
                        url: urlSaveUpdatePanel8,
                        data: JSON.stringify(param),
                        type: "POST",
                        contentType: 'application/json',
                        success: function (res) {
                            if (res.success == true) {
                                //resetPanel();
                                model.loader(false);
                                //model.page(9);
                                //panel10.status(true);
                                //var tab = $("#tab9");
                                //$("#mytabs").kendoTabStrip().data("kendoTabStrip").activateTab(tab);
                                if (model.data().data_dkQuestionaire != null) {
                                    window.location.href = DK_SingleForm_URL + "&lang=" + lang_sf + "&DKID=" + model.data().data_dkQuestionaire.ID + "&FormID=" + model.data().data_form.ID + "&backBtn=1";
                                } else {
                                    window.location.href = DK_SingleForm_URL + "&lang=" + lang_sf + "&FormID=" + model.data().data_form.ID + "&backBtn=1";
                                }
                            } else {
                                Swal.fire(
                                    'Warning!',
                                    res.message,
                                    'warning'
                                )
                                model.loader(false);
                            }

                        }
                    });
                }

                break;
            case 10:
                resetPanel();
                //panel10.status(true);
                //var tab = $("#tab9");
                //model.page(10);
                //$("#mytabs").kendoTabStrip().data("kendoTabStrip").activateTab(tab);

                var tab = $("#tab10");
                $("#mytabs").kendoTabStrip().data("kendoTabStrip").activateTab(tab);
                model.page(10);
                panel11.status(true);
                break;
            case 11:
                //resetPanel();
                //panel13.status(true);
                //var tab = $("#tab11");
                //model.page(11);
                //$("#mytabs").kendoTabStrip().data("kendoTabStrip").activateTab(tab);
                //var check_interval = setInterval(function () {
                //    if (model.loader() == true) {
                //        model.loader(false);
                //    }
                //    if (model.loader() == false) {
                //        clearInterval(check_interval);
                //    }
                //}, 100)
                if (model.data().data_form.W8ID != undefined) {
                    window.location.href = W8_SingleForm_URL + "&lang=" + lang_sf + "&W8ID=" + model.data().data_form.W8ID + "&ClientInfoID=" + model.data().data_clientInfo.ID + "&FormID=" + model.data().data_form.ID + "&backBtn=1";
                } else {
                    window.location.href = W8_SingleForm_URL + "&lang=" + lang_sf + "&ClientInfoID=" + model.data().data_clientInfo.ID + "&FormID=" + model.data().data_form.ID + "&backBtn=1";
                }
                break;
            case 12:
                resetPanel();
                //var vid = document.getElementById("pnl11vid");

                var tab = $("#tab12");
                $("#mytabs").kendoTabStrip().data("kendoTabStrip").activateTab(tab);
                model.page(12);
                panel14.status(true);
                playVideo();
                break;
            case 13:
                resetPanel();
                panel15.status(true);
                var tab = $("#tab13");
                $("#mytabs").kendoTabStrip().data("kendoTabStrip").activateTab(tab);
                break;
            case 14:
                resetPanel();
                panel16.status(true);
                var tab = $("#tab14");
                model.page(14);
                $("#mytabs").kendoTabStrip().data("kendoTabStrip").activateTab(tab);
                break;
            case 15:
                ////////alert("masuk 973");
                //getBack();
                resetPanel()
                if (model.data().data_form.ApplicationMode == 1) {
                    check_DK_RPQ();
                }

                panel17.status(true);
                var tab = $("#tab15");
                model.page(15);
                $("#mytabs").kendoTabStrip().data("kendoTabStrip").activateTab(tab);

                break;
            case 16:
                ////alert("masuk 983")
                /*getBack(false);*/
                //////////alert(model.data().data_form.ApplicationMode)
                resetPanel()
                check_DK_RPQ();
                setTimeout(function () { model.loader(false) }, 500)
                //if (temp.backToW8() == true) {
                //    Swal.fire((model.lang() != undefined) ? model.lang().warning() : '', (model.lang() != undefined) ? model.lang().w8_warning() : '', "warning");
                //} else
                if (model.data().data_form.ApplicationMode == 1) {
                    ////////////alert("masuk 988")
                    if (temp.check_dk_RPQ() == false) {
                        //////////alert("992")
                        panel18.isConfirmation(true);
                        panel18.status(true);
                        //////alert("masuk10120")
                        data_confirm();
                        var tab = $("#tab16");
                        model.page(16);
                        $("#mytabs").kendoTabStrip().data("kendoTabStrip").activateTab(tab);
                    } else {
                        //////////alert("998");
                        panel17.status(true);
                        var tab = $("#tab15");
                        model.page(15);
                        $("#mytabs").kendoTabStrip().data("kendoTabStrip").activateTab(tab);
                    }

                } else {
                    if (temp.check_dk_RPQ() == false) {
                        //////////alert("1008");
                        //////////alert(model.data().data_form.ApplicationMode)
                        if (model.data().data_form.ApplicationMode == 1) {
                            //////////alert("1011")
                            panel18.status(true);
                            panel18.isConfirmation(true);
                            var tab = $("#tab16");
                            model.page(16);
                            $("#mytabs").kendoTabStrip().data("kendoTabStrip").activateTab(tab);
                        } else {
                            //////////alert("1018")
                            panel18.status(true);
                            panel18.isConfirmation(false);
                            var tab = $("#tab16");
                            model.page(16);
                            $("#mytabs").kendoTabStrip().data("kendoTabStrip").activateTab(tab);
                        }

                    } else {
                        //////////alert("1015");
                        if (model.data().data_form.ApplicationMode == 1) {
                            panel18.status(true);
                            panel18.isConfirmation(true);
                            var tab = $("#tab16");
                            model.page(16);
                            $("#mytabs").kendoTabStrip().data("kendoTabStrip").activateTab(tab);
                        } else {
                            panel18.status(true);
                            panel18.isConfirmation(false);
                            var tab = $("#tab16");
                            model.page(16);
                            $("#mytabs").kendoTabStrip().data("kendoTabStrip").activateTab(tab);
                        }
                    }
                }


                break;
        }
    }
}

tabpage = function (panel) {
    //reset_form();
    var valid = true;
    //////////////alert("masuk 1013 " +panel)
    if (panel != model.page()) {
        if (panel >= model.page()) {
            //////////////////////////alert("masuk1")
            switch (model.page()) {
                case 1:
                    //val = $("#pnl1").kendoValidator().data("kendoValidator");
                    //var valid1 = $("#pnl1").kendoValidator().data("kendoValidator");
                    val1 = $("#pnl1").kendoValidator().data("kendoValidator");
                    valid = val1.validate();
                    break;
                case 2:
                    val2 = $("#pnl2").kendoValidator().data("kendoValidator");
                    valid = val2.validate();
                    break;
                case 3:
                    var val3 = $("#pnl3").kendoValidator({
                        rules: {
                            customRule: function (input) {
                                //////console.log("------------ ", input.is("[name='Objective']"));
                                if (input.is("[name='choose1']") && $("[name='choose1']:checked").length == 1) {
                                    return false;
                                }

                                return true;
                            }
                            //customRule1: function (input) {
                            //    //////console.log("------------ ", input.is("[name='Objective']"));
                            //    if (input.is("[name='ntl']") && $("[name='ntl']:checked").length == 0) {
                            //        return false;
                            //    }

                            //    return true;
                            //}
                        },
                        messages: {
                            customRule: (model.lang() != undefined) ? model.lang().at_least_one() : '',
                            //customRule1: "Atleast one service should be selected.",
                        }
                    }).data("kendoValidator");
                    valid = val3.validate();
                    break;
                case 4:
                    val = $("#pnl4").kendoValidator().data("kendoValidator");
                    valid = val.validate();
                    break;
                case 5:
                    setTimeout(function () {
                        var val = $("#pnl5").kendoValidator({
                            rules: {
                                pane4: function (input) {
                                    //////console.log("------------ ", input.is("[name='Objective']"));
                                    if (input.is("[name='wealth']")) {
                                        if ($("[name='wealth']:checked").length == 0) {
                                            //////////////////////////alert("masuk")
                                            //Swal.fire("Warning!", '<p>Please choose at least one Source of Wealth Option. </p> <p>You must choose at least one between "Previouse Job" and "Provided By Family Member"</p>', "warning")
                                        }

                                        return $("[name='wealth']:checked").length > 0;
                                    }

                                    return true;
                                }
                            },
                            messages: {
                                pane4: (model.lang() != undefined) ? model.lang().at_least_one() : ''
                            }
                        }).data("kendoValidator");
                        valid = val.validate();
                        ////console.log("------------ ", valid);
                    }, 200)

                    break;
                case 6:
                    val = $("#pnl6").kendoValidator({
                        rules: {
                            customRule1: function (input) {
                                //////console.log("------------ ", input.is("[name='Objective']"));
                                if (input.is("[name='Objective']")) {
                                    return $("[name='Objective']:checked").length > 0;
                                }

                                return true;
                            }
                        },
                        messages: {
                            customRule1: (model.lang() != undefined) ? model.lang().at_least_one() : ''
                        }
                    }).data("kendoValidator");
                    valid = val.validate();
                    break;
                case 7:
                    break;
                case 8:
                    //var val = $("#pnl8").kendoValidator({
                    //    rules: {
                    //        radio: function (input) {
                    //            if (input.filter("[type=radio]") && input.is("[name=" + input.attr("name") + "]")) {
                    //                //////////////////////////alert($("#pnl8").find("[type=radio][name=" + input.attr("name") + "]").is(":checked"))
                    //                return $("#pnl8").find("[type=radio][name=" + input.attr("name") + "]").is(":checked");
                    //            }
                    //            return true;
                    //        },
                    //        box: function (input) {
                    //            ////console.log("--------------------- mamama ", $("[name=" + input.attr("name") + "]:checked").length == 0)
                    //            if (input.filter("[type=checkbox]") && input.is("[name=" + input.attr("name") + "]") && $("[name=" + input.attr("name") + "]:checked").length == 0) {
                    //                return false;
                    //            }

                    //            return true
                    //        }
                    //    },
                    //    messages: {
                    //        radio: "This is a required field",
                    //        box: "this is a required field"
                    //    }
                    //}).data("kendoValidator");
                    //valid = val.validate();
                    break;
                case 9:
                    valid = true;
                    break;
                case 10:

                    var val = $("#pnl11").kendoValidator({
                        rules: {

                            box: function (input) {
                                if (input.attr("type") == "checkbox" && $("#pnl11").find("[type=checkbox][name=" + input.attr("name") + "]").is(":checked") == false) {

                                    return false;
                                }
                                return true;
                            },

                        },
                        messages: {
                            box: (model.lang() != undefined) ? model.lang().this_required() : '',
                        }
                    }).data("kendoValidator");

                    valid = val.validate();
                    break;
                case 11:
                    //////////////////////////alert("masuk 11")
                    var val = $("#pnl11").kendoValidator({
                        rules: {

                            box: function (input) {
                                if (input.attr("type") == "checkbox" && $("#pnl11").find("[type=checkbox][name=" + input.attr("name") + "]").is(":checked") == false) {

                                    return false;
                                }
                                return true;
                            },

                        },
                        messages: {
                            box: (model.lang() != undefined) ? model.lang().this_required() : '',
                        }
                    }).data("kendoValidator");
                    valid = val.validate();
                    break;
                case 12:
                    break;
                case 13:
                    var val = $("#pnl15").kendoValidator({
                        rules: {
                            radio: function (input) {
                                if (input.attr("type") == "radio" && $("#pnl15").find("[type=radio][name=" + input.attr("name") + "]").is(":checked") == false) {

                                    return false;

                                }
                                return true;
                            },
                            box: function (input) {
                                if (input.attr("type") == "checkbox" && $("#pnl15").find("[type=checkbox][name=" + input.attr("name") + "]").is(":checked") == false) {

                                    return false;
                                }
                                return true;
                            },
                            inputtext: function (input) {
                                if (input.attr("type") == "text" && input.attr("required") && $("#pnl15").find("[type=text][name=" + input.attr("name") + "]").val() == "") {
                                    //////////////////////////alert("masuk")
                                    return false;
                                }
                                return true;
                            },

                        },
                        messages: {
                            radio: (model.lang() != undefined) ? model.lang().this_required() : '',
                            box: (model.lang() != undefined) ? model.lang().this_required() : '',
                            inputtext: (model.lang() != undefined) ? model.lang().this_required() : '',
                        }
                    }).data("kendoValidator");
                    valid = val.validate();
                    break;
                    break;
                case 14:
                    break;
                case 15:
                    var val = $("#pnl16").kendoValidator().data("kendoValidator");
                    valid = val.validate();
                    break;
                case 16:
                    var val = $("#pnl16").kendoValidator().data("kendoValidator");
                    valid = val.validate();
                    break;
                case 17:
                    var val = $("#pnl17").kendoValidator({
                        upload: function (input) {
                            //////////////////////////alert("masuk")
                            if (input[0].type == "file") {
                                return input.closest(".k-upload").find(".k-file").length;
                            }
                        }
                    }).data("kendoValidator");;
                    valid = val.validate();
                    break;

            }
        }
        //////////////////////////alert(panel)
        if (valid == true && model.data().data_form.Step + 2 >= panel) {
            //////////////////////alert("masuk 1240")
            var tab = $("#tab" + panel);
            $("#mytabs").kendoTabStrip().data("kendoTabStrip").activateTab(tab);
            if (model.data().data_form.Step + 2 == panel) {

                setTimeout(function () {
                    if (!$(".ontab li").eq(2).hasClass("active")) {
                        $(".ontab li").eq(model.page() - 2).addClass("active")
                    }
                }, 500)

                loadPage();
                resetPanel();
                //////////////////////alert("masuk 1253")
                switch (panel) {
                    case 1:
                        var tab = $("#tab1");
                        $("#mytabs").kendoTabStrip().data("kendoTabStrip").activateTab(tab);
                        model.page(1)
                        panel1.status(true);
                        break;
                    case 2:
                        var tab = $("#tab2");
                        $("#mytabs").kendoTabStrip().data("kendoTabStrip").activateTab(tab);
                        model.page(2)
                        panel3.status(true);
                        break;
                    case 3:
                        var tab = $("#tab3");
                        $("#mytabs").kendoTabStrip().data("kendoTabStrip").activateTab(tab);
                        model.page(3)
                        panel2.status(true);


                        break;
                    case 4:
                        var tab = $("#tab4");
                        $("#mytabs").kendoTabStrip().data("kendoTabStrip").activateTab(tab);
                        //getlookup(2);
                        model.page(4)
                        panel4.status(true);
                        break;
                    case 5:
                        var tab = $("#tab5");
                        $("#mytabs").kendoTabStrip().data("kendoTabStrip").activateTab(tab);
                        model.page(5)
                        panel5.status(true);
                        break;
                    case 6:
                        var tab = $("#tab6");
                        $("#mytabs").kendoTabStrip().data("kendoTabStrip").activateTab(tab);
                        model.page(6)
                        panel6.status(true);
                        break;
                    case 7:
                        //var tab = $("#tab7");
                        //$("#mytabs").kendoTabStrip().data("kendoTabStrip").activateTab(tab);
                        //model.page(7)
                        //panel8.status(true);
                        //openmodal7();
                        if (model.data().data_rpq != null) {
                            window.location.href = RPQ_SingleForm_URL + "&lang=" + lang_sf + "&RPQID=" + model.data().data_rpq.ID + "&FormID=" + model.data().data_form.ID + "&backBtn=1";
                        } else {
                            window.location.href = RPQ_SingleForm_URL + "&lang=" + lang_sf + "&FormID=" + model.data().data_form.ID + "&backBtn=1";
                        }
                        break;
                    case 8:
                        var tab = $("#tab8");
                        $("#mytabs").kendoTabStrip().data("kendoTabStrip").activateTab(tab);
                        model.page(8)
                        panel9.status(true);
                        break;
                    case 9:
                        var tab = $("#tab9");
                        $("#mytabs").kendoTabStrip().data("kendoTabStrip").activateTab(tab);
                        model.page(9);
                        panel10.status(true);
                        break;
                    case 10:
                        var tab = $("#tab10");
                        $("#mytabs").kendoTabStrip().data("kendoTabStrip").activateTab(tab);
                        model.page(10);
                        panel11.status(true);
                        break;
                    case 11:
                        var tab = $("#tab11");
                        $("#mytabs").kendoTabStrip().data("kendoTabStrip").activateTab(tab);
                        model.page(11);
                        panel13.status(true);
                        break;
                    case 12:
                        var tab = $("#tab12");
                        $("#mytabs").kendoTabStrip().data("kendoTabStrip").activateTab(tab);
                        model.page(12);
                        resetPanel();
                        panel14.status(true);
                        playVideo();
                        break;
                    case 13:
                        var tab = $("#tab13");
                        $("#mytabs").kendoTabStrip().data("kendoTabStrip").activateTab(tab);
                        model.page(13);
                        resetPanel();
                        panel15.status(true);
                        break;
                    case 14:
                        var tab = $("#tab14");
                        $("#mytabs").kendoTabStrip().data("kendoTabStrip").activateTab(tab);
                        model.page(14);
                        resetPanel();
                        panel16.status(true);
                        break;
                    case 15:
                        var tab = $("#tab15");
                        $("#mytabs").kendoTabStrip().data("kendoTabStrip").activateTab(tab);
                        model.page(15);
                        resetPanel();
                        check_DK_RPQ();
                        panel17.status(true);
                        break;
                    case 16:
                        //////////////////////alert("masuk 1356")
                        resetPanel();

                        check_DK_RPQ();
                        temp.isBack(true)

                        if (temp.check_dk_RPQ() == true) {

                            if (model.data().data_form.ApplicationMode == 1) {
                                //////////////////////alert("1362")
                                panel18.status(false)
                                panel18.isConfirmation(false)
                                panel17.status(true);
                                var tab = $("#tab15");
                                $("#mytabs").kendoTabStrip().data("kendoTabStrip").activateTab(tab);
                                model.page(15);
                                //////alert("masuk 1439")
                                data_confirm()
                            } else {
                                panel18.status(true)
                                var tab = $("#tab16");
                                $("#mytabs").kendoTabStrip().data("kendoTabStrip").activateTab(tab);
                                model.page(16);
                            }
                        } else {
                            panel18.status(true)
                            panel18.isConfirmation(false)
                            var tab = $("#tab16");
                            $("#mytabs").kendoTabStrip().data("kendoTabStrip").activateTab(tab);
                            model.page(16);
                        }

                        break;
                }
                //$(".ontab li").removeClass("active")
            } else if (panel != 0) {
                //////////////alert("masuk2 1390")
                Swal.fire({
                    title: (model.lang() != undefined) ? model.lang().are_you_sure() : '',
                    text: ((model.lang() != undefined) ? model.lang().you_will_loose() : ''),
                    icon: 'warning',
                    showCancelButton: true,
                    confirmButtonColor: '#3085d6',
                    cancelButtonColor: '#d33',
                    confirmButtonText: 'Yes',
                    allowOutsideClick: false,
                }).then(function (result) {
                    if (result.isConfirmed) {

                        if (!$(".ontab li").eq(2).hasClass("active")) {
                            $(".ontab li").eq(panel - 2).addClass("active")
                        }
                        loadPage();
                        resetPanel();
                        switch (panel) {
                            case 1:
                                model.page(1)
                                panel1.status(true);
                                break;
                            case 2:
                                model.page(2)
                                panel3.status(true);
                                break;
                            case 3:
                                model.page(3)
                                panel2.status(true);


                                break;
                            case 4:
                                //getlookup(2);
                                model.page(4)
                                panel4.status(true);
                                break;
                            case 5:
                                model.page(5)
                                panel5.status(true);
                                break;
                            case 6:
                                model.page(6)
                                panel6.status(true);
                                break;
                            case 7:
                                //model.page(7)
                                //panel8.status(true);
                                //openmodal7();
                                if (model.data().data_rpq != null) {
                                    window.location.href = RPQ_SingleForm_URL + "&lang=" + lang_sf + "&RPQID=" + model.data().data_rpq.ID + "&FormID=" + model.data().data_form.ID + "&backBtn=1";
                                } else {
                                    window.location.href = RPQ_SingleForm_URL + "&lang=" + lang_sf + "&FormID=" + model.data().data_form.ID + "&backBtn=1";
                                }
                                break;
                            case 8:
                                model.page(8)
                                panel9.status(true);
                                break;
                            case 9:
                                //model.page(9);
                                //panel10.status(true);
                                if (model.data().data_dkQuestionaire.ID != undefined) {
                                    window.location.href = DK_SingleForm_URL + "&lang=" + lang_sf + "&DKID=" + model.data().data_dkQuestionaire.ID + "&FormID=" + model.data().data_form.ID + "&backBtn=1";
                                } else {
                                    window.location.href = DK_SingleForm_URL + "&lang=" + lang_sf + "&FormID=" + model.data().data_form.ID + "&backBtn=1";
                                }
                                break;
                            case 10:
                                model.page(10);
                                panel11.status(true);
                                break;
                            case 11:
                                //model.page(11);
                                //panel13.status(true);
                                //alert("masuk1")
                                if (model.data().data_form.W8ID != undefined) {
                                    window.location.href = W8_SingleForm_URL + "&lang=" + lang_sf + "&W8ID=" + model.data().data_form.W8ID + "&ClientInfoID=" + model.data().data_clientInfo.ID + "&FormID=" + model.data().data_form.ID + "&backBtn=1";
                                } else {
                                    window.location.href = W8_SingleForm_URL + "&lang=" + lang_sf + "&ClientInfoID=" + model.data().data_clientInfo.ID + "&FormID=" + model.data().data_form.ID + "&backBtn=1";
                                }
                                break;
                            case 12:
                                model.page(12);
                                resetPanel();

                                panel14.status(true);
                                playVideo();
                                break;
                            case 13:
                                model.page(13);
                                resetPanel();
                                panel15.status(true);
                                break;
                            case 14:
                                model.page(14);
                                resetPanel();
                                panel16.status(true);
                                break;
                            case 15:
                                model.page(15);
                                resetPanel();
                                if (model.data().data_form.ApplicationMode == 1) {
                                    check_DK_RPQ();
                                }
                                panel17.status(true);
                                break;
                            case 16:
                                resetPanel();

                                check_DK_RPQ();
                                temp.isBack(true)

                                //////////////alert("masuk 1480 temp.check_dk_RPQ() = " + temp.check_dk_RPQ())

                                if (temp.check_dk_RPQ() == true) {

                                    if (model.data().data_form.ApplicationMode == 1) {
                                        //////////////alert("1484")
                                        panel18.status(false)
                                        panel18.isConfirmation(false)
                                        panel17.status(true);
                                        var tab = $("#tab15");
                                        $("#mytabs").kendoTabStrip().data("kendoTabStrip").activateTab(tab);
                                        model.page(15);
                                        ////alert("masuk 1568")
                                        data_confirm()
                                    } else {
                                        //////////////alert("1512")
                                        panel18.status(true)
                                        panel18.isConfirmation(false)
                                        var tab = $("#tab16");
                                        $("#mytabs").kendoTabStrip().data("kendoTabStrip").activateTab(tab);
                                        model.page(16);
                                    }
                                } else {
                                    ////////////////////alert("1520")
                                    panel18.status(true)
                                    if (model.data().data_form.ApplicationMode == 1) {
                                        panel18.isConfirmation(true)
                                    } else {
                                        panel18.isConfirmation(false)
                                    }

                                    var tab = $("#tab16");
                                    $("#mytabs").kendoTabStrip().data("kendoTabStrip").activateTab(tab);
                                    model.page(16);
                                }


                                break;
                        }

                    } else {
                        //////////////alert("masuk 1530")
                        //////console.log("masuk sini ya")
                        if (model.page() != 0) {
                            var tab = $("#tab" + model.page());
                            $("#mytabs").kendoTabStrip().data("kendoTabStrip").activateTab(tab);
                            switch (model.page()) {
                                case 1:
                                    model.page(1)
                                    panel1.status(true);
                                    break;
                                case 2:
                                    model.page(2)
                                    panel3.status(true);
                                    break;
                                case 3:
                                    model.page(3)
                                    panel2.status(true);


                                    break;
                                case 4:
                                    //getlookup(2);
                                    model.page(4)
                                    panel4.status(true);
                                    break;
                                case 5:
                                    model.page(5)
                                    panel5.status(true);
                                    break;
                                case 6:
                                    model.page(6)
                                    panel6.status(true);
                                    break;
                                case 7:
                                    //model.page(7)
                                    //panel8.status(true);
                                    //openmodal7();
                                    if (model.data().data_rpq != null) {
                                        window.location.href = RPQ_SingleForm_URL + "&lang=" + lang_sf + "&RPQID=" + model.data().data_rpq.ID + "&FormID=" + model.data().data_form.ID + "&backBtn=1";
                                    } else {
                                        window.location.href = RPQ_SingleForm_URL + "&lang=" + lang_sf + "&FormID=" + model.data().data_form.ID + "&backBtn=1";
                                    }
                                    break;
                                case 8:
                                    model.page(8)
                                    panel9.status(true);
                                    break;
                                case 9:
                                    //model.page(9);
                                    //panel10.status(true);
                                    if (model.data().data_dkQuestionaire.ID != undefined) {
                                        window.location.href = DK_SingleForm_URL + "&lang=" + lang_sf + "&DKID=" + model.data().data_dkQuestionaire.ID + "&FormID=" + model.data().data_form.ID + "&backBtn=1";
                                    } else {
                                        window.location.href = DK_SingleForm_URL + "&lang=" + lang_sf + "&FormID=" + model.data().data_form.ID + "&backBtn=1";
                                    }
                                    break;
                                case 10:
                                    model.page(10);
                                    panel11.status(true);
                                    break;
                                case 11:
                                    //model.page(11);
                                    //panel13.status(true);
                                    //alert("masuk2")
                                    if (model.data().data_form.W8ID != undefined) {
                                        window.location.href = W8_SingleForm_URL + "&lang=" + lang_sf + "&W8ID=" + model.data().data_form.W8ID + "&ClientInfoID=" + model.data().data_clientInfo.ID + "&FormID=" + model.data().data_form.ID + "&backBtn=1";
                                    } else {
                                        window.location.href = W8_SingleForm_URL + "&lang=" + lang_sf + "&ClientInfoID=" + model.data().data_clientInfo.ID + "&FormID=" + model.data().data_form.ID + "&backBtn=1";
                                    }
                                    break;
                                case 12:
                                    model.page(12);
                                    resetPanel();

                                    panel14.status(true);
                                    playVideo();
                                    break;
                                case 13:
                                    model.page(13);
                                    resetPanel();
                                    panel15.status(true);
                                    break;
                                case 14:
                                    model.page(14);
                                    resetPanel();
                                    panel16.status(true);
                                    break;
                                case 15:
                                    model.page(15);
                                    resetPanel();
                                    if (model.data().data_form.ApplicationMode == 1) {
                                        check_DK_RPQ();
                                    }
                                    panel17.status(true);
                                    break;
                                case 16:
                                    //////////////alert("masuk 1619")
                                    resetPanel();

                                    //check_DK_RPQ();
                                    temp.isBack(true)

                                    if (temp.check_dk_RPQ() == true) {

                                        if (model.data().data_form.ApplicationMode == 1) {
                                            ////////////////////alert("1619")
                                            panel18.status(false)
                                            panel18.isConfirmation(false)
                                            panel17.status(true);
                                            var tab = $("#tab15");
                                            $("#mytabs").kendoTabStrip().data("kendoTabStrip").activateTab(tab);
                                            model.page(15);
                                            //////alert("masuk 1694")
                                            data_confirm()
                                        } else {
                                            ////////////////////alert("1627")
                                            panel18.status(true)
                                            var tab = $("#tab16");
                                            $("#mytabs").kendoTabStrip().data("kendoTabStrip").activateTab(tab);
                                            model.page(16);
                                        }
                                    } else {
                                        ////////////////////alert("1635")
                                        panel18.status(true)
                                        if (model.data().data_form.ApplicationMode == 1) {
                                            panel18.isConfirmation(true)
                                        } else {
                                            panel18.isConfirmation(false)
                                        }
                                        var tab = $("#tab16");
                                        $("#mytabs").kendoTabStrip().data("kendoTabStrip").activateTab(tab);
                                        model.page(16);
                                    }


                                    break;
                            }
                        } else {
                            var pg = model.data().data_form.Step + 1;
                            var tab = $("#tab" + pg);
                            $("#mytabs").kendoTabStrip().data("kendoTabStrip").activateTab(tab);
                            model.page(pg);
                        }

                    }
                })
            }


        } else if (model.data().data_form != "null" && valid == false) {
            //////////////////////alert("masuk 1528")
            setTimeout(function () {
                var tab = $("#tab" + model.page());
                $("#mytabs").kendoTabStrip().data("kendoTabStrip").activateTab(tab);
            }, 200);
            Swal.fire((model.lang() != undefined) ? model.lang().warning() : '', (model.lang() != undefined) ? model.lang().please_complete() : '', "warning");
            switch (model.page()) {
                case 1:
                    model.page(1)
                    panel1.status(true);
                    break;
                case 2:
                    model.page(2)
                    panel3.status(true);
                    break;
                case 3:
                    model.page(3)
                    panel2.status(true);


                    break;
                case 4:
                    //getlookup(2);
                    model.page(4)
                    panel4.status(true);
                    break;
                case 5:
                    model.page(5)
                    panel5.status(true);
                    break;
                case 6:
                    model.page(6)
                    panel6.status(true);
                    break;
                case 7:
                    //model.page(7)
                    //panel8.status(true);
                    //openmodal7();
                    if (model.data().data_rpq != null) {
                        window.location.href = RPQ_SingleForm_URL + "&lang=" + lang_sf + "&RPQID=" + model.data().data_dkQuestionaire.ID + "&FormID=" + model.data().data_form.ID + "&backBtn=1";
                    } else {
                        window.location.href = RPQ_SingleForm_URL + "&lang=" + lang_sf + "&FormID=" + model.data().data_form.ID + "&backBtn=1";
                    }
                    break;
                case 8:
                    model.page(8)
                    panel9.status(true);
                    break;
                case 9:
                    //model.page(9);
                    //panel10.status(true);
                    if (model.data().data_dkQuestionaire.ID != undefined) {
                        window.location.href = DK_SingleForm_URL + "&lang=" + lang_sf + "&DKID=" + model.data().data_rpq.ID + "&FormID=" + model.data().data_form.ID + "&backBtn=1";
                    } else {
                        window.location.href = DK_SingleForm_URL + "&lang=" + lang_sf + "&FormID=" + model.data().data_form.ID + "&backBtn=1";
                    }
                    break;
                case 10:
                    model.page(10);
                    panel11.status(true);
                    break;
                case 11:
                    //model.page(11);
                    //panel13.status(true);
                    //alert("masuk3")
                    //if (model.data().data_form.W8ID != undefined) {
                    //    window.location.href = W8_SingleForm_URL + "&lang=" + lang_sf + "&W8ID=" + model.data().data_form.W8ID + "&ClientInfoID=" + model.data().data_clientInfo.ID + "&FormID=" + model.data().data_form.ID;
                    //} else {
                    //    window.location.href = W8_SingleForm_URL + "&lang=" + lang_sf + "&W8ID=&ClientInfoID=" + model.data().data_clientInfo.ID + "&FormID=" + model.data().data_form.ID;
                    //}
                    break;
                case 12:
                    model.page(12);
                    resetPanel();

                    panel14.status(true);
                    playVideo();
                    break;
                case 13:
                    model.page(13);
                    resetPanel();
                    panel15.status(true);
                    break;
                case 14:
                    model.page(14);
                    resetPanel();
                    panel16.status(true);
                    break;
                case 15:
                    model.page(15);
                    resetPanel();
                    if (model.data().data_form.ApplicationMode == 1) {
                        check_DK_RPQ();
                    }
                    panel17.status(true);
                    break;
                case 16:
                    //////////////alert("masuk 1619")
                    resetPanel();

                    //check_DK_RPQ();
                    temp.isBack(true)

                    if (temp.check_dk_RPQ() == true) {

                        if (model.data().data_form.ApplicationMode == 1) {
                            ////////////////////alert("1619")
                            panel18.status(false)
                            panel18.isConfirmation(false)
                            panel17.status(true);
                            var tab = $("#tab15");
                            $("#mytabs").kendoTabStrip().data("kendoTabStrip").activateTab(tab);
                            model.page(15);
                            //////alert("masuk 1824")
                            data_confirm()
                        } else {
                            ////////////////////alert("1627")
                            panel18.status(true)
                            var tab = $("#tab16");
                            $("#mytabs").kendoTabStrip().data("kendoTabStrip").activateTab(tab);
                            model.page(16);
                        }
                    } else {
                        ////////////////////alert("1635")
                        panel18.status(true)
                        if (model.data().data_form.ApplicationMode == 1) {
                            panel18.isConfirmation(true)
                        } else {
                            panel18.isConfirmation(false)
                        }
                        var tab = $("#tab16");
                        $("#mytabs").kendoTabStrip().data("kendoTabStrip").activateTab(tab);
                        model.page(16);
                    }


                    break;
            }

        } else {
            //////////////////////alert("masuk 1535")
            var tab = $("#tab" + model.page());
            $("#mytabs").kendoTabStrip().data("kendoTabStrip").activateTab(tab);
        }

    } else {
        //////////////alert("1542")
        var tab = $("#tab" + model.page());
        $("#mytabs").kendoTabStrip().data("kendoTabStrip").activateTab(tab);
        Swal.fire({
            title: (model.lang() != undefined) ? model.lang().are_you_sure() : '',
            text: ((model.lang() != undefined) ? model.lang().you_will_loose() : ''),
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes'
        }).then(function (result) {
            if (result.isConfirmed) {

                if (!$(".ontab li").eq(2).hasClass("active")) {
                    $(".ontab li").eq(panel - 2).addClass("active")
                }
                loadPage();
                resetPanel();
                switch (panel) {
                    case 1:
                        model.page(1)
                        panel1.status(true);
                        break;
                    case 2:
                        model.page(2)
                        panel3.status(true);
                        break;
                    case 3:
                        model.page(3)
                        panel2.status(true);


                        break;
                    case 4:
                        //getlookup(2);
                        model.page(4)
                        panel4.status(true);
                        break;
                    case 5:
                        model.page(5)
                        panel5.status(true);
                        break;
                    case 6:
                        model.page(6)
                        panel6.status(true);
                        break;
                    case 7:
                        //model.page(7)
                        //panel8.status(true);
                        //openmodal7();
                        if (model.data().data_rpq != null) {
                            window.location.href = RPQ_SingleForm_URL + "&lang=" + lang_sf + "&RPQID=" + model.data().data_dkQuestionaire.ID + "&FormID=" + model.data().data_form.ID + "&backBtn=1";
                        } else {
                            window.location.href = RPQ_SingleForm_URL + "&lang=" + lang_sf + "&FormID=" + model.data().data_form.ID + "&backBtn=1";
                        }
                        break;
                    case 8:
                        model.page(8)
                        panel9.status(true);
                        break;
                    case 9:
                        //model.page(9);
                        //panel10.status(true);
                        if (model.data().data_dkQuestionaire.ID != undefined) {
                            window.location.href = DK_SingleForm_URL + "&lang=" + lang_sf + "&DKID=" + model.data().data_rpq.ID + "&FormID=" + model.data().data_form.ID + "&backBtn=1";
                        } else {
                            window.location.href = DK_SingleForm_URL + "&lang=" + lang_sf + "&FormID=" + model.data().data_form.ID + "&backBtn=1";
                        }
                        break;
                    case 10:
                        model.page(10);
                        panel11.status(true);
                        break;
                    case 11:
                        //model.page(11);
                        //panel13.status(true);
                        if (model.data().data_form.W8ID != undefined) {
                            window.location.href = W8_SingleForm_URL + "&lang=" + lang_sf + "&W8ID=" + model.data().data_form.W8ID + "&ClientInfoID=" + model.data().data_clientInfo.ID + "&FormID=" + model.data().data_form.ID + "&backBtn=1";
                        } else {
                            window.location.href = W8_SingleForm_URL + "&lang=" + lang_sf + "&ClientInfoID=" + model.data().data_clientInfo.ID + "&FormID=" + model.data().data_form.ID + "&backBtn=1";
                        }
                        break;
                    case 12:
                        model.page(12);
                        resetPanel();

                        panel14.status(true);
                        playVideo();
                        break;
                    case 13:
                        model.page(13);
                        resetPanel();
                        panel15.status(true);
                        break;
                    case 14:
                        model.page(14);
                        resetPanel();
                        panel16.status(true);
                        break;
                    case 15:
                        model.page(15);
                        resetPanel();
                        check_DK_RPQ();
                        panel17.status(true);
                        break;
                    case 16:
                        //////////////alert("masuk 1634")
                        resetPanel();

                        check_DK_RPQ();
                        temp.isBack(true)

                        if (temp.check_dk_RPQ() == true) {

                            if (model.data().data_form.ApplicationMode == 1) {
                                ////////////////////alert("1769")
                                panel18.status(false)
                                panel18.isConfirmation(false)
                                panel17.status(true);
                                var tab = $("#tab15");
                                $("#mytabs").kendoTabStrip().data("kendoTabStrip").activateTab(tab);
                                model.page(15);
                                //////alert("masuk 1694")
                                data_confirm()
                            } else {
                                ////////////////////alert("1777")
                                panel18.status(true)
                                var tab = $("#tab16");
                                $("#mytabs").kendoTabStrip().data("kendoTabStrip").activateTab(tab);
                                model.page(16);
                            }
                        } else {
                            ////////////////////alert("1786")
                            panel18.status(true)
                            if (model.data().data_form.ApplicationMode == 1) {
                                panel18.isConfirmation(true)
                            } else {
                                panel18.isConfirmation(false)
                            }
                            var tab = $("#tab16");
                            $("#mytabs").kendoTabStrip().data("kendoTabStrip").activateTab(tab);
                            model.page(16);
                        }


                        break;
                }

            } else {
                //////console.log("masuk sini ya")
                //////////////////////alert("masuk 1670")
                if (model.page() != 0) {
                    var tab = $("#tab" + model.page());
                    $("#mytabs").kendoTabStrip().data("kendoTabStrip").activateTab(tab);
                    switch (model.page()) {
                        case 1:
                            model.page(1)
                            panel1.status(true);
                            break;
                        case 2:
                            model.page(2)
                            panel3.status(true);
                            break;
                        case 3:
                            model.page(3)
                            panel2.status(true);


                            break;
                        case 4:
                            //getlookup(2);
                            model.page(4)
                            panel4.status(true);
                            break;
                        case 5:
                            model.page(5)
                            panel5.status(true);
                            break;
                        case 6:
                            model.page(6)
                            panel6.status(true);
                            break;
                        case 7:
                            //model.page(7)
                            //panel8.status(true);
                            //openmodal7();
                            if (model.data().data_rpq != null) {
                                window.location.href = RPQ_SingleForm_URL + "&lang=" + lang_sf + "&RPQID=" + model.data().data_dkQuestionaire.ID + "&FormID=" + model.data().data_form.ID + "&backBtn=1";
                            } else {
                                window.location.href = RPQ_SingleForm_URL + "&lang=" + lang_sf + "&FormID=" + model.data().data_form.ID + "&backBtn=1";
                            }
                            break;
                        case 8:
                            model.page(8)
                            panel9.status(true);
                            break;
                        case 9:
                            //model.page(9);
                            //panel10.status(true);
                            if (model.data().data_dkQuestionaire.ID != undefined) {
                                window.location.href = DK_SingleForm_URL + "&lang=" + lang_sf + "&DKID=" + model.data().data_rpq.ID + "&FormID=" + model.data().data_form.ID + "&backBtn=1";
                            } else {
                                window.location.href = DK_SingleForm_URL + "&lang=" + lang_sf + "&FormID=" + model.data().data_form.ID + "&backBtn=1";
                            }
                            break;
                        case 10:
                            model.page(10);
                            panel11.status(true);
                            break;
                        case 11:
                            //model.page(11);
                            //panel13.status(true);
                            if (model.data().data_form.W8ID != undefined) {
                                window.location.href = W8_SingleForm_URL + "&lang=" + lang_sf + "&W8ID=" + model.data().data_form.W8ID + "&ClientInfoID=" + model.data().data_clientInfo.ID + "&FormID=" + model.data().data_form.ID + "&backBtn=1";
                            } else {
                                window.location.href = W8_SingleForm_URL + "&lang=" + lang_sf + "&ClientInfoID=" + model.data().data_clientInfo.ID + "&FormID=" + model.data().data_form.ID + "&backBtn=1";
                            }
                            break;
                        case 12:
                            model.page(12);
                            resetPanel();

                            panel14.status(true);
                            playVideo();
                            break;
                        case 13:
                            model.page(13);
                            resetPanel();
                            panel15.status(true);
                            break;
                        case 14:
                            model.page(14);
                            resetPanel();
                            panel16.status(true);
                            break;
                        case 15:
                            model.page(15);
                            resetPanel();
                            check_DK_RPQ();
                            panel17.status(true);
                            break;
                        case 16:
                            //////////////alert("masuk 1892")
                            resetPanel();

                            //check_DK_RPQ();
                            temp.isBack(true)

                            if (temp.check_dk_RPQ() == true) {

                                if (model.data().data_form.ApplicationMode == 1) {
                                    ////////////////////alert("1884")
                                    panel18.status(false)
                                    panel18.isConfirmation(false)
                                    panel17.status(true);
                                    var tab = $("#tab15");
                                    $("#mytabs").kendoTabStrip().data("kendoTabStrip").activateTab(tab);
                                    model.page(15);
                                    //////alert("masuk 29")
                                    data_confirm()
                                } else {
                                    ////////////////////alert("1894")
                                    panel18.status(true)
                                    var tab = $("#tab16");
                                    $("#mytabs").kendoTabStrip().data("kendoTabStrip").activateTab(tab);
                                    model.page(16);
                                }
                            } else {
                                ////////////////////alert("1902")
                                panel18.status(true)
                                if (model.data().data_form.ApplicationMode == 1) {
                                    panel18.isConfirmation(true)
                                } else {
                                    panel18.isConfirmation(false)
                                }
                                var tab = $("#tab16");
                                $("#mytabs").kendoTabStrip().data("kendoTabStrip").activateTab(tab);
                                model.page(16);
                            }


                            break;
                    }
                }

            }
        })

    }

    //else if (model.page() < panel) {

    //    setTimeout(function () {
    //        $(".ontab li").removeClass("active")
    //        $(".ontab li").eq(model.page() - 2).addClass("active")
    //    }, 200)
    //    Swal.fire("Warning!", "Please complete and submit form on page " + parseInt(model.data().data_form.Step), "warning");
    //} else if (parseInt(model.data().data_form.Step) + 1 < panel) {
    //    setTimeout(function () {
    //        $(".ontab li").removeClass("active")
    //        $(".ontab li").eq(model.page() - 2).addClass("active")
    //    }, 200)
    //    Swal.fire("Warning!", "Please complete and submit form on page " + parseInt(model.data().data_form.Step), "warning");
    //}
}


backcounting = function () {
    if (panel14.count() >= 0) {
        var cont = panel14.count();
        cont -= 1;
        panel14.count(cont);
    }


}

prefPanel = function (currentpanel) {
    var pref = currentpanel - 1;
    ////////////////////////alert(currentpanel)
    ////////////////////////alert(pref)
    if (pref >= 1) {
        //resetPanel();
        switch (pref) {
            case 1:
                //panel1.status(true);
                break;
            case 2:
                tabpage(2);
                //panel2.status(true);
                break;
            case 3:
                tabpage(3);
                //panel3.status(true);
                break;
            case 4:
                tabpage(4);
                //panel4.status(true);
                break;
            case 5:
                tabpage(5);
                //panel5.status(true);
                break;
            case 6:
                tabpage(6);
                //panel6.status(true);
                break;
            case 7:
                tabpage(7);
                break;
            case 8:
                tabpage(8);
                break;
            case 9:
                ////////////////////////alert("masuk")
                tabpage(9);
                break;
            case 10:
                tabpage(9);
                break;
            case 11:
                tabpage(10);
                break;
            case 12:
                tabpage(12);
                break;
            case 13:
                tabpage(12);
                break;
            case 14:
                tabpage(13);
                break;
            case 15:
                tabpage(14);
                break;
            case 16:
                tabpage(15);
                break;
        }
    }
}

resetPanel = function () {
    panel1.status(false);
    panel2.status(false);
    panel3.status(false);
    panel4.status(false);
    panel5.status(false);
    panel6.status(false);
    panel7.status(false);
    panel8.status(false);
    panel9.status(false);
    panel10.status(false);
    panel11.status(false);
    panel12.status(false);
    panel13.status(false);
    panel14.status(false);
    panel15.status(false);
    panel16.status(false);
    panel17.status(false);
    panel17.edited(false);
    panel18.status(false);
    $("#pnl11vid").html("");
    clearInterval(md)

}

var derivatives = [
    { text: (model.lang() != undefined) ? model.lang().by_undergoing() : '', value: "Attending Course" },
    { text: "By gaining prior relevant work experience in financial institutions such as a brokerage firm or bank, fund house or asset management firm, regulatory authority or exchange.", value: "Work Experience" },
    { text: "From my relevant trading experience i.e. I have executed five or more transactions in derivative products (whether traded on an exchange or not) within the past three years and understand the risk in relating to derivative products.", value: "Trading Experience" },
]

Panel1Confim = function (panel) {
    var valid2 = $("#pnl1").kendoValidator({
        rules: {
            radio: function (input0) {
                ////console.log("-------------- ", input)
                if (input0.attr("type") === 'radio' && input0.is("[name=" + input0.attr("name") + "]")) {
                    //console.log("masuk1 -------------- ", $("[name=" + input0.attr("name") + "]").is(":checked"))
                    ////////////////////////alert($("#pnl8").find("[type=radio][name=" + input.attr("name") + "]").is(":checked"))
                    return $("[name=" + input0.attr("name") + "]").is(":checked") === true;
                }
                return true;
            },
            box: function (input1) {
                if (input1.attr("type") === 'checkbox' && input1.attr("required")) {
                    ////////////////////////alert("masuk2")
                    //console.log("masuk2 -------------- ")
                    return $("[name=" + input1.attr("name") + "]:checked").length > 0;
                }

                return true
            },
            //on_text: function (input2) {
            //    if (input2.attr("type") === 'text' && input2.is("[name=" + input2.attr("name") + "]") && input2.attr("required")) {
            //        ////////////////////////alert("masuk2")
            //        //console.log("masuk3 -------------- ", $("[name=" + input2.attr("name") + "]").val())
            //        return $("[name=" + input2.attr("name") + "]").val() !== "";
            //    }
            //}

        },
        messages: {
            radio: "This is a required field",
            box: "this is a required field",
            //on_text: "this is a required field3",

        }
    }).getKendoValidator();

    if (valid2.validate()) {
        var str = "<div style='text-align:left !important;'><p>"

        Swal.fire({
            title: (model.lang() != undefined) ? model.lang().are_you_sure() : '',//'Are you sure?',
            html: str.concat((model.lang() != undefined) ? model.lang().your_phone_number_is() : "", "<b>" + panel1.phoneNumber() + "</b> </p><p>", (model.lang() != undefined) ? model.lang().your_email_is() : "" + "<b>", panel1.email() + "</b></p>", "<p>" + (model.lang() != undefined) ? model.lang().once_confirmed() : "" + "</p><p>", (model.lang() != undefined) ? model.lang().clisc_cancel() : "" + " </p></div>"),
            icon: 'warning',
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            showCancelButton: true,
            focusConfirm: false,
            confirmButtonText: 'OK',
            cancelButtonText: 'Cancel',

        }).then(function (result) {
            if (result.isConfirmed) {
                $("#modalPanel1").modal({
                    show: true,
                    backdrop: 'static',
                    keyboard: false
                })
                //savedraft(1)
            }
        })
    }

}

openmodal7 = function () {

    $("#modalPanel7").modal("show")

}

backTopage6 = function () {
    model.loader(true);
    getBack(false);
    nextPanel(5);
    $("#modalPanel7").modal("hide");

}

checkdList5 = function (e) {
    var dt = e.dataItem;
    var value = dt.value;
    setTimeout(function () {
        if (panel5.investment_earning_fund_source() == "Provided By Family Member" || panel5.rental_income_fund_source() == "Provided By Family Member") {
            //panel5.saving_from_salary(true);
            panel5.provided_family(true);
        } else {
            //panel5.saving_from_salary(false);
            //panel5.provided_family(false);

        }

        if (panel5.investment_earning_fund_source() == "Previous Job" || panel5.rental_income_fund_source() == "Previous Job") {
            panel5.previouse_job(true);
        } else {
            //panel5.previouse_job(false);
        }

        if (panel5.investment_earning_fund_source() == "Saving From Salary" || panel5.rental_income_fund_source() == "Saving From Salary") {
            panel5.saving_from_salary(true)
        } else {
            //panel5.saving_from_salary(false);

        }
    }, 200);

}
checkBox5 = function (name) {
    ////////////////////////alert(name)
    switch (name) {
        case "Saving_From_Salary":

            break;
        case "Previous_Job":
            ////////////////////////alert("masuk 1")
            setTimeout(function () {
                if (panel5.previouse_job() == false) {
                    panel5.previouse_job_industry("");
                    panel5.previouse_job_occupation("");
                    panel5.previouse_job_annual_income("");
                    panel5.previouse_job_company_name("");
                    panel5.previouse_job_other_industry("");
                    panel5.previouse_job_other_occupation("");
                    panel5.years_of_service("");
                }
            }, 200)
            break;
        case "Provided_Family":
            setTimeout(function () {
                if (panel5.provided_family() == false) {
                    panel5.provided_family_industry("");
                    panel5.provided_family_Other_industry("");
                    panel5.provided_family_occupation("");
                    panel5.provided_family_Other_occupation("");
                    panel5.provided_family_relation("");
                }
            }, 200)

            break;
        case "Investment_Earnings":
            setTimeout(function () {
                if (panel5.investments_earning() == false) {
                    panel5.investment_earning_type("");
                    panel5.investment_earning_other_type("");
                    panel5.investment_earning_capital("");
                    panel5.investment_earning_profit("");
                    panel5.investment_earning_fund_source("");
                }
            }, 200)

            break;
        case "Rental_Income":
            ////////////////////////alert("masuk 3")
            setTimeout(function () {
                if (panel5.rental_income() == false) {
                    panel5.rental_income_holding_period("");
                    panel5.rental_income_fund_source("");
                    panel5.rental_income_annual("");
                }
            }, 200);

            break;
        case "Other":
            ////////////////////////alert("masuk 4")
            setTimeout(function () {
                if (panel5.other() == false) {
                    panel5.other_value("")
                }
            }, 200)

            break;

    }
}
function getUrlOAOParameter(param) {
    var sPageURL = window.location.search.substring(1),
        sURLVariables = sPageURL.split('&'),
        sParameterName,
        i;

    for (i = 0; i < sURLVariables.length; i++) {
        sParameterName = sURLVariables[i].split("=")

        if (sParameterName[0] = param) {
            value = sURLVariables[i].split(param + "=")
            if (value[1] != undefined) {
                return decodeURIComponent(value[1]);
            }

        }
    }
}

checkSurnameFirstName = function (data) {

    var srn = data.split(" ");
    ////console.log(srn)
    var sm = _.filter(srn, function (x) { return x != "" })

    return sm.join(" ");
}

isHKID = function (str) {
    if (panel3.idCardType() != "NRIC")
        return true;

    // basic check length
    if (str.length < 8)
        return "Invalid HKID Length";

    // handling bracket
    if (str.charAt(str.length - 3) == '(' && str.charAt(str.length - 1) == ')')
        str = str.substring(0, str.length - 3) + str.charAt(str.length - 2);
    else
        return "Please Include the bracket for the Check Digit in HKID";

    // regular expression to check pattern and split
    var hkidPat = /^([A-Z]{1,2})([0-9]{6})([A0-9])$/;
    var matchArray = str.match(hkidPat);

    // not match, return false
    if (matchArray === null)
        return "Wrong Format of HKID";

    // the character part, numeric part and check digit part
    var charPart = matchArray[1];
    var numPart = matchArray[2];
    var checkDigit = matchArray[3];

    // calculate the checksum for character part
    var checkSum = 0;
    if (charPart.length == 2) {
        checkSum += 9 * (charPart.charCodeAt(0) - 55);
        checkSum += 8 * (charPart.charCodeAt(1) - 55);
    } else {
        checkSum += 9 * 36;
        checkSum += 8 * (charPart.charCodeAt(0) - 55);
    }

    // calculate the checksum for numeric part
    for (var i = 0, j = 7; i < numPart.length; i++, j--)
        checkSum += j * numPart.charAt(i);

    // verify the check digit
    var remaining = checkSum % 11;
    var verify = remaining === 0 ? 0 : 11 - remaining;

    if (verify == checkDigit || (verify == 10 && checkDigit == 'A'))
        return true;
    else
        return "Wrong HKID Check Digit"
}

isCNID = function (str) {
    if (panel3.idCardType() != "NRIC")
        return true;

    //Length of ID must be 18 
    if (str.length != 18) {
        return "Invalid CN ID Format";
    }
    //Test case 63578519800101566X 534274198001019766
    var cnidPat = /^([0-9]{6})([0-9]{8})([0-9]{2})([0-9]{1})([X0-9]{1})$/;
    var matchArray = str.match(cnidPat);

    if (matchArray === null)
        return "Invalid CN ID Format";

    var data = $("#dateofbirth").val();
    var stDate = kendo.toString(new Date(data), "yyyy-MM-dd")

    if (stDate != "") {
        var currentTime = new Date(stDate);
        var birthDate = currentTime.getUTCFullYear() + '' + String(currentTime.getMonth() + 1).padStart(2, '0') + '' + String(currentTime.getDate()).padStart(2, '0');
        if (matchArray[2] != birthDate) {
            return "Mismatch BirthDate"
        }
    }

    if (panel3.title() != "") {
        var gender = ""
        switch (panel3.title()) {
            case "mr":
                gender = 'male';
                break;
            case "mrs":
                gender = 'female';
                break;
            case "ms":
                gender = 'female';
                break;
        }
        var gen = ""
        if (matchArray[4] % 2 == 0) {
            gen = "female"
        } else
            gen = 'male'
        if (gen != gender) {
            return "Mismatch Gender"
        }
    }

    var numPart = matchArray[1] + matchArray[2] + matchArray[3] + matchArray[4];
    var checkDigit = matchArray[5];

    var checkSum = 0;
    for (var i = 0; i < numPart.length; i++)
        checkSum += Math.pow(2, 17 - i) % 11 * (numPart.charAt(i));

    // verify the check digit
    var verify = (12 - checkSum % 11) % 11;
    if (verify == checkDigit || (verify == 10 && checkDigit == 'X'))
        return true;
    else
        return "Wrong CNID Check Digit";
}


savedraft = function (panel) {
    switch (panel) {
        case 1:
            var valid1 = $("#pnl1").kendoValidator().data("kendoValidator");

            if (valid1.validate()) {
                model.loader(true);
                Aecode = getUrlOAOParameter("AECode");
                Aename = getUrlOAOParameter("AEName");
                lang = getUrlOAOParameter("lang");
                promo = getUrlOAOParameter("PromoCode");
                ID = getUrlOAOParameter("ID");
                source1 = getUrlOAOParameter("Source");
                param1 = {
                    ID_Form: panel1.ID_Form(),
                    ISMAINLAND: panel1.isMaindLandClient(),
                    Email: panel1.email(),
                    Phone_Number: panel1.phoneNumber(),
                    Phone_Code: $("#country_code").val(),
                    Source: model.source(),
                    PID: (model.pid() != undefined) ? model.pid() : 0
                };
                panel1.phoneCode(param1.Phone_Code);
                $.ajax({
                    url: urlSaveUpdatePanel1,
                    data: JSON.stringify(param1),
                    type: "POST",
                    contentType: ' application/json',
                    success: function (res) {
                        if (res.success !== false) {
                            if (res.success !== null && res.success == true) {
                                id = res.data.data.ID_Form;
                                pg = res.data.page;
                                temp.datapage(pg);
                                panel1.ID_Form(id);
                            }
                            model.page(2);
                            //nextPanel(panel);
                            getBack(false);

                            Swal.fire({
                                title: (model.lang() != undefined) ? model.lang().email_sent_successfully() : '',
                                text: (model.lang() != undefined) ? model.lang().check_email1() + panel1.email() + model.lang().check_email2() : '',
                                icon: 'success',
                                showCancelButton: false,
                                confirmButtonColor: '#3085d6',
                                confirmButtonText: 'OK',
                                allowOutsideClick: false
                            }).then(function (result) {
                                if (result.isConfirmed) {
                                    window.location.href = window.location.origin + (window.location.pathname != undefined ? window.location.pathname : "/") + "?" + (lang != undefined ? "lang=" + lang : "lang=en-us") + "&ID=" + res.data.data.ID_Form + (Aecode != undefined ? "&AECode=" + Aecode : "") + (Aename != undefined ? "&AEName=" + Aename : "") + (promo != undefined ? "&PromoCode=" + promo : "") + (source1 != undefined ? "&Source=" + source1 : "") + "&login=0";

                                }

                            })
                        } else {
                            if ((res.message).indexOf("Exist") > 0) {
                                Swal.fire(
                                    (model.lang() != undefined) ? model.lang().warning() : '',
                                    (model.lang() != undefined) ? model.lang().email_exist() : '',
                                    'warning'
                                )
                            } else {
                                Swal.fire(
                                    (model.lang() != undefined) ? model.lang().warning() : '',
                                    res.message,
                                    'warning'
                                )
                            }

                            model.loader(false);
                        }

                    }
                })
            } else {
                Swal.fire((model.lang() != undefined) ? model.lang().warning() : '', (model.lang() != undefined) ? model.lang().fill_all() : '', "warning");
                model.loader(false);
            }

            break;
        case 2:
            var en_stts = 0;
            var en_stts1 = 0;
            var valid2 = $("#pnl2").kendoValidator({
                rules: {
                    customRule2: function (input) {
                        val = $("#surname").val();

                        if (input.is("[name='Surename']")) {
                            if (val != "") {
                                dm = true
                                arrtext = val.split("");
                                ////console.log(arrtext);
                                $.each(arrtext, function (i, dt) {
                                    res = /[a-zA-Z\s]/ig.test(dt);
                                    if (val != "" && res == false) {
                                        en_stts = 1;
                                        dm = false;
                                    }
                                })

                                return dm
                            }


                            if (val == "") {
                                //////////////////////alert("masuk33")
                                en_stts = 2;
                                return false;
                            }

                        }
                        return true;

                    },
                    customRule3: function (input) {
                        val1 = $("#EngName").val();



                        if (input.is("[name='EngName']")) {
                            if (val != "") {
                                dm = true
                                arrtext1 = val1.split("");
                                ////console.log(arrtext);
                                $.each(arrtext1, function (i, dt) {
                                    res = /[a-zA-Z\s]/ig.test(dt);
                                    if (val != "" && res == false) {
                                        ////////////////////////alert(res)
                                        en_stts1 = 1;
                                        dm = false;
                                    }
                                })

                                return dm;
                            }

                            if (val == "") {
                                ////////////////////////alert("masuk33")
                                en_stts1 = 2;
                                return false;
                            }

                        }
                        return true;
                    },

                },
                messages: {
                    customRule2: function () {
                        if (en_stts == 2) {
                            ////////////////////////alert("masuk")
                            return (model.lang() != undefined) ? model.lang().compuls_qu() : '';
                        } else if (en_stts == 1) {
                            return (model.lang() != undefined) ? model.lang().warning_en_desc() : '';
                        }
                    },
                    customRule3: function () {
                        if (en_stts1 == 2) {
                            ////////////////////////alert("masuk")
                            return (model.lang() != undefined) ? model.lang().compuls_qu() : '';
                        } else if (en_stts1 == 1) {
                            return (model.lang() != undefined) ? model.lang().warning_en_desc() : '';
                        }
                    },
                }
            }).data("kendoValidator");
            var bracket = false
            if (panel3.idCard().indexOf("(") < 0 && panel3.idCard().indexOf(")") < 0 && panel3.nationality() == 'HONG KONG SAR CHINA') {
                Swal.fire(model.lang().warning(), model.lang().warning_hkID(), "warning");
                $("#info_hkid").css("color", "red")
                bracket = true;

            } else if (panel3.idCard().indexOf("(") < 0 && panel3.nationality() == 'HONG KONG SAR CHINA') {
                bracket = true;
            } else if (panel3.idCard().indexOf(")") < 0 && panel3.nationality() == 'HONG KONG SAR CHINA') {
                bracket = true;
            }

            if (bracket == true) {
                Swal.fire(model.lang().warning(), model.lang().warning_hkID(), "warning");
                $("#info_hkid").css("color", "red")
            } else {
                
                if (valid2.validate()) {
                    model.loader(true);
                    var data = $("#dateofbirth").val();
                    var stDate = kendo.toString(new Date(data), "yyyy-MM-dd")
                    panel3.dateOfBirth()
                    nyear = new Date().getFullYear();
                    date = new Date(stDate);
                    byear = date.getFullYear()
                    age = nyear - byear;
                    if (data != '') {
                        if (age < 17) {
                            //$("#dateofbirth").val("");
                            model.loader(false);
                            //console.log("------------ 3 " + age)
                            Swal.fire("Warning!", "Invalid birth Date", "warning")
                        } else {
                            ////////////////////////alert(stDate);
                            var valid = false;
                            switch (panel3.nationality()) {
                                case "HONG KONG SAR CHINA":
                                    var input = panel3.idCard();
                                    valid = isHKID(input);
                                    break;
                                case "China":
                                    var input = (panel3.idCard()).replace("(", "").replace(")", "");
                                    valid = isCNID(input);
                                    break;
                                default:
                                    valid = true;
                            }

                            //alert(valid)

                            if (valid == true) {
                                param2 = {
                                    ID_Form: panel1.ID_Form(),
                                    Promotion_Code: panel3.promotion_code(),
                                    Title: panel3.title(),
                                    Surename: checkSurnameFirstName(panel3.eng_surename()),
                                    ClientName: checkSurnameFirstName(panel3.eng_name()),
                                    NonEnglishSurname: checkSurnameFirstName(panel3.NonEnglishSurname()),
                                    NoneEnglishName: checkSurnameFirstName(panel3.NoneEnglishName()),
                                    Nationality: panel3.nationality(),
                                    ID_Cardtype: panel3.idCardType(),
                                    ID_Card: (panel3.idCard()).toUpperCase(),
                                    Place_Issue: panel3.placeIssue(),
                                    Country_Birth: panel3.countryBirth(),
                                    Date_Birth_s: stDate,
                                    Age: panel3.age(),
                                    Mobile_number: panel1.phoneNumber(),
                                    mobile_Area_Number: panel1.phoneCode(),
                                    Home_number: panel3.homeNumber(),
                                    Home_Area_Number: panel3.homeAreaCode(),
                                    Office_Number: panel3.officeNumber(),
                                    Office_Area_Number: panel3.officeAreaCode(),
                                    Wechat_ID: panel3.wechat(),
                                    AECODE: panel3.aecode(),
                                    AENAME: panel3.aename(),
                                    PreferedAE: panel3.is_preferred_trading() == true ? 1 : 0,
                                };
                                $.ajax({
                                    url: urlSaveUpdatePanel2,
                                    data: JSON.stringify(param2),
                                    type: "POST",
                                    contentType: 'application/json',
                                    success: function (res) {
                                        var dt = res.data.page;
                                        temp.datapage(dt);
                                        nextPanel(panel);
                                        getBack(false);
                                        //model.loader(false);
                                        model.page(3);
                                    }
                                });
                            } else {
                                switch (panel3.nationality()) {
                                    case "HONG KONG SAR CHINA":
                                        switch (valid) {
                                            case "Wrong HKID Check Digit":
                                                Swal.fire((model.lang() != undefined) ? model.lang().warning() : '', (model.lang() != undefined) ? model.lang().invalid_hkid1() : '', "warning");
                                                model.loader(false);
                                                break;
                                            case "Wrong Format of HKID":
                                                Swal.fire((model.lang() != undefined) ? model.lang().warning() : '', (model.lang() != undefined) ? model.lang().invalid_hkid2() : '', "warning");
                                                model.loader(false);
                                                break;
                                            case "Invalid HKID Length":
                                                Swal.fire((model.lang() != undefined) ? model.lang().warning() : '', (model.lang() != undefined) ? model.lang().invalid_hkid3() : '', "warning");
                                                model.loader(false);
                                                break;
                                            case "Please Include the bracket for the Check Digit in HKID":
                                                Swal.fire((model.lang() != undefined) ? model.lang().warning() : '', (model.lang() != undefined) ? model.lang().warning_hkID() : '', "warning");
                                                model.loader(false);
                                                break;
                                            default:
                                                Swal.fire((model.lang() != undefined) ? model.lang().warning() : '', (model.lang() != undefined) ? model.lang().invalid_HKID() : '', "warning");
                                                model.loader(false);
                                                break;
                                        }
                                        //Swal.fire((model.lang() != undefined) ? model.lang().warning() : '', (model.lang() != undefined) ? model.lang().invalid_HKID() : '', "warning");
                                        //model.loader(false);
                                        break;
                                    case "China":
                                        switch (valid) {
                                            case "Mismatch BirthDate":
                                                Swal.fire((model.lang() != undefined) ? model.lang().warning() : '', (model.lang() != undefined) ? model.lang().invalid_CNID_bdate() : '', "warning");
                                                model.loader(false);
                                                break;
                                            case "Mismatch Gender":
                                                Swal.fire((model.lang() != undefined) ? model.lang().warning() : '', (model.lang() != undefined) ? model.lang().invalid_CNID_gender() : '', "warning");
                                                model.loader(false);
                                                break;
                                            default:
                                                Swal.fire((model.lang() != undefined) ? model.lang().warning() : '', (model.lang() != undefined) ? model.lang().invalid_CNID() : '', "warning");
                                                model.loader(false);
                                                break;
                                        }
                                        
                                        break;
                                }
                                
                            }
                            
                        }
                    }

                } else {
                    Swal.fire((model.lang() != undefined) ? model.lang().warning() : '', (model.lang() != undefined) ? model.lang().fill_all() : '', "warning");
                    model.loader(false);
                }
            }
            

            break;
        case 3:
            var valid3 = $("#pnl3").kendoValidator({
                rules: {
                    customRule: function (input) {
                        ////console.log("------------ ", input.is("[name='Objective']"));
                        if (input.is("[name='choose1']") && $("[name='choose1']:checked").length == 1) {
                            return false;
                        }

                        return true;
                    }
                    //customRule1: function (input) {
                    //    ////console.log("------------ ", input.is("[name='Objective']"));
                    //    if (input.is("[name='ntl']") && $("[name='ntl']:checked").length == 0) {
                    //        return false;
                    //    }

                    //    return true;
                    //}
                },
                messages: {
                    customRule: (model.lang() != undefined) ? model.lang().at_least_one() : '',
                    //customRule1: "Atleast one service should be selected.",
                }
            }).data("kendoValidator");
            if (model.data().data_dkQuestionaire != null) {
                if (model.data().data_rpq.RPQScore < 71 && model.data().data_dkQuestionaire.AcquireFrom1 == null) {
                    temp.check_dk_RPQ(true)
                } else if (model.data().data_rpq.RPQScore < 71 && model.data().data_dkQuestionaire.AcquireFrom1 != null) {
                    temp.check_dk_RPQ(true)
                } else if (model.data().data_rpq.RPQScore > 71 && model.data().data_dkQuestionaire.AcquireFrom1 == null) {
                    temp.check_dk_RPQ(true)
                }

            }

            if (valid3.validate()) {
                model.loader(true)
                param3 = {
                    ID_Form: panel1.ID_Form(),
                    AcknowledgementCashAcct: panel2.CashAccount() == 1 ? true : false,
                    AcknowledgementMarginAcct: panel2.MarginAccount() == 1 ? true : false,
                    AcknowledgementStockOptAcct: panel2.StockOptionAccount() == 1 ? true : false,
                    AcknowledgementOnlinePoemsTradingService: panel2.OnlineTrading() == 1 ? true : false,
                    AcknowledgementChinaConnectTradingService: panel2.Chinaconnect() == 1 ? true : false,
                    AcknowledgementHKIDR: panel2.HKIDR() == 1 ? true : false,
                    isAutralia: panel2.isAustralia(),
                    isCanada: panel2.isCanada(),
                    isFinland: panel2.isFinland(),
                    isTaiwan: panel2.isTaiwan(),
                    isJapan: panel2.isJapan(),
                    isKorea: panel2.isKorea(),
                }
                $.ajax({
                    url: urlSaveUpdatePanel3,
                    data: JSON.stringify(param3),
                    type: "POST",
                    contentType: 'application/json',
                    success: function (res) {
                        var pg = res.data.page;
                        if (pg != null) {
                            temp.datapage(pg);
                        }
                        nextPanel(panel);
                        getBack(false);
                        //model.loader(false);
                        model.page(4);
                    }
                });
            } else {
                Swal.fire((model.lang() != undefined) ? model.lang().warning() : '', (model.lang() != undefined) ? model.lang().fill_all() : '', "warning");
                model.loader(false);
            }

            break;
        case 4:
            var valid4 = $("#pnl4").kendoValidator().data("kendoValidator");
            if (valid4.validate()) {
                model.loader(true);
                param4 = {
                    ID_Form: panel1.ID_Form(),
                    Residential_Country: panel4.country(),
                    Residential_Address: panel4.residentialAddress(),
                    Residential_Address2: panel4.residentialAddress2(),
                    Residential_Address3: panel4.residentialAddress3(),
                    Ownership_Residence: panel4.ownershipResidence(),
                    Employment_Type: panel4.employmentType(),
                    Industry: panel4.industry(),
                    Other_Industry: panel4.other_industries(),
                    Occupation: panel4.occupation(),
                    Employer_Company_Name: panel4.company_name(),
                    Office_Address1: panel4.office_address1(),
                    Office_Address2: panel4.office_address2(),
                    Office_Address3: panel4.office_address3(),
                    Office_Region: panel4.office_region(),
                    Years_Of_Service: panel4.years_of_service(),
                    Other_Occupation: panel4.other_occupation(),

                };
                $.ajax({
                    url: urlSaveUpdatePanel4,
                    data: JSON.stringify(param4),
                    type: "POST",
                    contentType: 'application/json',
                    success: function (res) {
                        var pg = res.data.page;
                        if (pg != null) {
                            temp.datapage(pg);
                        }
                        nextPanel(panel);
                        getBack(false);
                        //model.loader(false);
                        model.page(5);
                    }
                });
            } else {
                Swal.fire((model.lang() != undefined) ? model.lang().warning() : '', (model.lang() != undefined) ? model.lang().fill_all() : '', "warning");
                model.loader(false);
            }

            break;
        case 5:
            var valid5 = $("#pnl5").kendoValidator({
                rules: {
                    pane4: function (input) {
                        ////console.log("------------ ", input.is("[name='Objective']"));
                        if (input.is("[name='wealth']")) {
                            if ($("[name='wealth']:checked").length == 0) {
                                ////////////////////////alert("masuk")

                            }

                            return $("[name='wealth']:checked").length > 0;
                        }

                        return true;
                    }
                },
                messages: {
                    pane4: (model.lang() != undefined) ? model.lang().at_least_one() : ''
                }
            }).getKendoValidator();
            var netwirth = check_networth();
            if (valid5.validate() == true && netwirth == true) {
                val_liquid = 0;
                switch (panel5.liquid_assets()) {
                    case "HKD 0":
                        val_liquid = 0;
                        break;
                    case "HKD 1 – 200,000":
                        val_liquid = 200000;
                        break;
                    case "HKD 200,001 – 500,000":
                        val_liquid = 500000;
                        break;
                    case "HKD 500,001 – 1,000,000":
                        val_liquid = 1000000;
                        break;
                    case "> HKD 1,000,000":
                        val_liquid = 1000100;
                        break;
                }

                if (parseFloat(panel5.other_net_worth()) < val_liquid) {
                    Swal.fire((model.lang() != undefined) ? model.lang().warning() : '', (model.lang() != undefined) ? model.lang().liquid_asset_lower() : '', "warning");

                } else if (model.data().data_clientInfo.EmploymentType != "Employed") {
                    if (panel5.previouse_job() == false && panel5.provided_family() == false) {
                        Swal.fire((model.lang() != undefined) ? model.lang().warning() : '', (model.lang() != undefined) ? model.lang().choose_wealth() : '', "warning")
                    } else {
                        model.loader(true);
                        param5 = {
                            ID_Form: panel1.ID_Form(),
                            Annual_Income: panel5.annual_income(),
                            Liquid_Assets: panel5.liquid_assets(),
                            Net_Worth: panel5.net_worth(),
                            Other_Net_Worth: panel5.other_net_worth(),
                            Previouse_Job: panel5.previouse_job(),
                            Previouse_Job_Industry: panel5.previouse_job_industry(),
                            Previouse_Job_Other_Industry: panel5.previouse_job_other_industry(),
                            Previouse_Job_Occupation: panel5.previouse_job_occupation(),
                            Previouse_Job_Other_Occupation: panel5.previouse_job_other_occupation(),
                            Previouse_Job_Company_Name: panel5.previouse_job_company_name(),
                            Prevouse_Job_Annual_Income: parseInt(panel5.previouse_job_annual_income()),
                            Previouse_Job_Year_Service: parseInt(panel5.years_of_service()),
                            Provided_Family: panel5.provided_family(),
                            Family_Relation: panel5.provided_family_relation(),
                            Family_Industry: panel5.provided_family_industry(),
                            Family_Other_Industry: panel5.provided_family_Other_industry(),
                            Family_Occupation: panel5.provided_family_occupation(),
                            Family_Other_Occupancy: panel5.provided_family_Other_occupation(),
                            Investment_Earning: panel5.investments_earning(),
                            Investment_type: panel5.investment_earning_type(),
                            Investment_Capital: panel5.investment_earning_capital(),
                            Investment_Profit: panel5.investment_earning_profit(),
                            Investment_Fund_Source: panel5.investment_earning_fund_source(),
                            Other_Investment_Type: panel5.investment_earning_other_type(),
                            Other: panel5.other(),
                            Other_Description: panel5.other_value(),
                            Rental_Income: panel5.rental_income(),
                            Holding_Period_Properties: panel5.rental_income_holding_period(),
                            Annual_Rental_Income: panel5.rental_income_annual(),
                            FundSource_Property_Acquisition: panel5.rental_income_fund_source(),
                            SavingFromSalary: panel5.saving_from_salary(),
                        };
                        $.ajax({
                            url: urlSaveUpdatePanel5,
                            data: JSON.stringify(param5),
                            type: "POST",
                            contentType: 'application/json',
                            success: function (res) {
                                var pg = res.data.page;
                                if (pg != null) {
                                    temp.datapage(pg);
                                }
                                nextPanel(panel);
                                getBack(false);
                                //model.loader(false);
                                model.page(6);
                            }
                        });
                    }
                } else {
                    model.loader(true);
                    param5 = {
                        ID_Form: panel1.ID_Form(),
                        Annual_Income: panel5.annual_income(),
                        Liquid_Assets: panel5.liquid_assets(),
                        Net_Worth: panel5.net_worth(),
                        Other_Net_Worth: panel5.other_net_worth(),
                        Previouse_Job: panel5.previouse_job(),
                        Previouse_Job_Industry: panel5.previouse_job_industry(),
                        Previouse_Job_Other_Industry: panel5.previouse_job_other_industry(),
                        Previouse_Job_Occupation: panel5.previouse_job_occupation(),
                        Previouse_Job_Other_Occupation: panel5.previouse_job_other_occupation(),
                        Previouse_Job_Company_Name: panel5.previouse_job_company_name(),
                        Prevouse_Job_Annual_Income: parseInt(panel5.previouse_job_annual_income()),
                        Previouse_Job_Year_Service: parseInt(panel5.years_of_service()),
                        Provided_Family: panel5.provided_family(),
                        Family_Relation: panel5.provided_family_relation(),
                        Family_Industry: panel5.provided_family_industry(),
                        Family_Other_Industry: panel5.provided_family_Other_industry(),
                        Family_Occupation: panel5.provided_family_occupation(),
                        Family_Other_Occupancy: panel5.provided_family_Other_occupation(),
                        Investment_Earning: panel5.investments_earning(),
                        Investment_type: panel5.investment_earning_type(),
                        Investment_Capital: panel5.investment_earning_capital(),
                        Investment_Profit: panel5.investment_earning_profit(),
                        Investment_Fund_Source: panel5.investment_earning_fund_source(),
                        Other_Investment_Type: panel5.investment_earning_other_type(),
                        Other: panel5.other(),
                        Other_Description: panel5.other_value(),
                        Rental_Income: panel5.rental_income(),
                        Holding_Period_Properties: panel5.rental_income_holding_period(),
                        Annual_Rental_Income: panel5.rental_income_annual(),
                        FundSource_Property_Acquisition: panel5.rental_income_fund_source(),
                        SavingFromSalary: panel5.saving_from_salary(),
                    };
                    $.ajax({
                        url: urlSaveUpdatePanel5,
                        data: JSON.stringify(param5),
                        type: "POST",
                        contentType: 'application/json',
                        success: function (res) {
                            var pg = res.data.page;
                            if (pg != null) {
                                temp.datapage(pg);
                            }
                            nextPanel(panel);
                            getBack(false);
                            //model.loader(false);
                            model.page(6);
                        }
                    });
                }

            } else {
                if ($("[name='wealth']:checked").length == 0) {
                    Swal.fire((model.lang() != undefined) ? model.lang().warning() : '', (model.lang() != undefined) ? model.lang().choose_wealth() : '', "warning")
                } else if (netwirth == false) {
                    swal.fire((model.lang() != undefined) ? model.lang().warning() : "", (model.lang() != undefined) ? model.lang().must_lower() : '', "warning")
                } else {
                    Swal.fire((model.lang() != undefined) ? model.lang().warning() : '', (model.lang() != undefined) ? model.lang().fill_all() : '', "warning");

                }



                model.loader(false);
            }

            break;
        case 6:
            var valid6 = $("#pnl6").kendoValidator({
                rules: {
                    customRule1: function (input) {
                        ////console.log("------------ ", input.is("[name='Objective']"));
                        if (input.is("[name='Objective']")) {
                            return $("[name='Objective']:checked").length > 0;
                        }

                        return true;
                    }
                },
                messages: {
                    customRule1: (model.lang() != undefined) ? model.lang().at_least_one() : ''
                }
            }).getKendoValidator();
            if (panel6.Investment_Objective().length > 0) {
                if (valid6.validate()) {
                    model.loader(true);
                    var param6 = {
                        ID_Form: panel1.ID_Form(),
                        //Investments_Objective: panel6.Investment_Objective_temp().toString().length > 0 ? panel6.Investment_Objective_temp().toString().replace(/,/g, ';') : "",
                        Investments_Objective: panel6.Investment_Objective().toString().length > 0 ? panel6.Investment_Objective().toString().replace(/,/g, ';') : "",
                        Listed_Securities: panel6.listed_securities(),
                        Future_Option: panel6.futures_option(),
                        Leverage_foreign_Exchange: panel6.leverage_foreign_exchange(),
                        Unit_Trust_Bond: panel6.unit_trust_bonds(),
                        Structured_Product: panel6.structure_products(),
                        Leverage_Inverse_product: panel6.leverage_inverse_product(),
                        CBBC_Warant: panel6.ccbc_warant(),
                    }
                    $.ajax({
                        url: urlSaveUpdatePanel6,
                        data: JSON.stringify(param6),
                        type: "POST",
                        contentType: 'application/json',
                        success: function (res) {
                            //var pg = res.data.page;
                            //if (pg != null) {
                            //    temp.datapage(pg);
                            //}
                            if (res.success == true) {
                                nextPanel(panel);
                                //openmodal7();
                                model.loader(false);
                                model.page(7);
                            } else {
                                panel6.Investment_Objective_temp([]);
                                model.loader(false);
                                Swal.fire((model.lang() != undefined) ? model.lang().warning() : '', (model.lang() != undefined) ? model.lang().fill_all() : '', "warning");
                                model.loader(false);
                            }

                        }
                    });
                } else {
                    Swal.fire((model.lang() != undefined) ? model.lang().warning() : '', (model.lang() != undefined) ? model.lang().fill_all() : '', "warning");
                    model.loader(false);
                }
            } else {
                panel6.Investment_Objective_temp([]);
                Swal.fire((model.lang() != undefined) ? model.lang().warning() : '', (model.lang() != undefined) ? model.lang().fill_all() : '', "warning");
                model.loader(false);
            }




            break;
        case 7:
            var valid8 = $("#pnl8").kendoValidator({
                rules: {
                    radio: function (input) {
                        if (input.filter("[type=radio]") && input.attr("required")) {
                            ////////////////////////alert($("#pnl8").find("[type=radio][name=" + input.attr("name") + "]").is(":checked"))
                            return $("#pnl8").find("[type=radio][name=" + input.attr("name") + "]").is(":checked");
                        }
                        return true;
                    },
                    box: function (input) {
                        if (input.filter("[type=checkbox]") && input.is("[name=" + input.attr("name") + "]")) {
                            return $("[name=" + input.attr("name") + "]:checked").length > 0;
                        }

                        return true
                    }
                },
                messages: {
                    radio: (model.lang() != undefined) ? model.lang().this_required() : '',
                    box: (model.lang() != undefined) ? model.lang().this_required() : ''
                }
            }).getKendoValidator();
            if (valid8.validate()) {
                model.loader(true);
                var param8 = {
                    ID_Form: panel1.ID_Form(),
                    Question1: panel8.question1(),
                    Question2: panel8.question2(),
                    Question3: panel8.question3(),
                    Question4: panel8.question4().toString().length > 0 ? panel8.question4().toString().replace(/,/g, '') : "",
                    Question5: panel8.question5(),
                    Question6: panel8.question6(),
                    Question7: panel8.question7(),
                    Question8: panel8.question8(),
                }
                $.ajax({
                    url: urlSaveUpdatePanel7,
                    data: JSON.stringify(param8),
                    type: "POST",
                    contentType: 'application/json',
                    success: function (res) {
                        var pg = res.data.page;
                        if (pg != null) {
                            temp.datapage(pg);
                        }
                        id = res.data.data;
                        var prm = {
                            ID: id,
                        }

                        $.ajax({
                            url: urlGetScore,
                            data: JSON.stringify(prm),
                            type: "POST",
                            contentType: 'application/json',
                            success: function (res) {
                                var data_rpq = res.data;
                                if (data_rpq != null) {
                                    model.page(9);
                                    panel8.question1(data_rpq.Q1);
                                    panel8.question2(data_rpq.Q2);
                                    panel8.question3(data_rpq.Q3);
                                    panel8.question4(data_rpq.Q4.split(''));
                                    panel8.question5(data_rpq.Q5);
                                    panel8.question6(data_rpq.Q6);
                                    panel8.question7(data_rpq.Q7);
                                    panel8.question8(data_rpq.Q8);
                                    switch (data_rpq.RPQLevel) {
                                        case 1:
                                            panel8.RpqLevel("Low Risk");
                                            panel8.RpqLvl((model.lang() != undefined) ? model.lang().low_risk() : '')
                                            break;
                                        case 2:
                                            panel8.RpqLevel("Medium Risk");
                                            panel8.RpqLvl((model.lang() != undefined) ? model.lang().medium_risk() : '')
                                            break;
                                        case 3:
                                            panel8.RpqLevel("High Risk");
                                            panel8.RpqLvl((model.lang() != undefined) ? model.lang().high_risk() : '')
                                            break;
                                    }

                                    panel8.score(data_rpq.RPQScore)
                                }

                                //console.log(res);
                                nextPanel(panel);
                                getBack(false);
                            }
                        });
                    }
                });
            } else {
                Swal.fire((model.lang() != undefined) ? model.lang().warning() : '', (model.lang() != undefined) ? model.lang().fill_all() : '', "warning");
                model.loader(false);
            }
            break;
        case 8:



            break;
        case 9:
            var valid9 = $("#pnl10").kendoValidator({
                rules: {
                    radio: function (input) {
                        if (input.attr("type") == "radio" && $("#pnl10").find("[type=radio][name=acquired]").is(":checked") == false) {
                            ////////////////////////alert("0")
                            return false;

                        }
                        return true;
                    },

                    box: function (input) {

                        if (input.attr("type") == "checkbox" && $("#pnl10").find("[type=checkbox][name=" + input.attr("name") + "]").is(":checked") == false) {
                            ////////////////////////alert("1")
                            return false;
                        }
                        return true;
                    },
                    inputtext: function (input) {
                        if (input.prop("required") && $("#pnl10").find("[type=text][name=" + input.attr("name") + "]").val() == "") {
                            ////////////////////////alert("2")
                            return false;
                        }
                        return true;
                    },
                    radiorequired: function (input) {
                        if (panel10.knowledge() == "Attending Course") {
                            if (input.attr("type") == "radio" && $("#pnl10").find("[type=radio][name= kn2]").is(":checked") == false) {
                                ////////////////////////alert("31")
                                return false;

                            }
                        }

                        if (panel10.knowledge() == "Work Experience") {
                            if (input.attr("type") == "radio" && $("#pnl10").find("[type=radio][name= kn1]").is(":checked") == false) {
                                ////////////////////////alert("32")
                                return false;

                            }
                        }

                        return true;
                    },
                },
                messages: {
                    radio: "This is a required field",
                    box: "this is a required field",
                    inputtext: "this is a required field",
                    radiorequired: "this is a required field",

                }
            }).data("kendoValidator");
            if (valid9.validate() == true) {
                model.loader(true);
                var param9 = {
                    ID_Form: panel1.ID_Form(),
                    AcquireFrom1: panel10.knowledge(),
                    AcquireFrom2: panel10.AcquireFrom2(),
                }

                if (model.data().data_clientInfo.AcknowledgementStockOptAcct == true && panel10.knowledge() == "") {
                    Swal.fire({
                        title: (model.lang() != undefined) ? model.lang().are_you_sure() : '',
                        html: (model.lang() != undefined) ? model.lang().popup9() : '',
                        icon: 'warning',
                        showCancelButton: true,
                        confirmButtonColor: '#3085d6',
                        cancelButtonColor: '#d33',
                        confirmButtonText: 'OK'
                    }).then(function (result) {
                        if (result.isConfirmed) {
                            $.ajax({
                                url: urlSaveUpdatePanel9,
                                data: JSON.stringify(param9),
                                type: "POST",
                                contentType: 'application/json',
                                success: function (res) {
                                    //var pg = res.data.page;
                                    //if (pg != null) {
                                    //    temp.datapage(pg);
                                    //}
                                    //data = res.data;
                                    if (res.success == true) {
                                        //console.log(res);
                                        nextPanel(10);
                                        getBack(false);
                                        //model.loader(false);
                                    } else {
                                        Swal.fire(
                                            'Warning!',
                                            res.message,
                                            'warning'
                                        )
                                    }

                                }
                            });
                        } else {
                            model.loader(false);
                        }
                    })
                } else {
                    $.ajax({
                        url: urlSaveUpdatePanel9,
                        data: JSON.stringify(param9),
                        type: "POST",
                        contentType: 'application/json',
                        success: function (res) {
                            //var pg = res.data.page;
                            //if (pg != null) {
                            //    temp.datapage(pg);
                            //}
                            //data = res.data;
                            if (res.success == true) {
                                //console.log(res);
                                nextPanel(10);
                                getBack(false);
                                //model.loader(false);
                            } else {
                                Swal.fire(
                                    'Warning!',
                                    res.message,
                                    'warning'
                                )
                            }

                        }
                    });
                }

            } else {
                Swal.fire((model.lang() != undefined) ? model.lang().warning() : '', (model.lang() != undefined) ? model.lang().fill_all() : '', "warning");
                model.loader(false);
            }
            break;
        case 10:
            var valid10 = $("#pnl10").kendoValidator().data("kendoValidator");
            if (valid10.validate()) {
                model.loader(true);
            }
            break;
        case 11:
            var valid11 = $("#pnl11").kendoValidator({
                rules: {

                    box: function (input) {
                        if (input.attr("type") == "checkbox" && $("#pnl11").find("[type=checkbox][name=" + input.attr("name") + "]").is(":checked") == false) {

                            return false;
                        }
                        return true;
                    },

                },
                messages: {
                    box: (model.lang() != undefined) ? model.lang().this_required() : '',
                }
            }).data("kendoValidator");
            if (valid11.validate()) {
                model.loader(true)
                var data = [];
                panel11.tax_detail([]);
                if (panel11.other_tax() == true) {
                    //var grid = $(".input_grid").data("kendoGrid");
                    var data_grid = tax.tax_arr();
                    if (data_grid.length > 0) {

                        $.each(data_grid, function (i, dt) {
                            ////console.log("------------------- lalala ", dt)
                            var citizen = {}
                            switch (model.urlLang()) {
                                case "en-us":
                                    citizen = _.find(model.data().data_country, function (x) {
                                        return x.en_short_name == data_grid[i].jurisdiction;
                                    });

                                    break;
                                case "zh-hk":
                                    citizen = _.find(model.data().data_country, function (x) {
                                        return x.zh_hk_short_name == data_grid[i].jurisdiction;
                                    });


                                    break;
                                case "zh-cn":
                                    citizen = _.find(model.data().data_country, function (x) {
                                        return x.zh_cn_short_name == data_grid[i].jurisdiction;
                                    });

                                    break;
                            }


                            data.push({
                                jurisdiction: citizen.en_short_name,
                                tin: data_grid[i].tin,
                                tin_reason: data_grid[i].tin_reason,
                                TaxResidentID: data_grid[i].taxResidentID != undefined ? data_grid[i].taxResidentID : 0,

                            })
                        });
                        panel11.tax_detail(data);

                        var param10 = {
                            ID_Form: panel1.ID_Form(),
                            HK_Tax: panel11.hk_tax(),
                            Other_Tax: panel11.other_tax(),
                            Acknowledge: true,
                            TaxDetail: panel11.tax_detail(),

                        }
                        $.ajax({
                            url: urlSaveUpdatePanel10,
                            data: JSON.stringify(param10),
                            type: "POST",
                            contentType: 'application/json',
                            success: function (res) {
                                //var pg = res.data.page;
                                //if (pg != null) {
                                //    temp.datapage(pg);
                                //}
                                //console.log(res);
                                nextPanel(11);
                                getBack(false);
                                //model.loader(false);
                            }
                        });

                    } else {
                        Swal.fire((model.lang() != undefined) ? model.lang().warning() : '', (model.lang() != undefined) ? model.lang().fill_all() : '', "warning");
                        model.loader(false);
                    }
                } else {
                    var param10 = {
                        ID_Form: panel1.ID_Form(),
                        HK_Tax: panel11.hk_tax(),
                        Other_Tax: panel11.other_tax(),
                        Acknowledge: true,
                        TaxDetail: panel11.tax_detail(),

                    }
                    $.ajax({
                        url: urlSaveUpdatePanel10,
                        data: JSON.stringify(param10),
                        type: "POST",
                        contentType: 'application/json',
                        success: function (res) {
                            //var pg = res.data.page;
                            //if (pg != null) {
                            //    temp.datapage(pg);
                            //}
                            //console.log(res);
                            nextPanel(11);
                            getBack(false);
                            //model.loader(false);
                        }
                    });
                }


            } else {
                Swal.fire((model.lang() != undefined) ? model.lang().warning() : '', (model.lang() != undefined) ? model.lang().fill_all() : '', "warning");
                model.loader(false);
            }
            break;
        case 12:
            var valid12 = $("#pnl13").kendoValidator().data("kendoValidator");
            if (valid12.validate()) {
                if (panel13.confirm_name() == model.data().data_clientInfo.Surname + " " + model.data().data_clientInfo.ClientName) {
                    model.loader(true);
                    param = {
                        ID_Form: panel1.ID_Form(),
                        W8_name: panel13.name(),
                        W8_citizenship: panel13.country_citizen(),
                        W8_address1: panel13.residence_street(),
                        W8_address2: panel13.residence_number(),
                        W8_address3: panel13.residence_building(),
                        W8_residence_city: panel13.residence_city(),
                        W8_residence_state: panel13.residence_state(),
                        W8_residence_postalcode: panel13.residence_postal_code(),
                        W8_residence_country: panel13.residence_country(),
                        same_As_residence: panel13.isSameAbove(),
                        W8_mailing_address1: panel13.mailing_street(),
                        W8_mailing_address2: panel13.mailing_number(),
                        W8_mailing_address3: panel13.mailing_building(),
                        W8_mailing_city: panel13.mailing_city(),
                        W8_mailing_state: panel13.mailing_state(),
                        W8_mailing_postalcode: panel13.mailing_postal_code(),
                        W8_mailing_country: panel13.mailing_country(),
                        W8_tax_tin: panel13.taxpayer(),
                        W8_identifyng_number: panel13.foreign_tax_ID(),
                        W8_reffrence_number: panel13.reffrence_number(),
                        W8_date_birth: panel13.birth(),
                        W8_benefit_country: panel13.part2_nationality(),
                        W8_rate_paragraph: panel13.part2_specialrate(),
                        W8_tax: panel13.part2_treatyrates(),
                        W8_income_type: panel13.part2_income(),
                        w8_witholding_percen: panel13.part2_treatyrates(),
                        W8_on_condition: panel13.part2_additional(),
                        CheckIfFTIN: panel13.ChecknotLegallyFTIN(),
                        //W8_e_signature: "",
                    };
                    $.ajax({
                        url: urlSaveUpdatePanel11,
                        data: JSON.stringify(param),
                        type: "POST",
                        contentType: 'application/json',
                        success: function (res) {
                            if (res.success == true) {
                                //console.log(res);
                                nextPanel(12);
                                getBack(false);
                                temp.backToW8(false);
                            } else {
                                if (res.data.message_error != null || res.data.message_error != undefined) {
                                    if (res.data.message_error == "address_error") {
                                        Swal.fire((model.lang() != undefined) ? model.lang().warning() : '', (model.lang() != undefined) ? model.lang().address_error_w8() : '', "warning");
                                    } else if (res.data.message_error == "error_on_exception") {
                                        Swal.fire("Error", res.message, "erorr");
                                    }
                                } else {
                                    Swal.fire((model.lang() != undefined) ? model.lang().warning() : '', (model.lang() != undefined) ? model.lang().fill_all() : '', "warning");

                                }

                                model.loader(false);

                            }

                            //model.loader(false);
                        }
                    });
                } else {
                    Swal.fire((model.lang() != undefined) ? model.lang().warning() : '', (model.lang() != undefined) ? model.lang().fill_all() : '', "warning");
                    model.loader(false);
                }

            } else {
                Swal.fire((model.lang() != undefined) ? model.lang().warning() : '', (model.lang() != undefined) ? model.lang().fill_all() : '', "warning");
                model.loader(false);
            }
            break;
        case 13:
            ////////////////////////alert("masuk13");
            model.loader(true);
            var param6 = {
                ID: panel1.ID_Form(),

            }
            $.ajax({
                url: urlSaveUpdatePanel12,
                data: JSON.stringify(param6),
                type: "POST",
                contentType: 'application/json',
                success: function (res) {
                    ////console.log(res);
                    nextPanel(13);
                    getBack(false);
                    //model.loader(false);
                }
            });
            break;
        case 14:
            model.loader(true);
            var valid = $("#pnl15").kendoValidator({
                rules: {
                    radio: function (input) {
                        if (input.attr("type") == "radio" && $("#pnl15").find("[type=radio][name=" + input.attr("name") + "]").is(":checked") == false) {
                            //console.log("------------ masuk")
                            return false;

                        }
                        return true;
                    },
                    box: function (input) {
                        if (input.attr("type") == "checkbox" && $("#pnl15").find("[type=checkbox][name=" + input.attr("name") + "]").is(":checked") == false) {

                            return false;
                        }
                        return true;
                    },
                    inputtext: function (input) {
                        if (input.attr("type") == "text" && input.attr("required") && $("#pnl15").find("[type=text][name=" + input.attr("name") + "]").val() == "") {
                            ////////////////////////alert("masuk")
                            return false;
                        }
                        return true;
                    },

                },
                messages: {
                    radio: (model.lang() != undefined) ? model.lang().this_required() : '',
                    box: (model.lang() != undefined) ? model.lang().this_required() : '',
                    inputtext: (model.lang() != undefined) ? model.lang().this_required() : '',
                }
            }).data("kendoValidator");
            var param6 = {
                ID_Form: panel1.ID_Form(),
                Q1: panel15.q1(),
                Q1Details: panel15.acc1(),
                Q2: panel15.q2(),
                Q2Details: panel15.acc2(),
                Q3: panel15.q3(),
                Q3Details: panel15.acc3(),
                Q4: panel15.q4(),
                Q4Details: panel15.acc4(),


            }

            //console.log("-------------------------- valid 123", valid.validate())
            if (valid.validate() == true) {
                if (panel15.confirmed_name() == model.data().data_clientInfo.Surname + " " + model.data().data_clientInfo.ClientName) {
                    $.ajax({
                        url: urlSaveUpdatePanel13,
                        data: JSON.stringify(param6),
                        type: "POST",
                        contentType: 'application/json',
                        success: function (res) {
                            ////console.log(res);
                            nextPanel(14);
                            getBack(false);
                            panel16.HolderName(panel3.eng_surename() + " " + panel3.eng_name())
                            //model.loader(false);
                        }
                    });
                } else {
                    Swal.fire((model.lang() != undefined) ? model.lang().warning() : '', (model.lang() != undefined) ? model.lang().fill_all() : '', "warning");
                    model.loader(false);
                }

            } else {
                Swal.fire((model.lang() != undefined) ? model.lang().warning() : '', (model.lang() != undefined) ? model.lang().fill_all() : '', "warning");
                model.loader(false);
            }


            break;
        case 15:

            var valid = $("#pnl16").kendoValidator().data("kendoValidator");
            if (valid.validate()) {
                invalid = false
                if (panel16.HolderAcct().length != 11 && (panel16.BankName()).indexOf('BANK OF CHINA (HONG KONG) LIMITED') > 0) {
                    invalid = true
                } else {
                    invalid = false
                }

                if (invalid == true) {
                    Swal.fire((model.lang() != undefined) ? model.lang().warning() : '', (model.lang() != undefined) ? model.lang().warning_nm() : '', "warning");
                    model.loader(false);
                } else {
                    model.loader(true);
                    var param = {
                        ID_Form: panel1.ID_Form(),
                        BankName: panel16.BankName(),
                        OtherBankName: panel16.OtherBankName(),
                        AccHolderName: panel16.HolderName(),
                        BankAccNumb: panel16.HolderAcct(),
                        OAOFAO_Checked: parseInt(panel16.oaofao_checked()),
                    }

                    $.ajax({

                        url: urlSaveUpdatePanel14,
                        data: JSON.stringify(param),
                        type: "POST",
                        contentType: 'application/json',
                        success: function (res) {
                            ////console.log(res);
                            //////alert("3433")
                            nextPanel(15);
                            getBack(false);
                            getlookupConf();

                            //model.loader(false);
                        }
                    });

                }
            } else {
                Swal.fire((model.lang() != undefined) ? model.lang().warning() : '', (model.lang() != undefined) ? model.lang().fill_all() : '', "warning");
                model.loader(false);
            }
            break;
        case 16:
            //alert("masuk")
            //if (temp.backToW8() == true) {
            //    //alert("masuk")
            //    model.loader(false);
            //    Swal.fire((model.lang() != undefined) ? model.lang().warning() : '', (model.lang() != undefined) ? model.lang().w8_warning() : '', "warning");
            //    nextPanel(11);
            //} else {
                model.loader(true);
                var valid = false;
                var identity = $("#identity").data("kendoUpload");
                var identityfiles = identity.getFiles();

                var ID = $("#ID").data("kendoUpload");
                var IDfiles = ID.getFiles();

                var address = $("#address").data("kendoUpload");
                var addressfiles = address.getFiles();

                var BankAcc = $("#BankAcc").data("kendoUpload");
                var BankAccfiles = BankAcc.getFiles();

                if (model.data().data_clientInfo.Nationality != "China") {
                    if (identityfiles.length > 0 && addressfiles.length > 0 && BankAccfiles.length > 0) {
                        valid = true;
                    } else {
                        valid = false;
                    }
                } else {
                    if (IDfiles.length > 0 && identityfiles.length > 0 && addressfiles.length > 0 && BankAccfiles.length > 0) {
                        valid = true;
                    } else {
                        valid = false;
                    }
                }

                ////////////////////alert("masuk 3165 " + valid)

                if (valid == true) {

                    if (model.data().data_form.ApplicationMode == 1) {
                        check_DK_RPQ();
                        if (temp.check_dk_RPQ() == false) {
                            model.loader(false);
                            $(".k-upload-selected").click();

                        } else if (temp.check_dk_RPQ() == true && panel17.edited() == true) {
                            /*check_DK_RPQ();*/
                            model.loader(true);
                            if (model.data().data_form.ApplicationMode == 1 && panel17.edited() == false) {
                                panel17.status(false)
                                panel18.status(true)
                                panel18.isConfirmation(true)
                                data_confirm();
                            } else if (model.data().data_form.ApplicationMode == 0 && panel17.edited() == false) {
                                panel17.status(false)
                                panel18.status(true)
                                ////alert("masuk 366")
                                panel18.isConfirmation(false)
                            }

                        } else if (temp.check_dk_RPQ() == true && panel17.edited() == true) {
                            //alert("masuk12")
                            $(".k-upload-selected").click();
                            //model.loader(false);
                        }
                    } else {
                        //alert("masuk13")
                        $(".k-upload-selected").click();
                        //model.loader(false);
                    }


                    var check_interval = setInterval(function () {
                        if (model.loader() == true) {
                            model.loader(false);
                        }
                        if (model.loader() == false) {
                            clearInterval(check_interval);
                        }
                    }, 100)

                } else {
                    Swal.fire((model.lang() != undefined) ? model.lang().warning() : '', (model.lang() != undefined) ? model.lang().select_file() : '', "warning");
                    model.loader(false);
                }
            //}

            //model.loader(false);
            
            break;
        case 17:
            if (panel18.isFps() == 1 && panel18.useFPS() == false) {
                Swal.fire((model.lang() != undefined) ? model.lang().warning() : '', (model.lang() != undefined) ? model.lang().confirm_fps() : '', "warning");
            } else {
                var deposit = $("#Deposit").data("kendoUpload");
                var depositFile = deposit.getFiles();
                if (depositFile.length > 0) {
                    //model.loader(true)
                    //$(".k-upload-selected").click();

                    check_DK_RPQ();
                    if (temp.check_dk_RPQ() == true) {

                    } else if (panel18.edited() == true && temp.check_dk_RPQ() == false) {
                        model.loader(true);

                        $(".k-upload-selected").click();
                    } else if (panel18.edited() == false && temp.check_dk_RPQ() == false) {
                        panel18.isConfirmation(true);
                        data_confirm();
                    }

                } else {
                    Swal.fire((model.lang() != undefined) ? model.lang().warning() : '', (model.lang() != undefined) ? model.lang().select_file() : '', "warning");
                }

            }
            break;

    }
    

}

UploadSuccess = function (res) {
    if (res.success == true) {
        if (model.data().data_clientInfo.Nationality != "China") {
            if (panel17.uploadIdentity() == true && panel17.uploadAddress() == true && panel17.uploadBankAcc() == true) {
                //Swal.fire((model.lang() != undefined) ? model.lang().success() : '', (model.lang() != undefined) ? model.lang().all_file_success_upload() : '', "success");
                Swal.fire({
                    icon: 'success',
                    title: (model.lang() != undefined) ? model.lang().success() : '',
                    html: (model.lang() != undefined) ? model.lang().all_file_success_upload() : '',
                    confirmButtonText: "OK",
                    allowOutsideClick: false,
                }).then(function (result) {
                    if (result.isConfirmed) {
                        if (model.data().data_form.ApplicationMode == 1) {
                            panel17.status(false)
                            panel18.status(true)
                            panel18.isConfirmation(true)
                            data_confirm();
                        } else {
                            check_DK_RPQ();
                            panel17.status(false)
                            panel18.status(true)
                            panel18.isConfirmation(false)
                        }
                    }
                });
                //nextPanel(16);
            }
        } else {
            if (panel17.uploadID() == true && panel17.uploadIdentity() == true && panel17.uploadAddress() == true && panel17.uploadBankAcc() == true) {
                //Swal.fire((model.lang() != undefined) ? model.lang().success() : '', (model.lang() != undefined) ? model.lang().all_file_success_upload() : '', "success");
                Swal.fire({
                    icon: 'success',
                    title: (model.lang() != undefined) ? model.lang().success() : '',
                    html: (model.lang() != undefined) ? model.lang().all_file_success_upload() : '',
                    confirmButtonText: "OK",
                    allowOutsideClick: false,
                }).then(function (result) {
                    if (result.isConfirmed) {
                        if (model.data().data_form.ApplicationMode == 1) {
                            panel17.status(false)
                            panel18.status(true)
                            panel18.isConfirmation(true)
                            data_confirm();
                        } else {
                            panel17.status(false)
                            panel18.status(true)
                            panel18.isConfirmation(false)
                        }
                    }
                });
                //nextPanel(16);
            }


        }
    } else {
        Swal.fire((model.lang() != undefined) ? model.lang().warning() : '', (model.lang() != undefined) ? model.lang().failed_to_upload() : '', "warning");
    }

}

//important need to see 2828
Upload17Success = function () {
    model.loader(true);
    var deposit = $("#Deposit").data("kendoUpload");
    var depositFile = deposit.getFiles();
    var param = {};
    if (model.data().data_form.ApplicationMode == 0) {
        param = {
            filename: depositFile[0].name,
            ID_Form: panel1.ID_Form(),
            file_ID: panel18.File_ID(),
            ext: depositFile[0].extension,
            UseFPS: panel18.useFPS() == "1" ? true : false,
        }
    } else {
        param = {
            filename: "",
            ID_Form: panel1.ID_Form(),
            file_ID: "",
            ext: "",
            UseFPS: panel18.useFPS() == "1" ? true : false,
        }
    }

    if (temp.backToW8() == true) {
        model.loader(false);
        Swal.fire((model.lang() != undefined) ? model.lang().warning() : '', (model.lang() != undefined) ? model.lang().w8_warning() : '', "warning");
        nextPanel(11);
    } else {
        if (model.data().data_clientInfo.AcknowledgementStockOptAcct == false) {

            $.ajax({

                url: urlSaveUpdatePanel16,
                data: JSON.stringify(param),
                type: "POST",
                contentType: 'application/json',
                success: function (res) {
                    data = res.data;
                    if (res.success == true) {
                        resetPanel()
                        model.loader(false);
                        $(".container").css("display", "none");
                        Swal.fire({
                            icon: 'success',
                            title: (model.lang() != undefined) ? model.lang().thankyou() : '',
                            width: 800,
                            html: (model.lang() != undefined) ? model.lang().will_process() : '',
                            confirmButtonText: (model.lang() != undefined) ? model.lang().back_to_poems() : '',
                            allowOutsideClick: false,
                        }).then(function (result) {
                            if (result.isConfirmed) {
                                window.location.href = "http://www.poems.com.hk/en-us/";
                            }
                        });
                    } else {
                        Swal.fire((model.lang() != undefined) ? model.lang().warning() : '', (model.lang() != undefined) ? model.lang().failed_to_upload() : '', "warning");
                    }

                }
            });
        } else if (panel8.score() < 70 || model.data().data_dkQuestionaire.AcquireFrom1 == null) {
            Swal.fire({
                title: (model.lang() != undefined) ? model.lang().are_you_sure() : '',
                html: (model.lang() != undefined) ? model.lang().popup16() : '',
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'OK'
            }).then(function (result) {
                if (result.isConfirmed) {
                    $.ajax({

                        url: urlSaveUpdatePanel161,
                        data: JSON.stringify(param),
                        type: "POST",
                        contentType: 'application/json',
                        success: function (res) {
                            data = res.data;
                            if (res.success == true) {
                                resetPanel()
                                model.loader(false);
                                $(".container").css("display", "none");
                                Swal.fire({
                                    icon: 'success',
                                    title: (model.lang() != undefined) ? model.lang().thankyou() : '',
                                    width: 800,
                                    html: (model.lang() != undefined) ? model.lang().will_process() : '',
                                    confirmButtonText: (model.lang() != undefined) ? model.lang().back_to_poems() : '',
                                    allowOutsideClick: false,
                                }).then(function (result) {
                                    if (result.isConfirmed) {
                                        window.location.href = "http://www.poems.com.hk/en-us/";
                                    }
                                });
                            } else {
                                Swal.fire((model.lang() != undefined) ? model.lang().warning() : '', (model.lang() != undefined) ? model.lang().failed_to_upload() : '', "warning");
                            }

                        }
                    });
                } else {
                    model.loader(false);
                }
            })
        } else {

            $.ajax({

                url: urlSaveUpdatePanel16,
                data: JSON.stringify(param),
                type: "POST",
                contentType: 'application/json',
                success: function (res) {
                    data = res.data;
                    if (res.success == true) {
                        resetPanel()
                        model.loader(false);
                        $(".container").css("display", "none");
                        Swal.fire({
                            icon: 'success',
                            title: (model.lang() != undefined) ? model.lang().thankyou() : '',
                            width: 800,
                            html: (model.lang() != undefined) ? model.lang().will_process() : '',
                            confirmButtonText: (model.lang() != undefined) ? model.lang().back_to_poems() : '',
                            allowOutsideClick: false,
                        }).then(function (result) {
                            if (result.isConfirmed) {
                                window.location.href = "http://www.poems.com.hk/en-us/";
                            }
                        });
                    } else {
                        Swal.fire((model.lang() != undefined) ? model.lang().warning() : '', (model.lang() != undefined) ? model.lang().failed_to_upload() : '', "warning");
                    }

                }
            });
        }
    }
    
    //if (res.success == true) {
    //    ////////////////////////alert("tatatatat " +res.success)
    //    //setTimeout(function () {

    //    //}, 500)
    //} else {
    //    Swal.fire((model.lang() != undefined) ? model.lang().warning() : '', (model.lang() != undefined) ? model.lang().failed_to_upload() : '', "warning");
    //}
}

UploadError = function () {
    ////////////////////////alert("error")
}

getScore = function (id, panel) {

}

urlParam = function () {
    url = window.location.href;
    var prm = new URL(url);
    var promoCode = prm.searchParams.get("PromoCode");
    //var results = new RegExp('[\?&]' + name + '=([^&#]*)').exec();

    if (promoCode !== null) {
        panel3.promotion_code(promoCode);
        $("#promoCode").prop("disabled", true);
    }
}

populate_date = function (str) {
    var mt = str.replace("/", "");
    var sl = mt.split("(");
    var dl = sl[1].replace(")/", "");
    var mdate = new Date(new Number(dl));

    return mdate;
}

var data_dummy = ko.observableArray([

]);

var data_source = new kendo.data.DataSource({
    pageSize: 20,
    data: data_dummy,
    autoSync: false,
    schema: {
        model: {
            id: "ProductID",
            fields: {
                ProductID: { editable: false, nullable: true },
                ProductName: { validation: { required: true } },
                Category: { defaultValue: { CategoryID: 1, CategoryName: "Beverages" } },
                UnitPrice: { type: "number", validation: { required: true, min: 1 } }
            }
        }
    }
});

checkDataLookup = function (data) {
    var arrdt = []
    $.each(data, function (i, dt) {
        var findt = _.find(arrdt, function (m) {
            return m.LookupCode == dt.LookupCode
        });

        if (findt == undefined) {
            arrdt.push(dt);
        }

        ////console.log("==============  ", arrdt)

    });
    return arrdt;
}

data_confirm = function () {
    var swal_desc = "";
    if (model.data().data_form.SubmitStatus != 'Submitted') {
        if (panel16.oaofao_checked() == '1' || model.data().data_form.ApplicationMode == '1') {
            swal_desc = "<p>我們強烈建議你儲存你的開戶申請概要。</p><p>如你需要儲存有關開戶申請的證明文件，請按下連結之後立即儲存證明文件。</p><p style='color:red'>客戶需前往分行簽署客戶確認書及提交身份證副本</p><p>You are strongly recommended to save the following summary of your account opening application.</p><p>If you would like to save the supporting documents of the account opening application, you are required to click the link of the attachment and save the document.</p><p style='color:red'>Clients have to sign declaration page and submit ID card copy on our branches. </p>"
        } else {
            swal_desc = "<p>我們強烈建議你儲存你的開戶申請概要。</p><p>如你需要儲存有關開戶申請的證明文件，請按下連結之後立即儲存證明文件。</p><p>You are strongly recommended to save the following summary of your account opening application.</p><p>If you would like to save the supporting documents of the account opening application, you are required to click the link of the attachment and save the document.</p>"
        }
        if (temp.isUploadDeposit() == false && panel18.isConfirmation() == true) {
            param = {
                UseFPS: panel18.isFps() == '0' ? true : false,
                FormID: model.data().data_form.ID,
            }

            $.ajax({
                url: urlIfFPS,
                type: "POST",
                data: JSON.stringify(param),
                contentType: 'application/json',
                success: function (res) {
                    model.loader(false)
                    if (res.success == true) {
                        
                        if (model.login() == false && panel18.isConfirmation() == true && panel18.status() == true && temp.backToW8() == false) {
                            Swal.fire({
                                title: "Attention!",
                                html: swal_desc,
                                icon: 'info',
                                showCancelButton: false,
                                confirmButtonColor: '#3085d6',
                                cancelButtonColor: '#d33',
                                confirmButtonText: 'Yes'
                            });
                        }
                        //getlookup()
                    } else {
                        if (model.login() == false && panel18.isConfirmation() == true && panel18.status() == true && temp.backToW8() == false) {
                            Swal.fire({
                                title: "Attention!",
                                html: swal_desc,
                                icon: 'info',
                                showCancelButton: false,
                                confirmButtonColor: '#3085d6',
                                cancelButtonColor: '#d33',
                                confirmButtonText: 'Yes'
                            });
                        }
                    }


                }
            });
        } else {
            if (model.login() == false && panel18.isConfirmation() == true && panel18.status() == true) {
                Swal.fire({
                    title: "Attention!",
                    html: swal_desc,
                    icon: 'info',
                    showCancelButton: false,
                    confirmButtonColor: '#3085d6',
                    cancelButtonColor: '#d33',
                    confirmButtonText: 'Yes'
                });
            }
        }
    }

}

getlookupConf = function () {
    $.ajax({
        url: urlGetLookupConf,
        type: "POST",
        //data: JSON.stringify(param),
        contentType: 'application/json',
        success: function (res) {
            if (res.success == true) {
                var data = res.data;
                temp.dataLookupConf(data);
            }
            //getBack()

        }
    });
}

getlookup = function () {
    $("#mytabs").kendoTabStrip();
    param = {
        //Page: page,
        Lang: model.urlLang(),
    }
    model.loader(true);
    var xhr = $.ajax({
        url: urlGetLookupData,
        type: "POST",
        data: JSON.stringify(param),
        contentType: 'application/json',
        success: function (res) {
            if (res.success == true) {
                xhr.abort();
                //if (temp.backToW8() == true) {
                //    Swal.fire((model.lang() != undefined) ? model.lang().warning() : '', (model.lang() != undefined) ? model.lang().w8_warning() : '', "warning");
                //    nextPanel(11);
                //}
                //check_DK_RPQ();
                var data = res.data;
                data_tax = panel11.tax_detail();
                tax.tax_arr(data_tax);
                tabel = $("#input_grid_new").DataTable();
                tabel.clear().draw();
                tabel.rows.add(tax.tax_arr());
                tabel.columns.adjust().draw();
                $(".confname").text(((model != undefined) ? model.data().data_clientInfo.Surname + " " + model.data().data_clientInfo.ClientName : ''));
                var ownership = _.filter(data, function (m) { return m.OptCode === "Ownership" && m.LanguageCode === model.urlLang(); });
                if (ownership != undefined) {
                    var dtownership = checkDataLookup(ownership);
                    tmp.data_ownership(dtownership);
                }
                var emptype = _.filter(data, function (n) { return n.OptCode === "EmploymentType" && n.LanguageCode === model.urlLang(); });
                if (emptype != undefined) {
                    var dtemptype = checkDataLookup(emptype);
                    tmp.data_employment(dtemptype);
                }
                var industry = _.filter(data, function (o) { return o.OptCode === "Industry" && o.LanguageCode === model.urlLang(); });
                if (industry != undefined) {
                    var dtindustry = checkDataLookup(industry);
                    tmp.data_industry(dtindustry);
                }
                var occupation = _.filter(data, function (k) { return k.OptCode === "Occupation" && k.LanguageCode === model.urlLang(); });
                if (occupation != undefined) {
                    var dtoccupation = checkDataLookup(occupation);
                    tmp.data_occupation(dtoccupation);
                }

                var relation = _.filter(data, function (k) { return k.OptCode === "FamilyRelation" && k.LanguageCode === model.urlLang(); });
                if (occupation != undefined) {
                    var dtrelation = checkDataLookup(relation);
                    tmp.data_family_relations(dtrelation);
                }

                var InvestmentType = _.filter(data, function (k) { return k.OptCode === "InvestmentType" && k.LanguageCode === model.urlLang(); });
                if (InvestmentType != undefined) {
                    dtInvestmentType = checkDataLookup(InvestmentType);
                    tmp.data_investment_type(dtInvestmentType);
                }

                if (model.data().data_clientInfo.EmploymentType == 'Employed') {
                    var dt = [
                        { text: (model.lang() != undefined) ? model.lang().saving_from_salary() : '', value: "Saving From Salary", zh_en: "薪金儲蓄 Saving From Salary" },
                        { text: (model.lang() != undefined) ? model.lang().pref_job() : '', value: "Previous Job", zh_en: "以往工作收入 Previous Job" },
                        { text: (model.lang() != undefined) ? model.lang().provided_family() : '', value: "Provided By Family Member", zh_en: "家庭成員提供 Provided by Family Member" },
                    ]
                    tmp.data_investment_fund_source([])
                    tmp.data_investment_fund_source(dt)

                } else {
                    var dt = [
                        { text: (model.lang() != undefined) ? model.lang().pref_job() : '', value: "Previous Job", zh_en: "以往工作收入 Previous Job" },
                        { text: (model.lang() != undefined) ? model.lang().provided_family() : '', value: "Provided By Family Member", zh_en: "家庭成員提供 Provided by Family Member" },
                    ]
                    tmp.data_investment_fund_source([])
                    tmp.data_investment_fund_source(dt)

                }

                var Bankname = _.filter(data, function (k) { return k.OptCode === "BankName"; });
                if (Bankname != undefined) {
                    tmp.data_BankName(Bankname);
                    $("#BankName").kendoDropDownList({
                        optionLabel: (model.lang() != undefined) ? model.lang().bank_name() : '',
                        dataTextField: 'Value',
                        dataValueField: "LookupCode",
                        dataSource: tmp.data_BankName(),
                        select: function (e) {
                            var dataItem = e.dataItem;
                            panel16.BankName(dataItem.LookupCode);
                        },
                        filter: "contains"
                    }).data("kendoDropDownList");
                }
                dt_form = model.data().data_form;

                if (temp.statuslooup() == 0) {

                    dataform = model.data().data_clientInfo;
                    ndform = model.data().data_NDForm
                    if (dt_form != "null") {
                        panel1.ID_Form(dt_form.ID);
                        panel1.isMaindLandClient(dt_form.IsInChina === true ? "1" : "0");
                        panel1.email(dt_form.EmailAddress)
                        panel1.phoneCode(dt_form.CountryCodeMobile != null ? dt_form.CountryCodeMobile : "")
                        panel1.phoneNumber(dt_form.MobileNo)
                    }

                    if (dataform != "null") {


                        panel2.CashAccount(dataform.AcknowledgementCashAcct != null ? dataform.AcknowledgementCashAcct : "");
                        panel2.MarginAccount(dataform.AcknowledgementMarginAcct != null ? dataform.AcknowledgementMarginAcct : "");
                        //panel2.OnlineTrading(dataform.AcknowledgementOnlinePoemsTradingService != null ? dataform.AcknowledgementOnlinePoemsTradingService : "");
                        panel2.StockOptionAccount(dataform.AcknowledgementStockOptAcct != null ? dataform.AcknowledgementStockOptAcct : "");
                        panel2.Chinaconnect(dataform.AcknowledgementChinaConnectTradingService != null ? dataform.AcknowledgementChinaConnectTradingService : "");
                        panel2.HKIDR(dataform.AcknowledgementHKIDR != null ? dataform.AcknowledgementHKIDR : true);

                        panel3.title(dataform.Salutation);

                        panel3.eng_surename(dataform.Surname);
                        panel3.eng_name(dataform.ClientName);
                        panel3.NonEnglishSurname(dataform.NonEnglishSurname);
                        panel3.NoneEnglishName(dataform.NoneEnglishName);
                        //panel3.fullName(dataform.HKIDROtherName);
                        panel3.nationality(dataform.Nationality);
                        switch (dataform.Nationality) {
                            case "HONG KONG SAR CHINA":
                                temp.minIDLength(8);
                                temp.maxIDLength(10);
                               
                                break;
                            case "China":
                                temp.minIDLength(1);
                                temp.maxIDLength(18);
                                
                                break;
                            default:
                                //alert(dataitem.Alpha2)
                                //hk.hkID("");
                                //hk.hkIDType("")
                               
                                temp.minIDLength(50);
                                temp.maxIDLength(50);

                        }
                        panel3.idCardType(dataform.NRICPassportType);
                        panel3.idCard(dataform.NRICPassportNo);
                        panel3.placeIssue(dataform.PlaceOfIssue);
                        panel3.countryBirth(dataform.CountryOfBirth);
                        //panel3.age(dataform.Age);
                        if (dataform.DateOfBirth != null) {
                            var dateb = kendo.toString(new Date(model.data().ClientDateBirth), "dd MMM yyyy");
                            if (dateb == "01 Jan 0001") {
                                $('#dateofbirth').data("DateTimePicker").date(new Date());
                            } else {
                                panel3.dateOfBirth(dataform.DateOfBirth != null ? kendo.toString(new Date(model.data().ClientDateBirth), "dd MMM yyyy") : "");
                                $('#dateofbirth').data("DateTimePicker").date(new Date(model.data().ClientDateBirth));
                            }
                        } else {
                            $('#dateofbirth').data("DateTimePicker").date(new Date());
                        }

                        nyear = new Date().getFullYear();
                        date = new Date(panel3.dateOfBirth());
                        byear = date.getFullYear()
                        age = nyear - byear;
                        panel3.age(isNaN(age) == false ? age : 0);
                        panel3.homeNumber(dataform.HomeTelNo);
                        panel3.officeNumber(dataform.OfficeNoMain);
                        panel3.wechat(dataform.WeChatID);
                        panel3.homeAreaCode(dataform.CountryCodeHome != null ? dataform.CountryCodeHome : "");
                        panel3.officeAreaCode(dataform.CountryCodeOfficeMain != null ? dataform.CountryCodeOfficeMain : "");
                        if (dataform.AeCd !== "" && dataform.AeCd !== null) {
                            //////////////////////////alert("masuk aecd")
                            panel3.is_aecode(true);
                            panel3.is_preferred_trading(true);
                            panel3.aecode(dataform.AeCd);
                        } else {
                            panel3.is_aecode(false);
                        }

                        if (dataform.AeName !== "" && dataform.AeName !== null) {
                            panel3.is_aename(true);
                            panel3.is_preferred_trading(true);
                            panel3.aename(dataform.AeName);
                        } else {
                            panel3.is_aename(false);
                        }

                        if (model.PromotionCode() == "") {
                            panel3.promotion_code(dt_form.PromoCode);
                            $("#promoCode").prop("disabled", false);
                        } else {

                            $("#promoCode").prop("disabled", true);
                        }

                        if (model.AeCode() == "") {
                            /*panel3.aecode(dataform.AeCd);*/
                            //panel3.is_aecode(dataform.AeCode != "" && dataform.AeCode != null ? true : false);
                            //panel3.is_preferred_trading(dataform.AeCd !== "" && dataform.AeName !== "" && dataform.AeName !== null && dataform.AeCd !== null ? true : false);
                            $("#AeCode").prop("disabled", false);
                            $("#is_aecode").prop("disabled", false);
                            $("#trad").prop("disabled", false);

                        } else {
                            panel3.aecode(model.AeCode());
                            panel3.is_aecode(true);
                            $("#AeCode").prop("disabled", true);
                            $("#is_aecode").prop("disabled", true);

                        }

                        if (model.AeName() == "") {
                            //panel3.aename(dataform.AeName);
                            //panel3.is_aename(dataform.AeName !== "" && dataform.AeName !== null ? true : false);

                            $("#AeName").prop("disabled", false);
                            $("#is_aename").prop("disabled", false);
                            $("#trad").prop("disabled", false);
                        } else {
                            panel3.aename(model.AeName());
                            panel3.is_aename(true);
                            $("#AeName").prop("disabled", true);
                            $("#is_aename").prop("disabled", true);
                            $("#trad").prop("disabled", true);
                        }

                        if (model.AeCode() != "") {
                            $("#trad").prop("disabled", true);
                        } else if (model.AeName() != "") {
                            $("#trad").prop("disabled", true);
                        } else if (model.AeCode() != "" && model.AeName() != "") {
                            $("#trad").prop("disabled", true);
                        } //else {
                        //    //panel3.is_preferred_trading(dataform.AeCd !== "" && dataform.AeName !== "" && dataform.AeName !== null && dataform.AeCd !== null ? true : false);
                        //    panel3.is_preferred_trading(false);
                        //}


                        //urlParam();

                        panel4.country(dataform.ResidentialCountry);
                        panel4.residentialAddress(dataform.ResidentialAddress1);
                        panel4.residentialAddress2(dataform.ResidentialAddress2);
                        panel4.residentialAddress3(dataform.ResidentialAddress3);
                        panel4.ownershipResidence(dataform.StatusOfResidence);
                        panel4.employmentType(dataform.EmploymentType);
                        panel4.industry(dataform.EmploymentIndustry);
                        panel4.other_industries(dataform.EmploymentIndustryOthers)
                        panel4.occupation(dataform.Occupation);
                        panel4.other_occupation(dataform.OccupationOthers)
                        panel4.company_name(dataform.EmployerName);
                        panel4.office_address1(dataform.EmployerAddress1);
                        panel4.office_address2(dataform.EmployerAddress2);
                        panel4.office_address3(dataform.EmployerAddress3);
                        panel4.office_region(dataform.EmployerAddressCountry);
                        panel4.years_of_service(dataform.YearsOfService);

                        var data_soft = model.data().data_soft;
                        panel5.annual_income(dataform.AnnualIncomeLevel);
                        panel5.liquid_assets(dataform.LiquidNetWorth);
                        panel5.net_worth(dataform.EstimatedNetWorth);
                        panel5.other_net_worth(dataform.EstimatedNetWorthOthers);
                        panel5.previouse_job(dataform.Is_Previouse_Job === 1 ? true : false);


                        panel16.BankName(dataform.DesignatedBankName);
                        var Bank = $("#BankName").data("kendoDropDownList");
                        Bank.value(panel16.BankName());
                        panel16.OtherBankName(dataform.DesignatedBankNameOthers);

                        if (dataform.DesignatedBankAccountName == null) {
                            panel16.HolderName(panel3.eng_surename() + " " + panel3.eng_name())
                        } else {
                            panel16.HolderName(dataform.DesignatedBankAccountName);
                        }
                        panel16.HolderAcct(dataform.DesignatedBankAccountNo);
                        panel16.oaofao_checked((dt_form.ApplicationMode).toString())

                        var dt_w8 = model.data().data_w8;
                        if (dt_w8 != null) {
                            setTimeout(function () {
                                panel13.name(dt_w8.ClientName);
                                panel13.country_citizen(dt_w8.CountryOfCitizenship);
                                panel13.residence_street(dataform.ResidentialAddress1);
                                panel13.residence_number(dataform.ResidentialAddress2);
                                panel13.residence_building(dataform.ResidentialAddress3);
                                //////console.log("EmployerAddressCountry " + JSON.stringify(dataform))
                                panel13.residence_country(dataform.ResidentialCountry);
                                $.each(dt_w8.W8BEN_Address, function (i, dt) {
                                    if (dt.AddressType == "R") {
                                        //////////////////////////alert("masuk 3161")
                                        panel13.residence_city(dt.City);
                                        panel13.residence_state(dt.StateAddress);
                                        panel13.residence_postal_code(dt.PostalCode);

                                    } else {
                                        panel13.isSameAbove(model.data().data_clientInfo.SameMailingAddress);
                                        $("[name=contry1]").data("kendoDropDownList").enable(model.data().data_clientInfo.SameMailingAddress == true ? false : true);
                                        panel13.mailing_street(dt.Address1)
                                        panel13.mailing_number(dt.Address2);
                                        panel13.mailing_building(dt.Address3);
                                        panel13.mailing_city(dt.City);
                                        panel13.mailing_state(dt.StateAddress);
                                        panel13.mailing_postal_code(dt.PostalCode);
                                        panel13.mailing_country(dt.Country);
                                    }
                                })

                                panel11.hk_tax(dataform.HongKongTaxResident);
                                panel11.other_tax(dataform.ForeignTaxResident);

                                //                                        isSameAbove: ko.observable(true),
                                //                                           
                                panel13.taxpayer(dt_w8.ITIN);
                                panel13.foreign_tax_ID(dt_w8.ForeignTaxID);
                                panel13.birth(kendo.toString(new Date(model.data().ClientDateBirth), "dd MMM yyyy"));
                                panel13.reffrence_number(dt_w8.RefNumber);

                                panel13.part2_nationality(dt_w8.W8BEN_TaxTreaty[0].Country);
                                panel13.part2_specialrate(dt_w8.W8BEN_TaxTreaty[0].ParagraphArticle);
                                panel13.part2_treatyrates(dt_w8.W8BEN_TaxTreaty[0].WithholdingTaxPercentRate);
                                panel13.part2_income(dt_w8.W8BEN_TaxTreaty[0].IncomeType);
                                panel13.part2_additional(dt_w8.W8BEN_TaxTreaty[0].ParagraphArticleAddOnConditions);
                                var all_contr = (model.data().AllowedCheckFTIN).split(",")
                                var allowed_FtIN = _.find(all_contr, function (x) {
                                    return x == (model.data().data_clientInfo.Nationality).toLowerCase();
                                })
                                panel13.checkFTIN(allowed_FtIN != undefined ? true : false);
                                panel13.ChecknotLegallyFTIN(dt_w8.CheckIfFTIN);
                            }, 100)

                        } else {
                            panel13.name(model.data().data_clientInfo.Surname + " " + model.data().data_clientInfo.ClientName);
                            panel13.country_citizen(dataform.Nationality);
                            panel13.residence_street(dataform.ResidentialAddress1);
                            panel13.residence_number(dataform.ResidentialAddress2);
                            panel13.residence_building(dataform.ResidentialAddress3);
                            //residence_city();
                            //                            residence_state: ko.observable(""),
                            //                                residence_postal_code: ko.observable(""),
                            panel13.residence_country(dataform.ResidentialCountry);
                            if (dataform.DateOfBirth != null) {
                                panel13.birth(kendo.toString(new Date(model.data().ClientDateBirth), "dd MMM yyyy"));
                            }
                            if (model.data().data_clientInfo.Nationality != null) {
                                var all_contr = (model.data().AllowedCheckFTIN).split(",")
                                var allowed_FtIN = _.find(all_contr, function (x) {
                                    return x == (model.data().data_clientInfo.Nationality).toLowerCase();
                                })
                                panel13.checkFTIN(allowed_FtIN != undefined ? true : false);
                            }

                            //panel13.ChecknotLegallyFTIN(dt_w8.CheckIfFTIN);

                        }

                        var data_attc = model.data().data_attach;
                        ////console.log("-------------- data_attc", data_attc);
                        if (data_attc.length > 0) {
                            $.each(data_attc, function (i, dt) {
                                switch (dt.AttachmentType) {
                                    case "HKID Card":
                                        panel17.uploadIdentity(true);
                                        panel17.uploadIdentityGuid(dt.AttachmentID);
                                        panel17.uploadFileIdentity([{ name: dt.Attachment, size: model.data().data_File[i].size, extension: dt.AttachmentExt }]);
                                        _IDCard = _.find(model.data().data_File, function (x) {
                                            return x.FileType == "HKID Card"
                                        })
                                        if (_IDCard != undefined) {
                                            IdCard = dt.AttachmentID;
                                            //if (_IDCard.Extension == ".pdf" || _IDCard.Extension == ".PDF") {
                                            //    IdCard = dt.AttachmentID;
                                            //} else {
                                            //    file.IdCard(_IDCard.Source);
                                            //}
                                            //setTimeout(function () { file.IdCard(_IDCard.Source) }, 200);

                                        }
                                        break;
                                    case "Address Proof":
                                        panel17.uploadAddress(true);
                                        panel17.uploadAddressGuid(dt.AttachmentID);
                                        panel17.uploadFileAddress([{ name: dt.Attachment, size: model.data().data_File[i].size, extension: dt.AttachmentExt }]);
                                        _addrproof = _.find(model.data().data_File, function (x) {
                                            return x.FileType == "Address Proof"
                                        })
                                        if (_addrproof != undefined) {
                                            AddressProof = dt.AttachmentID;
                                            //if (_addrproof.Extension == ".pdf" || _addrproof.Extension == ".PDF") {
                                            //    AddressProof = dt.AttachmentID;
                                            //} else {
                                            //    file.AddressProof(_addrproof.Source);
                                            //}
                                            //setTimeout(function () { file.AddressProof(_addrproof.Source) }, 200);

                                        }
                                        break;
                                    case "Bank Account Proof":
                                        panel17.uploadBankAcc(true);
                                        panel17.uploadBankAccGuid(dt.AttachmentID);
                                        panel17.uploadFileBankAcc([{ name: dt.Attachment, size: model.data().data_File[i].size, extension: dt.AttachmentExt }]);
                                        _accproof = _.find(model.data().data_File, function (x) {
                                            return x.FileType == "Bank Account Proof"
                                        })
                                        if (_accproof != undefined) {
                                            BankAccountProof = dt.AttachmentID;
                                            //if (_accproof.Extension == ".pdf" || _accproof.Extension == ".PDF") {
                                            //    AccountProof = dt.AttachmentID;
                                            //} else {
                                            //    file.BankAccountProof(_accproof.Source);
                                            //}

                                            //setTimeout(function () { file.BankAccountProof(_accproof.Source) }, 200);

                                        }
                                        break;
                                    case "Back of ID":
                                        panel17.uploadID(true);
                                        panel17.uploadIDGuid(dt.AttachmentID);
                                        panel17.uploadFileID([{ name: dt.Attachment, size: model.data().data_File[i].size, extension: dt.AttachmentExt }]);
                                        _backid = _.find(model.data().data_File, function (x) {
                                            return x.FileType == "Back of ID"
                                        })
                                        if (_backid != undefined) {
                                            BackID = dt.AttachmentID;
                                            //if (_backid.Extension == ".pdf" || _backid.Extension == ".PDF") {
                                            //    BackID = dt.AttachmentID;
                                            //} else {
                                            //    file.BackID(_backid.Source);
                                            //}

                                            //setTimeout(function () { file.BackID(_backid.Source) }, 200);

                                        }
                                        break;
                                    case "Bank Deposit Slip":
                                        panel18.uploadDepositGuid(dt.AttachmentID);
                                        panel18.uploadDeposit([{ name: dt.Attachment, size: model.data().data_File[i].size, extension: dt.AttachmentExt }]);

                                        _deposit = _.find(model.data().data_File, function (x) {
                                            return x.FileType == "Bank Deposit Slip"
                                        })
                                        if (_deposit != undefined) {
                                            DepositSlip = dt.AttachmentID
                                            //if (_deposit.Extension == ".pdf" || _deposit.Extension == ".PDF") {
                                            //    //////console.log("nanana");
                                            //    var att = "";
                                            //    DepositSlip = dt.AttachmentID
                                            //    //////console.log(att);

                                            //} else {
                                            //    file.DepositSlip(_deposit.Source);
                                            //}

                                            //

                                        }

                                        if (model.page_url() == undefined) {
                                            setTimeout(function () {
                                                //////////////////////alert("masuk 3908 temp.check_dk_RPQ() = " + temp.check_dk_RPQ())
                                                if (temp.check_dk_RPQ() == true && model.data().data_form.ApplicationMode == 1) {
                                                    //////////////////////alert("4216")
                                                    panel17.status(true);
                                                } else if (temp.check_dk_RPQ() == true && model.data().data_form.ApplicationMode == 0) {
                                                    //////////////////////alert("4221")
                                                    panel18.status(true);
                                                    panel18.isConfirmation(false);
                                                } else {
                                                    //////////////////////alert("4225")
                                                    panel18.status(true);
                                                    if (temp.isBack() == false && panel18.status() == true) {
                                                        panel18.isConfirmation(true);
                                                        data_confirm();
                                                    }
                                                }
                                            }, 1000)
                                        }




                                        getlookupConf();
                                        //data_confirm();
                                        break;
                                }
                            });
                        } else {
                            //panel17.edited(true)
                            if (model.data().data_form.AttFormID != null) {
                                /*getAttch(model.data().data_form.AttFormID);*/
                            }

                        }

                        if (dt_form.ApplicationMode == 1 && panel18.status() == true && panel18.isConfirmation() == true) {
                            //////////////////////////alert("masuk")

                            getlookupConf();
                            data_confirm();
                        }

                        $("#identity").kendoUpload({
                            multiple: false,
                            showFileList: true,
                            async: { saveUrl: urlUploadIdentity, autoUpload: false, },
                            validation: { allowedExtensions: ['.gif', '.jpg', '.png', '.pdf', '.jpeg', '.bmp'], maxFileSize: 3800000 },
                            success: function (e) {
                                var data = e.response;
                                panel17.edited(false);
                                panel17.uploadIdentity(true);
                                UploadSuccess(e.response);
                                panel17.uploadIdentityGuid(data.data.AttachmentID);
                                var file0Uid = e.files[0].uid;
                                $(".k-file[data-uid='" + file0Uid + "']").find(".k-file-name").text(data.data.NameFile);

                                if (panel17.uploadFileIdentity().length == 1) {
                                    dataIdentity = panel17.uploadFileIdentity();
                                    dataIdentity[0].name = data.data.NameFile;
                                    panel17.uploadFileIdentity([]);
                                    panel17.uploadFileIdentity(dataIdentity);
                                } else {
                                    var identity = $("#identity").data("kendoUpload");
                                    var identityFile = identity.getFiles();
                                    identityFile[0].name = data.data.NameFile
                                    if (panel17.uploadFileIdentity().length == 0) {
                                        panel17.uploadFileIdentity(identityFile);
                                    }
                                }

                            },
                            error: function (e) {
                                panel17.uploadIdentityErr(true);
                                Swal.fire("Warning!", "identity Account failed to upload", "warning");
                            },
                            select: function (e) {
                                panel17.uploadIdentity(false);
                                panel17.edited(true);
                                $("#identity").parents(".k-upload").find(".k-upload-files").remove();
                                $("#identity").parents(".k-upload").find(".k-upload-status").remove();
                                $("#identity").parents(".k-upload").find(".k-upload.k-header").addClass("k-upload-empty");
                                $("#identity").parents(".k-upload").find(".k-upload-button").removeClass("k-state-focused");

                            },
                            files: panel17.uploadFileIdentity(),
                            upload: function (e) {
                                //e.data = {}
                                //e.data = { FormID: panel1.ID_Form(), File_ID: panel17.uploadIdentityGuid() }

                                e.formData = new FormData();
                                e.formData.append("FormID", panel1.ID_Form());
                                e.formData.append("File_ID", panel17.uploadIdentityGuid());
                                var upload = $("#identity").getKendoUpload();
                                var files = upload.getFiles();
                                e.formData.append("identity", files[0].rawFile);
                            }

                        })
                        $("#ID").kendoUpload({
                            multiple: false,
                            async: { saveUrl: urlUploadBackID, autoUpload: false, },
                            validation: { allowedExtensions: ['.gif', '.jpg', '.png', '.pdf', '.jpeg', '.bmp'], maxFileSize: 3800000 },
                            success: function (e) {
                                var data = e.response;
                                panel17.edited(false);
                                panel17.uploadID(true);
                                UploadSuccess(e.response);
                                panel17.uploadIDGuid(data.data.AttachmentID);
                                var file0Uid = e.files[0].uid;
                                //////alert(file0Uid);
                                ////alert(data.data.NameFile);
                                $(".k-file[data-uid='" + file0Uid + "']").find(".k-file-name").text(data.data.NameFile);

                                if (panel17.uploadFileID().length == 1) {
                                    dataID = panel17.uploadFileID();
                                    dataID[0].name = data.data.NameFile;
                                    panel17.uploadFileID([]);
                                    panel17.uploadFileID(dataID);
                                } else {
                                    var ID = $("#ID").data("kendoUpload");
                                    var IDFile = ID.getFiles();
                                    IDFile[0].name = data.data.NameFile
                                    if (panel17.uploadFileID().length == 0) {
                                        panel17.uploadFileID(IDFile);
                                    }
                                }
                            },
                            error: function (e) {
                                panel17.uploadIDErr(true);
                                Swal.fire("Warning!", "ID Account failed to upload", "warning");
                            },
                            select: function (e) {
                                panel17.uploadID(false);
                                panel17.edited(true);
                                $("#ID").parents(".k-upload").find(".k-upload-files").remove();
                                $("#ID").parents(".k-upload").find(".k-upload-status").remove();
                                $("#ID").parents(".k-upload").find(".k-upload.k-header").addClass("k-upload-empty");
                                $("#ID").parents(".k-upload").find(".k-upload-button").removeClass("k-state-focused");

                            },
                            files: panel17.uploadFileID(),
                            upload: function (e) {
                                //e.data = {}
                                //e.data = { FormID: panel1.ID_Form(), File_ID: panel17.uploadIDGuid() }

                                e.formData = new FormData();
                                e.formData.append("FormID", panel1.ID_Form());
                                e.formData.append("File_ID", panel17.uploadIDGuid());
                                var upload = $("#ID").getKendoUpload();
                                var files = upload.getFiles();
                                e.formData.append("ID", files[0].rawFile);
                            }
                        })
                        $("#address").kendoUpload({
                            multiple: false,
                            async: { saveUrl: urlUploadAddress, autoUpload: false, },
                            validation: { allowedExtensions: ['.gif', '.jpg', '.png', '.pdf', '.jpeg', '.bmp'], maxFileSize: 3800000 },
                            success: function (e) {
                                var data = e.response;
                                panel17.edited(false);
                                panel17.uploadAddress(true);
                                UploadSuccess(e.response);
                                panel17.uploadAddressGuid(data.data.AttachmentID);
                                var file0Uid = e.files[0].uid;
                                //var depositFile = deposit.getFiles();
                                //panel18.uploadDeposit(depositFile);
                                $(".k-file[data-uid='" + file0Uid + "']").find(".k-file-name").text(data.data.NameFile);

                                if (panel17.uploadFileAddress().length == 1) {
                                    dataAddress = panel17.uploadFileAddress();
                                    dataAddress[0].name = data.data.NameFile;
                                    panel17.uploadFileAddress([]);
                                    panel17.uploadFileAddress(dataAddress);
                                } else {
                                    var address = $("#address").data("kendoUpload");
                                    var addressFile = address.getFiles();
                                    addressFile[0].name = data.data.NameFile
                                    if (panel17.uploadFileAddress().length == 0) {
                                        panel17.uploadFileAddress(addressFile);
                                    }
                                }
                            },
                            error: function (e) {
                                panel17.uploadAddressErr(true);
                                Swal.fire("Warning!", "Address Account failed to upload", "warning");
                            },
                            select: function () {
                                panel17.uploadAddress(false);
                                panel17.edited(true);
                                $("#address").parents(".k-upload").find(".k-upload-files").remove();
                                $("#address").parents(".k-upload").find(".k-upload-status").remove();
                                $("#address").parents(".k-upload").find(".k-upload.k-header").addClass("k-upload-empty");
                                $("#address").parents(".k-upload").find(".k-upload-button").removeClass("k-state-focused");
                            },
                            files: panel17.uploadFileAddress(),
                            upload: function (e) {
                                //e.data = {}
                                //e.data = { FormID: panel1.ID_Form(), File_ID: panel17.uploadAddressGuid() }
                                e.formData = new FormData();
                                e.formData.append("FormID", panel1.ID_Form());
                                e.formData.append("File_ID", panel17.uploadAddressGuid());
                                var upload = $("#address").getKendoUpload();
                                var files = upload.getFiles();
                                e.formData.append("address", files[0].rawFile);
                            }
                        })
                        $("#BankAcc").kendoUpload({
                            multiple: false,
                            async: { saveUrl: urlUploadBankAcc, autoUpload: false, },
                            validation: { allowedExtensions: ['.gif', '.jpg', '.png', '.pdf', '.jpeg', '.bmp'], maxFileSize: 3800000 },
                            success: function (e) {
                                var data = e.response;
                                panel17.edited(false);
                                panel17.uploadBankAcc(true);
                                UploadSuccess(e.response);
                                panel17.uploadBankAccGuid(data.data.AttachmentID);
                                var file0Uid = e.files[0].uid;
                                $(".k-file[data-uid='" + file0Uid + "']").find(".k-file-name").text(data.data.NameFile);

                                if (panel17.uploadFileBankAcc().length == 1) {
                                    dataBankAcc = panel17.uploadFileBankAcc()
                                    dataBankAcc[0].name = data.data.NameFile
                                    panel17.uploadFileBankAcc([]);
                                    panel17.uploadFileBankAcc(dataBankAcc)
                                } else {
                                    var BankAcc = $("#BankAcc").data("kendoUpload");
                                    var BankAccFile = BankAcc.getFiles();
                                    BankAccFile[0].name = data.data.NameFile
                                    if (panel17.uploadFileBankAcc().length == 0) {
                                        panel17.uploadFileBankAcc(BankAccFile);
                                    }
                                }

                            },
                            error: function (e) {
                                panel17.uploadBankAccErr(true);
                                Swal.fire("Warning!", "Bank Account failed to upload", "warning");
                            },
                            select: function (e) {
                                panel17.uploadBankAcc(false);
                                panel17.edited(true);
                                $("#BankAcc").parents(".k-upload").find(".k-upload-files").remove();
                                $("#BankAcc").parents(".k-upload").find(".k-upload-status").remove();
                                $("#BankAcc").parents(".k-upload").find(".k-upload.k-header").addClass("k-upload-empty");
                                $("#BankAcc").parents(".k-upload").find(".k-upload-button").removeClass("k-state-focused");
                            },
                            files: panel17.uploadFileBankAcc(),
                            upload: function (e) {
                                //e.data = {}
                                //e.data = { FormID: panel1.ID_Form(), File_ID: panel17.uploadBankAccGuid() }

                                e.formData = new FormData();
                                e.formData.append("FormID", panel1.ID_Form());
                                e.formData.append("File_ID", panel17.uploadBankAccGuid());
                                var upload = $("#BankAcc").getKendoUpload();
                                var files = upload.getFiles();
                                e.formData.append("BankAcc", files[0].rawFile);
                            }
                        })

                        $("#Deposit").kendoUpload({
                            multiple: false,
                            async: { saveUrl: urlUploadDepositProof, autoUpload: true, },
                            validation: { allowedExtensions: ['.gif', '.jpg', '.png', '.pdf', '.jpeg', '.bmp'], maxFileSize: 3800000 },
                            success: function (e) {
                                var data = e.response;
                                //Upload17Success(e.response);
                                getBack_t(false);
                                //getlookup();

                                check_DK_RPQ();
                                temp.isUploadDeposit(false);
                                var file0Uid = e.files[0].uid;
                                $(".k-file[data-uid='" + file0Uid + "']").find(".k-file-name").text(data.data.NameFile);

                                //var deposit = $("#Deposit").data("kendoUpload");
                                //var depositFile = deposit.getFiles();
                                //panel18.uploadDeposit(depositFile);
                                if (panel18.uploadDeposit().length == 1) {
                                    dataDeposit = panel18.uploadDeposit()
                                    dataDeposit[0].name = data.data.NameFile
                                    panel18.uploadDeposit([]);
                                    panel18.uploadDeposit(dataDeposit)
                                } else {
                                    var deposit = $("#Deposit").data("kendoUpload");
                                    var depositFile = deposit.getFiles();
                                    depositFile[0].name = data.data.NameFile
                                    if (panel18.uploadDeposit().length == 0) {
                                        panel18.uploadDeposit(depositFile);
                                    }
                                }


                            },
                            error: function (e) {
                                panel18.uploadDepositErr(true);
                                Swal.fire("Warning!", "Deposit Proof failed to upload", "warning");
                            },
                            select: function (e) {
                                temp.isUploadDeposit(true);
                                temp.successUploadDeposit(false);
                                $("#Deposit").parents(".k-upload").find(".k-upload-files").remove();
                                $("#Deposit").parents(".k-upload").find(".k-upload-status").remove();
                                $("#Deposit").parents(".k-upload").find(".k-upload.k-header").addClass("k-upload-empty");
                                $("#Deposit").parents(".k-upload").find(".k-upload-button").removeClass("k-state-focused");
                            },
                            files: panel18.uploadDeposit(),
                            upload: function (e) {
                                //e.data = {}
                                //e.data = { FormID: panel1.ID_Form(), File_ID: panel17.uploadBankAccGuid() }

                                e.formData = new FormData();
                                e.formData.append("FormID", panel1.ID_Form());
                                e.formData.append("File_ID", panel18.uploadDepositGuid());
                                e.formData.append("UseFPS", panel18.isFps() == "0" ? true : false);
                                var upload = $("#Deposit").getKendoUpload();
                                var files = upload.getFiles();
                                e.formData.append("Deposit", files[0].rawFile);
                            }

                        });


                        if (model.data().data_form.RPQID != undefined) {
                            var data_rpq = model.data().data_rpq;
                            panel8.question1(data_rpq.Q1);
                            panel8.question2(data_rpq.Q2);
                            panel8.question3(data_rpq.Q3);
                            panel8.question4(data_rpq.Q4.split(''));
                            panel8.question5(data_rpq.Q5);
                            panel8.question6(data_rpq.Q6);
                            panel8.question7(data_rpq.Q7);
                            panel8.question8(data_rpq.Q8);
                            switch (data_rpq.RPQLevel) {
                                case 1:
                                    panel8.RpqLevel("Low Risk");
                                    panel8.RpqLvl((model.lang() != undefined) ? model.lang().low_risk() : '')
                                    break;
                                case 2:
                                    panel8.RpqLevel("Medium Risk");
                                    panel8.RpqLvl((model.lang() != undefined) ? model.lang().medium_risk() : '')
                                    break;
                                case 3:
                                    panel8.RpqLevel("High Risk");
                                    panel8.RpqLvl((model.lang() != undefined) ? model.lang().high_risk() : '')
                                    break;
                            }

                            panel8.score(data_rpq.RPQScore)
                        }
                    }



                    if (ndform != null) {
                        panel2.isAustralia(ndform.IsNotAustralian);
                        panel2.isCanada(ndform.IsNotCanadian);
                        panel2.isFinland(ndform.IsNotFinnish);
                        panel2.isJapan(ndform.IsNotJPXOfficer);
                        panel2.isTaiwan(ndform.IsNotChinese);
                        panel2.isKorea(ndform.IsNotKorea);
                    }


                    var dk_quest = model.data().data_dkQuestionaire;
                    if (dk_quest != null) {
                        if (dk_quest.AcquireFrom2 != null || dk_quest.AcquireFrom1 != null) {
                            panel10.AcquireFrom2(dk_quest.AcquireFrom2);
                            panel10.knowledge(dk_quest.AcquireFrom1);
                            panel10.acquired_knowledge("1");
                        } else {
                            panel10.acquired_knowledge("0");
                        }

                    }




                    setTimeout(function () {
                        var soft = model.data().data_soft;
                        if (soft != undefined) {
                            panel5.saving_from_salary(soft.SavingFromSalary)
                            panel5.previouse_job(soft.PreviousJobs)
                            panel5.previouse_job_industry(soft.PreviousJobsIndustry);
                            panel5.previouse_job_other_industry(soft.PreviousJobsIndustryOthers)
                            panel5.previouse_job_occupation(soft.PreviousJobsOccupation != null ? soft.PreviousJobsOccupation : '');
                            panel5.previouse_job_other_occupation(soft.PreviousJobsOccupationOthers)
                            panel5.previouse_job_annual_income(soft.PreviousJobAnnualIncome);
                            panel5.previouse_job_company_name(soft.PreviousJobsEmployerCompanyName);
                            panel5.years_of_service(soft.PreviousJobsYearsOfService);

                            panel5.provided_family(soft.ProvidedByFamilyMember);
                            panel5.provided_family_industry(soft.FamilyMembersIndustry != null ? soft.FamilyMembersIndustry : '');
                            panel5.provided_family_Other_industry(soft.FamilyMembersIndustryOthers);
                            panel5.provided_family_occupation(soft.FamilyMembersOccupation != null ? soft.FamilyMembersOccupation : '');
                            panel5.provided_family_Other_occupation(soft.FamilyMembersOccupationOthers);
                            panel5.provided_family_relation(soft.RelationshipWithTheFamilyMember);

                            panel5.investments_earning(soft.InvestmentEarning);

                            panel5.investment_earning_type(soft.InvestmentType);
                            panel5.investment_earning_other_type(soft.InvestmentTypeOthers);
                            panel5.investment_earning_capital(soft.InvestmentAmount);
                            panel5.investment_earning_profit(soft.InvestmentEarningAmount);
                            panel5.investment_earning_fund_source(soft.InvestmentFundSource);

                            panel5.rental_income(soft.RentalIncome);
                            panel5.rental_income_holding_period(soft.RentalHoldingPeriod);
                            panel5.rental_income_fund_source(soft.RentalFundSource);
                            panel5.rental_income_annual(soft.RentalAnnualIncome);

                            panel5.other(soft.OtherIncome);
                            panel5.other_value(soft.OtherIncomeTextBox);
                            if (soft.SavingFromSalary == true) {
                                panel5.saving_from_salary(true);
                            } else if (panel5.investment_earning_fund_source() == "Previous Job" || panel5.rental_income_fund_source() == "Provided By Family Member") {
                                panel5.saving_from_salary(true);
                            } else {
                                panel5.saving_from_salary(false);
                            }


                        }

                        var data_invest_obj = model.data().data_invest_obj;
                        if (data_invest_obj != undefined) {
                            panel6.Investment_Objective_temp((data_invest_obj.InvestmentObj).split(";"));
                            panel6.Investment_Objective((data_invest_obj.InvestmentObj).split(";"));
                            panel6.listed_securities(data_invest_obj.ListSecuritiesExp);
                            panel6.ccbc_warant(data_invest_obj.CBBCWarrantExp);
                            panel6.futures_option(data_invest_obj.FutureOrOptionExp);
                            panel6.leverage_foreign_exchange(data_invest_obj.LevForeignExExp);
                            panel6.unit_trust_bonds(data_invest_obj.UTorBondExp);
                            panel6.structure_products(data_invest_obj.StructuredProductExp);
                            panel6.leverage_inverse_product(data_invest_obj.LevAndInvProductExp);
                        }

                        var ListedSecurities = _.find(tmp.data_experience(), function (x) { return x.value == panel6.listed_securities() })
                        if (ListedSecurities != undefined) {
                            panel18.ListedSecurities(ListedSecurities.val_txt);
                        }
                        var CCBC = _.find(tmp.data_experience(), function (x) { return x.value == panel6.ccbc_warant() })
                        if (CCBC != undefined) {
                            panel18.CCBC(CCBC.val_txt);
                        }

                        var futureOption = _.find(tmp.data_experience(), function (x) { return x.value == panel6.futures_option() })
                        if (futureOption != undefined) {
                            panel18.future_option(futureOption.val_txt);
                        }

                        var leveraged_foreign = _.find(tmp.data_experience(), function (x) { return x.value == panel6.leverage_foreign_exchange() })
                        if (leveraged_foreign != undefined) {
                            panel18.leveraged_foreign(futureOption.val_txt);
                        }

                        var unit_trust_bonds = _.find(tmp.data_experience(), function (x) { return x.value == panel6.unit_trust_bonds() })
                        if (unit_trust_bonds != undefined) {
                            panel18.unit_trust(unit_trust_bonds.val_txt);
                        }

                        var structure_products = _.find(tmp.data_experience(), function (x) { return x.value == panel6.structure_products() })
                        if (structure_products != undefined) {
                            panel18.structured_product(structure_products.val_txt);
                        }

                        var leverage_inverse_product = _.find(tmp.data_experience(), function (x) { return x.value == panel6.leverage_inverse_product() })
                        if (leverage_inverse_product != undefined) {
                            panel18.leveraged_inverse(leverage_inverse_product.val_txt);
                        }

                        var data_MQ = model.data().data_mr;
                        if (data_MQ != undefined) {
                            panel15.client_name(dataform.Surname + " " + dataform.ClientName);
                            panel15.acc1(data_MQ.Q1);
                            panel15.q1(data_MQ.Q1 != null ? "1" : "0");
                            panel15.acc2(data_MQ.Q2);
                            panel15.q2(data_MQ.Q2 != null ? "1" : "0");
                            panel15.acc3(data_MQ.Q3);
                            panel15.q3(data_MQ.Q3 != null ? "1" : "0");
                            panel15.acc4(data_MQ.Q4);
                            panel15.q4(data_MQ.Q4 != null ? "1" : "0");
                        }

                    }, 500);
                    switch (dt_form.ApplicationMode) {
                        case 0:
                            panel18.applicationMode("網上開戶 OAO");
                            break;
                        case 1:
                            panel18.applicationMode("網上填寫表格並親臨分行驗證文件 FAO");
                            break;
                        case 2:
                            panel18.applicationMode("透過驗證服務 CA - TSCI")
                            break;
                    }

                    var bankName = _.find(tmp.data_BankName(), function (x) { return x.LookupCode == panel16.BankName() });
                    if (bankName != undefined) {
                        var bank = bankName.Value.toLowerCase();
                        if (bank.indexOf("other") > -1) {
                            panel18.bankName(panel16.OtherBankName());
                        } else {
                            panel18.bankName(bankName.Value);
                        }

                    }

                    setTimeout(function () {
                        if (model.data().data_form != 'null' && model.login() == false) {
                            $("#mytabs").kendoTabStrip();
                            $("#tab-cont").show();
                            pane = model.data().data_form.Step + 2;
                            var tab = $("#tab" + pane);
                            if (model.data().data_form.Step == 15) {
                                if (temp.check_dk_RPQ() == true) {
                                    if (model.data().data_form.ApplicationMode == 1) {
                                        $("#mytabs").kendoTabStrip().data("kendoTabStrip").activateTab("#tab15");
                                    } else {
                                        $("#mytabs").kendoTabStrip().data("kendoTabStrip").activateTab("#tab16");
                                    }
                                }
                                getCert(model.data().data_form.W8ID)
                                //getBack()
                            } else {
                                //////////////////////alert("masuk tabs 4667")
                                var tab = $("#tab" + model.page());
                                $("#mytabs").kendoTabStrip().data("kendoTabStrip").activateTab(tab);
                            }

                        } else {
                            $("#tab-cont").hide();
                        }

                    }, 500)
                    temp.statuslooup(1);

                } else {
                    if (dt_form.ApplicationMode == 1 && panel18.status() == true && panel18.isConfirmation() == true) {
                        //////////////////////alert("masuk 4659")

                        getlookupConf();
                        data_confirm();
                    }
                }


            } else {

            }
            model.loader(false);
        }
    });

}


confirmationPage = function () {
    panel18.status(true);
    panel18.isConfirmation(true);
    data_confirm();

    var deposit = $("#Deposit").data("kendoUpload");
    var depositFile = deposit.getFiles();
    //if (panel18.uploadDeposit().length == 0) {
    //    panel18.uploadDeposit(depositFile);
    //}

    var identity = $("#identity").data("kendoUpload");
    var identityfiles = identity.getFiles();
    //if (panel17.uploadFileIdentity().length == 0) {
    //    panel17.uploadFileIdentity(identityfiles)
    //}

    var ID = $("#ID").data("kendoUpload");
    var IDfiles = ID.getFiles();
    //if (panel17.uploadFileID().length == 0) {
    //    panel17.uploadFileID(IDfiles)
    //}

    var address = $("#address").data("kendoUpload");
    var addressfiles = address.getFiles();
    //if (panel17.uploadFileAddress().length == 0) {
    //    panel17.uploadFileAddress(addressfiles)
    //}

    var BankAcc = $("#BankAcc").data("kendoUpload");
    var BankAccfiles = BankAcc.getFiles();
    //if (panel17.uploadFileBankAcc().length == 0) {
    //    panel17.uploadFileBankAcc(BankAccfiles)
    //}

}

backUploadDeposit = function () {
    panel18.status(true);
    panel18.isConfirmation(false);
}

exportToPDF = function () {
    var loc = window.location.pathname;
    model.loader(true);
    $(".pnl18").css({ "font-family": 'Arial Unicode MS', "src": "url(" + loc + "'/fonts/arial-unicode-ms.ttf')" })
    $("thead").css({ "font-family": 'Arial Unicode MS', "src": "url(" + loc + "'/fonts/arial-unicode-ms.ttf')" })
    $('meta[name="viewport"]').prop('content', 'width=1440');
    $("#tab-cont").hide();
    $(".btn-ov").hide()
    $(".p_attc").show();
    $(".link_attc").hide();
    var el = $(".pnl18")[0].outerHTML;
    //kendo.pdf.defineFont({
    //    "Arial Unicode MS": loc + "/fonts/arial-unicode-ms.ttf"
    //    //eg. "Arial Unicode MS"  : "myUrl/fonts/arialunicodems.ttf"
    //});

    param = {
        FormID: model.data().data_form.ID,
        element: el,
    }
    $.ajax({
        url: urlExportPDF,
        data: JSON.stringify(param),
        type: "POST",
        contentType: ' application/json',
        success: function (res) {
            $("#tab-cont").show();
            $(".btn-ov").show();
            $(".pnl18").css({ "font-family": 'Helvetica Neue,Helvetica,Arial,sans-serif' });
            $("thead").css({ "font-family": 'Helvetica Neue,Helvetica,Arial,sans-serif' })
            $('meta[name="viewport"]').prop('content', 'width=device-width, initial-scale=1.0');
            $(".p_attc").hide();
            $(".link_attc").show();
            model.loader(false);
            //console.log("--------- " + res)
            if (res != "") {
                window.location = urlDownloadPDF + "?path=" + encodeURI(res);
            }

        }
    })

    //var drawing = kendo.drawing;
    //var geo = kendo.geometry;
    //var proxyUrl = "/someUrl";
    //var callBack = function () {
    //    kendo.//////////////////////alert("PDF successfully created!");
    //}

    //// This will contain all our drawing.
    //var group = new drawing.Group();

    //// Draw a circle.
    //var circleGeometry = new geo.Circle([100, 100], 50);
    //var circle = new drawing.Circle(circleGeometry).stroke("red", 1);

    //// And add it to the group.
    //group.append(circle);

    //// Add some text.
    //var text = new drawing.Text("Hello World", new geo.Point(100, 200));
    //group.append(text);

    //// (Optional) set PDF arguments, see the "PDF options" section below.
    //group.options.set("pdf", {
    //    paperSize: "A4",
    //    margin: {
    //        left: "20mm",
    //        top: "40mm",
    //        right: "20mm",
    //        bottom: "40mm"
    //    }
    //});

    //// You can offer the file for download now.
    //drawing.pdf.saveAs(group, "filename.pdf", proxyUrl, callBack);

    //kendo.drawing.drawDOM($(".body-content"), {

    //    paperSize: "A4",
    //    //avoidLinks: false,
    //    scale: 0.5,
    //    multiPage: true,
    //    margin: { left: "0cm", top: "1cm", right: "0cm", bottom: "1cm" },
    //    forcePageBreak: ".page-break"
    //})
    //    .then(function (group) {
    //        // Render the result as a PDF file
    //        return kendo.drawing.exportPDF(group);
    //    })
    //    .done(function (data) {
    //        // Save the PDF file
    //        kendo.saveAs({
    //            dataURI: data,
    //            fileName: "Phillip Online Account Opening Confirmation Page.pdf",
    //            proxyURL: urlExportPDF
    //        });
    //        $("#tab-cont").show();
    //        $(".btn-ov").show();
    //        $(".pnl18").css({ "font-family": 'Helvetica Neue,Helvetica,Arial,sans-serif' });
    //        $("thead").css({ "font-family": 'Helvetica Neue,Helvetica,Arial,sans-serif' })
    //        $('meta[name="viewport"]').prop('content', 'width=device-width, initial-scale=1.0');
    //        $(".p_attc").hide();
    //        $(".link_attc").show();
    //        model.loader(false);
    //    });

    //kendo.drawing.drawDOM($(".body-content"))
    //.then(function (group) {
    //    // Render the result as a PDF file
    //    return kendo.drawing.exportPDF(group, {
    //        paperSize: "auto",
    //        margin: { left: "1cm", top: "1cm", right: "1cm", bottom: "1cm" }
    //    });
    //})
    //.done(function (data) {
    //    // Save the PDF file
    //    kendo.saveAs({
    //        dataURI: data,
    //        fileName: "Phillip Online Account Opening Confirmation Page.pdf",

    //    });
    //    $("#tab-cont").show();
    //    $(".btn-ov").show();
    //    $(".pnl18").css({ "font-family": 'Helvetica Neue,Helvetica,Arial,sans-serif' });
    //    $('meta[name="viewport"]').prop('content', 'width=device-width, initial-scale=1.0');

    //});
}

reset_form = function () {
    resetPanel()
    //getBack()
    //panel18.isConfirmation(false);
    //var dt_form = model.data().data_form;
    //var dataform = model.data().data_clientInfo;
    //var ndform = model.data().data_NDForm
    //if (dataform != "null") {

    //    panel2.CashAccount(dataform.AcknowledgementCashAcct != null ? dataform.AcknowledgementCashAcct : "");
    //    panel2.MarginAccount(dataform.AcknowledgementMarginAcct != null ? dataform.AcknowledgementMarginAcct : "");
    //    //panel2.OnlineTrading(dataform.AcknowledgementOnlinePoemsTradingService != null ? dataform.AcknowledgementOnlinePoemsTradingService : "");
    //    panel2.StockOptionAccount(dataform.AcknowledgementStockOptAcct != null ? dataform.AcknowledgementStockOptAcct : "");
    //    panel2.Chinaconnect(dataform.AcknowledgementChinaConnectTradingService != null ? dataform.AcknowledgementChinaConnectTradingService : "");
    //    panel2.Chinaconnect(dataform.AcknowledgementChinaConnectTradingService != null ? dataform.AcknowledgementChinaConnectTradingService : "");

    //    panel3.promotion_code(dt_form.PromoCode);
    //    panel3.title(dataform.Salutation);
    //    panel3.surename(dataform.Surname);
    //    panel3.firstName(dataform.ClientName);
    //    panel3.nationality(dataform.Nationality);
    //    panel3.idCard(dataform.NRICPassportNo);
    //    panel3.placeIssue(dataform.PlaceOfIssue);
    //    panel3.countryBirth(dataform.CountryOfBirth);
    //    //panel3.age(dataform.Age);
    //    panel3.dateOfBirth(dataform.DateOfBirth != null ? kendo.toString(new Date(populate_date(dataform.DateOfBirth)), "dd MMM yyyy") : "");
    //    nyear = new Date().getFullYear();
    //    date = new Date(panel3.dateOfBirth());
    //    byear = date.getFullYear()
    //    age = nyear - byear;
    //    panel3.age(isNaN(age) == false ? age : 0);
    //    panel3.homeNumber(dataform.HomeTelNo);
    //    panel3.officeNumber(dataform.OfficeNoMain);
    //    panel3.wechat(dataform.WeChatID);
    //    panel3.homeAreaCode(dataform.CountryCodeHome != null ? dataform.CountryCodeHome : "");
    //    panel3.officeAreaCode(dataform.CountryCodeOfficeMain != null ? dataform.CountryCodeOfficeMain : "");
    //    if (dataform.AeCd !== "" && dataform.AeCd !== null) {
    //        panel3.is_aecode(true);
    //    }

    //    panel3.aecode(dataform.AeCd);
    //    panel3.is_aename(dataform.AeName !== "" && dataform.AeName !== null ? true : false);
    //    panel3.aename(dataform.AeName);
    //    panel3.is_preferred_trading(dataform.AeCd !== "" && dataform.AeName !== "" && dataform.AeName !== null && dataform.AeCd !== null ? true : false);

    //    panel4.country(dataform.ResidentialCountry);
    //    panel4.residentialAddress(dataform.ResidentialAddress1);
    //    panel4.residentialAddress2(dataform.ResidentialAddress2);
    //    panel4.residentialAddress3(dataform.ResidentialAddress3);
    //    panel4.ownershipResidence(dataform.StatusOfResidence);
    //    panel4.employmentType(dataform.EmploymentType);
    //    panel4.industry(dataform.EmploymentIndustry);
    //    panel4.other_industries(dataform.EmploymentIndustryOthers)
    //    panel4.occupation(dataform.Occupation);
    //    panel4.other_occupation(dataform.OccupationOthers)
    //    panel4.company_name(dataform.EmployerName);
    //    panel4.office_address1(dataform.EmployerAddress1);
    //    panel4.office_address2(dataform.EmployerAddress2);
    //    panel4.office_address3(dataform.EmployerAddress3);
    //    panel4.office_region(dataform.EmployerAddressCountry);
    //    panel4.years_of_service(dataform.YearsOfService);

    //    var data_soft = model.data().data_soft;
    //    panel5.annual_income(dataform.AnnualIncomeLevel);
    //    panel5.liquid_assets(dataform.LiquidNetWorth);
    //    panel5.net_worth(dataform.EstimatedNetWorth);
    //    panel5.other_net_worth(dataform.EstimatedNetWorthOthers);
    //    panel5.previouse_job(dataform.Is_Previouse_Job === 1 ? true : false);

    //    panel16.BankName(dataform.DesignatedBankName);
    //    panel16.OtherBankName(dataform.DesignatedBankNameOthers);
    //    panel16.HolderName(dataform.DesignatedBankAccountName);
    //    panel16.HolderAcct(dataform.DesignatedBankAccountNo);

    //    var dt_w8 = model.data().data_w8;
    //    if (dt_w8 != null) {
    //        setTimeout(function () {
    //            panel13.name(dt_w8.ClientName);
    //            panel13.country_citizen(dt_w8.CountryOfCitizenship);
    //            $.each(dt_w8.W8BEN_Address, function (i, dt) {
    //                if (dt.AddressType == "R") {
    //                    panel13.residence_street(dt.Address1);
    //                    panel13.residence_number(dt.Address2);
    //                    panel13.residence_building(dt.Address3);
    //                    panel13.residence_city(dt.City);
    //                    panel13.residence_state(dt.StateAddress);
    //                    panel13.residence_postal_code(dt.PostalCode);
    //                    panel13.residence_country(dt.Country);
    //                } else {
    //                    panel13.isSameAbove(false);
    //                    $("[name=contry1]").data("kendoDropDownList").enable(true);
    //                    panel13.mailing_street(dt.Address1)
    //                    panel13.mailing_number(dt.Address2);
    //                    panel13.mailing_building(dt.Address3);
    //                    panel13.mailing_city(dt.City);
    //                    panel13.mailing_state(dt.StateAddress);
    //                    panel13.mailing_postal_code(dt.PostalCode);
    //                    panel13.mailing_country(dt.Country);
    //                }
    //            })

    //            panel11.hk_tax(dataform.HongKongTaxResident);
    //            panel11.other_tax(dataform.ForeignTaxResident);

    //            //                                        isSameAbove: ko.observable(true),
    //            //                                           
    //            panel13.taxpayer(dt_w8.ITIN);
    //            panel13.foreign_tax_ID(dt_w8.ForeignTaxID);
    //            panel13.birth(kendo.toString(new Date(populate_date(dt_w8.DateOfBirth)), "dd MMM yyyy"));
    //            panel13.reffrence_number(dt_w8.RefNumber);

    //            panel13.part2_nationality(dt_w8.W8BEN_TaxTreaty[0].Country);
    //            panel13.part2_specialrate(dt_w8.W8BEN_TaxTreaty[0].ParagraphArticle);
    //            panel13.part2_treatyrates(dt_w8.W8BEN_TaxTreaty[0].TaxTreatyID);
    //            panel13.part2_income(dt_w8.W8BEN_TaxTreaty[0].WithholdingTaxPercentRate);
    //            panel13.part2_additional(dt_w8.W8BEN_TaxTreaty[0].ParagraphArticleAddOnConditions);
    //        }, 1000)

    //    } else {
    //        panel13.name(dataform.ClientName);
    //        panel13.country_citizen(dataform.Nationality);
    //        panel13.residence_street(dataform.ResidentialAddress1);
    //        panel13.residence_number(dataform.ResidentialAddress2);
    //        panel13.residence_building(dataform.ResidentialAddress3);
    //        //residence_city();
    //        //                            residence_state: ko.observable(""),
    //        //                                residence_postal_code: ko.observable(""),
    //        panel13.residence_country(dataform.ResidentialCountry);
    //        if (dataform.DateOfBirth != null) {
    //            panel13.birth(kendo.toString(new Date(populate_date(dataform.DateOfBirth)), "dd MMM yyyy"));
    //        }

    //    }

    //    var data_attc = model.data().data_attach;
    //    //console.log("-------------- data_attc", data_attc);
    //    if (data_attc.length > 0) {
    //        $.each(data_attc, function (i, dt) {
    //            switch (dt.AttachmentType) {
    //                case "HKID Card":
    //                    panel17.uploadIdentity(true);
    //                    panel17.uploadIdentityGuid(dt.AttachmentID);
    //                    panel17.uploadFileIdentity([{ name: dt.Attachment, size: 600, extension: dt.AttachmentExt }])
    //                    break;
    //                case "Address Proof":
    //                    panel17.uploadAddress(true);
    //                    panel17.uploadAddressGuid(dt.AttachmentID);
    //                    panel17.uploadFileAddress([{ name: dt.Attachment, size: 600, extension: dt.AttachmentExt }])
    //                    break;
    //                case "Bank Account Proof":
    //                    panel17.uploadBankAcc(true);
    //                    panel17.uploadBankAccGuid(dt.AttachmentID);
    //                    panel17.uploadFileBankAcc([{ name: dt.Attachment, size: 600, extension: dt.AttachmentExt }])
    //                    break;
    //                case "Back of ID":
    //                    panel17.uploadID(true);
    //                    panel17.uploadIDGuid(dt.AttachmentID);
    //                    panel17.uploadFileID([{ name: dt.Attachment, size: 600, extension: dt.AttachmentExt }])
    //                    break;
    //            }
    //        });
    //    } else {
    //        panel17.edited(true)
    //    }

    //    $("#identity").kendoUpload({
    //        multiple: false,
    //        showFileList: true,
    //        async: { saveUrl: '/panel15/UploadIdentity', removeUrl: '/panel15/Remove', autoUpload: false, },
    //        validation: { allowedExtensions: ['.gif', '.jpg', '.png', '.pdf', '.jpeg', '.bmp'], maxFileSize: 5000000 },
    //        success: function (e) {
    //            var data = e.response;
    //            panel17.edited(false);
    //            panel17.uploadIdentity(true);
    //            UploadSuccess(e.response);
    //            panel17.uploadIdentityGuid(data.data.AttachmentID);
    //        },
    //        error: function (e) {
    //            panel17.uploadIdentityErr(true);
    //            Swal.fire("Warning!", "identity Account failed to upload", "warning");
    //        },
    //        select: function (e) {
    //            panel17.uploadIdentity(false);
    //            panel17.edited(true);
    //            $("#identity").parents(".k-upload").find(".k-upload-files").remove();
    //            $("#identity").parents(".k-upload").find(".k-upload-status").remove();
    //            $("#identity").parents(".k-upload").find(".k-upload.k-header").addClass("k-upload-empty");
    //            $("#identity").parents(".k-upload").find(".k-upload-button").removeClass("k-state-focused");

    //        },
    //        files: panel17.uploadFileIdentity(),
    //        upload: function (e) {
    //            //e.data = {}
    //            //e.data = { FormID: panel1.ID_Form(), File_ID: panel17.uploadIdentityGuid() }

    //            e.formData = new FormData();
    //            e.formData.append("FormID", panel1.ID_Form());
    //            e.formData.append("File_ID", panel17.uploadIdentityGuid());
    //            var upload = $("#identity").getKendoUpload();
    //            var files = upload.getFiles();
    //            e.formData.append("identity", files[0].rawFile);
    //        }

    //    })
    //    $("#ID").kendoUpload({
    //        multiple: false,
    //        async: { saveUrl: '/panel15/UploadBackID', removeUrl: '/panel15/Remove', autoUpload: false, },
    //        validation: { allowedExtensions: ['.gif', '.jpg', '.png', '.pdf', '.jpeg', '.bmp'], maxFileSize: 5000000 },
    //        success: function (e) {
    //            var data = e.response;
    //            panel17.edited(false);
    //            panel17.uploadID(true);
    //            UploadSuccess(e.response);
    //            panel17.uploadIDGuid(data.data.AttachmentID);
    //        },
    //        error: function (e) {
    //            panel17.uploadIDErr(true);
    //            Swal.fire("Warning!", "ID Account failed to upload", "warning");
    //        },
    //        select: function (e) {
    //            panel17.uploadID(false);
    //            panel17.edited(true);
    //            $("#ID").parents(".k-upload").find(".k-upload-files").remove();
    //            $("#ID").parents(".k-upload").find(".k-upload-status").remove();
    //            $("#ID").parents(".k-upload").find(".k-upload.k-header").addClass("k-upload-empty");
    //            $("#ID").parents(".k-upload").find(".k-upload-button").removeClass("k-state-focused");

    //        },
    //        files: panel17.uploadFileID(),
    //        upload: function (e) {
    //            //e.data = {}
    //            //e.data = { FormID: panel1.ID_Form(), File_ID: panel17.uploadIDGuid() }

    //            e.formData = new FormData();
    //            e.formData.append("FormID", panel1.ID_Form());
    //            e.formData.append("File_ID", panel17.uploadIDGuid());
    //            var upload = $("#ID").getKendoUpload();
    //            var files = upload.getFiles();
    //            e.formData.append("ID", files[0].rawFile);
    //        }
    //    })
    //    $("#address").kendoUpload({
    //        multiple: false,
    //        async: { saveUrl: '/panel15/UploadAddress', removeUrl: '/panel15/Remove', autoUpload: false, },
    //        validation: { allowedExtensions: ['.gif', '.jpg', '.png', '.pdf', '.jpeg', '.bmp'], maxFileSize: 5000000 },
    //        success: function (e) {
    //            var data = e.response;
    //            panel17.edited(false);
    //            panel17.uploadAddress(true);
    //            UploadSuccess(e.response);
    //            panel17.uploadAddressGuid(data.data.AttachmentID);
    //        },
    //        error: function (e) {
    //            panel17.uploadAddressErr(true);
    //            Swal.fire("Warning!", "Address Account failed to upload", "warning");
    //        },
    //        select: function () {
    //            panel17.uploadAddress(false);
    //            panel17.edited(true);
    //            $("#address").parents(".k-upload").find(".k-upload-files").remove();
    //            $("#address").parents(".k-upload").find(".k-upload-status").remove();
    //            $("#address").parents(".k-upload").find(".k-upload.k-header").addClass("k-upload-empty");
    //            $("#address").parents(".k-upload").find(".k-upload-button").removeClass("k-state-focused");
    //        },
    //        files: panel17.uploadFileAddress(),
    //        upload: function (e) {
    //            //e.data = {}
    //            //e.data = { FormID: panel1.ID_Form(), File_ID: panel17.uploadAddressGuid() }
    //            e.formData = new FormData();
    //            e.formData.append("FormID", panel1.ID_Form());
    //            e.formData.append("File_ID", panel17.uploadAddressGuid());
    //            var upload = $("#address").getKendoUpload();
    //            var files = upload.getFiles();
    //            e.formData.append("address", files[0].rawFile);
    //        }
    //    })
    //    $("#BankAcc").kendoUpload({
    //        multiple: false,
    //        async: { saveUrl: '/panel15/UploadBankAcc', removeUrl: '/panel15/Remove', autoUpload: false, },
    //        validation: { allowedExtensions: ['.gif', '.jpg', '.png', '.pdf', '.jpeg', '.bmp'], maxFileSize: 5000000 },
    //        success: function (e) {
    //            var data = e.response;
    //            panel17.edited(false);
    //            panel17.uploadBankAcc(true);
    //            UploadSuccess(e.response);
    //            panel17.uploadBankAccGuid(data.data.AttachmentID);
    //        },
    //        error: function (e) {
    //            panel17.uploadBankAccErr(true);
    //            Swal.fire("Warning!", "Bank Account failed to upload", "warning");
    //        },
    //        select: function (e) {
    //            panel17.uploadBankAcc(false);
    //            panel17.edited(true);
    //            $("#BankAcc").parents(".k-upload").find(".k-upload-files").remove();
    //            $("#BankAcc").parents(".k-upload").find(".k-upload-status").remove();
    //            $("#BankAcc").parents(".k-upload").find(".k-upload.k-header").addClass("k-upload-empty");
    //            $("#BankAcc").parents(".k-upload").find(".k-upload-button").removeClass("k-state-focused");
    //        },
    //        files: panel17.uploadFileBankAcc(),
    //        upload: function (e) {
    //            //e.data = {}
    //            //e.data = { FormID: panel1.ID_Form(), File_ID: panel17.uploadBankAccGuid() }

    //            e.formData = new FormData();
    //            e.formData.append("FormID", panel1.ID_Form());
    //            e.formData.append("File_ID", panel17.uploadBankAccGuid());
    //            var upload = $("#BankAcc").getKendoUpload();
    //            var files = upload.getFiles();
    //            e.formData.append("BankAcc", files[0].rawFile);
    //        }
    //    })

    //    $("#Deposit").kendoUpload({
    //        multiple: false,
    //        async: { saveUrl: '/panel16/UploadDepositProof', removeUrl: '/panel16/Remove', autoUpload: true, },
    //        validation: { allowedExtensions: ['.gif', '.jpg', '.png', '.pdf', '.jpeg', '.bmp'], maxFileSize: 5000000 },

    //        error: function (e) {
    //            panel17.uploadBankAccErr(true);
    //            Swal.fire("Warning!", "Deposit Proof failed to upload", "warning");
    //        },
    //        select: function (e) {

    //            $("#BankAcc").parents(".k-upload").find(".k-upload-files").remove();
    //            $("#BankAcc").parents(".k-upload").find(".k-upload-status").remove();
    //            $("#BankAcc").parents(".k-upload").find(".k-upload.k-header").addClass("k-upload-empty");
    //            $("#BankAcc").parents(".k-upload").find(".k-upload-button").removeClass("k-state-focused");
    //        },
    //        //files: panel18.uploadFileID_Card(),

    //    });


    //    if (model.data().data_form.RPQID != undefined) {
    //        var data_rpq = model.data().data_rpq;
    //        panel8.question1(data_rpq.Q1);
    //        panel8.question2(data_rpq.Q2);
    //        panel8.question3(data_rpq.Q3);
    //        panel8.question4(data_rpq.Q4.split(''));
    //        panel8.question5(data_rpq.Q5);
    //        panel8.question6(data_rpq.Q6);
    //        panel8.question7(data_rpq.Q7);
    //        panel8.question8(data_rpq.Q8);
    //        switch (data_rpq.RPQLevel) {
    //            case 1:
    //                panel8.RpqLevel("Low Risk");
    //                break;
    //            case 2:
    //                panel8.RpqLevel("Medium Risk");
    //                break;
    //            case 2:
    //                panel8.RpqLevel("High Risk");
    //                break;
    //        }

    //        panel8.score(data_rpq.RPQScore)
    //    }
    //}



    //if (ndform != null) {
    //    panel2.isAustralia(ndform.IsNotAustralian);
    //    panel2.isCanada(ndform.IsNotCanadian);
    //    panel2.isFinland(ndform.IsNotChinese);
    //    panel2.isJapan(ndform.IsNotFinnish);
    //    panel2.isTaiwan(ndform.IsNotJPXOfficer);
    //}


    //var dk_quest = model.data().data_dkQuestionaire;
    //if (dk_quest != null) {
    //    if (dk_quest.AcquireFrom2 != null && dk_quest.AcquireFrom1 != null) {
    //        panel10.AcquireFrom2(dk_quest.AcquireFrom2);
    //        panel10.knowledge(dk_quest.AcquireFrom1);
    //        panel10.acquired_knowledge("1");
    //    } else {
    //        panel10.acquired_knowledge("0");
    //    }

    //}




    //setTimeout(function () {
    //    var soft = model.data().data_soft;
    //    if (soft != undefined) {
    //        panel5.previouse_job(soft.PreviousJobs)
    //        panel5.previouse_job_industry(soft.PreviousJobsIndustry);
    //        panel5.previouse_job_other_industry(soft.PreviousJobsIndustryOthers)
    //        panel5.previouse_job_occupation(soft.PreviousJobsOccupation);
    //        panel5.previouse_job_other_occupation(soft.PreviousJobsOccupationOthers)
    //        panel5.previouse_job_annual_income(soft.PreviousJobAnnualIncome);
    //        panel5.previouse_job_company_name(soft.PreviousJobsEmployerCompanyName);
    //        panel5.years_of_service(soft.PreviousJobsYearsOfService);

    //        panel5.provided_family(soft.ProvidedByFamilyMember);
    //        panel5.provided_family_industry(soft.FamilyMembersIndustry);
    //        panel5.provided_family_Other_industry(soft.FamilyMembersIndustryOthers);
    //        panel5.provided_family_occupation(soft.FamilyMembersOccupation);
    //        panel5.provided_family_Other_occupation(soft.FamilyMembersOccupationOthers);
    //        panel5.provided_family_relation(soft.RelationshipWithTheFamilyMember);

    //        panel5.investments_earning(soft.InvestmentEarning);

    //        panel5.investment_earning_type(soft.InvestmentType);
    //        panel5.investment_earning_other_type(soft.InvestmentTypeOthers);
    //        panel5.investment_earning_capital(soft.InvestmentAmount);
    //        panel5.investment_earning_profit(soft.InvestmentEarningAmount);
    //        panel5.investment_earning_fund_source(soft.InvestmentFundSource);

    //        panel5.rental_income(soft.RentalIncome);
    //        panel5.rental_income_holding_period(soft.RentalHoldingPeriod);
    //        panel5.rental_income_fund_source(soft.RentalFundSource);
    //        panel5.rental_income_annual(soft.RentalAnnualIncome);

    //        panel5.other(soft.OtherIncome);
    //        panel5.other_value(soft.OtherIncomeTextBox);


    //    }

    //    var data_MQ = model.data().data_mr;
    //    panel15.client_name(dataform.ClientName);
    //    if (data_MQ != null) {
    //        if (data_MQ.Q1 != null) {
    //            panel15.acc1(data_MQ.Q1);
    //            panel15.q1("1");
    //        } else {
    //            panel15.acc1("");
    //            panel15.q1("0")
    //        }

    //        if (data_MQ.Q2 != null) {
    //            panel15.acc2(data_MQ.Q2);
    //            panel15.q2("1")
    //        } else {
    //            panel15.acc2("");
    //            panel15.q2("0")
    //        }

    //        if (data_MQ.Q3 != null) {
    //            panel15.acc3(data_MQ.Q3);
    //            panel15.q3("1")
    //        } else {
    //            panel15.acc3("");
    //            panel15.q3("0")
    //        }

    //        if (data_MQ.Q4 != null) {
    //            panel15.acc4(data_MQ.Q4);
    //            panel15.q4("1")
    //        } else {
    //            panel15.acc4("");
    //            panel15.q4("0")
    //        }

    //    }
    //}, 200);
}

openModal11 = function () {
    //var grid = $(".input_grid").data("kendoGrid");
    //var strData = JSON.stringify(grid.dataSource.view());
    var JsonData = tax.tax_arr();
    var tinEmpty = _.filter(JsonData, function (m) { return m.tin == "" && m.tin_reason == "" })
    //console.log("------------ tin ", tinEmpty);
    if (tinEmpty.length > 0) {
        Swal.fire((model.lang() != undefined) ? model.lang().warning() : '', (model.lang() != undefined) ? model.lang().tin_empty() : '', "warning");
        //Swal.fire("Warning!", "Some row has Tin and Tin Reason are empty, please filled one of them", "warning")
    } else {
        var valid = $("#pnl11").kendoValidator({
            rules: {

                box: function (input) {
                    if ($('input[name="tax"]:checked').length < 0) {

                        return false;
                    }
                    return true;
                },

            },
            messages: {
                box: "this is a required field",
            }
        }).data("kendoValidator");
        if (valid.validate()) {
            //var grid = $(".input_grid").data("kendoGrid");
            var data_grid = tax.tax_arr();
            if (panel11.other_tax() == true) {
                if (data_grid.length > 0) {
                    $("#modalPanel11").modal("show");
                } else {
                    Swal.fire((model.lang() != undefined) ? model.lang().warning() : '', (model.lang() != undefined) ? model.lang().add_foreign_tax() : '', "warning");
                    //Swal.fire("Waring!", "Please add new record foreign tax", "warning");
                }
            } else {
                $("#modalPanel11").modal("show");
            }


        } else {
            Swal.fire((model.lang() != undefined) ? model.lang().warning() : '', (model.lang() != undefined) ? model.lang().fill_all() : '', "warning");
        }
    }


}

enable_contry = function () {
    panel13.mailing_street("")
    panel13.mailing_number("");
    panel13.mailing_building("");
    panel13.mailing_city("");
    panel13.mailing_state("");
    panel13.mailing_postal_code("");
    panel13.mailing_country("");
    if (panel13.isSameAbove() == false) {
        $("[name=contry1]").data("kendoDropDownList").enable(false);
    } else {
        $("[name=contry1]").data("kendoDropDownList").enable(true);
    }

}

function onUpload(e) {
    var xhr = e.XMLHttpRequest;
    if (xhr) {
        xhr.addEventListener("readystatechange", function onUploadReady(e) {
            if (xhr.readyState == 1 /* OPENED */) {
                xhr.setRequestHeader("X-Foo", "Bar");
                xhr.removeEventListener("readystatechange", onUploadReady);
                //console.log("--------------------- xhr ", xhr)
            }
        });
    }
}

NoFPS = function () {
    panel18.useFPS("1");
}

YesFPS = function () {
    panel18.useFPS("0");
}

panel3Confirmed = function () {
    var valid3 = $("#pnl3").kendoValidator({
        rules: {
            customRule: function (input) {
                ////console.log("------------ ", input.is("[name='Objective']"));
                if (input.is("[name='choose1']") && $("[name='choose1']:checked").length == 1) {
                    return false;
                }

                return true;
            }
            //customRule1: function (input) {
            //    ////console.log("------------ ", input.is("[name='Objective']"));
            //    if (input.is("[name='ntl']") && $("[name='ntl']:checked").length == 0) {
            //        return false;
            //    }

            //    return true;
            //}
        },
        messages: {
            customRule: (model.lang() != undefined) ? model.lang().at_least_one() : '',
            //customRule1: "Atleast one service should be selected.",
        }
    }).data("kendoValidator");
    if (valid3.validate()) {
        if (panel2.CashAccount() == 1 || panel2.MarginAccount() == 1) {
            $("#modaltc").modal({
                backdrop: 'static',
                keyboard: false,
                show: true
            });
        } else {
            Swal.fire((model.lang() != undefined) ? model.lang().warning() : '', (model.lang() != undefined) ? model.lang().cash_margin_acct() : '', "warning");
        }

    } else {
        Swal.fire("Warning !", "Please fill all input", "warning");
    }

}

changeEmpType = function () {
    panel4.industry("");
    panel4.other_industries("");
    panel4.occupation("");
    panel4.other_occupation("");
    panel4.company_name("");
    panel4.office_address1("");
    panel4.office_address2("");
    panel4.office_address3("");
    panel4.office_region("");
    panel4.years_of_service("");

    setTimeout(function () {
        if (panel4.employmentType() == 'Employed') {
            var dt = [
                { text: (model.lang() != undefined) ? model.lang().saving_from_salary() : '', value: "Saving From Salary", zh_en: "薪金儲蓄 Saving From Salary" },
                { text: (model.lang() != undefined) ? model.lang().pref_job() : '', value: "Previous Job", zh_en: "以往工作收入 Previous Job" },
                { text: (model.lang() != undefined) ? model.lang().provided_family() : '', value: "Provided By Family Member", zh_en: "家庭成員提供 Provided by Family Member" },
            ]
            tmp.data_investment_fund_source([])
            tmp.data_investment_fund_source(dt)

        } else {
            var dt = [
                { text: (model.lang() != undefined) ? model.lang().pref_job() : '', value: "Previous Job", zh_en: "以往工作收入 Previous Job" },
                { text: (model.lang() != undefined) ? model.lang().provided_family() : '', value: "Provided By Family Member", zh_en: "家庭成員提供 Provided by Family Member" },
            ]
            tmp.data_investment_fund_source([])
            tmp.data_investment_fund_source(dt)

        }

        $("#earn6").data("kendoDropDownList").setDataSource(tmp.data_investment_fund_source());
    }, 200)

}

changeacquired_knowledge = function () {
    ////////////////////////alert("masuk")
}

getCert = function (w8_FormID) {
    param = {
        guid: w8_FormID,
    }
    $.ajax({
        url: urlGetCert,
        data: JSON.stringify(param),
        type: "POST",
        contentType: ' application/json',
        success: function (res) {
            data = res.data;
            if (res.success == true) {
                panel18.certificate(ko.mapping.toJS(data));
            }
        }
    })
}

showPdfInNewTab = function (id, fileName) {
    ////alert(fileName)
    urlfile = window.location.pathname + '/upload/' + model.data().data_form.ID + '/' + fileName;
    $.ajax({
        url: urlfile,
        type: 'HEAD',
        error: function () {
            window.open(uploadUrl + '/' + model.data().data_form.ID + '/' + fileName);
        },
        success: function () {
            window.open(window.location.pathname + '/upload/' + model.data().data_form.ID + '/' + fileName);
        }
    });
    //model.loader(true)
    //param = {
    //    id: id,
    //}
    //$.ajax({
    //    url: urlGetPDF64,
    //    data: JSON.stringify(param),
    //    type: "POST",
    //    contentType: ' application/json',
    //    success: function (res) {
    //        data = res.data;
    //        if (res.success == true) {
    //            //panel18.certificate(ko.mapping.toJS(data));
    //            model.loader(false)
    //            data = res.data;
    //            let pdfWindow = window.open("");
    //            pdfWindow.document.write("<iframe width='100%' height='100%' src='data:application/pdf;base64," + data + "'></iframe>");
    //            setTimeout(function () { pdfWindow.stop() }, 1000);

    //        }
    //    }
    //})

}

showImageInNewTab = function (id, type) {
    model.loader(true)
    var itype = type.replace(".", "")
    param = {
        id: id,
    }
    $.ajax({
        url: urlGetPDF64,
        data: JSON.stringify(param),
        type: "POST",
        contentType: ' application/json',
        success: function (res) {
            data = res.data;
            //console.log("panjang data " + data.length);
            if (res.success == true) {
                //panel18.certificate(ko.mapping.toJS(data));
                model.loader(false)
                data = res.data;
                var image = new Image();
                image.src = "data:image/" + itype + ";base64," + data;

                var w = window.open("");
                w.document.write(image.outerHTML);
                //let pdfWindow = window.open("");
                //pdfWindow.document.write("<iframe width='100%' height='100%' src='data:image/"+itype+";base64," + data + "'></iframe>");
                //setTimeout(function () { pdfWindow.stop() }, 1000);

            }
        }
    })

}

getAttch = function (attcID) {
    param = {
        FormID: attcID,
    }
    $.ajax({
        url: urlGetAtt,
        data: JSON.stringify(param),
        type: "POST",
        contentType: ' application/json',
        success: function (res) {
            data = res.data._attachment;
            if (res.success == true) {
                if (data.length > 0) {
                    $.each(data, function (i, dt) {
                        switch (dt.AttachmentType) {
                            case "HKID Card":
                                panel17.uploadIdentity(true);
                                panel17.uploadIdentityGuid(dt.AttachmentID);
                                panel17.uploadFileIdentity([{ name: dt.Attachment, size: 600, extension: dt.AttachmentExt }])
                                break;
                            case "Address Proof":
                                panel17.uploadAddress(true);
                                panel17.uploadAddressGuid(dt.AttachmentID);
                                panel17.uploadFileAddress([{ name: dt.Attachment, size: 600, extension: dt.AttachmentExt }])
                                break;
                            case "Bank Account Proof":
                                panel17.uploadBankAcc(true);
                                panel17.uploadBankAccGuid(dt.AttachmentID);
                                panel17.uploadFileBankAcc([{ name: dt.Attachment, size: 600, extension: dt.AttachmentExt }])
                                break;
                            case "Back of ID":
                                panel17.uploadID(true);
                                panel17.uploadIDGuid(dt.AttachmentID);
                                panel17.uploadFileID([{ name: dt.Attachment, size: 600, extension: dt.AttachmentExt }])
                                break;
                            case "Bank Deposit Slip":
                                panel18.uploadDepositGuid(dt.AttachmentID);
                                panel18.uploadDeposit([{ name: dt.Attachment, size: 600, extension: dt.AttachmentExt }]);
                                //////////////////////alert("masuk 5247")
                                //panel18.status(true);
                                //panel18.isConfirmation(true);
                                getlookupConf()
                                break;
                        }
                    });
                }
            }
        }
    })
}

var bili = {
    title: function () {
        var ttl = _.find(temp.title(), function (x) {
            return x.value == model.data().data_clientInfo.Salutation;
        })

        if (ttl != undefined) {
            return ttl.text;
        }

        return "";

    },
    citizensip: function () {
        var citizen = _.find(model.data().data_country, function (x) {
            return x.en_short_name == panel3.nationality();
        })

        if (citizen != undefined) {
            return citizen.zh_hk_short_name + " " + citizen.en_short_name;
        }

        return "";
    },
    placeofissue: function () {
        var issue = _.find(model.data().data_country, function (x) {
            return x.en_short_name == model.data().data_clientInfo.PlaceOfIssue;
        })

        if (issue != undefined) {
            return issue.zh_hk_short_name + " " + issue.en_short_name;
        }

        return "";
    },
    countryBirth: function () {
        var cBirth = _.find(model.data().data_country, function (x) {
            return x.en_short_name == model.data().data_clientInfo.CountryOfBirth;
        })

        if (cBirth != undefined) {
            return cBirth.zh_hk_short_name + " " + cBirth.en_short_name;
        }

        return "";
    },
    AEcdName: function () {
        var aename = "";
        var aecd = "";
        if (model.data().data_clientInfo.AeCd != null) {
            aecd = model.data().data_clientInfo.AeCd;
        }

        if (model.data().data_clientInfo.AeName != null) {
            aename = model.data().data_clientInfo.AeName;
        }

        return aecd + " " + aename;
    },
    riskLevel: function () {
        var data = (panel8.RpqLevel()).toLowerCase();
        if (data.indexOf("high") > -1) {
            return "高風險 " + panel8.RpqLevel();
        } else if (data.indexOf("low") > -1) {
            return "低風險 " + panel8.RpqLevel();
        } else {
            return "中風險 " + panel8.RpqLevel();
        }
    },
    taxRescountry: function (country) {

        var citizen1 = _.find(model.data().data_country, function (x) {
            return x.en_short_name == country;
        });
        var citizen2 = _.find(model.data().data_country, function (x) {
            return x.zh_hk_short_name == country;
        });

        var citizen3 = _.find(model.data().data_country, function (x) {
            return x.zh_cn_short_name == country;
        });

        if (citizen1 != undefined) {
            ////////////////////////alert(masuk)
            return citizen1.zh_hk_short_name + " " + citizen1.en_short_name;
        } else if (citizen2 != undefined) {
            return citizen2.zh_hk_short_name + " " + citizen2.en_short_name;
        } else if (citizen3 != undefined) {
            return citizen3.zh_hk_short_name + " " + citizen3.en_short_name;
        }
    },
    pref_job_ind: function () {
        var zh = _.find(temp.dataLookupConf(), function (x) {
            return x.LookupCode == panel5.previouse_job_industry() && x.LanguageCode == "zh-hk";
        });
        var en = _.find(temp.dataLookupConf(), function (x) {
            return x.LookupCode == panel5.previouse_job_industry() && x.LanguageCode == "en-us";
        })

        if (en != undefined && zh != undefined) {

            return zh.Value + " " + en.Value;
        }
    },
    pref_job_occ: function () {

        var zh = _.find(temp.dataLookupConf(), function (x) {
            return x.LookupCode == panel5.previouse_job_occupation() && x.LanguageCode == "zh-hk";
        });
        var en = _.find(temp.dataLookupConf(), function (x) {
            return x.LookupCode == panel5.previouse_job_occupation() && x.LanguageCode == "en-us";
        })

        if (en != undefined && zh != undefined) {

            return zh.Value + " " + en.Value;
        }

        //var oc = _.find(tmp.data_occupation(), function (x) {
        //    return x.LookupCode == panel5.previouse_job_occupation();
        //})

        //if (oc != undefined) {
        //    if (model.urlLang() != 'en-us') {
        //        return oc.Value + " " + oc.LookupCode;
        //    } else {
        //        return oc.Value
        //    }
        //    //return oc.Value + " " + oc.LookupCode;
        //}
    },
    rel_fam_member: function () {

        var zh = _.find(temp.dataLookupConf(), function (x) {
            return x.LookupCode == panel5.provided_family_relation() && x.LanguageCode == "zh-hk";
        });
        var en = _.find(temp.dataLookupConf(), function (x) {
            return x.LookupCode == panel5.provided_family_relation() && x.LanguageCode == "en-us";
        })

        if (en != undefined && zh != undefined) {

            return zh.Value + " " + en.Value;
        }

        //var rel = _.find(tmp.data_family_relations(), function (x) {
        //    return x.LookupCode == panel5.provided_family_relation();
        //})

        //if (rel != undefined) {
        //    if (model.urlLang() != 'en-us') {
        //        return rel.Value + " " + rel.LookupCode;
        //    } else {
        //        return rel.Value
        //    }
        //    //return rel.Value + " " + rel.LookupCode;
        //}
    },
    rel_fam_ind: function () {

        var zh = _.find(temp.dataLookupConf(), function (x) {
            return x.LookupCode == panel5.provided_family_industry() && x.LanguageCode == "zh-hk";
        });
        var en = _.find(temp.dataLookupConf(), function (x) {
            return x.LookupCode == panel5.provided_family_industry() && x.LanguageCode == "en-us";
        })

        if (en != undefined && zh != undefined) {

            return zh.Value + " " + en.Value;
        }
        //var rel_ind = _.find(tmp.data_industry(), function (x) {
        //    return x.LookupCode == panel5.provided_family_industry();
        //})

        //if (rel_ind != undefined) {
        //    if (model.urlLang() != 'en-us') {
        //        return rel_ind.Value + " " + rel_ind.LookupCode;
        //    } else {
        //        return rel_ind.Value
        //    }
        //    //return rel_ind.Value + " " + rel_ind.LookupCode;
        //}
    },
    rel_fam_occ: function () {

        var zh = _.find(temp.dataLookupConf(), function (x) {
            return x.LookupCode == panel5.provided_family_occupation() && x.LanguageCode == "zh-hk";
        });
        var en = _.find(temp.dataLookupConf(), function (x) {
            return x.LookupCode == panel5.provided_family_occupation() && x.LanguageCode == "en-us";
        })

        if (en != undefined && zh != undefined) {

            return zh.Value + " " + en.Value;
        }

        //var rel_oc = _.find(tmp.data_occupation(), function (x) {
        //    return x.LookupCode == panel5.provided_family_occupation();
        //})

        //if (rel_oc != undefined) {
        //    if (model.urlLang() != 'en-us') {
        //        return rel_oc.Value + " " + rel_oc.LookupCode;
        //    } else {
        //        return rel_oc.Value
        //    }
        //    //return rel_oc.Value + " " + rel_oc.LookupCode;
        //}
    },

    bank_name: function () {
        //data: tmp.data_BankName()
        var zh = _.find(temp.dataLookupConf(), function (x) {
            return x.LookupCode == panel16.BankName() && x.LanguageCode == "zh-hk";
        });
        var en = _.find(temp.dataLookupConf(), function (x) {
            return x.LookupCode == panel16.BankName() && x.LanguageCode == "en-us";
        })

        if (en != undefined && zh != undefined) {

            return zh.Value + " " + en.Value;
        }
        //var bnk = _.find(tmp.data_BankName(), function (x) {
        //    return x.LookupCode == panel16.BankName();
        //})

        //if (bnk != undefined) {
        //    return bnk.Value;
        //}
    },
    employment: function () {
        var zh = _.find(temp.dataLookupConf(), function (x) {
            return x.LookupCode == panel4.employmentType() && x.LanguageCode == "zh-hk";
        });
        var en = _.find(temp.dataLookupConf(), function (x) {
            return x.LookupCode == panel4.employmentType() && x.LanguageCode == "en-us";
        })

        if (en != undefined && zh != undefined) {

            return zh.Value + " " + en.Value;
        }
        //var emp = _.find(tmp.data_employment(), function (x) {
        //    return x.LookupCode == panel4.employmentType();
        //});

        //if (emp != undefined) {
        //    if (model.urlLang() != 'en-us') {
        //        return emp.Value + " " + emp.LookupCode;
        //    } else {
        //        return emp.Value
        //    }

        //}
    },
    empl_ind: function () {
        var zh = _.find(temp.dataLookupConf(), function (x) {
            return x.LookupCode == panel4.industry() && x.LanguageCode == "zh-hk";
        });
        var en = _.find(temp.dataLookupConf(), function (x) {
            return x.LookupCode == panel4.industry() && x.LanguageCode == "en-us";
        })

        if (en != undefined && zh != undefined) {

            return zh.Value + " " + en.Value;
        }
        //var emp_ind = _.find(tmp.data_industry(), function (x) {
        //    return x.LookupCode == panel4.industry();
        //})

        //if (emp_ind != undefined) {
        //    if (model.urlLang() != 'en-us') {
        //        return emp_ind.Value + " " + emp_ind.LookupCode;
        //    } else {
        //        return emp_ind.Value
        //    }
        //    //return emp_ind.Value + " " + emp_ind.LookupCode;
        //}
    },
    empl_occ: function () {
        var zh = _.find(temp.dataLookupConf(), function (x) {
            return x.LookupCode == panel4.occupation() && x.LanguageCode == "zh-hk";
        });
        var en = _.find(temp.dataLookupConf(), function (x) {
            return x.LookupCode == panel4.occupation() && x.LanguageCode == "en-us";
        })

        if (en != undefined && zh != undefined) {

            return zh.Value + " " + en.Value;
        }
        //var empl_oc = _.find(tmp.data_occupation(), function (x) {
        //    return x.LookupCode == panel4.occupation();
        //})

        //if (empl_oc != undefined) {
        //    if (model.urlLang() != 'en-us') {
        //        return empl_oc.Value + " " + empl_oc.LookupCode;
        //    } else {
        //        return empl_oc.Value
        //    }
        //    //return empl_oc.Value + " " + empl_oc.LookupCode;
        //}
    },
    inv_type: function () {
        var zh = _.find(temp.dataLookupConf(), function (x) {
            return x.LookupCode == panel5.investment_earning_type() && x.LanguageCode == "zh-hk";
        });
        var en = _.find(temp.dataLookupConf(), function (x) {
            return x.LookupCode == panel5.investment_earning_type() && x.LanguageCode == "en-us";
        })

        if (en != undefined && zh != undefined) {

            return zh.Value + " " + en.Value;
        }
        //var inv_type = _.find(tmp.data_investment_type(), function (x) {
        //    return x.LookupCode == panel5.investment_earning_type();
        //})

        //if (inv_type != undefined) {
        //    if (model.urlLang() != 'en-us') {
        //        return inv_type.Value + " " + inv_type.LookupCode;
        //    } else {
        //        return inv_type.Value
        //    }
        //    //return inv_type.Value + " " + inv_type.LookupCode;
        //}
    },
    inve_fundS: function () {

        var inv_fundS = _.find(tmp.data_investment_fund_source(), function (x) {
            return x.value == panel5.investment_earning_fund_source();
        })

        if (inv_fundS != undefined) {
            return inv_fundS.zh_en;
        }
    },
    ownership_res: function () {
        var zh = _.find(temp.dataLookupConf(), function (x) {
            return x.LookupCode == panel4.ownershipResidence() && x.LanguageCode == "zh-hk";
        });
        var en = _.find(temp.dataLookupConf(), function (x) {
            return x.LookupCode == panel4.ownershipResidence() && x.LanguageCode == "en-us";
        })

        if (en != undefined && zh != undefined) {

            return zh.Value + " " + en.Value;
        }
        //var own = _.find(tmp.data_ownership(), function (x) {
        //    return x.LookupCode == panel4.ownershipResidence();
        //})

        //if (own != undefined) {
        //    if (model.urlLang() != 'en-us') {
        //        return own.Value + " " + own.LookupCode;
        //    } else {
        //        return own.Value
        //    }
        //    //return own.Value + " " + own.LookupCode;
        //}
    },
    derivative_kno: function () {
        var acc1 = "";
        var acc2 = "";

        switch (panel10.knowledge()) {
            case "Attending Course":
                //</p > <p>By undergoing training or attending courses that provide general knowledge of the nature and risks of derivatives.</p>
                acc1 = "<p>已接受有關衍生產品之性質及風險的培訓或課程 -";
                break;
            case "Work Experience":
                //</p > <p>By gaining prior relevant work experience in financial institutions such as a brokerage firm or bank, fund house or asset management firm, regulatory authority or exchange.</p>
                acc1 = "<p>於經紀公司或銀行，基金或資產管理公司，監管機構或交易所等金融機構擁有有關的工作經驗。- ";
                break;
            case "Trading Experience":
                //</p > <p>From my relevant trading experience i.e. I have executed five or more transactions in derivative products (whether traded on an exchange or not) within the past three years and understand the risk in relating to derivative products.</p>
                acc1 = "<p>本人相關之交易經驗，即本人於過去三年內已進行了五次或以上有關衍生產品之交易 (不論是否於交易所進行交易)，並清楚明白其風險。</p><p>From my relevant trading experience i.e. I have executed five or more transactions in derivative products (whether traded on an exchange or not) within the past three years and understand the risk in relating to derivative products.</p>";
                break;
        }
        switch (panel10.AcquireFrom2()) {
            case "Regulatory Authority":
                acc2 = acc1 + '監管機構</p><p>By undergoing training or attending courses that provide general knowledge of the nature and risks of derivatives. - Regulatory Authority</p>';
                break;
            case "Exchange":
                acc2 = acc1 + '交易所</p>' + '<p>By undergoing training or attending courses that provide general knowledge of the nature and risks of derivatives. - Exchange</p>';
                break;
            case "Financial Institution":
                acc2 = acc1 + '金融機構</p>' + '<p>By undergoing training or attending courses that provide general knowledge of the nature and risks of derivatives. - Financial Institution</p>';
                break;
            case "Education Institution":
                acc2 = acc1 + '進修學院</p>' + '<p>By undergoing training or attending courses that provide general knowledge of the nature and risks of derivatives. - Education Institution</p>';
                break;
            case "Tertiary Institution":
                acc2 = acc1 + '大專院校</p>' + '<p>By undergoing training or attending courses that provide general knowledge of the nature and risks of derivatives. - Tertiary Institution</p>';
                break;
            case "Regulated Licensed Person":
                acc2 = acc1 + '受監管持牌人士</p>' + '<p>By gaining prior relevant work experience in financial institutions such as a brokerage firm or bank, fund house or asset management firm, regulatory authority or exchange. - Regulated Licensed Person</p>';
                break;
            case "Derivatives Related Back Office":
                acc2 = acc1 + '與衍生工具相關後勤</p>' + '<p>By gaining prior relevant work experience in financial institutions such as a brokerage firm or bank, fund house or asset management firm, regulatory authority or exchange. - Derivatives Related Back Office</p>';
                break;
            case "Management":
                acc2 = acc1 + '管理層</p>' + '<p>By gaining prior relevant work experience in financial institutions such as a brokerage firm or bank, fund house or asset management firm, regulatory authority or exchange. - Management</p>';
                break;
        }
        if (panel10.AcquireFrom2() != null) {
            return acc2;
        } else {
            return acc1
        }

    },
    rental_fundS: function () {
        var zh = _.find(tmp.data_investment_fund_source(), function (x) {
            return x.value == panel5.rental_income_fund_source();
        });


        if (zh != undefined) {

            return zh.zh_en;
        }
        //var inv_fundS = _.find(tmp.data_investment_fund_source(), function (x) {
        //    return x.value == panel5.investment_earning_fund_source();
        //})

        //if (inv_fundS != undefined) {
        //    if (model.urlLang() != 'en-us') {
        //        return inv_fundS.Value + " " + inv_fundS.LookupCode;
        //    } else {
        //        return inv_fundS.Value
        //    }
        //    //return inv_fundS.text + " " + inv_fundS.value;
        //}
    },

    NRICPassportType: function () {
        var type_value = model.data().data_clientInfo.NRICPassportType;
        if (type_value == "NRIC") {
            return "身份證 Identity Card";
        }

        return "護照 Passport";
    }

}

getBack = function (GetAttacment) {
    model.loader(true);
    param1 = {
        language: model.urlLang(),
        ID: panel1.ID_Form(),
        GetAttacment: GetAttacment,
    }
    $.ajax({
        url: urlGetBack,
        data: JSON.stringify(param1),
        type: "POST",
        contentType: ' application/json',
        success: function (res) {
            //check_DK_RPQ();
            model.loader(false);
            model.data(res);
            temp.isBack(true);
            panel18.isConfirmation(false);

            //setTimeout(function () {
            //    if (model.data().data_form != 'null') {
            //        $("#mytabs").kendoTabStrip();


            //        var tab = $("#tab" + model.data().data_form.Step);
            //        $("#mytabs").kendoTabStrip().data("kendoTabStrip").activateTab(tab);
            //    } else {
            //        $("#tab-cont").hide();
            //    }

            //}, 500)

            $(".confname").text(((model != undefined) ? model.data().data_clientInfo.Surname + " " + model.data().data_clientInfo.ClientName : ''));
            dt_form = model.data().data_form;
            //////////////////////alert("masuk 5734")
            //if (model.data().data_form.ApplicationMode == 1 && panel18.status() == true) {
            //    panel18.isConfirmation(true);
            //} else {
            //    panel18.isConfirmation(false);
            //}
            dataform = model.data().data_clientInfo;
            ndform = model.data().data_NDForm
            if (dt_form != "null") {
                panel1.ID_Form(dt_form.ID);
                panel1.isMaindLandClient(dt_form.IsInChina === true ? "1" : "0");
                panel1.email(dt_form.EmailAddress)
                panel1.phoneCode(dt_form.CountryCodeMobile != null ? dt_form.CountryCodeMobile : "")
                panel1.phoneNumber(dt_form.MobileNo)
            }

            if (dataform != "null") {


                panel2.CashAccount(dataform.AcknowledgementCashAcct != null ? dataform.AcknowledgementCashAcct : "");
                panel2.MarginAccount(dataform.AcknowledgementMarginAcct != null ? dataform.AcknowledgementMarginAcct : "");
                //panel2.OnlineTrading(dataform.AcknowledgementOnlinePoemsTradingService != null ? dataform.AcknowledgementOnlinePoemsTradingService : "");
                panel2.StockOptionAccount(dataform.AcknowledgementStockOptAcct != null ? dataform.AcknowledgementStockOptAcct : "");
                panel2.Chinaconnect(dataform.AcknowledgementChinaConnectTradingService != null ? dataform.AcknowledgementChinaConnectTradingService : "");
                panel2.HKIDR(dataform.AcknowledgementHKIDR != null ? dataform.AcknowledgementHKIDR : true);

                //panel3.promotion_code(dt_form.PromoCode);
                panel3.title(dataform.Salutation);
                panel3.surename(dataform.Surname);
                //panel3.eng_surename(dataform.Surname)
                panel3.firstName(dataform.ClientName);
                //panel3.eng_name(dataform.ClientName)
                panel3.fullName(dataform.HKIDROtherName);
                panel3.nationality(dataform.Nationality);
                panel3.idCardType(dataform.NRICPassportType);
                panel3.idCard(dataform.NRICPassportNo);
                panel3.placeIssue(dataform.PlaceOfIssue);
                panel3.countryBirth(dataform.CountryOfBirth);
                //panel3.age(dataform.Age);
                if (dataform.DateOfBirth != null) {
                    var dateb = kendo.toString(new Date(model.data().ClientDateBirth), "dd MMM yyyy");
                    if (dateb == "01 Jan 0001") {
                        $('#dateofbirth').data("DateTimePicker").date(new Date());
                    } else {
                        panel3.dateOfBirth(dataform.DateOfBirth != null ? kendo.toString(new Date(model.data().ClientDateBirth), "dd MMM yyyy") : "");
                        $('#dateofbirth').data("DateTimePicker").date(new Date(model.data().ClientDateBirth));
                    }
                } else {
                    $('#dateofbirth').data("DateTimePicker").date(new Date());
                }
                nyear = new Date().getFullYear();
                date = new Date(panel3.dateOfBirth());
                byear = date.getFullYear()
                age = nyear - byear;
                panel3.age(isNaN(age) == false ? age : 0);
                panel3.homeNumber(dataform.HomeTelNo);
                panel3.officeNumber(dataform.OfficeNoMain);
                panel3.wechat(dataform.WeChatID);
                panel3.homeAreaCode(dataform.CountryCodeHome != null ? dataform.CountryCodeHome : "");
                panel3.officeAreaCode(dataform.CountryCodeOfficeMain != null ? dataform.CountryCodeOfficeMain : "");
                if (dataform.AeCd !== "" && dataform.AeCd !== null) {
                    panel3.is_aecode(true);
                    panel3.is_preferred_trading(true)
                }

                if (model.PromotionCode() == "") {
                    panel3.promotion_code(dt_form.PromoCode);
                    $("#promoCode").prop("disabled", false);
                } else {

                    $("#promoCode").prop("disabled", true);
                }

                if (model.AeCode() == "") {
                    panel3.aecode(dataform.AeCd);
                    panel3.is_aecode(dataform.AeCode !== "" && dataform.AeCode !== null ? true : false);
                    //panel3.is_preferred_trading(dataform.AeCd !== "" && dataform.AeName !== "" && dataform.AeName !== null && dataform.AeCd !== null ? true : false);
                    $("#AeCode").prop("disabled", false);
                    $("#is_aecode").prop("disabled", false);
                    $("#trad").prop("disabled", false);

                } else {
                    $("#AeCode").prop("disabled", true);
                    $("#is_aecode").prop("disabled", true);

                }

                if (model.AeName() == "") {
                    panel3.aename(dataform.AeName);
                    panel3.is_aename(dataform.AeName !== "" && dataform.AeName !== null ? true : false);

                    $("#AeName").prop("disabled", false);
                    $("#is_aename").prop("disabled", false);
                    $("#trad").prop("disabled", false);
                } else {
                    $("#AeName").prop("disabled", true);
                    $("#is_aename").prop("disabled", true);
                    $("#trad").prop("disabled", true);
                }

                if (model.AeCode() != "") {
                    $("#trad").prop("disabled", true);
                    panel3.is_preferred_trading(true)
                } else if (model.AeName() != "") {
                    $("#trad").prop("disabled", true);
                    panel3.is_preferred_trading(true)
                } else if (model.AeCode() != "" && model.AeName() != "") {
                    $("#trad").prop("disabled", true);
                    panel3.is_preferred_trading(true)
                } //else {
                //    //panel3.is_preferred_trading(dataform.AeCd !== "" && dataform.AeName !== "" && dataform.AeName !== null && dataform.AeCd !== null ? true : false);
                //    panel3.is_preferred_trading(false);
                //}

                panel4.country(dataform.ResidentialCountry);
                panel4.residentialAddress(dataform.ResidentialAddress1);
                panel4.residentialAddress2(dataform.ResidentialAddress2);
                panel4.residentialAddress3(dataform.ResidentialAddress3);
                panel4.ownershipResidence(dataform.StatusOfResidence);
                panel4.employmentType(dataform.EmploymentType);
                panel4.industry(dataform.EmploymentIndustry);
                panel4.other_industries(dataform.EmploymentIndustryOthers)
                panel4.occupation(dataform.Occupation);
                panel4.other_occupation(dataform.OccupationOthers)
                panel4.company_name(dataform.EmployerName);
                panel4.office_address1(dataform.EmployerAddress1);
                panel4.office_address2(dataform.EmployerAddress2);
                panel4.office_address3(dataform.EmployerAddress3);
                panel4.office_region(dataform.EmployerAddressCountry);
                panel4.years_of_service(dataform.YearsOfService);

                var data_soft = model.data().data_soft;
                panel5.annual_income(dataform.AnnualIncomeLevel);
                panel5.liquid_assets(dataform.LiquidNetWorth);
                panel5.net_worth(dataform.EstimatedNetWorth);
                panel5.other_net_worth(dataform.EstimatedNetWorthOthers);
                panel5.previouse_job(dataform.Is_Previouse_Job === 1 ? true : false);

                panel16.BankName(dataform.DesignatedBankName);
                var Bank = $("#BankName").data("kendoDropDownList");
                Bank.value(panel16.BankName());
                panel16.OtherBankName(dataform.DesignatedBankNameOthers);
                if (dataform.DesignatedBankAccountName == null) {
                    panel16.HolderName(panel3.eng_surename() + " " + panel3.eng_name())
                } else {
                    panel16.HolderName(dataform.DesignatedBankAccountName);
                }
                //panel16.HolderName(dataform.DesignatedBankAccountName);
                panel16.HolderAcct(dataform.DesignatedBankAccountNo);
                panel16.oaofao_checked((dt_form.ApplicationMode).toString())

                var bankName = _.find(tmp.data_BankName(), function (x) { return x.LookupCode == panel16.BankName() });
                if (bankName != undefined) {
                    panel18.bankName(bankName.Value);
                }

                var data = res.data;
                if (model.data().data_taxres != undefined) {
                    var data_tax = [];
                    $.each(model.data().data_taxres, function (i, dt) {
                        jurisd = "";
                        data = _.find(model.data().data_country, function (o) {
                            return o.en_short_name == dt.ForeignTaxResidentCountry;
                        })
                        switch (model.urlLang()) {
                            case "en-us":
                                jurisd = data.en_short_name;
                                break;
                            case "zh-hk":
                                jurisd = data.zh_hk_short_name;
                                break;
                            case "zh-cn":
                                jurisd = data.zh_cn_short_name;
                                break;
                        }
                        data_tax.push({
                            jurisdiction: jurisd,
                            tin: dt.ForeignTaxResidentTaxIdentificationNo,
                            tin_reason: dt.ForeignTaxResidentNoTINReason,
                            taxResidentID: dt.TaxResidentID
                        });
                    });
                    panel11.tax_detail(data_tax);
                }
                data_tax = panel11.tax_detail();
                tax.tax_arr(data_tax);
                tabel = $("#input_grid_new").DataTable();
                tabel.clear().draw();
                tabel.rows.add(tax.tax_arr());
                tabel.columns.adjust().draw();

                var dt_w8 = model.data().data_w8;
                if (dt_w8 != null) {
                    setTimeout(function () {
                        panel13.name(model.data().data_clientInfo.Surname + " " + model.data().data_clientInfo.ClientName);
                        panel13.country_citizen(dt_w8.CountryOfCitizenship);
                        $.each(dt_w8.W8BEN_Address, function (i, dt) {
                            if (dt.AddressType == "R") {
                                ////////////////////////alert("masuk sini")
                                panel13.residence_street(dt.Address1);
                                panel13.residence_number(dt.Address2);
                                panel13.residence_building(dt.Address3);
                                panel13.residence_city(dt.City);
                                panel13.residence_state(dt.StateAddress);
                                panel13.residence_postal_code(dt.PostalCode);
                                panel13.residence_country(dt.Country);

                            } else {
                                panel13.isSameAbove(model.data().data_clientInfo.SameMailingAddress);
                                $("[name=contry1]").data("kendoDropDownList").enable(model.data().data_clientInfo.SameMailingAddress == true ? false : true);
                                panel13.mailing_street(dt.Address1)
                                panel13.mailing_number(dt.Address2);
                                panel13.mailing_building(dt.Address3);
                                panel13.mailing_city(dt.City);
                                panel13.mailing_state(dt.StateAddress);
                                panel13.mailing_postal_code(dt.PostalCode);
                                panel13.mailing_country(dt.Country);
                            }
                        })

                        panel11.hk_tax(dataform.HongKongTaxResident);
                        panel11.other_tax(dataform.ForeignTaxResident);

                        //                                        isSameAbove: ko.observable(true),
                        //                                           
                        panel13.taxpayer(dt_w8.ITIN);
                        panel13.foreign_tax_ID(dt_w8.ForeignTaxID);
                        panel13.birth(kendo.toString(new Date(model.data().ClientDateBirth), "dd MMM yyyy"));
                        panel13.reffrence_number(dt_w8.RefNumber);

                        panel13.part2_nationality(dt_w8.W8BEN_TaxTreaty[0].Country);
                        panel13.part2_specialrate(dt_w8.W8BEN_TaxTreaty[0].ParagraphArticle);
                        panel13.part2_treatyrates(dt_w8.W8BEN_TaxTreaty[0].WithholdingTaxPercentRate);
                        panel13.part2_income(dt_w8.W8BEN_TaxTreaty[0].IncomeType);
                        panel13.part2_additional(dt_w8.W8BEN_TaxTreaty[0].ParagraphArticleAddOnConditions);
                        var all_contr = (model.data().AllowedCheckFTIN).split(",")
                        var allowed_FtIN = _.find(all_contr, function (x) {
                            return x == (model.data().data_clientInfo.Nationality).toLowerCase();
                        })
                        panel13.checkFTIN(allowed_FtIN != undefined ? true : false);
                        panel13.ChecknotLegallyFTIN(dt_w8.CheckIfFTIN);
                    }, 100)

                } else {
                    panel13.name(model.data().data_clientInfo.Surname + " " + model.data().data_clientInfo.ClientName);
                    panel13.country_citizen(dataform.Nationality);
                    panel13.residence_street(dataform.ResidentialAddress1);
                    panel13.residence_number(dataform.ResidentialAddress2);
                    panel13.residence_building(dataform.ResidentialAddress3);
                    //residence_city();
                    //                            residence_state: ko.observable(""),
                    //                                residence_postal_code: ko.observable(""),
                    panel13.residence_country(dataform.ResidentialCountry);
                    if (dataform.DateOfBirth != null) {
                        panel13.birth(kendo.toString(new Date(model.data().ClientDateBirth), "dd MMM yyyy"));
                    }
                    if (model.data().data_clientInfo.Nationality != null) {
                        var all_contr = (model.data().AllowedCheckFTIN).split(",")
                        var allowed_FtIN = _.find(all_contr, function (x) {
                            return x == (model.data().data_clientInfo.Nationality).toLowerCase();
                        })
                        panel13.checkFTIN(allowed_FtIN != undefined ? true : false);
                        //panel13.ChecknotLegallyFTIN(dt_w8.CheckIfFTIN);
                    }

                }

                switch (model.urlLang()) {
                    case "en-us":

                        $("#pnl11vid").append('<source src="./Content/video/EN-no face.mp4" type="video/mp4" muted="muted">')
                        break;
                    case "zh-cn":
                        $("#pnl11vid").append('<source src="./Content/video/SIM-no face.mp4" muted="muted">')
                        //$("#pnl11vid > source").prop("src", "./Content/video/SIM-no face.mp4");
                        break;
                    case "zh-hk":
                        $("#pnl11vid").append('<source src="./Content/video/ZH-no face.mp4" type="video/mp4" muted="muted">')
                        //$("#pnl11vid > source").prop("src", "./Content/video/ZH-no face.mp4");
                        break;
                }
            }



            if (ndform != null) {
                panel2.isAustralia(ndform.IsNotAustralian);
                panel2.isCanada(ndform.IsNotCanadian);
                panel2.isFinland(ndform.IsNotFinnish);
                panel2.isJapan(ndform.IsNotJPXOfficer);
                panel2.isTaiwan(ndform.IsNotChinese);
                panel2.isKorea(ndform.IsNotKorea);
            }


            var dk_quest = model.data().data_dkQuestionaire;
            if (dk_quest != null) {
                if (dk_quest.AcquireFrom2 != null || dk_quest.AcquireFrom1 != null) {
                    panel10.AcquireFrom2(dk_quest.AcquireFrom2);
                    panel10.knowledge(dk_quest.AcquireFrom1);
                    panel10.acquired_knowledge("1");
                } else {
                    panel10.acquired_knowledge("0");
                }

            }




            setTimeout(function () {
                var soft = model.data().data_soft;
                if (soft != undefined) {
                    panel5.saving_from_salary(soft.SavingFromSalary)
                    panel5.previouse_job(soft.PreviousJobs)
                    panel5.previouse_job_industry(soft.PreviousJobsIndustry);
                    panel5.previouse_job_other_industry(soft.PreviousJobsIndustryOthers)
                    panel5.previouse_job_occupation(soft.PreviousJobsOccupation != null ? soft.PreviousJobsOccupation : '');
                    panel5.previouse_job_other_occupation(soft.PreviousJobsOccupationOthers)
                    panel5.previouse_job_annual_income(soft.PreviousJobAnnualIncome);
                    panel5.previouse_job_company_name(soft.PreviousJobsEmployerCompanyName);
                    panel5.years_of_service(soft.PreviousJobsYearsOfService);

                    panel5.provided_family(soft.ProvidedByFamilyMember);
                    panel5.provided_family_industry(soft.FamilyMembersIndustry != null ? soft.FamilyMembersIndustry : '');
                    panel5.provided_family_Other_industry(soft.FamilyMembersIndustryOthers);
                    panel5.provided_family_occupation(soft.FamilyMembersOccupation != null ? soft.FamilyMembersOccupation : '');
                    panel5.provided_family_Other_occupation(soft.FamilyMembersOccupationOthers);
                    panel5.provided_family_relation(soft.RelationshipWithTheFamilyMember);

                    panel5.investments_earning(soft.InvestmentEarning);

                    panel5.investment_earning_type(soft.InvestmentType);
                    panel5.investment_earning_other_type(soft.InvestmentTypeOthers);
                    panel5.investment_earning_capital(soft.InvestmentAmount);
                    panel5.investment_earning_profit(soft.InvestmentEarningAmount);
                    panel5.investment_earning_fund_source(soft.InvestmentFundSource);

                    panel5.rental_income(soft.RentalIncome);
                    panel5.rental_income_holding_period(soft.RentalHoldingPeriod);
                    panel5.rental_income_fund_source(soft.RentalFundSource);
                    panel5.rental_income_annual(soft.RentalAnnualIncome);

                    panel5.other(soft.OtherIncome);
                    panel5.other_value(soft.OtherIncomeTextBox);
                    if (soft.SavingFromSalary == true) {
                        panel5.saving_from_salary(true);
                    } else if (panel5.investment_earning_fund_source() == "Previous Job" || panel5.rental_income_fund_source() == "Provided By Family Member") {
                        panel5.saving_from_salary(true);
                    } else {
                        panel5.saving_from_salary(false);
                    }


                }
            }, 200);
            switch (dt_form.ApplicationMode) {
                case 0:
                    panel18.applicationMode("網上開戶 OAO");
                    break;
                case 1:
                    panel18.applicationMode("網上填寫表格並親臨分行驗證文件 FAO");
                    break;
                case 2:
                    panel18.applicationMode("透過驗證服務 CA - TSCI")
                    break;
            }

            var data_invest_obj = model.data().data_invest_obj;
            if (data_invest_obj != undefined) {
                panel6.Investment_Objective_temp((data_invest_obj.InvestmentObj).split(";"));
                panel6.Investment_Objective((data_invest_obj.InvestmentObj).split(";"));
                panel6.listed_securities(data_invest_obj.ListSecuritiesExp);
                panel6.ccbc_warant(data_invest_obj.CBBCWarrantExp);
                panel6.futures_option(data_invest_obj.FutureOrOptionExp);
                panel6.leverage_foreign_exchange(data_invest_obj.LevForeignExExp);
                panel6.unit_trust_bonds(data_invest_obj.UTorBondExp);
                panel6.structure_products(data_invest_obj.StructuredProductExp);
                panel6.leverage_inverse_product(data_invest_obj.LevAndInvProductExp);
            }

            panel15.client_name(dataform.Surname + " " + dataform.ClientName);
            var data_MQ = model.data().data_mr;
            if (data_MQ != undefined) {
                panel15.client_name(dataform.Surname + " " + dataform.ClientName);
                panel15.acc1(data_MQ.Q1);
                panel15.q1(data_MQ.Q1 != null ? "1" : "0");
                panel15.acc2(data_MQ.Q2);
                panel15.q2(data_MQ.Q2 != null ? "1" : "0");
                panel15.acc3(data_MQ.Q3);
                panel15.q3(data_MQ.Q3 != null ? "1" : "0");
                panel15.acc4(data_MQ.Q4);
                panel15.q4(data_MQ.Q4 != null ? "1" : "0");
            }

            //panel16.HolderName(panel3.eng_surename() + " " + panel3.eng_name())

            var data_attc = res.data_attach;
            //console.log("-------------- data_attc", data_attc);
            //if (data_attc.length > 0) {
            //    $.each(data_attc, function (i, dt) {
            //        switch (dt.AttachmentType) {
            //            case "HKID Card":
            //                panel17.uploadIdentity(true);
            //                panel17.uploadIdentityGuid(dt.AttachmentID);
            //                panel17.uploadFileIdentity([{ name: dt.Attachment, size: 600, extension: dt.AttachmentExt }])
            //                break;
            //            case "Address Proof":
            //                panel17.uploadAddress(true);
            //                panel17.uploadAddressGuid(dt.AttachmentID);
            //                panel17.uploadFileAddress([{ name: dt.Attachment, size: 600, extension: dt.AttachmentExt }])
            //                break;
            //            case "Bank Account Proof":
            //                panel17.uploadBankAcc(true);
            //                panel17.uploadBankAccGuid(dt.AttachmentID);
            //                panel17.uploadFileBankAcc([{ name: dt.Attachment, size: 600, extension: dt.AttachmentExt }])
            //                break;
            //            case "Back of ID":
            //                panel17.uploadID(true);
            //                panel17.uploadIDGuid(dt.AttachmentID);
            //                panel17.uploadFileID([{ name: dt.Attachment, size: 600, extension: dt.AttachmentExt }])
            //                break;
            //            case "Bank Deposit Slip":
            //                panel18.uploadDepositGuid(dt.AttachmentID);
            //                panel18.uploadDeposit([{ name: dt.Attachment, size: 600, extension: dt.AttachmentExt }]);
            //                //panel18.status(true);
            //                //panel18.isConfirmation(false);
            //                //data_confirm();
            //                break;
            //        }
            //    });
            //} else {
            //    panel17.edited(true);
            //    if (model.data().data_form.AttFormID != null) {
            //        getAttch(model.data().data_form.AttFormID);
            //    }
            //}

            //console.log("-------------- data_attc", data_attc);
            if (data_attc.length > 0) {
                $.each(data_attc, function (i, dt) {
                    switch (dt.AttachmentType) {
                        case "HKID Card":
                            panel17.uploadIdentity(true);
                            panel17.uploadIdentityGuid(dt.AttachmentID);
                            panel17.uploadFileIdentity([{ name: dt.Attachment, size: 600, extension: dt.AttachmentExt }]);
                            _IDCard = _.find(model.data().data_File, function (x) {
                                return x.FileType == "HKID Card"
                            })
                            if (_IDCard != undefined) {
                                IdCard = dt.AttachmentID;
                                //if (_IDCard.Extension == ".pdf" || _IDCard.Extension == ".PDF") {
                                //    IdCard = dt.AttachmentID;
                                //} else {
                                //    file.IdCard(_IDCard.Source);
                                //}
                                //file.IdCard(_IDCard.Source);

                            }
                            break;
                        case "Address Proof":
                            panel17.uploadAddress(true);
                            panel17.uploadAddressGuid(dt.AttachmentID);
                            panel17.uploadFileAddress([{ name: dt.Attachment, size: 600, extension: dt.AttachmentExt }]);
                            _addrproof = _.find(model.data().data_File, function (x) {
                                return x.FileType == "Address Proof"
                            })
                            if (_addrproof != undefined) {
                                AddressProof = dt.AttachmentID;
                                //if (_addrproof.Extension == ".pdf" || _addrproof.Extension == ".PDF") {
                                //    AddressProof = dt.AttachmentID;
                                //} else {
                                //    file.AddressProof(_addrproof.Source);
                                //}
                                //file.AddressProof(_addrproof.Source);

                            }
                            break;
                        case "Bank Account Proof":
                            panel17.uploadBankAcc(true);
                            panel17.uploadBankAccGuid(dt.AttachmentID);
                            panel17.uploadFileBankAcc([{ name: dt.Attachment, size: 600, extension: dt.AttachmentExt }]);
                            _accproof = _.find(model.data().data_File, function (x) {
                                return x.FileType == "Bank Account Proof"
                            })
                            if (_accproof != undefined) {
                                BankAccountProof = dt.AttachmentID;
                                //if (_accproof.Extension == ".pdf" || _accproof.Extension == ".PDF") {
                                //    BankAccountProof = dt.AttachmentID;
                                //} else {
                                //    file.BankAccountProof(_accproof.Source);
                                //}

                                //file.BankAccountProof(_accproof.Source);

                            }
                            break;
                        case "Back of ID":
                            panel17.uploadID(true);
                            panel17.uploadIDGuid(dt.AttachmentID);
                            panel17.uploadFileID([{ name: dt.Attachment, size: 600, extension: dt.AttachmentExt }]);
                            _backid = _.find(model.data().data_File, function (x) {
                                return x.FileType == "Back of ID"
                            })
                            if (_backid != undefined) {
                                BackID = dt.AttachmentID;
                                //if (_backid.Extension == ".pdf" || _backid.Extension == ".PDF") {
                                //    BackID = dt.AttachmentID;
                                //} else {
                                //    file.BackID(_backid.Source);
                                //}

                                //file.BackID(_backid.Source);

                            }
                            break;
                        case "Bank Deposit Slip":
                            panel18.uploadDepositGuid(dt.AttachmentID);
                            panel18.uploadDeposit([{ name: dt.Attachment, size: 600, extension: dt.AttachmentExt }]);
                            //panel18.status(true);
                            _deposit = _.find(model.data().data_File, function (x) {
                                return x.FileType == "Bank Deposit Slip"
                            })
                            if (_deposit != undefined) {
                                DepositSlip = dt.AttachmentID;
                                //if (_deposit.Extension == ".pdf" || _deposit.Extension == ".PDF") {
                                //    DepositSlip = dt.AttachmentID;
                                //} else {
                                //    file.DepositSlip(_deposit.Source);
                                //}

                                //file.DepositSlip(_deposit.Source);

                            }
                            //////////////////////alert("masuk 6255")
                            //if (temp.isBack() == false && panel18.status() == true) {
                            //    panel18.isConfirmation(true);
                            //}
                            getlookupConf();
                            ////alert("masuk 7035")
                            data_confirm();
                            break;
                    }
                });
            } else {
                //panel17.edited(true)
                if (model.data().data_form.AttFormID != null) {
                    /*getAttch(model.data().data_form.AttFormID);*/
                }


            }

            if (dt_form.ApplicationMode == 1 && panel18.status() == true && panel18.isConfirmation() == true) {
                ////////////////////////alert("masuk")
                getlookupConf();
                ////alert("masuk 7052")
                data_confirm();
            }

            if (model.data().data_form.RPQID != undefined) {
                var data_rpq = model.data().data_rpq;
                panel8.question1(data_rpq.Q1);
                panel8.question2(data_rpq.Q2);
                panel8.question3(data_rpq.Q3);
                panel8.question4(data_rpq.Q4.split(''));
                panel8.question5(data_rpq.Q5);
                panel8.question6(data_rpq.Q6);
                panel8.question7(data_rpq.Q7);
                panel8.question8(data_rpq.Q8);
                switch (data_rpq.RPQLevel) {
                    case 1:
                        panel8.RpqLevel("Low Risk");
                        panel8.RpqLvl((model.lang() != undefined) ? model.lang().low_risk() : '')
                        break;
                    case 2:
                        panel8.RpqLevel("Medium Risk");
                        panel8.RpqLvl((model.lang() != undefined) ? model.lang().medium_risk() : '')
                        break;
                    case 3:
                        panel8.RpqLevel("High Risk");
                        panel8.RpqLvl((model.lang() != undefined) ? model.lang().high_risk() : '')
                        break;
                }

                panel8.score(data_rpq.RPQScore)
            }

            var ListedSecurities = _.find(tmp.data_experience(), function (x) { return x.value == panel6.listed_securities() })
            if (ListedSecurities != undefined) {
                panel18.ListedSecurities(ListedSecurities.val_txt);
            }
            var CCBC = _.find(tmp.data_experience(), function (x) { return x.value == panel6.ccbc_warant() })
            if (CCBC != undefined) {
                panel18.CCBC(CCBC.val_txt);
            }

            var futureOption = _.find(tmp.data_experience(), function (x) { return x.value == panel6.futures_option() })
            if (futureOption != undefined) {
                panel18.future_option(futureOption.val_txt);
            }

            var leveraged_foreign = _.find(tmp.data_experience(), function (x) { return x.value == panel6.leverage_foreign_exchange() })
            if (leveraged_foreign != undefined) {
                panel18.leveraged_foreign(futureOption.val_txt);
            }

            var unit_trust_bonds = _.find(tmp.data_experience(), function (x) { return x.value == panel6.unit_trust_bonds() })
            if (unit_trust_bonds != undefined) {
                panel18.unit_trust(unit_trust_bonds.val_txt);
            }

            var structure_products = _.find(tmp.data_experience(), function (x) { return x.value == panel6.structure_products() })
            if (structure_products != undefined) {
                panel18.structured_product(structure_products.val_txt);
            }

            var leverage_inverse_product = _.find(tmp.data_experience(), function (x) { return x.value == panel6.leverage_inverse_product() })
            if (leverage_inverse_product != undefined) {
                panel18.leveraged_inverse(leverage_inverse_product.val_txt);
            }



            //setTimeout(function () {
            //    if (model.data().data_form != 'null') {
            //        $("#mytabs").kendoTabStrip();
            //        $("#tab-cont").show();

            //        var tab = $("#tab" + model.data().data_form.Step);
            //        $("#mytabs").kendoTabStrip().data("kendoTabStrip").activateTab(tab);
            //    } else {
            //        $("#tab-cont").hide();
            //    }

            //}, 500)

        }
    })
}

getBack_t = function (isattacment) {
    ////////alert("masuk getBack_t")
    model.loader(true);
    param1 = {
        language: model.urlLang(),
        ID: panel1.ID_Form(),
        GetAttacment: isattacment,
    }
    $.ajax({
        url: urlGetBack,
        data: JSON.stringify(param1),
        type: "POST",
        contentType: ' application/json',
        success: function (res) {
            //check_DK_RPQ();
            model.loader(false);
            model.data(res);
            temp.isBack(false);

            //panel18.isConfirmation(false)
            //setTimeout(function () {
            //    if (model.data().data_form != 'null') {
            //        $("#mytabs").kendoTabStrip();


            //        var tab = $("#tab" + model.data().data_form.Step);
            //        $("#mytabs").kendoTabStrip().data("kendoTabStrip").activateTab(tab);
            //    } else {
            //        $("#tab-cont").hide();
            //    }

            //}, 500)

            $(".confname").text(((model != undefined) ? model.data().data_clientInfo.Surname + " " + model.data().data_clientInfo.ClientName : ''));
            dt_form = model.data().data_form;
            dataform = model.data().data_clientInfo;
            ndform = model.data().data_NDForm
            if (dt_form != "null") {
                panel1.ID_Form(dt_form.ID);
                panel1.isMaindLandClient(dt_form.IsInChina === true ? "1" : "0");
                panel1.email(dt_form.EmailAddress)
                panel1.phoneCode(dt_form.CountryCodeMobile != null ? dt_form.CountryCodeMobile : "")
                panel1.phoneNumber(dt_form.MobileNo)
            }

            if (dataform != "null") {


                panel2.CashAccount(dataform.AcknowledgementCashAcct != null ? dataform.AcknowledgementCashAcct : "");
                panel2.MarginAccount(dataform.AcknowledgementMarginAcct != null ? dataform.AcknowledgementMarginAcct : "");
                //panel2.OnlineTrading(dataform.AcknowledgementOnlinePoemsTradingService != null ? dataform.AcknowledgementOnlinePoemsTradingService : "");
                panel2.StockOptionAccount(dataform.AcknowledgementStockOptAcct != null ? dataform.AcknowledgementStockOptAcct : "");
                panel2.Chinaconnect(dataform.AcknowledgementChinaConnectTradingService != null ? dataform.AcknowledgementChinaConnectTradingService : "");
                panel2.HKIDR(dataform.AcknowledgementHKIDR != null ? dataform.AcknowledgementHKIDR : true);

                //panel3.promotion_code(dt_form.PromoCode);
                panel3.title(dataform.Salutation);
                panel3.surename(dataform.Surname);
                //panel3.eng_surename(dataform.Surname)
                panel3.firstName(dataform.ClientName);
                //panel3.eng_name(dataform.ClientName)
                panel3.fullName(dataform.HKIDROtherName);
                panel3.nationality(dataform.Nationality);
                panel3.idCardType(dataform.NRICPassportType);
                panel3.idCard(dataform.NRICPassportNo);
                panel3.placeIssue(dataform.PlaceOfIssue);
                panel3.countryBirth(dataform.CountryOfBirth);
                //panel3.age(dataform.Age);
                if (dataform.DateOfBirth != null) {
                    var dateb = kendo.toString(new Date(model.data().ClientDateBirth), "dd MMM yyyy");
                    if (dateb == "01 Jan 0001") {
                        $('#dateofbirth').data("DateTimePicker").date(new Date());
                    } else {
                        panel3.dateOfBirth(dataform.DateOfBirth != null ? kendo.toString(new Date(model.data().ClientDateBirth), "dd MMM yyyy") : "");
                        $('#dateofbirth').data("DateTimePicker").date(new Date(model.data().ClientDateBirth));
                    }
                } else {
                    $('#dateofbirth').data("DateTimePicker").date(new Date());
                }
                nyear = new Date().getFullYear();
                date = new Date(panel3.dateOfBirth());
                byear = date.getFullYear()
                age = nyear - byear;
                panel3.age(isNaN(age) == false ? age : 0);
                panel3.homeNumber(dataform.HomeTelNo);
                panel3.officeNumber(dataform.OfficeNoMain);
                panel3.wechat(dataform.WeChatID);
                panel3.homeAreaCode(dataform.CountryCodeHome != null ? dataform.CountryCodeHome : "");
                panel3.officeAreaCode(dataform.CountryCodeOfficeMain != null ? dataform.CountryCodeOfficeMain : "");
                if (dataform.AeCd !== "" && dataform.AeCd !== null) {
                    panel3.is_aecode(true);
                }

                if (model.PromotionCode() == "") {
                    panel3.promotion_code(dt_form.PromoCode);
                    $("#promoCode").prop("disabled", false);
                } else {

                    $("#promoCode").prop("disabled", true);
                }

                if (model.AeCode() == "") {
                    panel3.aecode(dataform.AeCd);
                    panel3.is_aecode(dataform.AeCode !== "" && dataform.AeCode !== null ? true : false);
                    //panel3.is_preferred_trading(dataform.AeCd !== "" && dataform.AeName !== "" && dataform.AeName !== null && dataform.AeCd !== null ? true : false);
                    $("#AeCode").prop("disabled", false);
                    $("#is_aecode").prop("disabled", false);
                    $("#trad").prop("disabled", false);

                } else {
                    $("#AeCode").prop("disabled", true);
                    $("#is_aecode").prop("disabled", true);

                }

                if (model.AeName() == "") {
                    panel3.aename(dataform.AeName);
                    panel3.is_aename(dataform.AeName !== "" && dataform.AeName !== null ? true : false);

                    $("#AeName").prop("disabled", false);
                    $("#is_aename").prop("disabled", false);
                    $("#trad").prop("disabled", false);
                } else {
                    $("#AeName").prop("disabled", true);
                    $("#is_aename").prop("disabled", true);
                    $("#trad").prop("disabled", true);
                }

                if (model.AeCode() != "") {
                    $("#trad").prop("disabled", true);
                } else if (model.AeName() != "") {
                    $("#trad").prop("disabled", true);
                } else if (model.AeCode() != "" && model.AeName() != "") {
                    $("#trad").prop("disabled", true);
                } else {
                    panel3.is_preferred_trading(dataform.AeCd !== "" && dataform.AeName !== "" && dataform.AeName !== null && dataform.AeCd !== null ? true : false);
                }

                panel4.country(dataform.ResidentialCountry);
                panel4.residentialAddress(dataform.ResidentialAddress1);
                panel4.residentialAddress2(dataform.ResidentialAddress2);
                panel4.residentialAddress3(dataform.ResidentialAddress3);
                panel4.ownershipResidence(dataform.StatusOfResidence);
                panel4.employmentType(dataform.EmploymentType);
                panel4.industry(dataform.EmploymentIndustry);
                panel4.other_industries(dataform.EmploymentIndustryOthers)
                panel4.occupation(dataform.Occupation);
                panel4.other_occupation(dataform.OccupationOthers)
                panel4.company_name(dataform.EmployerName);
                panel4.office_address1(dataform.EmployerAddress1);
                panel4.office_address2(dataform.EmployerAddress2);
                panel4.office_address3(dataform.EmployerAddress3);
                panel4.office_region(dataform.EmployerAddressCountry);
                panel4.years_of_service(dataform.YearsOfService);

                var data_soft = model.data().data_soft;
                panel5.annual_income(dataform.AnnualIncomeLevel);
                panel5.liquid_assets(dataform.LiquidNetWorth);
                panel5.net_worth(dataform.EstimatedNetWorth);
                panel5.other_net_worth(dataform.EstimatedNetWorthOthers);
                panel5.previouse_job(dataform.Is_Previouse_Job === 1 ? true : false);

                panel16.BankName(dataform.DesignatedBankName);
                var Bank = $("#BankName").data("kendoDropDownList");
                Bank.value(panel16.BankName());
                panel16.OtherBankName(dataform.DesignatedBankNameOthers);
                panel16.OtherBankName(dataform.DesignatedBankNameOthers);
                if (dataform.DesignatedBankAccountName == null) {
                    panel16.HolderName(panel3.eng_surename() + " " + panel3.eng_name())
                } else {
                    panel16.HolderName(dataform.DesignatedBankAccountName);
                }
                panel16.HolderAcct(dataform.DesignatedBankAccountNo);
                panel16.oaofao_checked((dt_form.ApplicationMode).toString())

                var bankName = _.find(tmp.data_BankName(), function (x) { return x.LookupCode == panel16.BankName() });
                if (bankName != undefined) {
                    panel18.bankName(bankName.Value);
                }

                var dt_w8 = model.data().data_w8;
                if (dt_w8 != null) {
                    setTimeout(function () {
                        panel13.name(model.data().data_clientInfo.Surname + " " + model.data().data_clientInfo.ClientName);
                        panel13.country_citizen(dt_w8.CountryOfCitizenship);
                        $.each(dt_w8.W8BEN_Address, function (i, dt) {
                            if (dt.AddressType == "R") {
                                ////////////////////////alert("masuk sini")
                                panel13.residence_street(dt.Address1);
                                panel13.residence_number(dt.Address2);
                                panel13.residence_building(dt.Address3);
                                panel13.residence_city(dt.City);
                                panel13.residence_state(dt.StateAddress);
                                panel13.residence_postal_code(dt.PostalCode);
                                panel13.residence_country(dt.Country);

                            } else {
                                panel13.isSameAbove(model.data().data_clientInfo.SameMailingAddress);
                                $("[name=contry1]").data("kendoDropDownList").enable(model.data().data_clientInfo.SameMailingAddress == true ? false : true);
                                panel13.mailing_street(dt.Address1)
                                panel13.mailing_number(dt.Address2);
                                panel13.mailing_building(dt.Address3);
                                panel13.mailing_city(dt.City);
                                panel13.mailing_state(dt.StateAddress);
                                panel13.mailing_postal_code(dt.PostalCode);
                                panel13.mailing_country(dt.Country);
                            }
                        })

                        panel11.hk_tax(dataform.HongKongTaxResident);
                        panel11.other_tax(dataform.ForeignTaxResident);

                        //                                        isSameAbove: ko.observable(true),
                        //                                           
                        panel13.taxpayer(dt_w8.ITIN);
                        panel13.foreign_tax_ID(dt_w8.ForeignTaxID);
                        panel13.birth(kendo.toString(new Date(model.data().ClientDateBirth), "dd MMM yyyy"));
                        panel13.reffrence_number(dt_w8.RefNumber);

                        panel13.part2_nationality(dt_w8.W8BEN_TaxTreaty[0].Country);
                        panel13.part2_specialrate(dt_w8.W8BEN_TaxTreaty[0].ParagraphArticle);
                        panel13.part2_treatyrates(dt_w8.W8BEN_TaxTreaty[0].WithholdingTaxPercentRate);
                        panel13.part2_income(dt_w8.W8BEN_TaxTreaty[0].IncomeType);
                        panel13.part2_additional(dt_w8.W8BEN_TaxTreaty[0].ParagraphArticleAddOnConditions);
                        var all_contr = (model.data().AllowedCheckFTIN).split(",")
                        var allowed_FtIN = _.find(all_contr, function (x) {
                            return x == (model.data().data_clientInfo.Nationality).toLowerCase();
                        })
                        panel13.checkFTIN(allowed_FtIN != undefined ? true : false);
                        panel13.ChecknotLegallyFTIN(dt_w8.CheckIfFTIN);
                    }, 100)

                } else {
                    panel13.name(model.data().data_clientInfo.Surname + " " + model.data().data_clientInfo.ClientName);
                    panel13.country_citizen(dataform.Nationality);
                    panel13.residence_street(dataform.ResidentialAddress1);
                    panel13.residence_number(dataform.ResidentialAddress2);
                    panel13.residence_building(dataform.ResidentialAddress3);
                    //residence_city();
                    //                            residence_state: ko.observable(""),
                    //                                residence_postal_code: ko.observable(""),
                    panel13.residence_country(dataform.ResidentialCountry);
                    if (dataform.DateOfBirth != null) {
                        panel13.birth(kendo.toString(new Date(model.data().ClientDateBirth), "dd MMM yyyy"));
                    }
                    if (model.data().data_clientInfo.Nationality != null) {
                        var all_contr = (model.data().AllowedCheckFTIN).split(",")
                        var allowed_FtIN = _.find(all_contr, function (x) {
                            return x == (model.data().data_clientInfo.Nationality).toLowerCase();
                        })
                        panel13.checkFTIN(allowed_FtIN != undefined ? true : false);
                        //panel13.ChecknotLegallyFTIN(dt_w8.CheckIfFTIN);
                    }

                }

                switch (model.urlLang()) {
                    case "en-us":

                        $("#pnl11vid").append('<source src="./Content/video/EN-no face.mp4" type="video/mp4" muted="muted">')
                        break;
                    case "zh-cn":
                        $("#pnl11vid").append('<source src="./Content/video/SIM-no face.mp4" muted="muted">')
                        //$("#pnl11vid > source").prop("src", "./Content/video/SIM-no face.mp4");
                        break;
                    case "zh-hk":
                        $("#pnl11vid").append('<source src="./Content/video/ZH-no face.mp4" type="video/mp4" muted="muted">')
                        //$("#pnl11vid > source").prop("src", "./Content/video/ZH-no face.mp4");
                        break;
                }
            }



            if (ndform != null) {
                panel2.isAustralia(ndform.IsNotAustralian);
                panel2.isCanada(ndform.IsNotCanadian);
                panel2.isFinland(ndform.IsNotFinnish);
                panel2.isJapan(ndform.IsNotJPXOfficer);
                panel2.isTaiwan(ndform.IsNotChinese);
                panel2.isKorea(ndform.IsNotKorea);
            }


            var dk_quest = model.data().data_dkQuestionaire;
            if (dk_quest != null) {
                if (dk_quest.AcquireFrom2 != null || dk_quest.AcquireFrom1 != null) {
                    panel10.AcquireFrom2(dk_quest.AcquireFrom2);
                    panel10.knowledge(dk_quest.AcquireFrom1);
                    panel10.acquired_knowledge("1");
                } else {
                    panel10.acquired_knowledge("0");
                }

            }




            setTimeout(function () {
                var soft = model.data().data_soft;
                if (soft != undefined) {
                    panel5.saving_from_salary(soft.SavingFromSalary)
                    panel5.previouse_job(soft.PreviousJobs)
                    panel5.previouse_job_industry(soft.PreviousJobsIndustry);
                    panel5.previouse_job_other_industry(soft.PreviousJobsIndustryOthers)
                    panel5.previouse_job_occupation(soft.PreviousJobsOccupation != null ? soft.PreviousJobsOccupation : '');
                    panel5.previouse_job_other_occupation(soft.PreviousJobsOccupationOthers)
                    panel5.previouse_job_annual_income(soft.PreviousJobAnnualIncome);
                    panel5.previouse_job_company_name(soft.PreviousJobsEmployerCompanyName);
                    panel5.years_of_service(soft.PreviousJobsYearsOfService);

                    panel5.provided_family(soft.ProvidedByFamilyMember);
                    panel5.provided_family_industry(soft.FamilyMembersIndustry != null ? soft.FamilyMembersIndustry : '');
                    panel5.provided_family_Other_industry(soft.FamilyMembersIndustryOthers);
                    panel5.provided_family_occupation(soft.FamilyMembersOccupation != null ? soft.FamilyMembersOccupation : '');
                    panel5.provided_family_Other_occupation(soft.FamilyMembersOccupationOthers);
                    panel5.provided_family_relation(soft.RelationshipWithTheFamilyMember);

                    panel5.investments_earning(soft.InvestmentEarning);

                    panel5.investment_earning_type(soft.InvestmentType);
                    panel5.investment_earning_other_type(soft.InvestmentTypeOthers);
                    panel5.investment_earning_capital(soft.InvestmentAmount);
                    panel5.investment_earning_profit(soft.InvestmentEarningAmount);
                    panel5.investment_earning_fund_source(soft.InvestmentFundSource);

                    panel5.rental_income(soft.RentalIncome);
                    panel5.rental_income_holding_period(soft.RentalHoldingPeriod);
                    panel5.rental_income_fund_source(soft.RentalFundSource);
                    panel5.rental_income_annual(soft.RentalAnnualIncome);

                    panel5.other(soft.OtherIncome);
                    panel5.other_value(soft.OtherIncomeTextBox);
                    if (soft.SavingFromSalary == true) {
                        panel5.saving_from_salary(true);
                    } else if (panel5.investment_earning_fund_source() == "Previous Job" || panel5.rental_income_fund_source() == "Provided By Family Member") {
                        panel5.saving_from_salary(true);
                    } else {
                        panel5.saving_from_salary(false);
                    }


                }
            }, 200);

            switch (dt_form.ApplicationMode) {
                case 0:
                    panel18.applicationMode("網上開戶 OAO");
                    break;
                case 1:
                    panel18.applicationMode("網上填寫表格並親臨分行驗證文件 FAO");
                    break;
                case 2:
                    panel18.applicationMode("透過驗證服務 CA - TSCI")
                    break;
            }

            var data_invest_obj = model.data().data_invest_obj;
            if (data_invest_obj != undefined) {
                panel6.Investment_Objective_temp((data_invest_obj.InvestmentObj).split(";"));
                panel6.Investment_Objective((data_invest_obj.InvestmentObj).split(";"));
                panel6.listed_securities(data_invest_obj.ListSecuritiesExp);
                panel6.ccbc_warant(data_invest_obj.CBBCWarrantExp);
                panel6.futures_option(data_invest_obj.FutureOrOptionExp);
                panel6.leverage_foreign_exchange(data_invest_obj.LevForeignExExp);
                panel6.unit_trust_bonds(data_invest_obj.UTorBondExp);
                panel6.structure_products(data_invest_obj.StructuredProductExp);
                panel6.leverage_inverse_product(data_invest_obj.LevAndInvProductExp);
            }

            panel15.client_name(dataform.Surname + " " + dataform.ClientName);
            var data_MQ = model.data().data_mr;
            if (data_MQ != undefined) {
                panel15.client_name(dataform.Surname + " " + dataform.ClientName);
                panel15.acc1(data_MQ.Q1);
                panel15.q1(data_MQ.Q1 != null ? "1" : "0");
                panel15.acc2(data_MQ.Q2);
                panel15.q2(data_MQ.Q2 != null ? "1" : "0");
                panel15.acc3(data_MQ.Q3);
                panel15.q3(data_MQ.Q3 != null ? "1" : "0");
                panel15.acc4(data_MQ.Q4);
                panel15.q4(data_MQ.Q4 != null ? "1" : "0");
            }

            var data_attc = res.data_attach;
            //console.log("-------------- data_attc", data_attc);
            //if (data_attc.length > 0) {
            //    $.each(data_attc, function (i, dt) {
            //        switch (dt.AttachmentType) {
            //            case "HKID Card":
            //                panel17.uploadIdentity(true);
            //                panel17.uploadIdentityGuid(dt.AttachmentID);
            //                panel17.uploadFileIdentity([{ name: dt.Attachment, size: 600, extension: dt.AttachmentExt }])
            //                break;
            //            case "Address Proof":
            //                panel17.uploadAddress(true);
            //                panel17.uploadAddressGuid(dt.AttachmentID);
            //                panel17.uploadFileAddress([{ name: dt.Attachment, size: 600, extension: dt.AttachmentExt }])
            //                break;
            //            case "Bank Account Proof":
            //                panel17.uploadBankAcc(true);
            //                panel17.uploadBankAccGuid(dt.AttachmentID);
            //                panel17.uploadFileBankAcc([{ name: dt.Attachment, size: 600, extension: dt.AttachmentExt }])
            //                break;
            //            case "Back of ID":
            //                panel17.uploadID(true);
            //                panel17.uploadIDGuid(dt.AttachmentID);
            //                panel17.uploadFileID([{ name: dt.Attachment, size: 600, extension: dt.AttachmentExt }])
            //                break;
            //            case "Bank Deposit Slip":
            //                panel18.uploadDepositGuid(dt.AttachmentID);
            //                panel18.uploadDeposit([{ name: dt.Attachment, size: 600, extension: dt.AttachmentExt }]);
            //                //panel18.status(true);
            //                //panel18.isConfirmation(false);
            //                //data_confirm();
            //                break;
            //        }
            //    });
            //} else {
            //    panel17.edited(true);
            //    if (model.data().data_form.AttFormID != null) {
            //        getAttch(model.data().data_form.AttFormID);
            //    }
            //}

            //console.log("-------------- data_attc", data_attc);
            if (data_attc.length > 0) {
                $.each(data_attc, function (i, dt) {
                    switch (dt.AttachmentType) {
                        case "HKID Card":
                            panel17.uploadIdentity(true);
                            panel17.uploadIdentityGuid(dt.AttachmentID);
                            panel17.uploadFileIdentity([{ name: dt.Attachment, size: 600, extension: dt.AttachmentExt }]);
                            _IDCard = _.find(model.data().data_File, function (x) {
                                return x.FileType == "HKID Card"
                            })
                            if (_IDCard != undefined) {
                                IdCard = dt.AttachmentID;
                                //if (_IDCard.Extension == ".pdf" || _IDCard.Extension == ".PDF") {
                                //    IdCard = dt.AttachmentID;
                                //} else {
                                //    file.IdCard(_IDCard.Source);
                                //}
                                //file.IdCard(_IDCard.Source);

                            }
                            break;
                        case "Address Proof":
                            panel17.uploadAddress(true);
                            panel17.uploadAddressGuid(dt.AttachmentID);
                            panel17.uploadFileAddress([{ name: dt.Attachment, size: 600, extension: dt.AttachmentExt }]);
                            _addrproof = _.find(model.data().data_File, function (x) {
                                return x.FileType == "Address Proof"
                            })
                            if (_addrproof != undefined) {
                                AddressProof = dt.AttachmentID;
                                //if (_addrproof.Extension == ".pdf" || _addrproof.Extension == ".PDF") {
                                //    AddressProof = dt.AttachmentID;
                                //} else {
                                //    file.AddressProof(_addrproof.Source);
                                //}
                                //file.AddressProof(_addrproof.Source);

                            }
                            break;
                        case "Bank Account Proof":
                            panel17.uploadBankAcc(true);
                            panel17.uploadBankAccGuid(dt.AttachmentID);
                            panel17.uploadFileBankAcc([{ name: dt.Attachment, size: 600, extension: dt.AttachmentExt }]);
                            _accproof = _.find(model.data().data_File, function (x) {
                                return x.FileType == "Bank Account Proof"
                            })
                            if (_accproof != undefined) {
                                BankAccountProof = dt.AttachmentID;
                                //if (_accproof.Extension == ".pdf" || _accproof.Extension == ".PDF") {
                                //    BankAccountProof = dt.AttachmentID;
                                //} else {
                                //    file.BankAccountProof(_accproof.Source);
                                //}

                                //file.BankAccountProof(_accproof.Source);

                            }
                            break;
                        case "Back of ID":
                            panel17.uploadID(true);
                            panel17.uploadIDGuid(dt.AttachmentID);
                            panel17.uploadFileID([{ name: dt.Attachment, size: 600, extension: dt.AttachmentExt }]);
                            _backid = _.find(model.data().data_File, function (x) {
                                return x.FileType == "Back of ID"
                            })
                            if (_backid != undefined) {
                                BackID = dt.AttachmentID;
                                //if (_backid.Extension == ".pdf" || _backid.Extension == ".PDF") {
                                //    BackID = dt.AttachmentID;
                                //} else {
                                //    file.BackID(_backid.Source);
                                //}

                                //file.BackID(_backid.Source);

                            }
                            break;
                        case "Bank Deposit Slip":
                            panel18.uploadDepositGuid(dt.AttachmentID);
                            panel18.uploadDeposit([{ name: dt.Attachment, size: 600, extension: dt.AttachmentExt }]);
                            panel18.status(true);
                            //////////////////////alert("masuk 6854")
                            //panel18.isConfirmation(true);
                            _deposit = _.find(model.data().data_File, function (x) {
                                return x.FileType == "Bank Deposit Slip"
                            })
                            if (_deposit != undefined) {
                                DepositSlip = dt.AttachmentID;
                                //if (_deposit.Extension == ".pdf" || _deposit.Extension == ".PDF") {
                                //    DepositSlip = dt.AttachmentID;
                                //} else {
                                //    file.DepositSlip(_deposit.Source);
                                //}

                                //file.DepositSlip(_deposit.Source);

                            }


                            getlookupConf();
                            //data_confirm();
                            break;
                    }
                });
            } else {
                panel17.edited(true)
                if (model.data().data_form.AttFormID != null) {
                    /*getAttch(model.data().data_form.AttFormID);*/
                }


            }

            if (dt_form.ApplicationMode == 1 && panel18.status() == true && panel18.isConfirmation() == true) {
                ////////////////////////alert("masuk")
                ;
                getlookupConf();
                ////alert("masuk7681")
                data_confirm();
            }

            if (model.data().data_form.RPQID != undefined) {
                var data_rpq = model.data().data_rpq;
                panel8.question1(data_rpq.Q1);
                panel8.question2(data_rpq.Q2);
                panel8.question3(data_rpq.Q3);
                panel8.question4(data_rpq.Q4.split(''));
                panel8.question5(data_rpq.Q5);
                panel8.question6(data_rpq.Q6);
                panel8.question7(data_rpq.Q7);
                panel8.question8(data_rpq.Q8);
                switch (data_rpq.RPQLevel) {
                    case 1:
                        panel8.RpqLevel("Low Risk");
                        panel8.RpqLvl((model.lang() != undefined) ? model.lang().low_risk() : '')
                        break;
                    case 2:
                        panel8.RpqLevel("Medium Risk");
                        panel8.RpqLvl((model.lang() != undefined) ? model.lang().medium_risk() : '')
                        break;
                    case 3:
                        panel8.RpqLevel("High Risk");
                        panel8.RpqLvl((model.lang() != undefined) ? model.lang().high_risk() : '')
                        break;
                }

                panel8.score(data_rpq.RPQScore)
            }

            var ListedSecurities = _.find(tmp.data_experience(), function (x) { return x.value == panel6.listed_securities() })
            if (ListedSecurities != undefined) {
                panel18.ListedSecurities(ListedSecurities.val_txt);
            }
            var CCBC = _.find(tmp.data_experience(), function (x) { return x.value == panel6.ccbc_warant() })
            if (CCBC != undefined) {
                panel18.CCBC(CCBC.val_txt);
            }

            var futureOption = _.find(tmp.data_experience(), function (x) { return x.value == panel6.futures_option() })
            if (futureOption != undefined) {
                panel18.future_option(futureOption.val_txt);
            }

            var leveraged_foreign = _.find(tmp.data_experience(), function (x) { return x.value == panel6.leverage_foreign_exchange() })
            if (leveraged_foreign != undefined) {
                panel18.leveraged_foreign(futureOption.val_txt);
            }

            var unit_trust_bonds = _.find(tmp.data_experience(), function (x) { return x.value == panel6.unit_trust_bonds() })
            if (unit_trust_bonds != undefined) {
                panel18.unit_trust(unit_trust_bonds.val_txt);
            }

            var structure_products = _.find(tmp.data_experience(), function (x) { return x.value == panel6.structure_products() })
            if (structure_products != undefined) {
                panel18.structured_product(structure_products.val_txt);
            }

            var leverage_inverse_product = _.find(tmp.data_experience(), function (x) { return x.value == panel6.leverage_inverse_product() })
            if (leverage_inverse_product != undefined) {
                panel18.leveraged_inverse(leverage_inverse_product.val_txt);
            }



            //setTimeout(function () {
            //    if (model.data().data_form != 'null') {
            //        $("#mytabs").kendoTabStrip();
            //        $("#tab-cont").show();

            //        var tab = $("#tab" + model.data().data_form.Step);
            //        $("#mytabs").kendoTabStrip().data("kendoTabStrip").activateTab(tab);
            //    } else {
            //        $("#tab-cont").hide();
            //    }

            //}, 500)

        }
    })
}

check_networth = function () {
    ////////////////////////alert("masuk")
    var val_liquid = 0;
    var val_net = 0;
    switch (panel5.liquid_assets()) {
        case "HKD 200,001 – 500,000":
            val_liquid = 500000;
            break;
        case "HKD 0":
            val_liquid = 0;
            break;
        case "HKD 500,001 – 1,000,000":
            val_liquid = 1000000;
            break;
        case "> HKD 1,000,000":
            val_liquid = 1000100
            break;
    }

    switch (panel5.net_worth()) {
        case "HKD 0 – 200,000":
            val_net = 200000;
            break;
        case "HKD 200,001 – 500,000":
            val_net = 500000;
            break;
        case "HKD 500,001 – 1,000,000":
            val_net = 1000000;
            break;
    }

    if (panel5.net_worth() != "Other") {
        if (val_net < val_liquid) {

            return false;
        }
    }

    return true;

}

no_knowledge = function () {
    panel10.knowledge("");
    panel10.AcquireFrom2("");
}


checkLogin = function () {
    var valid = $("#login1").kendoValidator().data("kendoValidator");
    if (valid.validate()) {
        param = {
            Email: loginpanel.emaillogin(),
            hp: loginpanel.HP(),
            ID: panel1.ID_Form(),
        }

        $.ajax({
            url: urlLoginChecking,
            data: JSON.stringify(param),
            type: "POST",
            contentType: ' application/json',
            success: function (res) {
                if (res.success !== false) {
                    if (res.success != null && res.success == true) {
                        Swal.fire({
                            title: (model.lang() != undefined) ? model.lang().verification_passed() : '',
                            //text: (model.lang() != undefined) ? model.lang().check_email1() + panel1.email() + model.lang().check_email2() : '' ,
                            icon: 'success',
                            showCancelButton: false,
                            confirmButtonColor: '#3085d6',
                            confirmButtonText: 'OK',
                            allowOutsideClick: false
                        }).then(function (result) {
                            if (result.isConfirmed) {
                                var hr = window.location.href;
                                if (hr.indexOf("login=1") > 0) {
                                    hr1 = hr.replace("login=1", "login=0")
                                    window.location.replace(hr1)
                                } else if (hr.indexOf("login=0") <= 0) {
                                    ////////////////////////alert("masuk------------- ")
                                    hr2 = hr + "&login=0"
                                    window.location = hr2
                                } if (hr.indexOf("login=0") > 0) {
                                    location.reload();
                                }

                            }
                        })
                    } else {
                        Swal.fire(
                            (model.lang() != undefined) ? model.lang().warning() : "",
                            (model.lang() != undefined) ? model.lang().verification_failed() : "",
                            'warning'
                        );
                        model.loader(false);
                    }


                } else {
                    Swal.fire(
                        (model.lang() != undefined) ? model.lang().warning() : "",
                        (model.lang() != undefined) ? model.lang().verification_failed() : "",
                        'warning'
                    );
                    model.loader(false);
                }

            }
        })
    }
}


obj_click = function () {
    data = panel6.Investment_Objective_temp();
    panel6.Investment_Objective([]);
    panel6.Investment_Objective(data);
}

knowledge_onchange = function () {
    panel10.AcquireFrom2("");
}

reset_deriv = function () {
    deriv.q1("");
    deriv.q2("");
    deriv.q3("");
    deriv.q4("");
    deriv.q5("");
    deriv.q6("");
    $("#prod_deriv_1").hide();
    $("#prod_deriv_2").hide();
    $("#prod_deriv_3").hide();
    $("#prod_deriv_4").hide();
    $("#prod_deriv_5").hide();
    $("#prod_deriv_6").hide();
}

deriv_next = function () {
    var valid_der = [];
    if (deriv.q1() != "" && deriv.q1() == "D") {
        valid_der.push("1");
        $("#prod_deriv_1").hide();
    } else if (deriv.q1() != "" && deriv.q1() != "D") {
        $("#prod_deriv_1").show();
    } else {
        $("#prod_deriv_1").show();
    }
    if (deriv.q2() != "" && deriv.q2() == "A") {
        valid_der.push("1");
        $("#prod_deriv_2").hide();
    } else if (deriv.q1() != "" && deriv.q2() != "A") {
        $("#prod_deriv_2").show();
    } else {
        $("#prod_deriv_2").show();
    }
    if (deriv.q3() != "" && deriv.q3() == "B") {
        valid_der.push("1");
        $("#prod_deriv_3").hide();
    } else if (deriv.q1() != "" && deriv.q3() != "B") {
        $("#prod_deriv_3").show();
    } else {
        $("#prod_deriv_3").show();
    }
    if (deriv.q4() != "" && deriv.q4() == "D") {
        valid_der.push("1");
        $("#prod_deriv_4").hide();
    } else if (deriv.q1() != "" && deriv.q4() != "D") {
        $("#prod_deriv_4").show();
    } else {
        $("#prod_deriv_4").show();
    }
    if (deriv.q5() != "" && deriv.q5() == "B") {
        valid_der.push("1");
        $("#prod_deriv_5").hide();
    } else if (deriv.q1() != "" && deriv.q5() != "B") {
        $("#prod_deriv_5").show();
    } else {
        $("#prod_deriv_5").show();
    }
    if (deriv.q6() != "" && deriv.q6() == "D") {
        valid_der.push("1");
        $("#prod_deriv_6").hide();
    } else if (deriv.q1() != "" && deriv.q6() != "D") {
        $("#prod_deriv_6").show();
    } else {
        $("#prod_deriv_6").show();
    }

    //console.log("----------- " + valid_der)

    if (valid_der.length == 6) {
        $("#modal_derivative").modal("hide")
        panel10.acquired_knowledge("1")
        $('#acquired_knowledge').prop('checked', true);
        //reset_deriv();
    } else {
        Swal.fire(
            (model.lang() != undefined) ? model.lang().warning() : "",
            (model.lang() != undefined) ? model.lang().swal_incorrect() : "",
            'warning'
        );
    }

    //else {
    //    $("#modal_derivative").modal("hide")
    //    panel10.acquired_knowledge("")
    //    $('#acquired_knowledge').prop('checked', false);
    //    //reset_deriv();
    //}
}

Cancel_deriv = function () {
    $("#modal_derivative").modal("hide")
    if (model.data().data_derivative != null || model.data().data_derivative != undefined) {

    } else {
        panel10.acquired_knowledge("")
    }

}

toggle_preferred_trading = function (e) {
    panel3.aecode("");
    panel3.aename("");
    /*panel3.promotion_code("");*/
    panel3.is_aecode(false);
    panel3.is_aename(false);
}

toggle_is_aecode = function () {
    panel3.aecode("");
}

toggle_is_aename = function () {
    panel3.aename("");
}

//noneLetterCharacter = function(s){
//    res = /[^\u0000-\u007F]/.test(s);
//    if (!res) {
//        //////////////////////alert("masuk")
//        return "";
//    } else {
//        return res;
//    }


//}

//$('input').on('keypress', function (event) {
//    var regex = new RegExp("^[a-zA-Z0-9]+$");
//    var key = String.fromCharCode(!event.charCode ? event.which : event.charCode);
//    if (!regex.test(key)) {
//        event.preventDefault();
//        return false;
//    }
//});

validation_en = function (value) {
    str = ""
    if (value != null) {

        if (value != "") {
            arrtext = value.split("");
            //console.log(arrtext);
            $.each(arrtext, function (i, dt) {
                res = /[a-zA-Z\s]/ig.test(dt);
                if (res == false) {
                    ////////////////////////alert("masuk")
                    str = (model.lang() != undefined) ? model.lang().warning_en_desc() : '';;
                }
            })
        } else {
            str = (model.lang() != undefined) ? model.lang().compuls_qu() : '';
        }
    }

    return str;
}

load_new_tabel = function () {

    var tabel = $("#input_grid_new").DataTable({
        aaData: tax.tax_arr(),
        paging: false,
        ordering: false,
        info: false,
        searching: false,
        bDestroy: true,
        responsive: true,
        autoWidth: false,
        columns: [
            {
                "data": "jurisdiction",
                "width": "60px",
                "render": function (data, type, row, meta) {
                    return "<div class='text-wrap width-200'>" + data + "</div>";
                }
            },
            {
                "data": "tin",
                "width": "40px",
                "render": function (data, type, row, meta) {
                    return "<div class='text-wrap width-200'>" + data + "</div>";
                }
            },
            {
                "data": "tin_reason",
                "width": "40px",
                "render": function (data, type, row, meta) {
                    return "<div class='text-wrap width-200'>" + data + "</div>";
                }
            },
            {
                "width": "20px",
                "render": function (data, type, row, meta) {
                    return "<button id='edit_tax' class='btn btn-xs btn-warning' onclick='edit_tax(" + meta.row + ")'>" + model.lang().edit_tax() + "</button> <span> </span> <button class='btn btn-xs btn-danger' id='delete_tax' onclick='delete_tax(" + meta.row + "," + row.taxResidentID + ")'>" + model.lang().delete_tax() + "</button>"
                }
            },
        ],
        columnDefs: [
            {
                targets: 3,
                data: null,
                defaultContent: '',
            },
            { responsivePriority: 1, targets: -1 },
            { "width": "30%", "targets": 0 },
            { "width": "30%", "targets": 1 },
            { "width": "30%", "targets": 2 },
        ],
    });
}

open_modal_tax = function () {
    tax.edit(false)
    $("#tax_record").modal("show")
    if (tax.edit() == false) {
        tax.country({});
        tax.jurisdiction("");
        tax.tin("");
        tax.tin_reason("");
        $("#jurisdiction").data('kendoDropDownList').value("");
    }
}

open_modal_tax_edit = function () {
    tax.edit(true);
    $("#tax_record").modal("show");
    $("#jurisdiction").data('kendoDropDownList').value();
}

add_row_tax = function () {
    //event.preventDefault();
    arr = tax.tax_arr();
    validator = $("#form_tax").kendoValidator().data("kendoValidator");
    juris = $("#jurisdiction").data('kendoDropDownList').value();
    tax.jurisdiction(juris)
    if (tax.edit() == false) {

        if (validator.validate()) {
            var name = ""
            switch (model.urlLang()) {
                case "en-us":
                    dataN = _.find(model.data().data_country, function (o) {
                        return o.en_short_name == juris
                    })
                    name = dataN.en_short_name
                    tax.jurisdiction(name)
                    break;
                case "zh-hk":
                    dataN = _.find(model.data().data_country, function (o) {
                        return o.en_short_name == juris
                    })
                    name = dataN.zh_hk_short_name
                    tax.jurisdiction(name)
                    break;
                case "zh-cn":
                    dataN = _.find(model.data().data_country, function (o) {
                        return o.en_short_name == juris
                    })
                    name = dataN.zh_cn_short_name
                    tax.jurisdiction(name)
                    break;
            }
            param = {
                country: dataN,
                jurisdiction: name,
                tin: tax.tin(),
                tin_reason: tax.tin_reason()
            }

            arr.push(param);
            tax.tax_arr([]);
            tax.tax_arr(arr);

            tabel = $("#input_grid_new").DataTable();
            tabel.clear().draw();
            tabel.rows.add(tax.tax_arr());
            tabel.columns.adjust().draw();
            $("#tax_record").modal("hide")
        }


    } else {
        if (validator.validate()) {
            if (arr.length > 0) {

                var name = ""
                switch (model.urlLang()) {
                    case "en-us":
                        var dataL = _.find(model.data().data_country, function (o) {
                            return o.en_short_name == tax.jurisdiction()
                        })
                        name = dataL.en_short_name
                        tax.jurisdiction(name)
                        break;
                    case "zh-hk":
                        var dataL = _.find(model.data().data_country, function (o) {
                            return o.en_short_name == tax.jurisdiction()
                        })
                        name = dataL.zh_hk_short_name
                        tax.jurisdiction(name)
                        break;
                    case "zh-cn":
                        var dataL = _.find(model.data().data_country, function (o) {
                            return o.en_short_name == tax.jurisdiction()
                        })
                        name = dataL.zh_cn_short_name
                        tax.jurisdiction(name)
                        break;
                }
                arr[tax.index()].jurisdiction = name;
                arr[tax.index()].tin = tax.tin();
                arr[tax.index()].tin_reason = tax.tin_reason();
                tax.tax_arr([]);
                tax.tax_arr(arr);
            }

            tabel = $("#input_grid_new").DataTable();
            tabel.clear().draw();
            tabel.rows.add(tax.tax_arr());
            tabel.columns.adjust().draw();
            $("#tax_record").modal("hide")
        }

    }



}

delete_tax = function (index, ID) {
    if (ID == undefined) {
        tabel = $("#input_grid_new").DataTable();
        data_index = tabel.row(index).data();
        //////////////////////////alert(data_index.taxResidentID)
        temp.tax_delete().push(data_index.taxResidentID);
        arr = tax.tax_arr();
        arr.splice(index, 1);
        //console.log(arr)
        tax.tax_arr(arr);
        tabel.clear().draw();
        tabel.rows.add(tax.tax_arr());
        tabel.columns.adjust().draw();
    } else {
        process_delete_tax(index, ID);
    }
}

process_delete_tax = function (index, ID) {
    var paramTax = {
        ID: ID
    }
    Swal.fire({
        title: (model.lang() != undefined) ? model.lang().are_you_sure() : '',
        html: "delete this saved tax?",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'OK'
    }).then(function (result) {
        if (result.isConfirmed) {
            model.loader(true)
            //console.log(JSON.stringify(paramTax))
            $.ajax({
                url: urlDeleteTaxPanel10,
                data: JSON.stringify(paramTax),
                type: "POST",
                contentType: 'application/json',
                success: function (res) {
                    model.loader(false);
                    data = res.data;
                    if (res.success == true) {
                        tabel = $("#input_grid_new").DataTable();
                        data_index = tabel.row(index).data();
                        //////////////////////////alert(data_index.taxResidentID)
                        temp.tax_delete().push(data_index.taxResidentID);
                        arr = tax.tax_arr();
                        arr.splice(index, 1);
                        //console.log(arr)
                        tax.tax_arr(arr);
                        tabel.clear().draw();
                        tabel.rows.add(tax.tax_arr());
                        tabel.columns.adjust().draw();
                        Swal.fire("Success Delete saved tax resident", "", "success");
                    } else {
                        Swal.fire("", res.message, "error")
                    }


                }
            });
        } else {
            ////////////////////alert("7857")
            model.loader(false);

        }
    })
}

edit_tax = function (index) {
    tax.index(index);
    dataM = tax.tax_arr()[index];
    open_modal_tax_edit();
    var name = ""
    switch (model.urlLang()) {
        case "en-us":
            dataK = _.find(model.data().data_country, function (o) {
                return o.en_short_name == dataM.jurisdiction
            })
            name = dataK.en_short_name
            tax.jurisdiction(name)
            break;
        case "zh-hk":
            dataK = _.find(model.data().data_country, function (o) {
                return o.zh_hk_short_name == dataM.jurisdiction
            })
            name = dataK.en_short_name
            tax.jurisdiction(name)
            break;
        case "zh-cn":
            datak = _.find(model.data().data_country, function (o) {
                return o.zh_cn_short_name == dataM.jurisdiction
            })
            name = dataK.en_short_name
            tax.jurisdiction(name)
            break;
    }
    //////////////////////////alert(name)
    $("#jurisdiction").data('kendoDropDownList').value(name);
    tax.jurisdiction(name);
    //tax.jurisdiction("China")
    //setTimeout(function () {
    //    tax.jurisdiction(data.jurisdiction);
    //}, 200)

    tax.tin(dataM.tin);
    tax.tin_reason(dataM.tin_reason);
}

check_DK_RPQ = function () {
    //////////////////alert("masuk 7839")
    if (model.login() == false && model.ID() != "") {
        if (temp.backToW8() == true) {
            Swal.fire((model.lang() != undefined) ? model.lang().warning() : '', (model.lang() != undefined) ? model.lang().w8_warning() : '', "warning");
            setTimeout(function () {
                var tab = $("#tab11");
                $("#mytabs").kendoTabStrip().data("kendoTabStrip").activateTab(tab);}, 200);
            nextPanel(11);
        }
        model.loader(true);
        var param = {
            ID: model.ID()
        }

        var param2 = {
            ID_Form: model.ID()
        }

        $.ajax({
            url: urlCheck_DK_RPQ,
            data: JSON.stringify(param),
            type: "POST",
            contentType: 'application/json',
            success: function (res) {
                data = res.data;
                if (res.success == true) {
                    if (model.data().data_form.Step >= 10 && data.W8_ID_empty == true) {
                        //console.log("masuk")
                        if (data.W8_ID_empty == true && temp.backToW8() == false) {
                            Swal.fire((model.lang() != undefined) ? model.lang().warning() : '', (model.lang() != undefined) ? model.lang().w8_warning() : '', "warning");
                            nextPanel(11);
                            temp.backToW8(true);
                            var check_interval = setInterval(function () {
                                if (model.loader() == true) {
                                    model.loader(false);
                                }
                                if (model.loader() == false) {
                                    clearInterval(check_interval);
                                }
                            }, 100)

                           
                        } else {
                            var check_interval = setInterval(function () {
                                if (model.loader() == true) {
                                    alert("masuk")
                                    model.loader(false);
                                }
                                if (model.loader() == false) {
                                    clearInterval(check_interval);
                                }
                            }, 100)
                        }

                    }else if (data.need_update == true) {
                        //////////////////alert("masuk 7497 masuk rpq")
                        temp.check_dk_RPQ(true);
                        Swal.fire({
                            title: (model.lang() != undefined) ? model.lang().are_you_sure() : '',
                            html: (model.lang() != undefined) ? model.lang().checking_RPQDK() : '',
                            icon: 'warning',
                            showCancelButton: true,
                            confirmButtonColor: '#3085d6',
                            cancelButtonColor: '#d33',
                            confirmButtonText: 'OK',
                            allowOutsideClick: false,
                        }).then(function (result) {
                            if (result.isConfirmed) {
                                model.loader(true)
                                $.ajax({

                                    url: urlUpdateStockOption,
                                    data: JSON.stringify(param2),
                                    type: "POST",
                                    contentType: 'application/json',
                                    success: function (res) {
                                        model.loader(false);
                                        data = res.data;
                                        if (res.success == true) {
                                            Swal.fire("Success Update StockOption", "", "success");
                                            getBack(false);
                                            temp.check_dk_RPQ(false);
                                        } else {
                                            Swal.fire("", res.message, "error")
                                        }


                                    }
                                });
                            } else {
                                ////////////////////alert("7857")
                                model.loader(false);

                            }
                        })
                    } else {
                        ////////////////////alert("7862")
                        //
                        if (panel17.status() == true) {

                        } else {
                            model.loader(false);
                        }
                        temp.check_dk_RPQ(false);
                    }
                } else {
                    model.loader(false);
                    //////////////////////alert(res.message)
                }

            }
        });
    }
}

uploadDeposit = function () {
    check_DK_RPQ()
    if (temp.isUploadDeposit() == true) {

    } else {

        if (temp.check_dk_RPQ() == false) {
            //////////////alert("7944")
            panel18.status(true);
            panel18.isConfirmation(true);
            confirmationPage();
        }

    }

}

checkFile = function (isFAO) {
    file = model.data().data_File;
    //Bank Deposit Slip
    //Bank Account Proof
    addr_proof = _.find(file, function (a) {
        return a.FileType == "Address Proof";
    });
    hkid_card = _.find(file, function (a) {
        return a.FileType == "HKID Card";
    });
    bank_account_proof = _.find(file, function (a) {
        return a.FileType == "Bank Account Proof";
    });
    deposit_slip = _.find(file, function (a) {
        return a.FileType == "Bank Deposit Slip";
    });
    if (isFAO == true) {
        if (addr_proof != undefined && hkid_card != undefined && bank_account_proof != undefined) {
            return true
        } else {
            return false
        }
    } else {
        if (addr_proof != undefined && hkid_card != undefined && bank_account_proof != undefined && deposit_slip != undefined) {
            return true
        } else {
            return false
        }
    }
}

pg1_select_country = function (e) {
    var dataitem = e.dataItem;
    //console.log("dataitem " + dataitem)
    switch (dataitem.Alpha2) {
        case "HK":
            temp.minIDLength(8);
            temp.maxIDLength(10);
            panel3.idCardType("NRIC");
            panel3.idCard("");
            $("#IDType").data('kendoDropDownList').value("NRIC");
            //hk.hkIDType("NRIC");
            //hk.hkID("");
            //hk.expiry_id("");
            /*$('#HKID_exp').data('kendoDatePicker').enable(false);*/
            break;
        case "CN":
            temp.minIDLength(1);
            temp.maxIDLength(18);
            panel3.idCardType("NRIC");
            panel3.idCard("");
            $("#IDType").data('kendoDropDownList').value("NRIC");
            //hk.hkIDType("NRIC");
            //hk.hkID("");
            //hk.expiry_id("");
            /* $('#HKID_exp').data('kendoDatePicker').enable(false);*/
            break;
        default:
            //alert(dataitem.Alpha2)
            //hk.hkID("");
            //hk.hkIDType("")
            $("#IDType").data('kendoDropDownList').value("");
            panel3.idCardType("");
            panel3.idCard("");
            temp.minIDLength(50);
            temp.maxIDLength(50);
          
     }
}

$(function () {
    ////console.log("---------------4")
    setTimeout(function () { check_DK_RPQ(); }, 500)
    if (model.data().data_form.SubmitStatus == "Submitted" && isIntranet == "0") {
        ////alert("masuk123" + isIntranet)
    } else {
        $("#acquired_knowledge").on("click", function (event) {
            event.preventDefault();
            reset_deriv()
            $("#modal_derivative").modal({
                show: true,
                backdrop: 'static',
                keyboard: false
            })
        })
        //$("#mytabs").kendoTabStrip();
        //tabpage(model.data() !== undefined && model.data().data_form != "null" && model.data().data_clientInfo != "null" ? model.data().data_form.Step : 1)
        ////console.log("---------------5")
        $(".p_attc").hide();
        $(".link_attc").show();
        switch (model.urlLang()) {
            case "en-us":
                ////console.log("---------------6")

                model.lang(ko.mapping.fromJS(en_us));
                break;
            case "zh-hk":
                model.lang(ko.mapping.fromJS(zh_hk));
                break;
            case "zh-cn":
                model.lang(ko.mapping.fromJS(zh_cn));
                break
        }
        //$(".ontab li").removeClass("active")
        ////console.log("---------------7")

        //if (!$(".ontab li").eq(2).hasClass("active")) {
        //    //console.log("---------------8")

        //    $(".ontab li").eq(model.data().data_form.Step - 2).addClass("active")
        //}

        temp.viewStatus(true);
        myInterval = setInterval(function () {
            if (temp.check_dk_RPQ() != null) {
                loadPage();
                //////alert("masuk")
                if (temp.viewStatus() == true) {
                    var ln = $(".on-tab").length;
                    temp.leng(ln);
                }
                if (pl == 17) {
                    //////alert("masuk sini 17")
                    if (temp.check_dk_RPQ() == true) {
                        if (model.data().data_form.ApplicationMode == 1) {
                            //////alert("8080");
                            panel17.status(true);
                            panel18.isConfirmation(false);
                            var tab = $("#tab15");
                            $("#mytabs").kendoTabStrip().data("kendoTabStrip").activateTab(tab);
                        } else {
                            //////////alert("8084");
                            model.page(16);
                            panel18.status(true);
                            var tab = $("#tab16");
                            $("#mytabs").kendoTabStrip().data("kendoTabStrip").activateTab(tab);
                        }
                    } else {
                        if (model.data().data_form.ApplicationMode == 1) {
                            //////////alert("8089");
                            check_file = checkFile(true)
                            if (check_file == true) {
                                panel18.status(true);
                                panel18.isConfirmation(true);
                                var tab = $("#tab16");
                                $("#mytabs").kendoTabStrip().data("kendoTabStrip").activateTab(tab);
                            } else {
                                panel17.status(true);
                                panel18.isConfirmation(false);
                                var tab = $("#tab15");
                                $("#mytabs").kendoTabStrip().data("kendoTabStrip").activateTab(tab);
                            }

                        } else {
                            check_file = checkFile(false)
                            //////////alert("8092");

                            if (check_file == true) {
                                panel18.status(true);
                                panel18.isConfirmation(true);
                                var tab = $("#tab16");
                                $("#mytabs").kendoTabStrip().data("kendoTabStrip").activateTab(tab);
                            } else {
                                panel18.status(true);
                                panel18.isConfirmation(false);
                                var tab = $("#tab16");
                                $("#mytabs").kendoTabStrip().data("kendoTabStrip").activateTab(tab);
                            }

                        }
                    }
                }
                clearInterval(myInterval);
            }
        }, 1000);


        if (model.login() == false) {
            ////alert("masuk 7583")
            ////console.log("---------------8")
            resetPanel();
            var pl = model.data() !== undefined && model.data().data_form != "null" && model.data().data_clientInfo != "null" ? model.data().data_form.Step + 2 : 1
            $(".confname").text(((model != undefined) ? model.data().data_clientInfo.Surname + " " + model.data().data_clientInfo.ClientName : ''));
            ////////////////////alert("7588 " +pl)
            if (isIntranet == "1") {
                pl = 16
            }
            if (temp.backToW8() == false) {
                if (model.page_url() != undefined && model.page_url() > 0) {
                    //resetPanel();
                    switch (model.page_url()) {
                        case 1:
                            model.page(1)
                            panel1.status(true);
                            break;
                        case 2:
                            model.page(2)
                            panel3.status(true);
                            break;
                        case 3:
                            model.page(3)
                            panel2.status(true);


                            break;
                        case 4:
                            //getlookup(2);
                            model.page(4)
                            panel4.status(true);
                            break;
                        case 5:
                            model.page(5)
                            panel5.status(true);
                            break;
                        case 6:
                            model.page(6)
                            panel6.status(true);
                            break;
                        case 7:
                            model.page(7)
                            panel8.status(true);
                            openmodal7();
                            break;
                        case 8:
                            model.page(8)
                            panel9.status(true);
                            break;
                        case 9:
                            model.page(9);
                            panel10.status(true);
                            break;
                        case 10:
                            model.page(10);
                            panel11.status(true);
                            break;
                        case 11:
                            ////alert("masuk sini")
                            model.page(11);
                            panel13.status(true);
                            break;
                        case 12:
                            model.page(12);
                            resetPanel();

                            panel14.status(true);
                            playVideo();

                            break;
                        case 13:
                            model.page(13);
                            resetPanel();
                            panel15.status(true);
                            break;
                        case 14:
                            model.page(14);
                            resetPanel();
                            panel16.status(true);
                            break;
                        case 15:
                            model.page(15);
                            resetPanel();
                            check_DK_RPQ();
                            panel17.status(true);
                            break;
                        case 16:
                            ////////alert("8001a")
                            //check_DK_RPQ();
                            resetPanel();
                            ////////////////////alert("masuk 7661 " + temp.check_dk_RPQ())
                            setTimeout(function () {
                                if (temp.check_dk_RPQ() == true) {
                                    if (model.data().data_form.ApplicationMode == 1) {
                                        ////////////////////alert("8001")
                                        panel17.status(true);
                                        panel18.isConfirmation(false);
                                    } else {
                                        ////////////////////alert("8006")
                                        model.page(16);
                                        panel18.status(true);
                                    }
                                } else {
                                    ////////////////////alert("8011" + model.data().data_form.ApplicationMode)
                                    if (model.data().data_form.ApplicationMode == 1) {
                                        ////////////////////alert("8013")
                                        panel17.status(true);
                                        model.page(15);
                                        panel18.isConfirmation(true);
                                        if (isIntranet == '0') {
                                            var tab = $("#tab" + model.page());
                                            $("#mytabs").kendoTabStrip().data("kendoTabStrip").activateTab(tab);
                                        }
                                    } else if (model.data().data_form.ApplicationMode == 0) {
                                        ////////////////////alert("8015")
                                        panel18.status(true);
                                        model.page(16);
                                        //panel18.isConfirmation(true);

                                        if (isIntranet == '0') {
                                            var tab = $("#tab" + model.page());
                                            $("#mytabs").kendoTabStrip().data("kendoTabStrip").activateTab(tab);
                                        }
                                    }
                                }
                            }, 500)


                            break;
                        case 17:

                            resetPanel();
                            ////////alert("7724 check DK RPQ " + temp.check_dk_RPQ())

                            break;
                    }

                    if ($("#mytabs").length > 0 && $("#tab" + model.page_url()).length > 0) {
                        var tab = $("#tab" + model.page_url());
                        $("#mytabs").kendoTabStrip().data("kendoTabStrip").activateTab(tab);
                    }

                } else {

                    switch (pl) {
                        case 1:
                            model.page(1)
                            panel1.status(true);
                            break;
                        case 2:
                            model.page(2)
                            panel3.status(true);
                            break;
                        case 3:
                            model.page(3)
                            panel2.status(true);


                            break;
                        case 4:
                            //getlookup(2);
                            model.page(4)
                            panel4.status(true);
                            break;
                        case 5:
                            model.page(5)
                            panel5.status(true);
                            break;
                        case 6:
                            model.page(6)
                            panel6.status(true);
                            break;
                        case 7:
                            //model.page(7)
                            //panel8.status(true);
                            //openmodal7();
                            if (model.data().data_rpq != null) {
                                window.location.href = RPQ_SingleForm_URL + "&lang=" + lang_sf + "&RPQID=" + model.data().data_rpq.ID + "&FormID=" + model.data().data_form.ID + "&backBtn=1";
                            } else {
                                window.location.href = RPQ_SingleForm_URL + "&lang=" + lang_sf + "&FormID=" + model.data().data_form.ID + "&backBtn=1";
                            }
                            break;
                        case 8:
                            model.page(8)
                            panel9.status(true);
                            break;
                        case 9:
                            model.page(9);
                            panel10.status(true);
                            break;
                        case 10:
                            model.page(10);
                            panel11.status(true);
                            break;
                        case 11:
                            //model.page(11);
                            //panel13.status(true);
                            if (model.data().data_form.W8ID != undefined) {
                                window.location.href = W8_SingleForm_URL + "&lang=" + lang_sf + "&W8ID=" + model.data().data_form.W8ID + "&ClientInfoID=" + model.data().data_clientInfo.ID + "&FormID=" + model.data().data_form.ID + "&backBtn=1";
                            } else {
                                window.location.href = W8_SingleForm_URL + "&lang=" + lang_sf + "&ClientInfoID=" + model.data().data_clientInfo.ID + "&FormID=" + model.data().data_form.ID + "&backBtn=1";
                            }
                            break;
                        case 12:
                            model.page(12);
                            resetPanel();

                            panel14.status(true);
                            playVideo();

                            break;
                        case 13:
                            model.page(13);
                            resetPanel();
                            panel15.status(true);
                            break;
                        case 14:
                            model.page(14);
                            resetPanel();
                            panel16.status(true);
                            break;
                        case 15:
                            model.page(15);
                            resetPanel();
                            check_DK_RPQ();
                            panel17.status(true);
                            break;
                        case 16:
                            ////////alert("8001a")
                            //check_DK_RPQ();
                            resetPanel();
                            ////////////////////alert("masuk 7661 " + temp.check_dk_RPQ())
                            setTimeout(function () {
                                if (temp.check_dk_RPQ() == true) {
                                    if (model.data().data_form.ApplicationMode == 1) {
                                        ////////////////////alert("8001")
                                        panel17.status(true);
                                        panel18.isConfirmation(false);
                                    } else {
                                        ////////////////////alert("8006")
                                        model.page(16);
                                        panel18.status(true);
                                    }
                                } else {
                                    ////////////////////alert("8011" + model.data().data_form.ApplicationMode)
                                    if (model.data().data_form.ApplicationMode == 1) {
                                        ////////////////////alert("8013")
                                        panel17.status(true);
                                        model.page(15);
                                        panel18.isConfirmation(true);
                                        if (isIntranet == '0') {
                                            var tab = $("#tab" + model.page());
                                            $("#mytabs").kendoTabStrip().data("kendoTabStrip").activateTab(tab);
                                        }
                                    } else if (model.data().data_form.ApplicationMode == 0) {
                                        ////////////////////alert("8015")
                                        panel18.status(true);
                                        model.page(16);
                                        //panel18.isConfirmation(true);

                                        if (isIntranet == '0') {
                                            var tab = $("#tab" + model.page());
                                            $("#mytabs").kendoTabStrip().data("kendoTabStrip").activateTab(tab);
                                        }
                                    }
                                }
                            }, 500)


                            break;
                        case 17:

                            resetPanel();
                            ////////alert("7724 check DK RPQ " + temp.check_dk_RPQ())

                            break;
                    }
                }

            }

        }



        ////console.log("-------------------- 11");


        ////console.log("-------------------- 12");


        $("#pnl1").kendoValidator().data("kendoValidator");
        //$val = $(this).val();
        //    arrtext = $val.split("");
        //    //console.log(arrtext)
        //    $.each(arrtext, function (i, dt) {
        //        res = /[a-zA-Z\s]/ig.test(dt);
        //        if (res == false) {
        //            panel3.eng_name("");
        //        }
        //    })
        //$("#pnl2").kendoValidator().data("kendoValidator");
        var en_stts = 0;
        var en_stts1 = 0;
        $("#pnl2").kendoValidator({
            rules: {
                customRule2: function (input) {
                    val = $("#surname").val();

                    if (input.is("[name='Surename']")) {
                        if (val != "") {
                            dm = true
                            arrtext = val.split("");
                            ////console.log(arrtext);
                            $.each(arrtext, function (i, dt) {
                                res = /[a-zA-Z\s]/ig.test(dt);
                                if (val != "" && res == false) {
                                    en_stts = 1;
                                    dm = false;
                                }
                            })

                            return dm
                        }


                        if (val == "") {
                            //////////////////////alert("masuk33")
                            en_stts = 2;
                            return false;
                        }

                    }
                    return true;

                },
                customRule3: function (input) {
                    val1 = $("#EngName").val();



                    if (input.is("[name='EngName']")) {
                        if (val != "") {
                            dm = true
                            arrtext1 = val1.split("");
                            ////console.log(arrtext);
                            $.each(arrtext1, function (i, dt) {
                                res = /[a-zA-Z\s]/ig.test(dt);
                                if (val != "" && res == false) {
                                    ////////////////////////alert(res)
                                    en_stts1 = 1;
                                    dm = false;
                                }
                            })

                            return dm;
                        }

                        if (val == "") {
                            ////////////////////////alert("masuk33")
                            en_stts1 = 2;
                            return false;
                        }

                    }
                    return true;
                },

            },
            messages: {
                customRule2: function () {
                    if (en_stts == 2) {
                        ////////////////////////alert("masuk")
                        return (model.lang() != undefined) ? model.lang().compuls_qu() : '';
                    } else if (en_stts == 1) {
                        return (model.lang() != undefined) ? model.lang().warning_en_desc() : '';
                    }
                },
                customRule3: function () {
                    if (en_stts1 == 2) {
                        ////////////////////////alert("masuk")
                        return (model.lang() != undefined) ? model.lang().compuls_qu() : '';
                    } else if (en_stts1 == 1) {
                        return (model.lang() != undefined) ? model.lang().warning_en_desc() : '';
                    }
                },
            }
        });
        $("#pnl3").kendoValidator({
            rules: {
                customRule: function (input) {
                    ////console.log("------------ ", input.is("[name='Objective']"));
                    if (input.is("[name='choose1']") && $("[name='choose1']:checked").length == 1) {
                        return false;
                    }

                    return true;
                }
                //customRule1: function (input) {
                //    ////console.log("------------ ", input.is("[name='Objective']"));
                //    if (input.is("[name='ntl']") && $("[name='ntl']:checked").length == 0) {
                //        return false;
                //    }

                //    return true;
                //}
            },
            messages: {
                customRule: (model.lang() != undefined) ? model.lang().at_least_one() : '',
                //customRule1: "Atleast one service should be selected.",
            }
        }).data("kendoValidator");
        $("#pnl4").kendoValidator().data("kendoValidator");
        $("#pnl5").kendoValidator({
            rules: {
                pane4: function (input) {
                    ////console.log("------------ ", input.is("[name='Objective']"));
                    if (input.is("[name='wealth']")) {

                        return $("[name='wealth']:checked").length > 0;
                    }

                    return true;
                }
            },
            messages: {
                pane4: (model.lang() != undefined) ? model.lang().at_least_one() : '',
            }
        });
        $("#pnl6").kendoValidator({
            rules: {
                customRule1: function (input) {
                    ////console.log("------------ ", input.is("[name='Objective']"));
                    if (input.is("[name='Objective']")) {
                        return $("[name='Objective']:checked").length > 0;
                    }

                    return true;
                }
            },
            messages: {

                customRule1: (model.lang() != undefined) ? model.lang().at_least_one() : '',
            }
        });
        $("#pnl8").kendoValidator({
            rules: {
                radio: function (input) {

                    if (input.attr("type") == "radio" && input.is("[name=" + input.attr("name") + "]")) {

                        ////////////////////////alert($("#pnl8").find("[type=radio][name=" + input.attr("name") + "]").is(":checked"))
                        return $("#pnl8").find("[type=radio][name=" + input.attr("name") + "]").is(":checked");
                    }
                    return true;
                },
                box: function (input) {
                    if (input.is("[name='opt4']")) {
                        return $("[name='opt4']:checked").length > 0;
                    }

                    return true
                }
            },
            messages: {
                radio: (model.lang() != undefined) ? model.lang().this_required() : '',
                box: (model.lang() != undefined) ? model.lang().this_required() : '',
            }
        }).data("kendoValidator");
        //console.log("-------------- 10a")
        $("#pnl10").kendoValidator({
            rules: {
                radio: function (input) {
                    if (input.attr("type") == "radio" && $("#pnl10").find("[type=radio][name=acquired]").is(":checked") == false) {

                        return false;

                    }
                    return true;
                },
                box: function (input) {
                    if (input.attr("type") == "checkbox" && $("#pnl10").find("[type=checkbox][name=" + input.attr("name") + "]").is(":checked") == false) {

                        return false;
                    }
                    return true;
                },
                inputtext: function (input) {
                    if (input.prop("required") && $("#pnl10").find("[type=text][name=" + input.attr("name") + "]").val() == "") {

                        return false;
                    }
                    return true;
                },
                radiorequired: function (input) {

                    if (input.attr("type") == "radio" && input.prop("required") && $("#pnl10").find("[type=radio][name=" + input.attr("name") + "]").is(":checked") == false) {

                        return false;

                    }
                    return true;
                },
            },
            messages: {
                radio: (model.lang() != undefined) ? model.lang().this_required() : '',
                box: (model.lang() != undefined) ? model.lang().this_required() : '',
                inputtext: (model.lang() != undefined) ? model.lang().this_required() : '',
            }
        }).data("kendoValidator");
        $("#pnl11").kendoValidator({
            rules: {

                box: function (input) {
                    if (input.attr("type") == "checkbox" && $("#pnl11").find("[type=checkbox][name=" + input.attr("name") + "]").is(":checked") == false) {

                        return false;
                    }
                    return true;
                },

            },
            messages: {
                box: (model.lang() != undefined) ? model.lang().this_required() : '',
            }
        }).data("kendoValidator");
        $("#pnl13").kendoValidator().data("kendoValidator");
        $("#pnl15").kendoValidator({
            rules: {
                radio: function (input) {
                    if (input.attr("type") == "radio" && $("#pnl15").find("[type=radio][name=" + input.attr("name") + "]").is(":checked") == false) {

                        return false;

                    }
                    return true;
                },
                box: function (input) {
                    if (input.attr("type") == "checkbox" && $("#pnl15").find("[type=checkbox][name=" + input.attr("name") + "]").is(":checked") == false) {

                        return false;
                    }
                    return true;
                },
                inputtext: function (input) {
                    if (input.attr("type") == "text" && input.attr("required") && $("#pnl15").find("[type=text][name=" + input.attr("name") + "]").val() == "") {
                        ////////////////////////alert("masuk")
                        return false;
                    }
                    return true;
                },

            },
            messages: {
                radio: (model.lang() != undefined) ? model.lang().this_required() : '',
                box: (model.lang() != undefined) ? model.lang().this_required() : '',
                inputtext: (model.lang() != undefined) ? model.lang().this_required() : '',
            }
        }).data("kendoValidator");
        $("#pnl16").kendoValidator().data("kendoValidator");
        $("#pnl17").kendoValidator({
            upload: function (input) {
                ////////////////////////alert("masuk")
                if (input[0].type == "file") {
                    return input.closest(".k-upload").find(".k-file").length;
                }
            }
        }).data("kendoValidator");;
        function categoryDropDownEditor(container, options) {
            $('<input required name="' + options.field + '"/>')
                .appendTo(container)
                .kendoDropDownList({
                    autoBind: false,
                    dataTextField: "CategoryName",
                    dataValueField: "CategoryID",
                    dataSource: {
                        type: "odata",
                        transport: {
                            read: "https://demos.telerik.com/kendo-ui/service/Northwind.svc/Categories"
                        }
                    }
                });
        }

        var brands = [
            { brandId: 1, name: "Ford" },
            { brandId: 2, name: "BMW" }
        ];

        // An array of all models.
        var models = [
            { modelId: 1, name: "Explorer", brandId: 1 },
            { modelId: 2, name: "Focus", brandId: 1 },
            { modelId: 3, name: "X3", brandId: 2 },
            { modelId: 4, name: "X5", brandId: 2 }
        ];
        function brandName(brandId) {
            for (var i = 0; i < brands.length; i++) {
                if (brands[i].brandId == brandId) {
                    return brands[i].name;
                }
            }
        }

        function countryName(Country_Code) {
            //console.log("--------------- ", Country_Code)
            return "nananana"
        }

        if (model.data().data_form != "null" && model.data().data_clientInfo != "null") {

            //tabpage(res.data.panel.Panel_Location);
            dt_form = model.data().data_form;
            dataform = model.data().data_clientInfo;
            ndform = model.data().data_NDForm

            if (model.data().data_taxres != undefined) {
                var data_tax = [];
                $.each(model.data().data_taxres, function (i, dt) {
                    jurisd = "";
                    data = _.find(model.data().data_country, function (o) {
                        return o.en_short_name == dt.ForeignTaxResidentCountry;
                    })
                    switch (model.urlLang()) {
                        case "en-us":
                            jurisd = data.en_short_name;
                            break;
                        case "zh-hk":
                            jurisd = data.zh_hk_short_name;
                            break;
                        case "zh-cn":
                            jurisd = data.zh_cn_short_name;
                            break;
                    }
                    data_tax.push({
                        jurisdiction: jurisd,
                        tin: dt.ForeignTaxResidentTaxIdentificationNo,
                        tin_reason: dt.ForeignTaxResidentNoTINReason,
                        taxResidentID: dt.TaxResidentID
                    });
                });
                panel11.tax_detail(data_tax);
                panel11.hk_tax(dataform.HongKongTaxResident)
                panel11.other_tax(dataform.ForeignTaxResident)


            }
        }
        //toolbar_click = function () {
        //    var grid = $(".input_grid").data("kendoGrid");
        //    var strData = JSON.stringify(grid.dataSource.view());
        //    var JsonData = JSON.parse(strData);
        //    var tinEmpty = _.filter(JsonData, function (m) { return m.tin == "" && m.tin_reason == "" })
        //    //console.log("------------ tin ", tinEmpty);
        //    if (tinEmpty.length > 0) {
        //        Swal.fire("Warning!", "please filled Tin or No Tin Reason", "warning")
        //    } else {
        //        grid.addRow();
        //    }
        //}
        //$(".input_grid").kendoGrid({
        //    dataSource: {
        //        data: panel11.tax_detail(),
        //        schema: {
        //            model: {
        //                jurisdiction: "jurisdiction",
        //                fields: {
        //                    jurisdiction: { editable: true, type: "string", validation: { required: true } },
        //                    tin: { editable: true, type: "string", validation: { required: true } },
        //                    tin_reason: { editable: true, type: "string", validation: { required: false } },
        //                    taxResidentID: { editable: false, type: "int", validation: { required: false } },
        //                }
        //            }
        //        }
        //    },
        //    toolbar: [{
        //        template: '<a class="k-button" href="\\#" onclick="return toolbar_click()">' + ((model.lang() != undefined) ? model.lang().add_record() : "") + '</a>'
        //    }],
        //    height: 250,
        //    columnMenu: true,
        //    //pageable: {
        //    //    pageSize: 2,
        //    //    responsive: true
        //    //},
        //    pageable: {
        //        refresh: true,
        //        pageSizes: true,
        //        responsive: true,
        //        buttonCount: 5

        //    },
        //    resizeable: true,
        //    columns: [
        //        {
        //            title: (model.lang() != undefined) ? model.lang().jurisdiction_res() : '',
        //            field: "jurisdiction",
        //            //media: "(min-width: 450px)",
        //            width: 250,
        //            media: "(min-width: 300px)",
        //            template: function (dt) {
        //                //console.log("---------------- nananan ", dt)
        //                if (dt.country_ != null) {
        //                    //dt.jurisdiction = dt.country_.en_short_name;
        //                    con = ""
        //                    switch (model.urlLang()) {
        //                        case "en-us":
        //                            con = dt.country_.en_short_name;
        //                            dt.jurisdiction = con;

        //                            break;
        //                        case "zh-hk":
        //                            con = dt.country_.zh_hk_short_name;
        //                            dt.jurisdiction = con;

        //                            break;
        //                        case "zh-cn":
        //                            con = dt.country_.zh_cn_short_name;
        //                            dt.jurisdiction = con;

        //                            break;
        //                    }


        //                    return con;
        //                }

        //                return dt.jurisdiction;
        //            },
        //            editor: function (container) {
        //                var input = $('<input required id="country_" name="country_">');
        //                input.appendTo(container);

        //                // initialize a dropdownlist
        //                input.kendoDropDownList({
        //                    dataSource: model.data().data_country,
        //                    dataTextField: (model.lang() != undefined) ? model.lang().optionText_nat() : '',
        //                    dataValueField: "en_short_name",
        //                    optionLabel: (model.lang() != undefined) ? model.lang().select_one_country() : '',
        //                }).appendTo(container);
        //            }
        //        },
        //        {
        //            title: (model.lang() != undefined) ? model.lang().tin() : '',
        //            field: "tin",
        //            width: 250,
        //            media: "(min-width: 300px)",
        //            //media: "(min-width: 450px)",

        //        },
        //        {
        //            title: (model.lang() != undefined) ? model.lang().No_tin_reason() : '',
        //            field: "tin_reason",
        //            width: 250,
        //            //minScreenWidth: 300,
        //            media: "(min-width: 300px)",
        //        },
        //        {
        //            command: "destroy",
        //            text: (model.lang() != undefined) ? model.lang().delete() : '',
        //            width: 100,
        //            media: "(min-width: 300px)",
        //            //media: "(min-width: 450px)",
        //            template: "<a role='button' name='nm' class='btn btn-danger k-button k-button-icontext k-grid-edit' href='##'><span class='k-icon k-i-edit'></span>open</a>"
        //        }
        //    ],
        //    editable: true,

        //});

        //console.log("-------------- 10ac")
        $("#country_code").kendoDropDownList({
            dataSource: new kendo.data.DataSource({
                data: model.data().data_country,
                pageSize: 50,
            }),
            //value: panel1.phoneCode(),
            dataTextField: 'intl_calling_code',
            dataValueField: 'intl_calling_code',

            optionLabel: (model.lang() != undefined) ? model.lang().area() : '', //(model.lang() != undefined) ? model.lang().area()
            filter: 'contains',
        });
        if (temp.viewStatus() == true) {
            ////alert("8869")
            ////console.log("---------------- 7");
            var ttl = $("#title").data("kendoDropDownList");
            if (ttl == undefined) {
                ttl1 = $("#title").kendoDropDownList({
                    optionLabel: (model.lang() != undefined) ? model.lang().select_one_title() : '',
                    dataTextField: "text",
                    dataValueField: "value",
                    dataSource: temp.title(),
                    select: function (e) {
                        var dataItem = e.dataItem;
                        panel3.title(dataItem.value);
                    }
                }).data("kendoDropDownList");
                //ttl1.value(panel3.title());
            } else {
                ttl.setOptions({ optionLabel: (model.lang() != undefined) ? model.lang().select_one_title() : '' });
            }

            //dataSource: new kendo.data.DataSource({
            //    data: model.data().data_country,
            //    pageSize: 20,
            //}),

            var nl = $("#Nationality").data("kendoDropDownList");
            if (nl == undefined) {
                $("#Nationality").kendoDropDownList({
                    optionLabel: (model.lang() != undefined) ? model.lang().select_one_nat() : '',
                    dataTextField: (model.lang() != undefined) ? model.lang().optionText_nat() : '',
                    dataValueField: "en_short_name",
                    dataSource: model.data().data_country,
                    select: function (e) {
                        var dataItem = e.dataItem;
                        //console.log(dataItem.en_short_name);
                        panel3.nationality(dataItem.en_short_name);

                        switch (dataItem.Alpha2) {
                            case "HK":
                                temp.minIDLength(8);
                                temp.maxIDLength(10);
                                //$("#id_type").data('kendoDropDownList').value("NRIC");
                                //hk.hkIDType("NRIC");
                                break;
                            case "CN":
                                temp_hk.minIDLength(1);
                                temp_hk.maxIDLength(18);
                                //$("#id_type").data('kendoDropDownList').value("NRIC");
                                //hk.hkIDType("NRIC");
                                break;
                            default:
                                temp_hk.minIDLength(50);
                                temp_hk.maxIDLength(50);
                        }
                    },
                    filter: "contains"
                }).data("kendoDropDownList");
            } else {
                nl.setOptions({ optionLabel: (model.lang() != undefined) ? model.lang().select_one_nat() : '', dataTextField: (model.lang() != undefined) ? model.lang().optionText_nat() : '' });
            }

            var ju = $("#jurisdiction").data("kendoDropDownList");
            if (ju == undefined) {
                $("#jurisdiction").kendoDropDownList({
                    optionLabel: (model.lang() != undefined) ? model.lang().select_one_country() : '',
                    dataTextField: (model.lang() != undefined) ? model.lang().optionText_nat() : '',
                    dataValueField: "en_short_name",
                    dataSource: model.data().data_country,
                    select: function (e) {
                        var dataItem = e.dataItem;
                        //console.log(dataItem.en_short_name);
                        tax.jurisdiction(dataItem.en_short_name);
                    }
                }).data("kendoDropDownList");
            } else {
                $("#jurisdiction").kendoDropDownList({
                    optionLabel: (model.lang() != undefined) ? model.lang().select_one_country() : '',
                    dataTextField: (model.lang() != undefined) ? model.lang().optionText_nat() : '',
                    dataValueField: "en_short_name",
                    dataSource: model.data().data_country,
                    //select: function (e) {
                    //    var dataItem = e.dataItem;
                    //    //console.log(dataItem.en_short_name);
                    //    tax.jurisdiction(dataItem.en_short_name);
                    //}
                }).data("kendoDropDownList");
                //ju.setOptions({ optionLabel: model.lang().select_one_country(), dataTextField: model.lang().optionText_nat() });
            }

            var nat0 = $("#Nat0").data("kendoDropDownList");
            if (nat0 == undefined) {
                $("#Nat0").kendoDropDownList({
                    optionLabel: (model.lang() != undefined) ? model.lang().select_one_citizenship() : '',
                    dataTextField: (model.lang() != undefined) ? model.lang().optionText_nat() : '',
                    dataValueField: "en_short_name",
                    dataSource: model.data().data_country,
                    select: function (e) {
                        var dataItem = e.dataItem;
                        panel3.country_citizen(dataItem.en_short_name);
                    },
                    filter: "contains"
                }).data("kendoDropDownList");
            } else {
                nat0.setOptions({ optionLabel: (model.lang() != undefined) ? model.lang().select_one_citizenship() : '', dataTextField: (model.lang() != undefined) ? model.lang().optionText_nat() : '' });
            }

            var nat1 = $("#Nat1").data("kendoDropDownList");
            if (nat1 == undefined) {
                $("#Nat0").kendoDropDownList({
                    optionLabel: (model.lang() != undefined) ? model.lang().select_one_country() : '',
                    dataTextField: (model.lang() != undefined) ? model.lang().optionText_nat() : '',
                    dataValueField: "en_short_name",
                    dataSource: model.data().data_country,
                    select: function (e) {
                        var dataItem = e.dataItem;
                        panel3.residence_country(dataItem.en_short_name);
                    },
                    filter: "contains"
                }).data("kendoDropDownList");
            } else {
                nat1.setOptions({ optionLabel: (model.lang() != undefined) ? model.lang().select_one_country() : '', dataTextField: (model.lang() != undefined) ? model.lang().optionText_nat() : '' });
            }

            var cont1 = $("#cont1").data("kendoDropDownList");
            if (cont1 == undefined) {
                $("#cont1").kendoDropDownList({
                    optionLabel: (model.lang() != undefined) ? model.lang().select_one_country() : '',
                    dataTextField: (model.lang() != undefined) ? model.lang().optionText_nat() : '',
                    dataValueField: "en_short_name",
                    dataSource: model.data().data_country,
                    select: function (e) {
                        var dataItem = e.dataItem;
                        panel13.mailing_country(dataItem.en_short_name);
                    },
                    filter: "contains",
                    enable: panel13.isSameAbove() == true,
                }).data("kendoDropDownList");
            } else {
                cont1.setOptions({ optionLabel: (model.lang() != undefined) ? model.lang().select_one_country() : '', dataTextField: (model.lang() != undefined) ? model.lang().optionText_nat() : '' });
            }


            //console.log("---------------- 12");
            var certify = $("#certify").data("kendoDropDownList");
            if (certify == undefined) {
                $("#certify").kendoDropDownList({
                    optionLabel: (model.lang() != undefined) ? model.lang().select_one_country() : '',
                    dataTextField: (model.lang() != undefined) ? model.lang().optionText_nat() : '',
                    dataValueField: "en_short_name",
                    dataSource: model.data().data_country,
                    select: function (e) {
                        var dataItem = e.dataItem;
                        panel13.mailing_country(dataItem.en_short_name);
                    },
                    filter: "contains",

                }).data("kendoDropDownList");
            } else {
                certify.setOptions({ optionLabel: (model.lang() != undefined) ? model.lang().select_one_country() : '', dataTextField: (model.lang() != undefined) ? model.lang().optionText_nat() : '' });
            }

            var pl = $("#place_of_issue").data("kendoDropDownList");
            if (pl == undefined) {
                $("#place_of_issue").kendoDropDownList({
                    optionLabel: (model.lang() != undefined) ? model.lang().select_one_place() : '',
                    dataTextField: (model.lang() != undefined) ? model.lang().optionText_nat() : '',
                    dataValueField: "en_short_name",
                    dataSource: model.data().data_country,
                    select: function (e) {
                        var dataItem = e.dataItem;
                        panel3.placeIssue(dataItem.en_short_name);
                    },
                    filter: "contains"
                }).data("kendoDropDownList");
            } else {
                pl.setOptions({ optionLabel: (model.lang() != undefined) ? model.lang().select_one_place() : '', dataTextField: (model.lang() != undefined) ? model.lang().optionText_nat() : '' });
            }

            var cb = $("#country_of_birth").data("kendoDropDownList");
            if (cb == undefined) {
                $("#country_of_birth").kendoDropDownList({
                    optionLabel: (model.lang() != undefined) ? model.lang().select_one_con() : '',
                    dataTextField: (model.lang() != undefined) ? model.lang().optionText_nat() : '',
                    dataValueField: "en_short_name",
                    dataSource: model.data().data_country,
                    select: function (e) {
                        var dataItem = e.dataItem;
                        panel3.countryBirth(dataItem.en_short_name);
                    },
                    filter: "contains"
                }).data("kendoDropDownList");
            } else {
                cb.setOptions({ optionLabel: (model.lang() != undefined) ? model.lang().select_one_con() : '', dataTextField: (model.lang() != undefined) ? model.lang().optionText_nat() : '' });
            }

            //console.log("----------------- vbankName " + tmp.data_BankName());

            var bank_name = $("#BankName").data("kendoDropDownList");
            if (bank_name == undefined) {
                $("#BankName").kendoDropDownList({
                    optionLabel: (model.lang() != undefined) ? model.lang().bank_name() : '',
                    dataTextField: 'Value',
                    dataValueField: "LookupCode",
                    dataSource: tmp.data_BankName(),
                    select: function (e) {
                        var dataItem = e.dataItem;
                        panel16.BankName(dataItem.LookupCode);
                    },
                    filter: "contains"
                }).data("kendoDropDownList");
            } else {
                /*bank_name.setOptions({ optionLabel: (model.lang() != undefined) ? model.lang().bank_name() : '' });*/
                $("#BankName").kendoDropDownList({
                    optionLabel: (model.lang() != undefined) ? model.lang().bank_name() : '',
                    dataTextField: 'Value',
                    dataValueField: "LookupCode",
                    dataSource: tmp.data_BankName(),
                    select: function (e) {
                        var dataItem = e.dataItem;
                        panel16.BankName(dataItem.LookupCode);
                    },
                    filter: "contains"
                }).data("kendoDropDownList");
            }

            //---------------- modify 2024/03/14 ----------------------
            temp.data_selectionID_type([
                { text: (model.lang() != undefined) ? model.lang().identity_card() : '', value: "NRIC" },
                { text: (model.lang() != undefined) ? model.lang().passport() : '', value: "Passport" },
            ]);
            //---------------- modify 2024/03/14 ----------------------

            var IDType = $("#IDType").data("kendoDropDownList");
            if (IDType == undefined) {
                $("#IDType").kendoDropDownList({
                    optionLabel: (model.lang() != undefined) ? model.lang().select_one_type_ID() : '',
                    dataTextField: 'text',
                    dataValueField: "value",
                    dataSource: temp.data_selectionID_type(),
                }).data("kendoDropDownList");
            } else {
                //$("#IDType").kendoDropDownList({
                //    optionLabel: (model.lang() != undefined) ? model.lang().select_one_type_ID() : '',
                //    dataTextField: 'text',
                //    dataValueField: "value",
                //    dataSource: temp.data_selectionID_type(),
                //}).data("kendoDropDownList");
                //IDType.setOptions({ optionLabel: (model.lang() != undefined) ? model.lang().select_one_type_ID() : '' });
            }

            var ex1 = $("#ex1").data("kendoDropDownList");
            ex1.setOptions({ optionLabel: (model.lang() != undefined) ? model.lang().panel6_select() : '' });
            var ex2 = $("#ex2").data("kendoDropDownList");
            ex2.setOptions({ optionLabel: (model.lang() != undefined) ? model.lang().panel6_select() : '' });
            var ex3 = $("#ex3").data("kendoDropDownList");
            ex3.setOptions({ optionLabel: (model.lang() != undefined) ? model.lang().panel6_select() : '' });
            var ex4 = $("#ex4").data("kendoDropDownList");
            ex4.setOptions({ optionLabel: (model.lang() != undefined) ? model.lang().panel6_select() : '' });
            var ex5 = $("#ex5").data("kendoDropDownList");
            ex5.setOptions({ optionLabel: (model.lang() != undefined) ? model.lang().panel6_select() : '' });
            var ex6 = $("#ex6").data("kendoDropDownList");
            ex6.setOptions({ optionLabel: (model.lang() != undefined) ? model.lang().panel6_select() : '' });
            var ex7 = $("#ex7").data("kendoDropDownList");
            ex7.setOptions({ optionLabel: (model.lang() != undefined) ? model.lang().panel6_select() : '' });

            var itl1 = $("#itl1").data("kendoDropDownList");
            if (itl1 == undefined) {
                $("#itl1").kendoDropDownList({
                    optionLabel: (model.lang() != undefined) ? model.lang().area() : '',
                    dataTextField: "intl_calling_code",
                    dataValueField: "intl_calling_code",
                    dataSource: model.data().data_country,
                    select: function (e) {
                        var dataItem = e.dataItem;
                        panel3.phoneCode(dataItem.value);
                    },
                    filter: "contains"
                }).data("kendoDropDownList");
            } else {
                itl1.setOptions({ optionLabel: (model.lang() != undefined) ? model.lang().area() : '' });
            }

            var itl2 = $("#itl2").data("kendoDropDownList");
            if (itl2 == undefined) {
                $("#itl2").kendoDropDownList({
                    optionLabel: (model.lang() != undefined) ? model.lang().area() : '',
                    dataTextField: "intl_calling_code",
                    dataValueField: "intl_calling_code",
                    dataSource: model.data().data_country,
                    select: function (e) {
                        var dataItem = e.dataItem;
                        panel3.homeAreaCode(dataItem.value);
                    },
                    filter: "contains"
                }).data("kendoDropDownList");
            } else {
                itl2.setOptions({ optionLabel: (model.lang() != undefined) ? model.lang().area() : '' });
            }

            var itl3 = $("#itl3").data("kendoDropDownList");
            if (itl3 == undefined) {
                $("#itl3").kendoDropDownList({
                    optionLabel: (model.lang() != undefined) ? model.lang().area() : '',
                    dataTextField: "intl_calling_code",
                    dataValueField: "intl_calling_code",
                    dataSource: model.data().data_country,
                    select: function (e) {
                        var dataItem = e.dataItem;
                        panel3.officeAreaCode(dataItem.value);
                    },
                    filter: "contains"
                }).data("kendoDropDownList");
            } else {
                itl3.setOptions({ optionLabel: (model.lang() != undefined) ? model.lang().area() : '' });
            }

            var owner_res = $("#owner_res").data("kendoDropDownList");
            if (owner_res == undefined) {
                $("#owner_res").kendoDropDownList({
                    optionLabel: (model.lang() != undefined) ? model.lang().select_one_owner_re() : '',
                    dataTextField: "LookupCode",
                    dataValueField: "Value",
                    dataSource: tmp.data_ownership(),
                    select: function (e) {
                        var dataItem = e.dataItem;
                        panel4.ownershipResidence(dataItem.value);
                    },
                    filter: "contains"
                }).data("kendoDropDownList");
            } else {
                owner_res.setOptions({ optionLabel: (model.lang() != undefined) ? model.lang().select_one_owner_re() : '' });
            }

            var emp_type = $("#emp_type").data("kendoDropDownList");
            if (emp_type == undefined) {
                $("#emp_type").kendoDropDownList({
                    optionLabel: (model.lang() != undefined) ? model.lang().select_one_owner_re() : '',
                    dataTextField: "LookupCode",
                    dataValueField: "Value",
                    dataSource: tmp.data_employment(),
                    select: function (e) {
                        var dataItem = e.dataItem;
                        panel4.employmentType(dataItem.value);
                    },
                    filter: "contains"
                }).data("kendoDropDownList");
            } else {
                emp_type.setOptions({ optionLabel: (model.lang() != undefined) ? model.lang().select_one_emp_type() : '' });
            }

            var industry = $("#industry").data("kendoDropDownList");
            if (industry == undefined) {
                $("#industry").kendoDropDownList({
                    optionLabel: (model.lang() != undefined) ? model.lang().select_one_industry() : '',
                    dataTextField: "LookupCode",
                    dataValueField: "Value",
                    dataSource: tmp.data_industry(),
                    select: function (e) {
                        var dataItem = e.dataItem;
                        panel4.industry(dataItem.value);
                    },
                    filter: "contains"
                }).data("kendoDropDownList");
            } else {
                industry.setOptions({ optionLabel: (model.lang() != undefined) ? model.lang().select_one_industry() : '' });
            }

            var occup = $("#occup").data("kendoDropDownList");
            if (occup == undefined) {
                $("#occup").kendoDropDownList({
                    optionLabel: (model.lang() != undefined) ? model.lang().select_one_occupation() : '',
                    dataTextField: "LookupCode",
                    dataValueField: "Value",
                    dataSource: tmp.data_occupation(),
                    select: function (e) {
                        var dataItem = e.dataItem;
                        panel4.occupation(dataItem.value);
                    },
                    filter: "contains"
                }).data("kendoDropDownList");
            } else {
                occup.setOptions({ optionLabel: (model.lang() != undefined) ? model.lang().select_one_occupation() : '' });
            }

            var off_region = $("#off_region").data("kendoDropDownList");
            if (off_region == undefined) {
                $("#off_region").kendoDropDownList({
                    optionLabel: (model.lang() != undefined) ? model.lang().select_one_office_region() : '',
                    dataTextField: (model.lang() != undefined) ? model.lang().optionText_nat() : '',
                    dataValueField: (model.lang() != undefined) ? model.lang().optionText_nat() : '',
                    dataSource: model.data().data_country,
                    select: function (e) {
                        var dataItem = e.dataItem;
                        panel4.office_region(dataItem.value);
                    },
                    filter: "contains"
                }).data("kendoDropDownList");
            } else {
                off_region.setOptions({ optionLabel: (model.lang() != undefined) ? model.lang().select_one_office_region() : '', dataTextField: (model.lang() != undefined) ? model.lang().optionText_nat() : '' });
            }

            var annualIncome = $("#annualIncome").data("kendoDropDownList");
            if (annualIncome == undefined) {
                $("#annualIncome").kendoDropDownList({
                    optionLabel: (model.lang() != undefined) ? model.lang().select_one_annual_income() : '',
                    dataTextField: "text",
                    dataValueField: "text",
                    dataSource: tmp.data_annual_income(),
                    select: function (e) {
                        var dataItem = e.dataItem;
                        panel5.annual_income(dataItem.value);
                    },
                    filter: "contains"
                }).data("kendoDropDownList");
            } else {
                annualIncome.setOptions({ optionLabel: (model.lang() != undefined) ? model.lang().select_one_annual_income() : '' });
            }

            var LiquidAssets = $("#LiquidAssets").data("kendoDropDownList");
            if (LiquidAssets == undefined) {
                $("#LiquidAssets").kendoDropDownList({
                    optionLabel: (model.lang() != undefined) ? model.lang().select_one_liquid_assets() : '',
                    dataTextField: "text",
                    dataValueField: "value",
                    dataSource: tmp.data_liquid_assets(),
                    select: function (e) {
                        var dataItem = e.dataItem;
                        panel5.liquid_assets(dataItem.value);
                    },
                    filter: "contains"
                }).data("kendoDropDownList");
            } else {
                LiquidAssets.setOptions({ optionLabel: (model.lang() != undefined) ? model.lang().select_one_liquid_assets() : '' });
            }

            var NetWorth = $("#NetWorth").data("kendoDropDownList");
            if (NetWorth == undefined) {
                $("#NetWorth").kendoDropDownList({
                    optionLabel: (model.lang() != undefined) ? model.lang().select_one_net_worth() : '',
                    dataTextField: "text",
                    dataValueField: "value",
                    dataSource: tmp.data_net_worth(),
                    select: function (e) {
                        var dataItem = e.dataItem;
                        panel5.net_worth(dataItem.value);
                    },
                    filter: "contains"
                }).data("kendoDropDownList");
            } else {
                NetWorth.setOptions({ optionLabel: (model.lang() != undefined) ? model.lang().select_one_net_worth() : '' });
            }
            ////alert("9262 " + model.lang())
            var Country = $("#Country").data("kendoDropDownList");
            if (Country == undefined) {
                ////alert("9265")
                $("#Country").kendoDropDownList({
                    optionLabel: (model.lang() != undefined) ? model.lang().seleect_con_res() : '',
                    dataTextField: (model.lang() != undefined) ? model.lang().optionText_nat() : '',
                    dataValueField: "en_short_name",
                    dataSource: model.data().data_country,
                    select: function (e) {
                        var dataItem = e.dataItem;
                        panel5.net_worth(dataItem.en_short_name);
                    },
                    filter: "contains"
                }).data("kendoDropDownList");
            } else {
                ////alert("9277")
                Country.setOptions({ optionLabel: (model.lang() != undefined) ? model.lang().seleect_con_res() : '', dataTextField: (model.lang() != undefined) ? model.lang().optionText_nat() : '' });
            }

            var panel5Industry = $("#panel5Industry").data("kendoDropDownList");
            if (panel5Industry == undefined) {
                $("#panel5Industry").kendoDropDownList({
                    optionLabel: (model.lang() != undefined) ? model.lang().select_one_industry() : '',
                    dataTextField: "LookupCode",
                    dataValueField: "Value",
                    dataSource: tmp.data_industry(),
                    select: function (e) {
                        var dataItem = e.dataItem;
                        panel5.previouse_job_industry(dataItem.value);
                    },
                    filter: "contains"
                }).data("kendoDropDownList");
            } else {
                panel5Industry.setOptions({ optionLabel: (model.lang() != undefined) ? model.lang().select_one_industry() : '' });
            }

            var fam1 = $("#fam1").data("kendoDropDownList");
            if (fam1 == undefined) {
                $("#fam1").kendoDropDownList({
                    optionLabel: (model.lang() != undefined) ? model.lang().select_one_industry() : '',
                    dataTextField: "LookupCode",
                    dataValueField: "Value",
                    dataSource: tmp.data_family_relations(),
                    select: function (e) {
                        var dataItem = e.dataItem;
                        panel5.previouse_job_industry(dataItem.value);
                    },
                    filter: "contains"
                }).data("kendoDropDownList");
            } else {
                fam1.setOptions({ optionLabel: (model.lang() != undefined) ? model.lang().select_one_relation_fam() : '' });
            }

            var fam2 = $("#fam2").data("kendoDropDownList");
            if (fam2 == undefined) {
                $("#fam2").kendoDropDownList({
                    optionLabel: (model.lang() != undefined) ? model.lang().select_one_industry() : '',
                    dataTextField: "LookupCode",
                    dataValueField: "Value",
                    dataSource: tmp.data_family_relations(),
                    select: function (e) {
                        var dataItem = e.dataItem;
                        panel5.provided_family_industry(dataItem.value);
                    },
                    filter: "contains"
                }).data("kendoDropDownList");
            } else {
                fam2.setOptions({ optionLabel: (model.lang() != undefined) ? model.lang().select_one_industry() : '' });
            }

            var fam3 = $("#fam3").data("kendoDropDownList");
            if (fam3 == undefined) {
                $("#fam3").kendoDropDownList({
                    optionLabel: (model.lang() != undefined) ? model.lang().select_one_occupation() : '',
                    dataTextField: "LookupCode",
                    dataValueField: "Value",
                    dataSource: tmp.data_occupation(),
                    select: function (e) {
                        var dataItem = e.dataItem;
                        panel5.provided_family_occupation(dataItem.value);
                    },
                    filter: "contains"
                }).data("kendoDropDownList");
            } else {
                fam3.setOptions({ optionLabel: (model.lang() != undefined) ? model.lang().select_one_occupation() : '' });
            }

            var earn1 = $("#earn1").data("kendoDropDownList");
            if (earn1 == undefined) {
                $("#earn1").kendoDropDownList({
                    optionLabel: (model.lang() != undefined) ? model.lang().select_one_inv_type() : '',
                    dataTextField: "LookupCode",
                    dataValueField: "Value",
                    dataSource: tmp.data_investment_type(),
                    select: function (e) {
                        var dataItem = e.dataItem;
                        panel5.investment_earning_type(dataItem.value);
                    },
                    filter: "contains"
                }).data("kendoDropDownList");
            } else {
                earn1.setOptions({ optionLabel: (model.lang() != undefined) ? model.lang().select_one_inv_type() : '' });
            }

            var earn4 = $("#earn4").data("kendoDropDownList");
            if (earn4 == undefined) {
                $("#earn4").kendoDropDownList({
                    optionLabel: (model.lang() != undefined) ? model.lang().select_one_inv_fund_source() : '',
                    dataTextField: "text",
                    dataValueField: "value",
                    dataSource: tmp.data_investment_fund_source(),
                    select: function (e) {
                        var dataItem = e.dataItem;
                        panel5.investment_earning_fund_source(dataItem.value);
                        if (panel5.investment_earning_fund_source() == "Previous Job") {
                            panel5.previouse_job(true)
                        }
                    },
                    filter: "contains"
                }).data("kendoDropDownList");
            } else {
                earn4.setOptions({ optionLabel: (model.lang() != undefined) ? model.lang().select_one_inv_fund_source() : '' });
            }

            var earn6 = $("#earn6").data("kendoDropDownList");
            if (earn6 == undefined) {
                $("#earn6").kendoDropDownList({
                    optionLabel: (model.lang() != undefined) ? model.lang().select_one_fund_source_propoerty() : '',
                    dataTextField: "text",
                    dataValueField: "value",
                    dataSource: tmp.data_investment_fund_source(),
                    select: function (e) {
                        var dataItem = e.dataItem;
                        panel5.rental_income_fund_source(dataItem.value);
                        if (panel5.investment_earning_fund_source() == "Previous Job") {
                            panel5.rental_income_fund_source(true)
                        }
                    },
                    filter: "contains"
                }).data("kendoDropDownList");
            } else {
                earn6.setOptions({ optionLabel: (model.lang() != undefined) ? model.lang().select_one_fund_source_propoerty() : '' });
            }

            var deriv = $("#Derivative").data("kendoDropDownList");
            if (deriv == undefined) {
                $("#Derivative").kendoDropDownList({
                    optionLabel: (model.lang() != undefined) ? model.lang().select_product() : '',
                    dataTextField: "text",
                    dataValueField: "value",
                    dataSource: tmp.data_derivative(),
                    select: function (e) {
                        var dataItem = e.dataItem;
                        panel10.knowledge(dataItem.value);
                    },
                    filter: "contains"
                }).data("kendoDropDownList");
            } else {
                //deriv.bind("change", knowledge_onchange());
                deriv.setOptions({ optionLabel: (model.lang() != undefined) ? model.lang().select_product() : '' });
            }

            $("#Derivative").on("change", function () {
                knowledge_onchange();
            })

            var pan5occ = $("#panel5ccupation").data("kendoDropDownList");
            if (pan5occ == undefined) {
                $("#panel5ccupation").kendoDropDownList({
                    optionLabel: (model.lang() != undefined) ? model.lang().se_occ() : '',
                    dataTextField: "Value",
                    dataValueField: "LookupCode",
                    dataSource: tmp.data_occupation(),
                    select: function (e) {
                        var dataItem = e.dataItem;
                        panel5.previouse_job_occupation(dataItem.value);
                    },
                    filter: "contains"
                }).data("kendoDropDownList");
            } else {
                pan5occ.setOptions({ optionLabel: (model.lang() != undefined) ? model.lang().se_occ() : '' });
            }
        }


        tmp.data_experience([
            { text: (model.lang() != undefined) ? model.lang().years13() : '', value: "1TO3", val_txt: "1 - 3 年, 1 - 3 Years" },
            { text: (model.lang() != undefined) ? model.lang().years35() : '', value: "3TO5", val_txt: "3 - 5 年, 3 - 5 Years" },
            { text: (model.lang() != undefined) ? model.lang().years510() : '', value: "5TO10", val_txt: "5 - 10 年, 5 - 10 Years" },
            { text: (model.lang() != undefined) ? model.lang().more10years() : '', value: "MT10", val_txt: "多過 10 年, More than 10 Years" },
            { text: (model.lang() != undefined) ? model.lang().less1years() : '', value: "LT1", val_txt: "少於 1 年, Less than 1 Years" },
            { text: (model.lang() != undefined) ? model.lang().no_experience() : '', value: "NOEXP", val_txt: "沒有經驗, No Experience" },
        ])

        tmp.data_derivative([
            { text: (model.lang() != undefined) ? model.lang().by_undergoing() : '', value: "Attending Course" },
            { text: (model.lang() != undefined) ? model.lang().by_gaining_prior() : '', value: "Work Experience" },
            { text: (model.lang() != undefined) ? model.lang().from_my_relevant() : '', value: "Trading Experience" },
        ])
    }

    $(".on_res").on("change", function () {
        panel13.mailing_city(panel13.residence_city());
        panel13.mailing_state(panel13.residence_state());
        panel13.mailing_postal_code(panel13.residence_postal_code());
    });

    $("#Nat0").kendoDropDownList({
        enable: false
    });

    $("#Nat1").kendoDropDownList({
        enable: false
    });
    var haveAECODE = getUrlOAOParameter("AECode");
    if (haveAECODE != undefined) {
        $("#non_mainland").on("click", function () {
            window.location.href = "https://psgca.iqdii.com/view/accountopening/psg/#/?lang=chs&org=psg&channel=30&custno=&openaccttype=0&typeno=&fromcomp=jyb&currentClient=0&recommend=" + haveAECODE
        });

    } else {
        $("#non_mainland").on("click", function () {
            window.location.href = "https://psgca.iqdii.com/view/accountopening/psg/#/?lang=chs&org=psg&channel=30&custno=&openaccttype=0&typeno=&fromcomp=jyb&currentClient=0"
        });

    }

    $('.noneEnglish1').on('change', function () {
        event.preventDefault();
        $val = $(this).val();
        arrtext = $val.split("");
        //console.log(arrtext)
        $.each(arrtext, function (i, dt) {
            res = /[\u3000\u3400-\u4DBF\u4E00-\u9FFF\D]/g.test(dt);
            if (res == false) {
                panel3.NonEnglishSurname("");
            }
        })

    });
    $('.noneEnglish2').on('change', function () {
        event.preventDefault();
        $val = $(this).val();
        arrtext = $val.split("");
        //console.log(arrtext)
        $.each(arrtext, function (i, dt) {
            res = /[\u3000\u3400-\u4DBF\u4E00-\u9FFF\D]/g.test(dt);
            if (res == false) {
                panel3.NoneEnglishName("");
            }
        })

    });

    //$('.english1').on('change', function () {
    //    event.preventDefault();
    //    $val = $(this).val();
    //    arrtext = $val.split("");
    //    //console.log(arrtext)
    //    $.each(arrtext, function (i, dt) {
    //        res = /[a-zA-Z\s]/ig.test(dt);
    //        if (res == false) {
    //            panel3.eng_surename("");
    //        }
    //    })

    //});

    //$('.english2').on('change', function () {
    //    event.preventDefault();
    //    $val = $(this).val();
    //    arrtext = $val.split("");
    //    //console.log(arrtext)
    //    $.each(arrtext, function (i, dt) {
    //        res = /[a-zA-Z\s]/ig.test(dt);
    //        if (res == false) {
    //            panel3.eng_name("");
    //        }
    //    })

    //});

    load_new_tabel();
    if (model.countryCode() != undefined && model.countryCode() != "" && model.countryCode() != null) {
        //console.log(model.countryCode() + "====")
        ccode = _.filter(model.data().data_country, function (x) {
            return x.intl_calling_code == model.countryCode();
        });

        if (ccode != undefined) {

            $("#country_code").kendoDropDownList({
                dataSource: new kendo.data.DataSource({
                    data: ccode,
                    pageSize: 50,
                }),
                //value: panel1.phoneCode(),
                dataTextField: 'intl_calling_code',
                dataValueField: 'intl_calling_code',

                optionLabel: (model.lang() != undefined) ? model.lang().area() : '', //(model.lang() != undefined) ? model.lang().area()
                filter: 'contains',
            });

            var clist = $("#country_code").data("kendoDropDownList");
            clist.value(model.countryCode());
        }
    }

    if (isMobileP == true) {
        //$(".body-content").removeClass("container");
        //$(".body-content").attr('style', 'margin-bottom: 50px !important;margin-top: 10px !important');
        //$(".body-content").show()
    }

    if (isIntranet == '1' && $("#tab-cont").length > 0) {

        checkElement = setInterval(function () {
            if ($("#tab-cont").length > 0) {
                $("#tab-cont").remove();
            } else {
                clearInterval(checkElement);
            }
        }, 100);
    }

    $("#mail_1").on("keyup", function () {
        var value = $(this).val();
        var arr_sug = [];
        var em_val = (value).split("@")[0];
        $.each(email_domain_list, function (i, dt) {
            if (dt != "") {
                var sug = em_val + "@" + dt;
                arr_sug.push(sug)
                //console.log(arr_sug)
            }
        })

        temp.sugestionEmail(arr_sug);
    })

    $("#email_client .typeahead").typeahead({
        hint: true,
        highlight: true,
        minLength: 1,
        name: "Email",
        source: function (query, process) {
            return process(temp.sugestionEmail());
        }
    });

});

