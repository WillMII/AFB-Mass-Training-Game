using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using TMPro;

public class Selected : MonoBehaviour
{


    public TMP_Text text;
    public bool correct;
    private TMP_Text counter;
    public Canvas correctCanvas;
    // Start is called before the first frame update
    void Start()
    {
        counter = correctCanvas.GetComponentInChildren<TMP_Text>();
    }

    // Update is called once per frame
    void Update()
    {
        
    }

    public void OnClick()
    {
        text.text = "A";
        if (text.gameObject.name == "Answer 1")
        {
            correct = false;
            Debug.Log("Incorrect");
        }
        if (correct == true)
        {
            counter.text = (int.Parse(counter.text) + 1).ToString();
        }
    }
}
