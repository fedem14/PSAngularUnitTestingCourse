import {MessageService} from './message.service';


describe('Message Service', () => {
  let service: MessageService;

  // beforeEach(() => {
  //   service = new MessageService();
  // });

  it('should have no messages', () => {
    service = new MessageService();
    expect(service.messages.length).toBe(0);
  });

  it('should add a message when add is called', () => {
    service = new MessageService();
    service.add('message1');
    expect(service.messages.length).toBe(1);
  });

  it('should remove all messages', () => {
    service = new MessageService();
    service.add('message1');

    service.clear();

    expect(service.messages.length).toBe(0);
  });
});
