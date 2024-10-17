export class SnowflakeIdUtil {
    private static readonly twepoch = 1325376000000; // January 1, 1954 00:00:00 UTC
    private static readonly sequenceBits = 12; // Sequence bits
    private static readonly workerIdBits = 5; // Worker ID bits
    private static readonly datacenterIdBits = 5; // Datacenter ID bits
    private static readonly sequenceMask = -1 ^ (-1 << SnowflakeIdUtil.sequenceBits); // Sequence mask
    private static readonly workerIdShift = SnowflakeIdUtil.sequenceBits; // Worker ID shift
    private static readonly datacenterIdShift = SnowflakeIdUtil.sequenceBits + SnowflakeIdUtil.workerIdBits; // Datacenter ID shift
    private static readonly timestampLeftShift = SnowflakeIdUtil.sequenceBits + SnowflakeIdUtil.workerIdBits + SnowflakeIdUtil.datacenterIdBits; // Timestamp left shift

    private static sequence = 0; // Sequence number
    private static lastTimestamp = -1; // Last timestamp
    private static workerId: number = 1; // Worker ID
    private static datacenterId: number = 1; // Datacenter ID

    private static tilNextMillis(lastTimestamp: number): number {
        let timestamp = Date.now();
        while (timestamp <= lastTimestamp) {
            timestamp = Date.now();
        }
        return timestamp;
    }

    public static nextId(): number {
        let timestamp = Date.now();
        if (timestamp < SnowflakeIdUtil.lastTimestamp) {
            throw new Error(`Clock is moving backwards. Rejecting requests until ${SnowflakeIdUtil.lastTimestamp}`);
        }
        if (SnowflakeIdUtil.lastTimestamp === timestamp) {
            SnowflakeIdUtil.sequence = (SnowflakeIdUtil.sequence + 1) & SnowflakeIdUtil.sequenceMask;
            if (SnowflakeIdUtil.sequence === 0) {
                timestamp = SnowflakeIdUtil.tilNextMillis(SnowflakeIdUtil.lastTimestamp);
            }
        } else {
            SnowflakeIdUtil.sequence = 0;
        }
        SnowflakeIdUtil.lastTimestamp = timestamp;
        return ((timestamp - SnowflakeIdUtil.twepoch) << SnowflakeIdUtil.timestampLeftShift) |
            (SnowflakeIdUtil.datacenterId << SnowflakeIdUtil.datacenterIdShift) |
            (SnowflakeIdUtil.workerId << SnowflakeIdUtil.workerIdShift) |
            SnowflakeIdUtil.sequence;
    }
}