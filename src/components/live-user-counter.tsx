"use client";

import { useState, useEffect } from "react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { RiUser3Line } from "react-icons/ri";
import { simulateLiveUserCount } from "@/lib/real-time-service";

export function LiveUserCounter() {
  const [liveUsers, setLiveUsers] = useState<number>(0);
  const [pulseEffect, setPulseEffect] = useState(false);
  
  useEffect(() => {
    // Initial count
    setLiveUsers(simulateLiveUserCount());
    
    // Update every 3-7 seconds randomly
    const intervalId = setInterval(() => {
      setLiveUsers(simulateLiveUserCount());
      // Trigger pulse animation
      setPulseEffect(true);
      setTimeout(() => setPulseEffect(false), 1000);
    }, 3000 + Math.random() * 4000);
    
    return () => clearInterval(intervalId);
  }, []);
  
  return (
    <Card className="bg-primary/10 border-primary/20">
      <CardContent className="p-3 flex items-center space-x-2">
        <Badge variant="secondary" className="bg-green-600/20 text-green-600 hover:bg-green-600/30">Live</Badge>
        <span className="flex items-center">
          <RiUser3Line className={`mr-1 ${pulseEffect ? 'animate-pulse text-primary' : ''}`} />
          <span className={`font-medium ${pulseEffect ? 'animate-pulse text-primary' : ''}`}>
            {liveUsers} users online
          </span>
        </span>
      </CardContent>
    </Card>
  );
} 