import React, { Component } from 'react'
import { connect } from 'react-redux'
import Appbar from '../components/Appbar'

class AllExpenses extends Component {
    render() {
        return (
            <article>
                <Appbar title="All Entries" />
            </article>
        )
    }
}

const mapStateToProps = ({expenses}) => ({
    expenses
});

const mapDispatchToProps = {
    
} 

export default connect(mapStateToProps, mapDispatchToProps)(AllExpenses)
