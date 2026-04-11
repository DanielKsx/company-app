const Employee = require('../employee.model.js');
const expect = require('chai').expect;

describe('Employee', () => {
    it('should throw an error if no "firstName" arg', () => {
        const emp = new Employee({
            lastName: 'Doe',
            department: 'IT',
        });

        const err = emp.validateSync();

        expect(err.errors.firstName).to.exist;
    });

    it('should throw an error if no "lastName" arg', () => {
        const emp = new Employee({
            firstName: 'John',
            department: 'IT',
        });

        const err = emp.validateSync();

        expect(err.errors.lastName).to.exist;
    });

    it('should throw an error if no "department" arg', () => {
        const emp = new Employee({
            firstName: 'John',
            lastName: 'Doe',
        });

        const err = emp.validateSync();

        expect(err.errors.department).to.exist;
    });

    it('should not throw an error if all args are correct', () => {
        const emp = new Employee({
            firstName: 'John',
            lastName: 'Doe',
            department: 'IT',
        });

        const err = emp.validateSync();

        expect(err).to.be.undefined;
    });
});