import React from 'react'
import Table from 'react-bootstrap/Table';


const ReportTable = () => {

    const users = [
        { id: 1, firstName: 'John', lastName: 'Doe', squadron: 'N/A', flight: 'N/A', module1: 100, module2: 50, module3: 0 },
        { id: 2, firstName: 'Jane', lastName: 'Smith', squadron: 'N/A', flight: 'N/A', module1: 75, module2: 100, module3: 25 },
        { id: 3, firstName: 'Alice', lastName: 'Johnson', squadron: 'N/A', flight: 'N/A', module1: 50, module2: 50, module3: 100 },
        { id: 4, firstName: 'Bob', lastName: 'Brown', squadron: 'N/A', flight: 'N/A', module1: 100, module2: 100, module3: 100 },
        { id: 5, firstName: 'John', lastName: 'Doe', squadron: 'N/A', flight: 'N/A', module1: 100, module2: 50, module3: 0 },
        { id: 6, firstName: 'Jane', lastName: 'Smith', squadron: 'N/A', flight: 'N/A', module1: 75, module2: 100, module3: 25 },
        { id: 7, firstName: 'Alice', lastName: 'Johnson', squadron: 'N/A', flight: 'N/A', module1: 50, module2: 50, module3: 100 },
        { id: 8, firstName: 'Bob', lastName: 'Brown', squadron: 'N/A', flight: 'N/A', module1: 100, module2: 100, module3: 100 },
        { id: 9, firstName: 'John', lastName: 'Doe', squadron: 'N/A', flight: 'N/A', module1: 100, module2: 50, module3: 0 },
        { id: 10, firstName: 'Jane', lastName: 'Smith', squadron: 'N/A', flight: 'N/A', module1: 75, module2: 100, module3: 25 },
        { id: 11, firstName: 'Alice', lastName: 'Johnson', squadron: 'N/A', flight: 'N/A', module1: 50, module2: 50, module3: 100 },
        { id: 12, firstName: 'Bob', lastName: 'Brown', squadron: 'N/A', flight: 'N/A', module1: 100, module2: 100, module3: 100 },
    ];


    const getStatusIcon = (progress) => {
        if (progress === 100) return <i class="bi bi-check-circle text-success"></i>;
        if (progress === 0) return <i className="bi bi-x-circle text-danger"></i>;
        return <i className="bi bi-clock text-warning"></i>;
    };

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
                        <th>STINFO - Status</th>
                        <th>Records Management - Status</th>
                        <th>No FEAR Act - Status</th>
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
                            <td>{getStatusIcon(user.module1)} {user.module1}%</td>
                            <td>{getStatusIcon(user.module2)} {user.module2}%</td>
                            <td>{getStatusIcon(user.module3)} {user.module3}%</td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </div>
    )
}

export default ReportTable
