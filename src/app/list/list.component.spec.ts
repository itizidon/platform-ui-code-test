import { ListComponent } from './list.component';

describe('ListComponent', () => {
  let component: ListComponent;

  beforeEach(() => {
    component = new ListComponent();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('unselected providers', () => {
    it('should have an initial length of 3', () => {
      expect(component.unselectedProviders.length).toEqual(3);
    });

    it('should have an id', () => {
      expect(component.unselectedProviders[0].id).toEqual('1');
    });

    it('should have a name', () => {
      expect(component.unselectedProviders[0].name).toEqual('John');
    });

    it('should have an address', () => {
      expect(component.unselectedProviders[0].address).toEqual('123 Greenway Blvd');
    });

    it('should have a phone', () => {
      expect(component.unselectedProviders[0].phone).toEqual('8991234321');
    });
  });

  describe('selected providers', () => {
    it('should have no initial length', () => {
      expect(component.selectedProviders.length).toEqual(0);
    });
  });
  describe('added to selected providers', () => {
    it('it should add 1 provider to selectedProviders table', () => {
      component.addProvider({
        id: '1',
        name: 'John',
        address: '123 Greenway Blvd',
        phone: '8991234321'
      }, true)

      component.changeToggle()
      expect(component.selectedProviders.length).toEqual(1);
    })
    it('it should add 2 provider to selectedProviders table', () => {
      component.addProvider({
        id: '1',
        name: 'John',
        address: '123 Greenway Blvd',
        phone: '8991234321'
      }, true)
      component.addProvider({
        id: '2',
        name: 'Don',
        address: '456 Apple Street',
        phone: '8994257642'
      }, true)

      component.changeToggle()
      expect(component.selectedProviders.length).toEqual(2);
    })

    it('should ignore multiple add requests based on checked/unchecked',()=>{
      component.addProvider({
        id: '1',
        name: 'John',
        address: '123 Greenway Blvd',
        phone: '8991234321'
      }, true)
      component.addProvider({
        id: '1',
        name: 'John',
        address: '123 Greenway Blvd',
        phone: '8991234321'
      }, false)

      component.changeToggle()
      expect(component.selectedProviders.length).toEqual(1);
    })
  })
  describe('changeToggle should change selectedToggle to true or false',()=>{
    it('should switch toggle state',()=>{
      component.changeToggle()
      component.changeToggle()
      expect(component.selectedToggle).toBe(true)
      component.changeToggle()
      expect(component.selectedToggle).toBe(false)
      component.changeToggle()
      component.changeToggle()
      component.changeToggle()
      expect(component.selectedToggle).toBe(true)
    })
  })
  describe('changeToggle should remove providers when selectedToggle is false', () => {
    it('should remove John', () => {
      component.addProvider({
        id: '1',
        name: 'John',
        address: '123 Greenway Blvd',
        phone: '8991234321'
      }, true)
      component.addProvider({
        id: '2',
        name: 'Don',
        address: '456 Apple Street',
        phone: '8993456312'
      }, true)
      component.addProvider({
        id: '3',
        name: 'Kathy',
        address: '525 Kat Ave',
        phone: '8992345641'
      }, true)
      component.changeToggle()
      expect(component.selectedToggle).toEqual(false)
      expect(component.selectedProviders.length).toEqual(3)
      component.addProvider({
        id: '1',
        name: 'John',
        address: '123 Greenway Blvd',
        phone: '8991234321'
      }, true)
      component.changeToggle()

      expect(component.selectedToggle).toEqual(true)
      expect(component.selectedProviders.length).toEqual(2)
    })
  })
  describe('updates local storage',()=>{
    it('saves selectedToggle',()=>{
      component.addProvider({
        id: '1',
        name: 'John',
        address: '123 Greenway Blvd',
        phone: '8991234321'
      }, true)
      component.addProvider({
        id: '2',
        name: 'Don',
        address: '456 Apple Street',
        phone: '8993456312'
      }, true)
      component.addProvider({
        id: '3',
        name: 'Kathy',
        address: '525 Kat Ave',
        phone: '8992345641'
      }, true)
      component.changeToggle()

      expect(component.selectedProviders.length).toEqual(3)
      expect(JSON.parse(localStorage.getItem('selectedProviders')).length).toEqual(3)
    })
  })
});
