import React from 'react'
import Table from 'react-bootstrap/Table';


const ReportTable = () => {

    const users = [
        { id: 1, firstName: 'John', lastName: 'Doe', squadron: 'Alpha', flight: 'A1', module1: '100%', module2: '50%', module3: '0%' },
        { id: 2, firstName: 'Jane', lastName: 'Smith', squadron: 'Bravo', flight: 'B2', module1: '75%', module2: '100%', module3: '25%' },
        { id: 3, firstName: 'Alice', lastName: 'Johnson', squadron: 'Charlie', flight: 'C3', module1: '50%', module2: '50%', module3: '100%' },
        { id: 4, firstName: 'Bob', lastName: 'Brown', squadron: 'Delta', flight: 'D4', module1: '100%', module2: '100%', module3: '100%' },
        { id: 1, firstName: 'John', lastName: 'Doe', squadron: 'Alpha', flight: 'A1', module1: '100%', module2: '50%', module3: '0%' },
        { id: 2, firstName: 'Jane', lastName: 'Smith', squadron: 'Bravo', flight: 'B2', module1: '75%', module2: '100%', module3: '25%' },
        { id: 3, firstName: 'Alice', lastName: 'Johnson', squadron: 'Charlie', flight: 'C3', module1: '50%', module2: '50%', module3: '100%' },
        { id: 4, firstName: 'Bob', lastName: 'Brown', squadron: 'Delta', flight: 'D4', module1: '100%', module2: '100%', module3: '100%' },
        { id: 1, firstName: 'John', lastName: 'Doe', squadron: 'Alpha', flight: 'A1', module1: '100%', module2: '50%', module3: '0%' },
        { id: 2, firstName: 'Jane', lastName: 'Smith', squadron: 'Bravo', flight: 'B2', module1: '75%', module2: '100%', module3: '25%' },
        { id: 3, firstName: 'Alice', lastName: 'Johnson', squadron: 'Charlie', flight: 'C3', module1: '50%', module2: '50%', module3: '100%' },
        { id: 4, firstName: 'Bob', lastName: 'Brown', squadron: 'Delta', flight: 'D4', module1: '100%', module2: '100%', module3: '100%' },
    ];
    return (
        <div className='my-4'>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th></th>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Squadron</th>
                        <th>Flight</th>
                        <th>Module 1 - Status</th>
                        <th>Module 2 - Status</th>
                        <th>Module 3 - Status</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user, index) => (
                        <tr key={user.id}>
                            <td>{index + 1}</td>
                            <td>{user.firstName}</td>
                            <td>{user.lastName}</td>
                            <td>{user.squadron}</td>
                            <td>{user.flight}</td>
                            <td>{user.module1}</td>
                            <td>{user.module2}</td>
                            <td>{user.module3}</td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </div>
    )
}

export default ReportTable
