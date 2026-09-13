// data > logo > model > (fault - price)
export const serviceData = [
  // logo - iphone -----------------
  {
    _id: 1,
    logo: 'iphone',
    model: [
      // model - 10
      {
        value: '10',
        fault: [
          // fault - 10
          { value: 'lcd', price: 100 },
          { value: 'battery', price: 50 },
          { value: 'no power', price: 150 }
        ]
      },
      // model - 11
      {
        value: '11',
        fault: [
          // fault - 11
          { value: 'lcd', price: 110 },
          { value: 'battery', price: 60 },
          { value: 'no power', price: 160 }
        ]
      }
    ]
  },
  // logo - redmi --------------------
  {
    _id: 2,
    logo: 'redmi',
    model: [
      // model - note 9
      {
        value: 'note 9',
        fault: [
          // fault - note 9
          { value: 'lcd', price: 80 },
          { value: 'battery', price: 30 },
          { value: 'no power', price: 110 }
        ]
      },
      // model - note 10
      {
        value: 'note 10',
        fault: [
          // fault - note 10
          { value: 'lcd', price: 70 },
          { value: 'battery', price: 40 },
          { value: 'no power', price: 120 }
        ]
      }
    ]
  },
  {
    _id: 3,
    logo: 'realmi',
    model: [
      // model - note 10 pro
      {
        value: 'note 10 pro',
        fault: [
          // fault - note 10 pro
          { value: 'lcd', price: 150 },
          { value: 'battery', price: 50 },
          { value: 'no power', price: 120 }
        ]
      },
      // model - note 11 pro
      {
        value: 'note 11 pro',
        fault: [
          // fault - note pro
          { value: 'lcd', price: 180 },
          { value: 'battery', price: 60 },
          { value: 'no power', price: 220 }
        ]
      }
    ]
  }
]

// --------------customer data ( group by date ) -------------------

const ranPrice = Math.round(Math.random() * 1000)
const ranDay = Math.round(Math.random() * 100)
const ranMonth = Math.round(Math.random() * 10)
const ranYear = Math.round(Math.random() * 1000)

export const customerData = [
  // monthly result
  {
    _id: '5.8.2026',
    totalResult: 1000,
    count: 12,
    success: 4,
    fail: 2,
    // customer info
    customers: [
      // cus 1
      {
        _id: 1,
        name: 'user-1',
        model: 'model-1',
        IMEI: 'imei-1',
        fault: 'fault-1',
        price: ranPrice,
        expense: ranPrice,
        isFinish: 'repairing',
        isTake: false,
        seNumb: 1,
        createdAt: `${ranDay}.${ranMonth}.${ranYear}`
      },
      // cus 2
      {
        _id: 2,
        name: 'user-2',
        model: 'model-2',
        IMEI: 'imei-2',
        fault: 'fault-2',
        price: ranPrice,
        expense: ranPrice,
        isFinish: 'repairing',
        isTake: false,
        seNumb: 2,
        createdAt: `${ranDay}.${ranMonth}.${ranYear}`
      },
      // cus 3
      {
        _id: 3,
        name: 'user-3',
        model: 'model-3',
        IMEI: 'imei-3',
        fault: 'fault-3',
        price: ranPrice,
        expense: ranPrice,
        isFinish: 'repairing',
        isTake: false,
        seNumb: 3,
        createdAt: `${ranDay}.${ranMonth}.${ranYear}`
      }
    ]
  },
  // monthly result
  {
    _id: '2.7.2026',
    totalResult: 1000,
    count: 8,
    success: 9,
    fail: 5,
    // customer info
    customers: [
      // cus 1
      {
        _id: 1,
        name: 'user-4',
        model: 'model-4',
        IMEI: 'imei-4',
        fault: 'fault-4',
        price: ranPrice,
        expense: ranPrice,
        isFinish: 'repairing',
        isTake: false,
        seNumb: 4,
        createdAt: `${ranDay}.${ranMonth}.${ranYear}`
      },
      // cus 2
      {
        _id: 2,
        name: 'user-5',
        model: 'model-5',
        IMEI: 'imei-5',
        fault: 'fault-5',
        price: ranPrice,
        expense: ranPrice,
        isFinish: 'repairing',
        isTake: false,
        seNumb: 5,
        createdAt: `${ranDay}.${ranMonth}.${ranYear}`
      },
      // cus 3
      {
        _id: 3,
        name: 'user-6',
        model: 'model-6',
        IMEI: 'imei-6',
        fault: 'fault-6',
        price: ranPrice,
        expense: ranPrice,
        isFinish: 'repairing',
        isTake: false,
        seNumb: 6,
        createdAt: `${ranDay}.${ranMonth}.${ranYear}`
      }
    ]
  },
  // monthly result
  {
    _id: '1.4.2026',
    totalResult: 1000,
    count: 18,
    success: 14,
    fail: 4,
    // customer info
    customers: [
      // cus 1
      {
        _id: 1,
        name: 'user-7',
        model: 'model-7',
        IMEI: 'imei-7',
        fault: 'fault-7',
        price: ranPrice,
        expense: ranPrice,
        isFinish: 'repairing',
        isTake: false,
        seNumb: 7,
        createdAt: `${ranDay}.${ranMonth}.${ranYear}`
      },
      // cus 2
      {
        _id: 2,
        name: 'user-8',
        model: 'model-8',
        IMEI: 'imei-8',
        fault: 'fault-8',
        price: ranPrice,
        expense: ranPrice,
        isFinish: 'repairing',
        isTake: false,
        seNumb: 8,
        createdAt: `${ranDay}.${ranMonth}.${ranYear}`
      },
      // cus 3
      {
        _id: 3,
        name: 'user-9',
        model: 'model-9',
        IMEI: 'imei-9',
        fault: 'fault-9',
        price: ranPrice,
        expense: ranPrice,
        isFinish: 'repairing',
        isTake: false,
        seNumb: 9,
        createdAt: `${ranDay}.${ranMonth}.${ranYear}`
      }
    ]
  }
]

// -------------------- get all customers --------------------
export const getAllCustomers = [
  {
    _id: 1,
    name: 'user-1',
    model: 'model-1',
    IMEI: 'imei-1',
    fault: 'fault-1',
    price: ranPrice,
    expense: ranPrice,
    isFinish: 'repairing',
    isTake: false,
    seNumb: 1,
    createdAt: `${ranDay}.${ranMonth}.${ranYear}`
  },
  {
    _id: 2,
    name: 'user-2',
    model: 'model-2',
    IMEI: 'imei-2',
    fault: 'fault-2',
    price: ranPrice,
    expense: ranPrice,
    isFinish: 'repairing',
    isTake: false,
    seNumb: 2,
    createdAt: `${ranDay}.${ranMonth}.${ranYear}`
  },
  {
    _id: 3,
    name: 'user-3',
    model: 'model-3',
    IMEI: 'imei-3',
    fault: 'fault-3',
    price: ranPrice,
    expense: ranPrice,
    isFinish: 'repairing',
    isTake: false,
    seNumb: 3,
    createdAt: `${ranDay}.${ranMonth}.${ranYear}`
  },
  {
    _id: 4,
    name: 'user-4',
    model: 'model-4',
    IMEI: 'imei-4',
    fault: 'fault-4',
    price: ranPrice,
    expense: ranPrice,
    isFinish: 'repairing',
    isTake: false,
    seNumb: 4,
    createdAt: `${ranDay}.${ranMonth}.${ranYear}`
  },
  {
    _id: 5,
    name: 'user-5',
    model: 'model-5',
    IMEI: 'imei-5',
    fault: 'fault-5',
    price: ranPrice,
    expense: ranPrice,
    isFinish: 'repairing',
    isTake: false,
    seNumb: 5,
    createdAt: `${ranDay}.${ranMonth}.${ranYear}`
  },
]
