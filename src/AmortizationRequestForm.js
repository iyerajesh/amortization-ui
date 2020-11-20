import React from 'react';
import './style.css';
import axios from "axios";
import ReactTable from "react-table";
import 'react-table/react-table.css'

const amortizationServiceURL = "http://localhost:8080/payments/amortization/schedule/";

class AmortizationRequestForm extends React.Component {

    constructor() {
        super();
        this.state = {
            fields: {},
            errors: {}
        }

        this.handleChange = this.handleChange.bind(this);
        this.submitAmortizationRequest = this.submitAmortizationRequest.bind(this);

    };

    handleChange(e) {
        let fields = this.state.fields;
        fields[e.target.name] = e.target.value;
        this.setState({
            fields
        });
    }

    submitAmortizationRequest(e) {
        e.preventDefault();

        if (this.validateForm()) {

            axios.defaults.headers.post['Content-Type'] = 'application/json;charset=utf-8';
            axios
                .post(`${amortizationServiceURL}`, {
                    loanAmount: this.state.fields.loanAmount,
                    interestRate: this.state.fields.interestRate,
                    loanTerm: this.state.fields.loanTerm
                })
                .then((response) => {
                    this.setState({loading: false, amortization: response.data})
                })
                .catch((error) => {
                    alert("Error from the server: " + error);
                });
        }

    }

    validateForm() {

        let fields = this.state.fields;
        let errors = {};
        let formIsValid = true;

        if (!fields["loanAmount"]) {
            formIsValid = false;
            errors["loanAmount"] = "*Please enter your Loan Amount.";
        }

        if (typeof fields["loanAmount"] !== "undefined") {
            if (!fields["loanAmount"].match(/^[1-9]\d*$/)) {
                formIsValid = false;
                errors["loanAmount"] = "* Please enter a positive number.";
            }
        }

        if (!fields["interestRate"]) {
            formIsValid = false;
            errors["interestRate"] = "*Please enter your interest-rate.";
        }

        if (typeof fields["interestRate"] !== "undefined") {
            if (!fields["interestRate"].match(/^\d{1,2}(\.\d{1,2})?$/)) {
                formIsValid = false;
                errors["interestRate"] = "* Please enter a valid interest rate value!.";
            }
        }

        if (!fields["loanTerm"]) {
            formIsValid = false;
            errors["loanTerm"] = "*Please enter your loan term.";
        }

        if (typeof fields["loanTerm"] !== "undefined") {
            if (!fields["loanTerm"].match(/^[1-9]\d*$/)) {
                formIsValid = false;
                errors["loanTerm"] = "*Please enter a valid loan term!.";
            }
        }

        this.setState({
            errors: errors
        });
        return formIsValid;


    }

    render() {

        const columns = [{
            Header: 'Month',
            accessor: 'month',
        }
            ,{
                Header: 'Starting Balance',
                accessor: 'starting-balance' ,
            }
            ,{
                Header: 'Fixed Payment',
                accessor: 'fixed-payment' ,
            }
            ,{
                Header: 'Principal Payment',
                accessor: 'principal-payment' ,
            }

            ,{
                Header: 'Interest Payment',
                accessor: 'interest-payment' ,
            }
            ,{
                Header: 'Ending Balance',
                accessor: 'ending-balance',
            },
            {
                Header: 'Total Interest',
                accessor: 'total-interest',
            }
        ]
        return (
            <section className="amortization-request-form">
                <div id="main-registration-container">
                    <div id="register">
                        <h3>Please enter your Amortization request.</h3>
                        <form method="post" name="userRegistrationForm" onSubmit={this.submitAmortizationRequest}>
                            <label>Loan Amount:</label>
                            <input type="text" name="loanAmount" value={this.state.fields.username}
                                   onChange={this.handleChange}/>
                            <div className="errorMsg">{this.state.errors.loanAmount}</div>
                            <label>Interest Rate:</label>
                            <input type="text" name="interestRate" value={this.state.fields.interestRate}
                                   onChange={this.handleChange}/>
                            <div className="errorMsg">{this.state.errors.interestRate}</div>
                            <label>Loan Term:</label>
                            <input type="text" name="loanTerm" value={this.state.fields.loanTerm}
                                   onChange={this.handleChange}/>
                            <div className="errorMsg">{this.state.errors.loanTerm}</div>

                            <input type="submit" className="button" value="Get Amortization Data"/>
                        </form>
                    </div>
                </div>

                <p>Amortization Table</p>
                <ReactTable
                    data={this.state.amortization}
                    columns={columns}
                />
            </section>
        );
    }
}

export default AmortizationRequestForm;
