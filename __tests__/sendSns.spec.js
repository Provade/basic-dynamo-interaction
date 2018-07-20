// TODO 
// Send an SNS (Email) to the topic ARN (Amazon reference number) when we call this method
// Async

'use strict'

const sut = require('../awsInteractions')

describe('Sending SNS', () => {
    it('Should prove the SUT exists', async () => {
        expect.assertions(1)
        expect(sut).toBeDefined()
    })

    it('Should prove specified method in SUT exists', async () => {
        expect.assertions(1)
        expect(sut.sendSns).toBeDefined()
    })

    it('Should return success when given valid params', async () => {
        expect.assertions(1)
        const result = await sut.sendSns(mockSns, 'ARN1234', 'x', 'y')
        expect(result).toEqual({ message: 'SUCCESS' })
    })

    it('Should throw error when given invalid params', async () => {
        expect.assertions(1)
        await expect(sut.sendSns(mockSns, null, '', '')).rejects.toEqual({ message: 'ERROR' })
    })
})

const mockSns = {
    publish: (params) => {
        if (!params.TopicArn) {
            return { promise: jest.fn().mockImplementation(() => Promise.reject({ message: 'ERROR' })) }
        }
        return { promise: jest.fn().mockImplementation(() => Promise.resolve({ message: 'SUCCESS' })) }
    }
}