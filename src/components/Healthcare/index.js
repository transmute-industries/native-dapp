import React, { Component } from 'react';
import { connect } from 'react-redux';
import SelectEventStoreCard from './SelectEventStoreCard';
// import PatientEventsTable from './PatientEventsTable';
// import PatientSummaryCard from './PatientSummaryCard';
import { Row, Column as Col } from 'react-native-flexbox-grid';
import { Container, Header, Content } from 'native-base';

class HealthcareDemo extends Component {
    render() {
        return (
            <Container>
                <Header />
                <Content>
                    <Row size={12}>
                        <Col sm={12} md={12} md={12}>
                            <SelectEventStoreCard />
                        </Col>
                        {/* <Col sm={12} md={12} md={12}>
                            <PatientSummaryCard />
                        </Col>
                        <Col sm={12} md={12} md={12}>
                            <PatientEventsTable />
                        </Col> */}
                    </Row>
                </Content>
            </Container>
        );
    }
}

export default connect((state) => ({
    transmute: state.transmute
}))(HealthcareDemo);