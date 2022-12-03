using System;
using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class AppleScript : MonoBehaviour
{
    public AudioSource eatingNoice;
    // Start is called before the first frame update
    void Start()
    {
        eatingNoice = GetComponent<AudioSource>();
    }

    // Update is called once per frame
    void Update()
    {

    }

    void OnCollisionEnter2D(Collision2D collision)
    {
        if (collision.gameObject.tag == "Player")
        {

            ScoreScript.scoreVal += 10;
            AudioSource.PlayClipAtPoint(eatingNoice.clip, transform.position);
            Destroy(gameObject);

        }
    }
}

