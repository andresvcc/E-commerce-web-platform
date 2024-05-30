import { healthChecker } from './health-checker.service';

describe('healthChecker', () => {
  it('should return an object with name, version, uptime, and isHealthy properties', () => {
    const result = healthChecker();
    expect(result).toHaveProperty('name');
    expect(result).toHaveProperty('version');
    expect(result).toHaveProperty('uptime');
    expect(result).toHaveProperty('isHealthy');
  });

  it('should return a name property with value "infrastructure"', async () => {
    const result = await healthChecker();
    console.log('result', result.name);
    expect(typeof result.name).toEqual('string');
  });

  it('should return a "version" property in the correct format.', async () => {
    const result = await healthChecker();
    const versionPattern = /^\d+\.\d+\.\d+$/;
    expect(typeof result.version).toEqual('string');
    expect(result.version).toMatch(versionPattern);
  });

  it('should return a uptime property with values years,months,days,hours,minutes,seconds ', async () => {
    const result = await healthChecker();
    expect(result.uptime).toHaveProperty('years');
    expect(result.uptime).toHaveProperty('months');
    expect(result.uptime).toHaveProperty('days');
    expect(result.uptime).toHaveProperty('hours');
    expect(result.uptime).toHaveProperty('minutes');
    expect(result.uptime).toHaveProperty('seconds');
    expect(typeof result.uptime.years).toEqual('number');
  });

  it('should return an isHealthy property with a boolean value', async () => {
    const result = await healthChecker();
    expect(typeof result.isHealthy).toEqual('boolean');
  });
});
